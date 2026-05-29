import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      question,
      history,
      analysisContext,
      movieTitle,
    } = body;

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `
${CHAT_SYSTEM_PROMPT}

Movie:
${movieTitle || "Unknown"}

Analysis Context:
${JSON.stringify(analysisContext || {}, null, 2)}

Conversation History:
${JSON.stringify(history || [], null, 2)}

User Question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (err) {
    console.error("[/api/chat]", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}