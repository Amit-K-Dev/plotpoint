"use client";

export function PostCreditPrediction({ data }) {
  if (!data) return null;

  const color =
    data.probability >= 75
      ? "#4ade80"
      : data.probability >= 50
      ? "#f0c040"
      : "#f87171";

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${color}33`,
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: 3,
          color,
          marginBottom: 12,
        }}
      >
        🎭 POST-CREDIT SCENE
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color,
          }}
        >
          {data.probability}%
        </div>

        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 600,
            }}
          >
            {data.type}
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 12,
            }}
          >
            Confidence: {data.confidence}
          </div>
        </div>
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        {data.reason}
      </div>
    </div>
  );
}