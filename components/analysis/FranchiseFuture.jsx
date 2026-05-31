"use client";

export function FranchiseFuture({ data }) {
  if (!data) return null;

  const metrics = [
    {
      label: "Sequel Potential",
      value: data.sequel_potential,
      color: "#4ade80",
    },
    {
      label: "Spin-off Potential",
      value: data.spinoff_potential,
      color: "#60b0f0",
    },
    {
      label: "Universe Expansion",
      value: data.universe_expansion,
      color: "#c084fc",
    },
    {
      label: "Fan Retention",
      value: data.fan_retention,
      color: "#f0c040",
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
      <div
        style={{
          fontSize: 12,
          letterSpacing: 3,
          color: "#60b0f0",
          marginBottom: 14,
        }}
      >
        📈 FRANCHISE FUTURE
      </div>

      {metrics.map((m) => (
        <div
          key={m.label}
          style={{ marginBottom: 12 }}
        >
          <div
            className="flex justify-between"
            style={{ marginBottom: 4 }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 12,
              }}
            >
              {m.label}
            </span>

            <span
              style={{
                color: m.color,
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {m.value}%
            </span>
          </div>

          <div
            style={{
              height: 6,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${m.value}%`,
                height: "100%",
                background: m.color,
              }}
            />
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 12,
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