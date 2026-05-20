"use client";
import { useState, useRef, useEffect } from "react";

import { QUICK_QUESTIONS } from "@/lib/constants";


export function AIChat({ analysisContext, movieTitle }: Props) {
  const [msgs, setMsgs] = useState([
    { role: "assistant", text: `I just finished analysing the "${movieTitle}" trailer. Ask me anything — hidden clues, plot theories, directorial choices, what I think will actually happen!` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async (q?) => {
    const text = (q ?? input).trim();
    if (!text) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const history = msgs.slice(1).map((m) => ({ role: m.role, content: m.text }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, history, analysisContext, movieTitle }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", text: data.reply ?? "Something went wrong." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Network error — try again!" }]);
    }
    setTyping(false);
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, overflow: "hidden" }}>
      <div className="flex items-center gap-2" style={{ padding: "13px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2, color: "rgba(255,255,255,0.75)" }}>AI ANALYST — ASK ANYTHING</span>
      </div>
      {/* Quick chips */}
      <div className="flex gap-1.5 flex-wrap" style={{ padding: "10px 14px 0" }}>
        {QUICK_QUESTIONS.map((q, i) => (
          <button key={i} onClick={() => send(q)} style={{ background: "rgba(240,192,64,0.1)", border: "1px solid rgba(240,192,64,0.2)", borderRadius: 20, padding: "4px 10px", fontSize: 11, color: "rgba(240,192,64,0.75)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{q}</button>
        ))}
      </div>
      {/* Messages */}
      <div style={{ height: 240, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div style={{ maxWidth: "84%", padding: "9px 13px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? "rgba(240,192,64,0.16)" : "rgba(255,255,255,0.06)", border: `1px solid ${m.role === "user" ? "rgba(240,192,64,0.28)" : "rgba(255,255,255,0.09)"}`, fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.65 }}>
              {m.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 px-3 py-2">
            {[0, 1, 2].map((i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.35)", animation: `bounce 1s ease ${i * 0.15}s infinite` }} />)}
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      {/* Input */}
      <div className="flex gap-2" style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask about theories, clues, director style…"
          style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 13px", color: "white", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
        <button onClick={() => send()} disabled={typing || !input.trim()} style={{ background: "linear-gradient(135deg,#f0c040,#e09020)", border: "none", borderRadius: 10, width: 38, cursor: typing ? "not-allowed" : "pointer", opacity: typing ? 0.5 : 1, fontSize: 15 }}>➤</button>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}
