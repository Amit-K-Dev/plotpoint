"use client";

export function PredictionCenter({ data }) {
  if (!data) return null;

  const confidenceColor =
    data.confidence === "High"
      ? "#4ade80"
      : data.confidence === "Medium"
      ? "#f0c040"
      : "#f87171";

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
          color: "rgba(240,192,64,0.75)",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        🏆 Prediction Center
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,minmax(0,1fr))",
          gap: 12,
        }}
      >
        <PredictionItem
          label="IMDb"
          value={`${data.imdb_prediction}/10`}
          color="#f0c040"
        />

        <PredictionItem
          label="RT Critics"
          value={`${data.rt_critics}%`}
          color="#60b0f0"
        />

        <PredictionItem
          label="RT Audience"
          value={`${data.rt_audience}%`}
          color="#4ade80"
        />

        <PredictionItem
          label="Awards"
          value={data.awards_chance}
          color="#c084fc"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 12,
          borderRadius: 10,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Box Office Prediction
        </div>

        <div
          style={{
            color: "#f0c040",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 24,
            letterSpacing: 1,
          }}
        >
          {data.box_office}
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          Confidence Level
        </span>

        <span
          style={{
            background: `${confidenceColor}22`,
            border: `1px solid ${confidenceColor}55`,
            color: confidenceColor,
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 11,
          }}
        >
          {data.confidence}
        </span>
      </div>
    </div>
  );
}

function PredictionItem({ label, value, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        padding: 12,
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: 2,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 24,
          color,
          letterSpacing: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}