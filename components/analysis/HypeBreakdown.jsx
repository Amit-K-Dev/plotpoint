"use client";
import { HypeBar } from "@/components/ui";
import { HYPE_BARS } from "@/lib/constants";



export function HypeBreakdown({ breakdown }: Props) {
  return (
    
      <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(240,192,64,0.65)", textTransform: "uppercase", marginBottom: 13 }}>🔥 Hype Breakdown</div>
      {HYPE_BARS.map(({ key, label, color }) => (
        <HypeBar key={key} label={label} value={breakdown[key]} color={color} />
      ))}
    </div>
  );
}
