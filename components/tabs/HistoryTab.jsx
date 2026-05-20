"use client";
import { useHistory } from "@/hooks/useHistory";
import { fmtDate } from "@/lib/utils";



export function HistoryTab({ onLoad }: Props) {
  const { history, removeEntry, clearAll } = useHistory();

  if (!history.length) return (
    
      <div style={{ fontSize: 44, marginBottom: 12 }}>🎞️</div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14 }}>No analyses yet. Analyse your first trailer!</p>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{history.length} saved {history.length === 1 ? "analysis" : "analyses"}</div>
        <button onClick={clearAll} style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "5px 10px", color: "#f87171", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>Clear All</button>
      </div>

      {history.map((h) => (
        <div key={h.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "15px 18px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 10, background: "rgba(240,192,64,0.13)", border: "1px solid rgba(240,192,64,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, color: "#f0c040" }}>{h.result?.score ?? "?"}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 1, color: "white", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.title}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", fontFamily: "'DM Sans',sans-serif" }}>{fmtDate(h.createdAt)} · Hype: {h.result?.hype_score ?? "?"}/100</div>
          </div>
          <button onClick={() => onLoad(h)} style={{ background: "rgba(96,176,240,0.13)", border: "1px solid rgba(96,176,240,0.28)", borderRadius: 8, padding: "6px 12px", color: "#60b0f0", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", flexShrink: 0 }}>Load</button>
          <button onClick={() => removeEntry(h.id)} style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 8, padding: "6px 9px", color: "#f87171", fontSize: 12, cursor: "pointer", flexShrink: 0 }}>🗑</button>
        </div>
      ))}
    </div>
  );
}
