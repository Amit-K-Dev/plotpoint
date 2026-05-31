"use client";

export function ForecastBoard({ prediction }) {
  if (!prediction) return null;

  const cards = [
    {
      label: "IMDb",
      value: prediction.imdb_prediction,
      suffix: "/10",
      color: "#f0c040",
    },
    {
      label: "RT Critics",
      value: prediction.rt_critics,
      suffix: "%",
      color: "#4ade80",
    },
    {
      label: "RT Audience",
      value: prediction.rt_audience,
      suffix: "%",
      color: "#60b0f0",
    },
    {
      label: "Awards",
      value: prediction.awards_chance,
      suffix: "",
      color: "#c084fc",
    },
  ];

  return (
    <div
      style={{
        marginBottom: 12,
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 10,
      }}
    >
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: 14,
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 6,
            }}
          >
            {c.label}
          </div>

          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: c.color,
            }}
          >
            {c.value}
            {c.suffix}
          </div>
        </div>
      ))}
    </div>
  );
}