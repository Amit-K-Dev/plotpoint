import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ANALYSIS_SYSTEM_PROMPT } from "@/lib/prompts";
import { safeParseJSON } from "@/lib/utils";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
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

    const prompt = `
${ANALYSIS_SYSTEM_PROMPT}

Movie Title: ${title || "Unknown"}

Trailer URL:
${youtubeUrl || "N/A"}

Notes:
${notes || "N/A"}

Attached Images:
${images?.length || 0}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const raw = response.text;

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
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}