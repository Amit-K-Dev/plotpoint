"use client";

const COLORS = {
  High: "#4ade80",
  Medium: "#f0c040",
  Low: "#f87171",
};

export function HiddenClues({ clues = [] }) {
  if (!clues.length) return null;

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
          color: "#60b0f0",
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        🧠 Hidden Clue Detector
      </div>

      {clues.map((clue, i) => (
        <div
          key={i}
          style={{
            paddingBottom: 14,
            marginBottom: 14,
            borderBottom:
              i !== clues.length - 1
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 6 }}
          >
            <div
              style={{
                color: "white",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {clue.clue}
            </div>

            <span
              style={{
                color: COLORS[clue.confidence],
                fontSize: 11,
              }}
            >
              {clue.confidence}
            </span>
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            {clue.evidence}
          </div>

          <div
            style={{
              color: "#60b0f0",
              fontSize: 12,
              lineHeight: 1.6,
            }}
          >
            {clue.meaning}
          </div>
        </div>
      ))}
    </div>
  );
}