"use client";
import { useState } from "react";

import { LIKELIHOOD_CONFIG } from "@/lib/constants";


export function TheoryCard({ theory, index, blurred = false }: Props) {
  const [open, setOpen] = useState(false);
  const cfg = LIKELIHOOD_CONFIG[theory.likelihood] ?? LIKELIHOOD_CONFIG.Medium;

  return (
    
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center gap-3 text-white text-left" style={{ background: "none", border: "none", padding: "14px 16px", cursor: "pointer" }}>
        <div style={{ width: 25, height: 25, borderRadius: "50%", background: "rgba(139,92,246,0.25)", border: "1px solid rgba(139,92,246,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, color: "#c084fc", flexShrink: 0 }}>{index + 1}</div>
        <div className="flex-1">
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 1.2, color: "rgba(255,255,255,0.9)", marginBottom: 4 }}>{theory.title?.toUpperCase()}</div>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}>{theory.likelihood} Likelihood</span>
            <div style={{ flex: 1, maxWidth: 60, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${cfg.pct}%`, background: cfg.color, borderRadius: 2 }} />
            </div>
          </div>
        </div>
        <span style={{ fontSize: 12, color: "rgba(139,92,246,0.55)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>

      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(139,92,246,0.12)", filter: blurred ? "blur(6px)" : "none", userSelect: blurred ? "none" : "auto" }}>
          <p style={{ margin: "12px 0 11px", color: "rgba(255,255,255,0.73)", fontSize: 13.5, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif" }}>{theory.description}</p>
          {theory.clues?.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(139,92,246,0.65)", textTransform: "uppercase", marginBottom: 6 }}>Trailer Clues</div>
              {theory.clues.map((c, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <span style={{ color: "#c084fc", fontSize: 10, marginTop: 3, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.56)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.55 }}>{c}</span>
                </div>
              ))}
            </div>
          )}
          {theory.twist && (
            <div style={{ background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 8, padding: "9px 13px" }}>
              <span style={{ fontSize: 10, letterSpacing: 3, color: "#c084fc", textTransform: "uppercase", display: "block", marginBottom: 3 }}>💥 If True…</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.78)", fontStyle: "italic", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }}>{theory.twist}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
