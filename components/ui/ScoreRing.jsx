"use client";

export function ScoreRing({
  score,
  size = 90,
}) {
  const r = size * 0.375;
  const circ = 2 * Math.PI * r;
  const fill = (score / 10) * circ;

  const col =
    score >= 8
      ? "#f0c040"
      : score >= 6
      ? "#60b0f0"
      : score >= 4
      ? "#e08040"
      : "#e05050";

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{
          transform: "rotate(-90deg)",
        }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={size * 0.07}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={col}
          strokeWidth={size * 0.07}
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{
            transition:
              "stroke-dasharray 1.2s ease",
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          style={{
            fontSize: size * 0.24,
            fontWeight: 700,
            color: col,
            fontFamily:
              "'Bebas Neue',sans-serif",
            letterSpacing: 1,
          }}
        >
          {score}
        </span>

        <span
          style={{
            fontSize: size * 0.1,
            color:
              "rgba(255,255,255,0.3)",
            letterSpacing: 2,
          }}
        >
          / 10
        </span>
      </div>
    </div>
  );
}