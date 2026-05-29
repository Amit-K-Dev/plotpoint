"use client";

import { HypeBar } from "@/components/ui";
import { HYPE_BARS } from "@/lib/constants";

export function HypeBreakdown({ breakdown }) {
  if (!breakdown) return null;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 14,
        padding: "16px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 3,
          color: "rgba(240,192,64,0.65)",
          textTransform: "uppercase",
          marginBottom: 13,
        }}
      >
        🔥 Hype Breakdown
      </div>

      {HYPE_BARS.map(({ key, label, color }) => (
        <HypeBar
          key={key}
          label={label}
          value={breakdown[key] || 0}
          color={color}
        />
      ))}
    </div>
  );
}