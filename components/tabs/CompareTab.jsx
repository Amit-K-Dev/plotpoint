"use client";
import { useState } from "react";
import { useHistory } from "@/hooks/useHistory";

import { HYPE_BARS } from "@/lib/constants";

export function CompareTab() {
  const { history } = useHistory();
  const [a, setA] = useState(null);
  const [b, setB] = useState<HistoryEntry | null>(null);

  if (history.length < 2) return (
    <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.28)" }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>⚔️</div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14 }}>Analyse at least 2 trailers to compare.</p>
    </div>
  );

  const sel = (val: HistoryEntry | null, set: (v: HistoryEntry | null) => void, accent) => (
    <select value={val?.id ?? ""} onChange={(e) => set(history.find((h) => h.id === +e.target.value) ?? null)}
      style={{ background: "rgba(255,255,255,0.07)", border: `1px solid ${accent}33`, borderRadius: 10, padding: "9px 12px", color: "white", fontSize: 13, outline: "none", width: "100%", fontFamily: "'DM Sans',sans-serif" }}>
      <option value="">— Pick —</option>
      {history.map((h) => <option key={h.id} value={h.id}>{h.title}</option>)}
    </select>
  );

  const metricRow = (label, va, vb, max) => {
    const win = va > vb ? "a" : va < vb ? "b" : "tie";
    return (
      <div key={label} style={{ marginBottom: 15 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textAlign: "center", marginBottom: 5, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
        <div className="flex items-center gap-2">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
            <span style={{ fontSize: 13, fontWeight: win === "a" ? 700 : 400, color: win === "a" ? "#4ade80" : "rgba(255,255,255,0.45)", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>{va}</span>
            <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(va/max)*100}%`, marginLeft: "auto", background: win === "a" ? "#4ade80" : "#60b0f0", borderRadius: 3 }} />
            </div>
          </div>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>vs</span>
          <div style={{ flex: 1, gap: 3, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 13, fontWeight: win === "b" ? 700 : 400, color: win === "b" ? "#4ade80" : "rgba(255,255,255,0.45)", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>{vb}</span>
            <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(vb/max)*100}%`, background: win === "b" ? "#4ade80" : "#f0c040", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        <div><div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(96,176,240,0.7)", textTransform: "uppercase", marginBottom: 6 }}>Movie A</div>{sel(a, setA, "#60b0f0")}</div>
        <div><div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(240,192,64,0.7)", textTransform: "uppercase", marginBottom: 6 }}>Movie B</div>{sel(b, setB, "#f0c040")}</div>
      </div>

      {a && b && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
            {[a, b].map((h, idx) => (
              <div key={idx} style={{ background: `rgba(${idx === 0 ? "96,176,240" : "240,192,64"},0.07)`, border: `1px solid rgba(${idx === 0 ? "96,176,240" : "240,192,64"},0.2)`, borderRadius: 12, padding: "13px 15px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 1, color: "white", marginBottom: 5 }}>{h.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontFamily: "'DM Sans',sans-serif", fontStyle: "italic" }}>"{h.result?.tagline?.slice(0, 55)}…"</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px" }}>
            {metricRow("Overall Score", a.result?.score ?? 0, b.result?.score ?? 0, 10)}
            {metricRow("Hype Score", a.result?.hype_score ?? 0, b.result?.hype_score ?? 0, 100)}
            {HYPE_BARS.map((bar) => metricRow(bar.label, a.result?.hype_breakdown?.[bar.key] ?? 0, b.result?.hype_breakdown?.[bar.key] ?? 0, 25))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            {[a, b].map((h, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "13px 15px" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: `rgba(${idx === 0 ? "96,176,240" : "240,192,64"},0.65)`, textTransform: "uppercase", marginBottom: 7 }}>Top Theory</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.55 }}>{h.result?.theories?.[0]?.title ?? "N/A"}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
