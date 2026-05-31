"use client";

const COLORS = {
  High: "#4ade80",
  Medium: "#f0c040",
  Low: "#f87171",
};

export function AwardsForecast({ data }) {
  if (!data) return null;

  const items = [
    ["Oscar Chance", data.oscar_chance],
    ["Golden Globes", data.golden_globes],
    ["Festival Potential", data.festival_potential],
    ["Acting Recognition", data.acting_recognition],
    ["Technical Recognition", data.technical_recognition],
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
      <div
        style={{
          color: "#f0c040",
          fontSize: 12,
          letterSpacing: 3,
          marginBottom: 14,
        }}
      >
        🏆 AWARDS FORECAST
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {items.map(([label, value]) => (
          <div
            key={label}
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
                marginBottom: 4,
              }}
            >
              {label}
            </div>

            <div
              style={{
                color: COLORS[value],
                fontWeight: 700,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          color: "rgba(255,255,255,0.75)",
          lineHeight: 1.7,
          fontSize: 13,
        }}
      >
        {data.reason}
      </div>
    </div>
  );
}