import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'chatgpt-4o-latest',
      messages: body.chat,
    });

    return Response.json({ chat: completion.choices[0].message });
  } catch (error) {
    console.error(error);
    // 클라이언트 요청이 잘못된 경우
    // return Response.json({ code: 'CLIENT_ERR' }, { status: 400 });
    // 예측 불가능한 에러
    return Response.json({ code: 'SERVER_ERR' }, { status: 500 });
  }
}
