"use client";



export function EmotionArc({ arc }: Props) {
  if (!arc?.length) return null;
  const H = 70, W = 100, step = W / (arc.length - 1);
  const pts  = arc.map((p, i) => `${i * step},${H - (p.intensity / 10) * H}`).join(" ");
  const area = `0,${H} ${pts} ${(arc.length - 1) * step},${H}`;

  return (
    
      <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(96,176,240,0.8)", textTransform: "uppercase", marginBottom: 14 }}>🎢 Emotional Arc</div>
      <svg viewBox={`0 0 ${(arc.length - 1) * step} ${H}`} style={{ width: "100%", height: 70, overflow: "visible" }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#60b0f0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#60b0f0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#ag)" />
        <polyline points={pts} fill="none" stroke="#60b0f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {arc.map((p, i) => (
          <circle key={i} cx={i * step} cy={H - (p.intensity / 10) * H} r="4" fill="#60b0f0" stroke="#080810" strokeWidth="1.5" />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {arc.map((p, i) => (
          <div key={i} className="text-center flex-1">
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.3 }}>{p.moment}</div>
            <div style={{ fontSize: 9, color: "rgba(96,176,240,0.55)", fontFamily: "'DM Sans',sans-serif", fontStyle: "italic" }}>{p.emotion}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
