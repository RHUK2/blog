import { IChatListRequest } from '@/data/dynamic/chat.types';
import OpenAI from 'openai';
import type { Stream } from 'openai/streaming';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

// API 키 검증
if (!process.env.OPENAI_API_KEY || !process.env.DEEPSEEK_API_KEY) {
  console.warn('Missing API keys - some models may not work');
}

export async function POST(request: Request) {
  try {
    const body: IChatListRequest = await request.json();

    if (!body.chatList || !Array.isArray(body.chatList) || body.chatList.length === 0) {
      return Response.json({ code: 'INVALID_CHAT_LIST' }, { status: 400 });
    }

    if (!body.model) {
      return Response.json({ code: 'MODEL_REQUIRED' }, { status: 400 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const client = body.model.includes('deepseek') ? deepseek : openai;

          const params = {
            messages: body.chatList,
            model: body.model,
            stream: true,
            max_tokens: 4096,
            temperature: 0.7,
          };

          const completion = (await client.chat.completions.create(
            params,
          )) as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>;

          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(content);
            }
          }
          controller.close();
        } catch (error) {
          console.error(error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error(error);
    // 클라이언트 요청이 잘못된 경우
    // return Response.json({ code: 'CLIENT_ERR' }, { status: 400 });
    // 예측 불가능한 에러
    return Response.json({ code: 'SERVER_ERR' }, { status: 500 });
  }
}
