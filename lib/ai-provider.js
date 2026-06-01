import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const OPENROUTER_MODELS = [
  "google/gemma-3-27b-it:free",
  "moonshotai/kimi-k2:free",
  "openai/gpt-oss-120b:free",
  "deepseek/deepseek-r1-0528:free",
  "meta-llama/llama-3.3-70b-instruct:free",
];

export async function generateWithFallback({
  prompt,
  systemPrompt,
}) {
  // =====================================
  // GEMINI
  // =====================================
  try {
    console.log("Using Gemini...");

    const result =
      await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        },
      });

    console.log("Gemini success");

    return result.text;
  } catch (err) {
    console.error(
      "Gemini failed. Switching to Groq...",
      err?.message || err
    );
  }

  // =====================================
  // GROQ
  // =====================================
  try {
    console.log("Using Groq...");

    const result = await generateWithGroq({
      prompt,
      systemPrompt,
    });

    console.log("Groq success");

    return result;
  } catch (err) {
    console.error(
      "Groq failed. Switching to OpenRouter...",
      err?.message || err
    );
  }

  // =====================================
  // OPENROUTER FALLBACK CHAIN
  // =====================================
  for (const model of OPENROUTER_MODELS) {
    try {
      console.log(
        `Trying OpenRouter model: ${model}`
      );

      const result =
        await generateWithOpenRouter({
          prompt,
          systemPrompt,
          model,
        });

      console.log(
        `OpenRouter success: ${model}`
      );

      return result;
    } catch (err) {
      console.error(
        `OpenRouter failed (${model})`,
        err?.message || err
      );
    }
  }

  // =====================================
  // FINAL FALLBACK
  // =====================================
  console.error(
    "All AI providers unavailable."
  );

  return JSON.stringify({
    score: 7,
    hype_score: 70,
    tagline:
      "AI providers temporarily unavailable.",
    genre: "Analysis unavailable",
    verdict:
      "Please try again in a few minutes.",
    theories: [],
    emotion_arc: [],
    key_moments: [],
    hidden_clues: [],
    awards_forecast: {
      oscar_chance: "Low",
      golden_globes: "Low",
      festival_potential: "Low",
      acting_recognition: "Low",
      technical_recognition: "Low",
      reason:
        "AI services unavailable.",
    },
  });
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
        temperature: 0.8,
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
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      await response.text()
    );
  }

  const data = await response.json();

  return (
    data?.choices?.[0]?.message?.content ||
    ""
  );
}

async function generateWithOpenRouter({
  prompt,
  systemPrompt,
  model,
}) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          "https://plotpoint.amitforge.com",
        "X-Title": "PlotPoint",
      },
      body: JSON.stringify({
        model,
        temperature: 0.8,
        max_tokens: 2500,
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
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      await response.text()
    );
  }

  const data = await response.json();

  return (
    data?.choices?.[0]?.message?.content ||
    ""
  );
}