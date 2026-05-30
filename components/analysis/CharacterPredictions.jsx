"use client";

export function CharacterPredictions({ predictions = [] }) {
  if (!predictions.length) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: "#c084fc",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        🎭 Character Fate Predictor
      </div>

      {predictions.map((p, i) => (
        <div
          key={i}
          style={{
            marginBottom: 14,
            paddingBottom: 14,
            borderBottom:
              i !== predictions.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
          }}
        >
          <div
            className="flex justify-between items-center"
            style={{ marginBottom: 6 }}
          >
            <span
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              {p.character}
            </span>

            <span
              style={{
                color: "#c084fc",
                fontSize: 12,
              }}
            >
              {p.chance}%
            </span>
          </div>

          <div
            style={{
              color: "#f0c040",
              marginBottom: 4,
              fontSize: 13,
            }}
          >
            {p.prediction}
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            {p.reason}
          </div>
        </div>
      ))}
    </div>
  );
}