import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

  try {

    const { text, voice } = await request.json();

    if (!text || !text.trim()) {
      return new Response(
        "Text is required",
        { status: 400 }
      );
    }

    const speech = await openai.audio.speech.create({

      model: "gpt-4o-mini-tts",

      voice: voice || "alloy",

      input: text,

      response_format: "mp3"

    });

    const buffer =
      Buffer.from(
        await speech.arrayBuffer()
      );

    return new Response(buffer, {

      headers: {
        "Content-Type": "audio/mpeg"
      }

    });

  } catch (error) {

    console.error(error);

    return new Response(
      "Speech generation failed",
      { status: 500 }
    );

  }
}
