import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: body.chat,
    });

    return Response.json({ chat: completion.choices[0].message });
  } catch (error) {
    console.error(error);
  }
}
