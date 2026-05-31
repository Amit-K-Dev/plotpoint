"use client";

export function HiddenClues({
  clues = [],
}) {
  if (!clues.length) return null;

  return (
    <div
      style={{
        marginBottom: 14,
      }}
    >
      <h3
        style={{
          color: "#60b0f0",
          letterSpacing: 3,
          fontSize: 13,
          marginBottom: 12,
        }}
      >
        🕵 HIDDEN CLUES
      </h3>

      {clues.map((c, i) => (
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
              color: "#fff",
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            {c.clue}
          </div>

          <div
            style={{
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            <strong>Evidence:</strong> {c.evidence}
          </div>

          <div
            style={{
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            <strong>Meaning:</strong> {c.meaning}
          </div>

          <div
            style={{
              color: "#f0c040",
              fontSize: 12,
            }}
          >
            Confidence: {c.confidence}
          </div>
        </div>
      ))}
    </div>
  );
}