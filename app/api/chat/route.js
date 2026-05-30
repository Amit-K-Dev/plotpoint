import { NextResponse } from "next/server";
import { generateWithFallback } from "@/lib/ai-provider";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      question,
      history = [],
      analysisContext = {},
      movieTitle = "Unknown",
    } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const prompt = `
Movie:
${movieTitle}

Analysis Context:
${JSON.stringify(analysisContext, null, 2)}

Conversation History:
${JSON.stringify(history, null, 2)}

User Question:
${question}
`;

    const reply = await generateWithFallback({
      systemPrompt: CHAT_SYSTEM_PROMPT,
      prompt,
    });

    return NextResponse.json({
      reply,
    });
  } catch (err) {
    console.error("[/api/chat]", err);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}