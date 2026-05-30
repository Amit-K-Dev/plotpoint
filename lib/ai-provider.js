import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateWithFallback({
  prompt,
  systemPrompt,
}) {
  try {
    const result = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return result.text;
  } catch (err) {
  console.error(
    "Gemini failed. Switching to Groq...",
    err?.message || err
  );

  return generateWithGroq({
    prompt,
    systemPrompt,
  });
}
}

async function generateWithGroq({
  prompt,
  systemPrompt,
}) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
      }),
    }
  );

  if (!response.ok) {
  console.error("Groq failed:", await response.text());

  return JSON.stringify({
    score: 7,
    hype_score: 70,
    tagline: "AI services temporarily busy.",
    genre: "Analysis unavailable",
    verdict: "Please try again in a few minutes.",
    theories: [],
    emotion_arc: [],
    key_moments: [],
  });
}

  const data = await response.json();

  return data.choices?.[0]?.message?.content ?? "";
}