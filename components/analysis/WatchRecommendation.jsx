"use client";

const COLORS = {
  "Must Watch": "#4ade80",
  "Wait For Reviews": "#f0c040",
  "Stream Later": "#60b0f0",
  "Skip": "#f87171",
};

export function WatchRecommendation({ data }) {
  if (!data) return null;

  const color =
    COLORS[data.verdict] || "#ffffff";

  return (
    <div
      style={{
        background: `${color}12`,
        border: `1px solid ${color}33`,
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          textTransform: "uppercase",
          color,
          marginBottom: 10,
        }}
      >
        🎯 WATCH RECOMMENDATION
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color,
          marginBottom: 8,
        }}
      >
        {data.verdict}
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 12,
          marginBottom: 10,
        }}
      >
        Confidence: {data.confidence}
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.8)",
          lineHeight: 1.7,
          fontSize: 13,
        }}
      >
        {data.reason}
      </div>
    </div>
  );
}