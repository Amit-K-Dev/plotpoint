import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateWithFallback({
  prompt,
  systemPrompt,
}) {
  try {
    console.log("Using Gemini...");

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

    try {
      return await generateWithGroq({
        prompt,
        systemPrompt,
      });
    } catch (groqErr) {
      console.error(
        "Groq failed. Switching to OpenRouter...",
        groqErr?.message || groqErr
      );

      return await generateWithOpenRouter({
        prompt,
        systemPrompt,
      });
    }
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
    throw new Error(
      `Groq failed: ${await response.text()}`
    );
  }

  const data = await response.json();

  return (
    data.choices?.[0]?.message?.content ?? ""
  );
}

async function generateWithOpenRouter({
  prompt,
  systemPrompt,
}) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-v4-flash:free",
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
    console.error(
      "OpenRouter failed:",
      await response.text()
    );

    return JSON.stringify({
      score: 7,
      hype_score: 70,
      tagline:
        "All AI providers are currently unavailable.",
      genre: "Analysis unavailable",
      verdict:
        "Please try again in a few minutes.",
      theories: [],
      emotion_arc: [],
      key_moments: [],
    });
  }

  const data = await response.json();

  return (
    data.choices?.[0]?.message?.content ?? ""
  );
}