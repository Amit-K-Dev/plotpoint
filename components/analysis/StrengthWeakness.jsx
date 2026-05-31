"use client";

export function StrengthWeakness({
  strengths = [],
  weaknesses = [],
}) {
  return (
    <div className="grid gap-3 mb-3">
      <div
        style={{
          background: "rgba(74,222,128,0.08)",
          border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 14,
          padding: 14,
        }}
      >
        <h4 style={{ color: "#4ade80", marginBottom: 10 }}>
          ✅ Strengths
        </h4>

        {strengths.map((s, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            • {s}
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.2)",
          borderRadius: 14,
          padding: 14,
        }}
      >
        <h4 style={{ color: "#f87171", marginBottom: 10 }}>
          ⚠ Weaknesses
        </h4>

        {weaknesses.map((s, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            • {s}
          </div>
        ))}
      </div>
    </div>
  );
}