"use client";

export function StrengthWeakness({
  strengths = [],
  weaknesses = [],
}) {
  if (!strengths.length && !weaknesses.length) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          background: "rgba(74,222,128,0.08)",
          border: "1px solid rgba(74,222,128,0.18)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 3,
            color: "#4ade80",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          ✅ Strengths
        </div>

        {strengths.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            • {item}
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.18)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 3,
            color: "#f87171",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          ⚠ Weaknesses
        </div>

        {weaknesses.map((item, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
}