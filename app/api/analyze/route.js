import { NextResponse } from "next/server";
import { generateWithFallback } from "@/lib/ai-provider";
import { ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { safeParseJSON } from "@/lib/utils";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      youtubeUrl,
      notes,
      images,
    } = body;

    if (!title && !youtubeUrl && !(images && images.length)) {
      return NextResponse.json(
        {
          error:
            "Provide a movie title, YouTube URL, or screenshots.",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
Movie Title:
${title || "Unknown"}

Trailer URL:
${youtubeUrl || "N/A"}

Notes:
${notes || "N/A"}

Attached Images:
${images?.length || 0}
`;

    const raw = await generateWithFallback({
      prompt,
      systemPrompt: ANALYSIS_SYSTEM_PROMPT,
    });

    const parsed = safeParseJSON(raw);

    if (!parsed) {
      console.error("Failed JSON:", raw);

      return NextResponse.json(
        {
          error: "Failed to parse analysis response.",
        },
        {
          status: 500,
        }
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