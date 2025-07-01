import { IChatListRequest } from '@/data/dynamic/chat.types';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const deepseek = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: IChatListRequest = await request.json();

    let completion;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          switch (true) {
            case body.model.includes('deepseek'):
              completion = await deepseek.chat.completions.create({
                messages: body.chatList,
                model: body.model,
                stream: true,
                max_tokens: 8192,
              });
              break;
            default:
              completion = await openai.chat.completions.create({
                messages: body.chatList,
                model: body.model,
                stream: true,
                max_tokens: 8192,
              });
              break;
          }

          for await (const chunk of completion) {
            const content = chunk.choices[0].delta.content;
            if (content) {
              controller.enqueue(content);
            }
          }
          controller.close();
        } catch (error) {
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
