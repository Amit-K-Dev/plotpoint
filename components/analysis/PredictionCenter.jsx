"use client";

export function PredictionCenter({ data }) {
  if (!data) return null;

  const cards = [
    {
      label: "IMDb",
      value: `${data.imdb_prediction}/10`,
    },
    {
      label: "RT Critics",
      value: `${data.rt_critics}%`,
    },
    {
      label: "RT Audience",
      value: `${data.rt_audience}%`,
    },
    {
      label: "Awards",
      value: data.awards_chance,
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
      }}
    >
      <h3
        style={{
          color: "#f0c040",
          letterSpacing: 3,
          fontSize: 13,
          marginBottom: 16,
        }}
      >
        🔮 PREDICTION CENTER
      </h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {cards.map((c) => (
          <div
            key={c.label}
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {c.label}
            </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                marginTop: 4,
              }}
            >
              {c.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: 13,
        }}
      >
        <strong>Box Office:</strong> {data.box_office}
      </div>

      <div
        style={{
          marginTop: 10,
          color: "#60b0f0",
          fontSize: 12,
        }}
      >
        Confidence: {data.confidence}
      </div>
    </div>
  );
}