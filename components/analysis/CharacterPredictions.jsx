"use client";

export function CharacterPredictions({
  predictions = [],
}) {
  if (!predictions.length) return null;

  return (
    <div
      style={{
        marginBottom: 14,
      }}
    >
      <h3
        style={{
          color: "#c084fc",
          letterSpacing: 3,
          fontSize: 13,
          marginBottom: 12,
        }}
      >
        🎭 CHARACTER PREDICTIONS
      </h3>

      {predictions.map((p, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 14,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
              }}
            >
              {p.character}
            </div>

            <div
              style={{
                color: "#c084fc",
                fontSize: 12,
              }}
            >
              {p.chance}%
            </div>
          </div>

          <div
            style={{
              height: 5,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: `${p.chance}%`,
                height: "100%",
                background: "#c084fc",
              }}
            />
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            {p.prediction}
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.55)",
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