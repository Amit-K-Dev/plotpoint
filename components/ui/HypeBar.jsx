"use client";


export function HypeBar({ label, value, max = 25, color }: Props) {
  return (
    
      <div className="flex justify-between mb-1">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>{label}</span>
        <span style={{ fontSize: 11, color, fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{value}/{max}</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${(value/max)*100}%`, background: color, borderRadius: 3, transition: "width 1s ease" }} />
      </div>
    </div>
  );
}
