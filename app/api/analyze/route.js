import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { safeParseJSON } from "@/lib/utils";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, youtubeUrl, notes, images } = body;

    if (!title && !youtubeUrl && !(images && images.length)) {
      return NextResponse.json(
        { error: "Provide a movie title, YouTube URL, or screenshots." },
        { status: 400 }
      );
    }

    const textParts = [
      title && `Movie Title: ${title}`,
      youtubeUrl && `Trailer URL: ${youtubeUrl}`,
      notes && `Additional Notes: ${notes}`,
      images && images.length
        ? `${images.length} trailer screenshot(s) attached.`
        : null,
    ]
      .filter(Boolean)
      .join("\n\n");

    const content = [
      {
        type: "text",
        text: textParts,
      },
    ];

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: ANALYSIS_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    });

    const raw = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const parsed = safeParseJSON(raw);

    if (!parsed) {
      return NextResponse.json(
        { error: "Failed to parse analysis response." },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[/api/analyze]", err);

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