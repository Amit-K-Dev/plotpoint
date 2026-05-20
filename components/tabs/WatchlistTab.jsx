"use client";
import { useWatchlist } from "@/hooks/useWatchlist";
import { fmtDate } from "@/lib/utils";
import { WATCHLIST_STATUSES, STATUS_COLORS } from "@/lib/constants";


export function WatchlistTab() {
  const { watchlist, updateStatus, removeEntry } = useWatchlist();

  if (!watchlist.length) return (
    
      <div style={{ fontSize: 44, marginBottom: 12 }}>📌</div>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 14 }}>Watchlist is empty. Pin movies after analysing!</p>
    </div>
  );

  const byStatus = WATCHLIST_STATUSES.reduce<Record<WatchlistStatus, number>>(
    (acc, s) => ({ ...acc, [s]: watchlist.filter((w) => w.status === s).length }),
    {} as Record<WatchlistStatus, number>
  );

  return (
    <div>
      {/* Status summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
        {WATCHLIST_STATUSES.map((s) => (
          <div key={s} style={{ background: `${STATUS_COLORS[s]}11`, border: `1px solid ${STATUS_COLORS[s]}33`, borderRadius: 10, padding: "10px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: STATUS_COLORS[s] }}>{byStatus[s]}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans',sans-serif" }}>{s}</div>
          </div>
        ))}
      </div>

      {watchlist.map((w) => (
        <div key={w.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "15px 18px", marginBottom: 10 }}>
          <div className="flex items-start gap-3">
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1, color: "white", marginBottom: 3 }}>{w.title}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans',sans-serif", marginBottom: 8 }}>Score: {w.score}/10 · Added {fmtDate(w.addedAt)}</div>
              <div className="flex flex-wrap gap-1.5">
                {WATCHLIST_STATUSES.map((s) => (
                  <button key={s} onClick={() => updateStatus(w.id, s)}
                    style={{ padding: "4px 9px", borderRadius: 6, fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: w.status === s ? 600 : 400, background: w.status === s ? `${STATUS_COLORS[s]}1a` : "rgba(255,255,255,0.06)", border: `1px solid ${w.status === s ? STATUS_COLORS[s] + "55" : "rgba(255,255,255,0.1)"}`, color: w.status === s ? STATUS_COLORS[s] : "rgba(255,255,255,0.4)" }}>{s}</button>
                ))}
              </div>
            </div>
            <button onClick={() => removeEntry(w.id)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.22)", cursor: "pointer", fontSize: 15, padding: 4, flexShrink: 0 }}>✕</button>
          </div>
        </div>
      ))}
    </div>
  );
}
