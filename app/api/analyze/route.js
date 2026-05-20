import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { safeParseJSON } from "@/lib/utils";


const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequestBody = await req.json();
    const { title, youtubeUrl, notes, images } = body;

    if (!title && !youtubeUrl && !images?.length) {
      return NextResponse.json(
        { error: "Provide a movie title, YouTube URL, or screenshots." },
        { status: 400 }
      );
    }

    // Build content parts
    const textParts = [
      title      && `Movie Title: ${title}`,
      youtubeUrl && `Trailer URL: ${youtubeUrl}`,
      notes      && `Additional Notes: ${notes}`,
      images?.length && `${images.length} trailer screenshot(s) attached.`,
    ]
      .filter(Boolean)
      .join("\n\n");

    type ContentPart =
      | Anthropic.TextBlockParam
      | Anthropic.ImageBlockParam;

    const content: ContentPart[] = [{ type: "text", text: textParts }];

    if (images?.length) {
      for (let i = 0; i  b.type === "text")
      .map((b) => b.text)
      .join("");

    const parsed = safeParseJSON<AnalysisResult>(raw);

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
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
