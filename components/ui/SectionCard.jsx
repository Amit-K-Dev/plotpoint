"use client";
import { useState } from "react";


export function SectionCard({ icon, label, content, blurred = false }: Props) {
  const [open, setOpen] = useState(true);
  return (
    
      <button onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 text-white text-left"
        style={{ background: "none", border: "none", padding: "12px 16px", cursor: "pointer" }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span className="flex-1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1.5, color: "rgba(255,255,255,0.9)" }}>
          {label.toUpperCase()}
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: "4px 16px 13px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.68)", fontSize: 13.5, lineHeight: 1.78, fontFamily: "'DM Sans',sans-serif", filter: blurred ? "blur(5px)" : "none", userSelect: blurred ? "none" : "auto" }}>
            {content}
          </p>
          {blurred && <p style={{ fontSize: 11, color: "#f87171", marginTop: 6, fontStyle: "italic" }}>🙈 Spoilers hidden — toggle to reveal</p>}
        </div>
      )}
    </div>
  );
}
