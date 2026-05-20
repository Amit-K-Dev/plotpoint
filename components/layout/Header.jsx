"use client";

const TABS = ["🎬 Analyze", "🕒 History", "📌 Watchlist", "⚔️ Compare"];


export function Header({ activeTab, onTabChange, historyCount, watchlistCount }: Props) {
  const badges: Record = { 1: historyCount, 2: watchlistCount };

  return (
    <header style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, flexWrap: "wrap", gap: 8 }}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#f0c040,#e09020)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🎬</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 19, letterSpacing: 3, background: "linear-gradient(135deg,#fff,rgba(240,192,64,0.8))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TRAILER ANALYST</span>
          <span style={{ fontSize: 9, background: "rgba(240,192,64,0.15)", border: "1px solid rgba(240,192,64,0.3)", borderRadius: 4, padding: "2px 6px", color: "rgba(240,192,64,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>PRO</span>
        </div>
        {/* Nav */}
        <nav className="flex gap-1">
          {TABS.map((t, i) => (
            <button key={i} onClick={() => onTabChange(i)}
              style={{ position: "relative", background: activeTab === i ? "rgba(240,192,64,0.14)" : "none", border: `1px solid ${activeTab === i ? "rgba(240,192,64,0.32)" : "transparent"}`, borderRadius: 8, padding: "5px 11px", color: activeTab === i ? "#f0c040" : "rgba(255,255,255,0.42)", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", whiteSpace: "nowrap" }}>
              {t}
              {badges[i] > 0 && (
                <span style={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", background: i === 1 ? "#f0c040" : "#60b0f0", fontSize: 8, color: "#0a0a1a", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{badges[i]}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
