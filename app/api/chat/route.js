import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { question, history, analysisContext, movieTitle } = body;

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const systemWithContext = `${CHAT_SYSTEM_PROMPT}

Movie: ${movieTitle || "Unknown"}

Full Analysis Context:
${JSON.stringify(analysisContext || {}, null, 2)}`;

    const messages = [
      ...(history || []).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      {
        role: "user",
        content: question,
      },
    ];

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 700,
      system: systemWithContext,
      messages,
    });

    const reply = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[/api/chat]", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}