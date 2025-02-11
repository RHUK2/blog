import { IChatListRequest } from '@/_type';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body: IChatListRequest = await request.json();

    const completion = await openai.chat.completions.create({
      messages: body.chatList,
      model: body.model,
    });

    const response = Response.json({ chat: completion.choices[0].message });

    return response;
  } catch (error) {
    console.error(error);
    // 클라이언트 요청이 잘못된 경우
    // return Response.json({ code: 'CLIENT_ERR' }, { status: 400 });
    // 예측 불가능한 에러
    return Response.json({ code: 'SERVER_ERR' }, { status: 500 });
  }
}
