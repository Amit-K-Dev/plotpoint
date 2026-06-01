"use client";

import { useState } from "react";
import { useHistory } from "@/hooks/useHistory";
import { HYPE_BARS } from "@/lib/constants";

export function CompareTab() {
  const { history } = useHistory();

  const [a, setA] = useState(null);
  const [b, setB] = useState(null);

  if (history.length < 2) {
    return (
      <div
        className="text-center py-16"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        <div style={{ fontSize: 44, marginBottom: 12 }}>⚔️</div>
        <p
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: 14,
          }}
        >
          Analyse at least 2 trailers to compare.
        </p>
      </div>
    );
  }

  // ==========================================
  // 1. HELPER FUNCTIONS
  // ==========================================
  const getBattleScore = (movie) => {
    const bs = movie?.result?.battle_strength;

    if (bs) {
      return (
        (bs.story || 0) +
        (bs.visuals || 0) +
        (bs.characters || 0) +
        (bs.originality || 0) +
        (bs.awards || 0)
      );
    }

    const hype = movie?.result?.hype_breakdown;

    return (
      (hype?.visuals || 0) +
      (hype?.story || 0) +
      (hype?.cast || 0) +
      (hype?.originality || 0)
    );
  };

  const compareWinner = () => {
    if (!a || !b) return null;

    const scoreA =
      (a.result?.score || 0) * 10 + (a.result?.hype_score || 0);

    const scoreB =
      (b.result?.score || 0) * 10 + (b.result?.hype_score || 0);

    if (scoreA === scoreB) {
      return {
        winner: "Tie",
        reason:
          "Both trailers perform similarly across overall score and hype metrics.",
      };
    }

    const winner = scoreA > scoreB ? a : b;
    const loser = scoreA > scoreB ? b : a;
    const diff = Math.abs(scoreA - scoreB);

    let reason = `${winner.title} shows stronger audience potential, trailer impact and overall momentum than ${loser.title}.`;

    if (diff > 25) {
      reason = `${winner.title} significantly outperforms ${loser.title} in both quality and hype indicators.`;
    }

    return {
      winner: winner.title,
      reason,
    };
  };

  const generateVerdict = () => {
    if (!a || !b) return null;

    const strengths = [];
    const advantages = [];

    const winnerMovie = getBattleScore(a) > getBattleScore(b) ? a : b;
    const loserMovie = winnerMovie === a ? b : a;

    const winnerBattle = winnerMovie.result?.battle_strength;
    const loserBattle = loserMovie.result?.battle_strength;

    if (winnerBattle?.visuals > loserBattle?.visuals) {
      strengths.push(
        `Better visuals (+${winnerBattle.visuals - loserBattle.visuals})`
      );
    }

    if (winnerBattle?.awards > loserBattle?.awards) {
      strengths.push(
        `Higher awards potential (+${winnerBattle.awards - loserBattle.awards})`
      );
    }

    if (winnerBattle?.originality > loserBattle?.originality) {
      strengths.push(
        `More originality (+${
          winnerBattle.originality - loserBattle.originality
        })`
      );
    }

    if (loserBattle?.story > winnerBattle?.story) {
      advantages.push("Better story score");
    }

    if (loserBattle?.characters > winnerBattle?.characters) {
      advantages.push("Stronger character appeal");
    }

    return {
      winner: winnerMovie.title,
      strengths,
      advantages,
    };
  };

  // ==========================================
  // 2. DERIVED VARIABLES
  // ==========================================
  const aiWinner = compareWinner();
  const verdict = generateVerdict();
  const scoreA = getBattleScore(a);
  const scoreB = getBattleScore(b);
  const winner = scoreA > scoreB ? a : scoreB > scoreA ? b : null;

  // ==========================================
  // 3. UI RENDER HELPERS
  // ==========================================
  const sel = (val, set, accent) => (
    <select
      value={val?.id || ""}
      onChange={(e) =>
        set(history.find((h) => h.id === Number(e.target.value)) || null)
      }
      style={{
        background: "rgba(255,255,255,0.07)",
        border: `1px solid ${accent}33`,
        borderRadius: 10,
        padding: "9px 12px",
        color: "white",
        fontSize: 13,
        outline: "none",
        width: "100%",
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <option value="">— Pick —</option>
      {history.map((h) => (
        <option key={h.id} value={h.id}>
          {h.title}
        </option>
      ))}
    </select>
  );

  const metricRow = (label, va, vb, max) => {
    const win = va > vb ? "a" : va < vb ? "b" : "tie";

    return (
      <div key={label} style={{ marginBottom: 15 }}>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginBottom: 5,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>

        <div className="flex items-center gap-2">
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: win === "a" ? 700 : 400,
                color: win === "a" ? "#4ade80" : "rgba(255,255,255,0.45)",
                fontFamily: "'Bebas Neue',sans-serif",
                letterSpacing: 1,
              }}
            >
              {va}
            </span>

            <div
              style={{
                width: "100%",
                height: 5,
                background: "rgba(255,255,255,0.07)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(va / max) * 100}%`,
                  marginLeft: "auto",
                  background: win === "a" ? "#4ade80" : "#60b0f0",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          >
            vs
          </span>

          <div
            style={{
              flex: 1,
              gap: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: win === "b" ? 700 : 400,
                color: win === "b" ? "#4ade80" : "rgba(255,255,255,0.45)",
                fontFamily: "'Bebas Neue',sans-serif",
                letterSpacing: 1,
              }}
            >
              {vb}
            </span>

            <div
              style={{
                width: "100%",
                height: 5,
                background: "rgba(255,255,255,0.07)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(vb / max) * 100}%`,
                  background: win === "b" ? "#4ade80" : "#f0c040",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 4. MAIN RENDER
  // ==========================================
  return (
    <div>
      {/* Selection Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: "rgba(96,176,240,0.7)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Movie A
          </div>
          {sel(a, setA, "#60b0f0")}
        </div>

        <div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: "rgba(240,192,64,0.7)",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Movie B
          </div>
          {sel(b, setB, "#f0c040")}
        </div>
      </div>

      {/* Comparison Results */}
      {a && b && (
        <div>
          {/* AI Winner Highlight */}
          {aiWinner && (
            <div
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.22)",
                borderRadius: 14,
                padding: "18px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#4ade80",
                  marginBottom: 8,
                }}
              >
                🏆 AI Winner
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 26,
                  letterSpacing: 2,
                  color: "#ffffff",
                  marginBottom: 8,
                }}
              >
                {aiWinner.winner}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.7,
                  fontSize: 13,
                }}
              >
                {aiWinner.reason}
              </div>
            </div>
          )}

          {/* Battle Score Highlight */}
          <div
            style={{
              background: "rgba(240,192,64,0.08)",
              border: "1px solid rgba(240,192,64,0.22)",
              borderRadius: 14,
              padding: "18px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#f0c040",
                marginBottom: 8,
              }}
            >
              ⚔️ Battle Score
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 24,
                color: "#ffffff",
                letterSpacing: 2,
                marginBottom: 8,
              }}
            >
              {scoreA} vs {scoreB}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: 13,
              }}
            >
              Winner: {winner?.title || "Tie"}
            </div>
          </div>

          {/* Verdict Details (Previously misplaced) */}
          {verdict && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "18px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "#f0c040",
                  marginBottom: 12,
                }}
              >
                🎬 Why {verdict.winner} Wins
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {verdict.strengths.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      color: "#4ade80",
                      fontSize: 13,
                    }}
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              {verdict.advantages.length > 0 && (
                <>
                  <div
                    style={{
                      marginTop: 16,
                      marginBottom: 8,
                      color: "#f87171",
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                    }}
                  >
                    ⚠ Opponent Advantages
                  </div>
                  {verdict.advantages.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 13,
                      }}
                    >
                      • {item}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Movies Comparison Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {[a, b].map((h, idx) => (
              <div
                key={idx}
                style={{
                  background: `rgba(${
                    idx === 0 ? "96,176,240" : "240,192,64"
                  },0.07)`,
                  border: `1px solid rgba(${
                    idx === 0 ? "96,176,240" : "240,192,64"
                  },0.2)`,
                  borderRadius: 12,
                  padding: "13px 15px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 15,
                    letterSpacing: 1,
                    color: "white",
                    marginBottom: 5,
                  }}
                >
                  {h.title}
                  {aiWinner?.winner === h.title && (
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 10,
                        color: "#4ade80",
                        letterSpacing: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      🏆 Winner
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "'DM Sans',sans-serif",
                    fontStyle: "italic",
                  }}
                >
                  "{h.result?.tagline?.slice(0, 55)}…"
                </div>
              </div>
            ))}
          </div>

          {/* Metric Rows */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "18px 20px",
            }}
          >
            {metricRow(
              "Overall Score",
              a.result?.score ?? 0,
              b.result?.score ?? 0,
              10
            )}
            {metricRow(
              "Hype Score",
              a.result?.hype_score ?? 0,
              b.result?.hype_score ?? 0,
              100
            )}
            {HYPE_BARS.map((bar) =>
              metricRow(
                bar.label,
                a.result?.hype_breakdown?.[bar.key] ?? 0,
                b.result?.hype_breakdown?.[bar.key] ?? 0,
                25
              )
            )}
          </div>

          {/* Top Theories */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginTop: 12,
            }}
          >
            {[a, b].map((h, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "13px 15px",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: 2,
                    color: `rgba(${
                      idx === 0 ? "96,176,240" : "240,192,64"
                    },0.65)`,
                    textTransform: "uppercase",
                    marginBottom: 7,
                  }}
                >
                  Top Theory
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'DM Sans',sans-serif",
                    lineHeight: 1.55,
                  }}
                >
                  {h.result?.theories?.[0]?.title ?? "N/A"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
