"use client";
import { useState, useRef, useCallback } from "react";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useHistory } from "@/hooks/useHistory";
import { useWatchlist } from "@/hooks/useWatchlist";
import { extractYouTubeId, getEmbedUrl } from "@/lib/youtube";
import { fileToBase64, copyToClipboard } from "@/lib/utils";
import { fmtDate } from "@/lib/utils";
import { LoadingPulse, ScoreRing, SectionCard } from "@/components/ui";
import {
  EmotionArc,
  KeyMoments,
  TheoryCard,
  HypeBreakdown,
  PredictionCenter,
  StrengthWeakness,
  HiddenClues,
  CharacterPredictions,
  ForecastBoard,
} from "@/components/analysis";
import { AIChat } from "@/components/chat/AIChat";
import { ANALYSIS_SECTIONS, EXTRA_SECTIONS, MAX_IMAGES } from "@/lib/constants";

const RESULT_TABS = ["📊 Overview", "🔮 Theories", "🤖 AI Chat"];

export function AnalyzeTab() {
  const [title, setTitle]       = useState("");
  const [youtubeUrl, setUrl]    = useState("");
  const [notes, setNotes]       = useState("");
  const [images, setImages]     = useState([]);
  const [spoilerHidden, setSH]  = useState(false);
  const [resultTab, setRT]      = useState(0);
  const [copied, setCopied]     = useState(false);

  const { result, loading, loadMsg, error, analyze, reset } = useAnalysis();
  const { addEntry } = useHistory();
  const { addEntry: addWL, isInWatchlist } = useWatchlist();

  const fileRef = useRef(null);
  const vid = youtubeUrl ? extractYouTubeId(youtubeUrl) : null;

  const handleImages = useCallback(async (e) => {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      if (images.length >= MAX_IMAGES) break;
      const data = await fileToBase64(f);
      setImages((p) => p.length < MAX_IMAGES ? [...p, { data, type: f.type, name: f.name }] : p);
    }
  }, [images.length]);

  const handleAnalyze = async () => {
    const data = await analyze({ title, youtubeUrl, notes, images });
    if (data) addEntry({ title: title || "Unknown", youtubeUrl, result: data });
  };

  const handleCopy = async () => {
    if (!result) return;
    const txt = buildReport(title, result);
    await copyToClipboard(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleReset = () => {
    reset();
    setTitle(""); setUrl(""); setNotes(""); setImages([]);
  };

  const inWL = isInWatchlist(title);

  if (loading) return <LoadingPulse message={loadMsg} />;

  if (!result) return (
    <InputForm
      title={title} setTitle={setTitle}
      youtubeUrl={youtubeUrl} setUrl={setUrl}
      notes={notes} setNotes={setNotes}
      images={images} setImages={setImages}
      fileRef={fileRef} vid={vid}
      error={error}
      onAnalyze={handleAnalyze}
      onImages={handleImages}
    />
  );

  return (
    <div style={{ animation: "fadeUp 0.5s ease forwards" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 mb-3">
        {[
          { label: copied ? "✅ Copied!" : "📋 Copy Report", action: handleCopy, active: copied, color: "#4ade80" },
          { label: inWL ? "📌 In Watchlist" : "📌 Watchlist", action: () => addWL({ title: title || "Unknown", score: result.score, tagline: result.tagline }), active: inWL, color: "#4ade80", disabled: inWL },
          { label: spoilerHidden ? "👁 Show Spoilers" : "🙈 Hide Spoilers", action: () => setSH((s) => !s), active: spoilerHidden, color: "#f87171" },
          { label: "🔄 New Analysis", action: handleReset },
        ].map((btn, i) => (
          <button key={i} onClick={btn.action} disabled={btn.disabled}
            style={{ flex: "1 1 120px", padding: "8px 12px", background: btn.active ? `${btn.color}1a` : "rgba(255,255,255,0.06)", border: `1px solid ${btn.active ? btn.color + "44" : "rgba(255,255,255,0.13)"}`, borderRadius: 9, color: btn.active ? btn.color : "rgba(255,255,255,0.65)", fontSize: 11, cursor: btn.disabled ? "default" : "pointer", fontFamily: "'DM Sans',sans-serif", opacity: btn.disabled ? 0.7 : 1 }}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Hero Card */}
      <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "20px 22px", marginBottom: 12, display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <ScoreRing score={result.score} />
        <div style={{ flex: 1, minWidth: 170 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 2, color: "white", marginBottom: 3 }}>{title || "Analysis"}</div>
          <p style={{ margin: "0 0 9px", fontSize: 13.5, fontStyle: "italic", color: "rgba(255,255,255,0.65)", lineHeight: 1.5, fontWeight: 300 }}>"{result.tagline}"</p>
          {result.comps && (
            <div className="flex flex-wrap gap-1">
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>Like:</span>
              {result.comps.map((c, i) => (
                <span key={i} style={{ background: "rgba(240,192,64,0.11)", border: "1px solid rgba(240,192,64,0.22)", borderRadius: 5, padding: "2px 7px", fontSize: 10, color: "rgba(240,192,64,0.75)" }}>{c}</span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-1">
          <div style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Hype</div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 34, color: result.hype_score >= 80 ? "#f0c040" : result.hype_score >= 60 ? "#60b0f0" : "#f87171", lineHeight: 1 }}>{result.hype_score}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)" }}>/100</div>
        </div>
      </div>

<ForecastBoard
  prediction={result.prediction_center}
/>

      {result.hype_breakdown && (
  <HypeBreakdown breakdown={result.hype_breakdown} />
)}



      {/* Result Tabs */}
      <div className="flex gap-1.5 mb-3">
        {RESULT_TABS.map((t, i) => (
          <button key={i} onClick={() => setRT(i)} style={{ flex: 1, padding: "8px", background: resultTab === i ? "rgba(240,192,64,0.13)" : "rgba(255,255,255,0.05)", border: `1px solid ${resultTab === i ? "rgba(240,192,64,0.36)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, color: resultTab === i ? "#f0c040" : "rgba(255,255,255,0.45)", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>{t}</button>
        ))}
      </div>

      {resultTab === 0 && (
        <>

<PredictionCenter
  data={result.prediction_center}
/>

<StrengthWeakness
  strengths={result.strengths}
  weaknesses={result.weaknesses}
/>

<HiddenClues
  clues={result.hidden_clues}
/>

<CharacterPredictions
  predictions={result.character_predictions}
/>

          <EmotionArc arc={result.emotion_arc} />
          <KeyMoments moments={result.key_moments} />
          {EXTRA_SECTIONS.map((s) => result[s.key] && (
            <SectionCard key={s.key} icon={s.icon} label={s.label} content={result[s.key]} />
          ))}
          {ANALYSIS_SECTIONS.map((s) => result[s.key] && (
            <SectionCard key={s.key} icon={s.icon} label={s.label} content={result[s.key]} blurred={spoilerHidden && ["narrative", "characters"].includes(s.key)} />
          ))}
          {result.verdict && <SectionCard icon="⭐" label="Final Verdict" content={result.verdict} />}
        </>
      )}

      {resultTab === 1 && (
        <>
          <div className="flex items-center gap-2 mb-3">
            <div style={{ flex: 1, height: 1, background: "rgba(139,92,246,0.2)" }} />
            <div className="flex items-center gap-2" style={{ padding: "5px 14px", borderRadius: 20, background: "rgba(139,92,246,0.11)", border: "1px solid rgba(139,92,246,0.28)" }}>
              <span>🔮</span><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#c084fc" }}>FAN THEORIES</span>
            </div>
            <div style={{ flex: 1, height: 1, background: "rgba(139,92,246,0.2)" }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 11, textAlign: "center", marginBottom: 13, fontStyle: "italic" }}>Speculative — grounded in trailer evidence.</p>
          {(result.theories ?? []).map((t, i) => <TheoryCard key={i} theory={t} index={i} blurred={spoilerHidden} />)}
        </>
      )}

      {resultTab === 2 && <AIChat analysisContext={result} movieTitle={title || "this film"} />}
    </div>
  );
}

// ─── Input Form Sub-component ──────────────────────────────────────────────
function InputForm({ title, setTitle, youtubeUrl, setUrl, notes, setNotes, images, setImages, fileRef, vid, error, onAnalyze, onImages }) {
  return (
    <div>
      <div className="text-center mb-6">
        <div style={{ fontSize: 10, letterSpacing: 5, color: "rgba(240,192,64,0.55)", textTransform: "uppercase", marginBottom: 10 }}>AI-Powered Movie Intelligence</div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(34px,7vw,62px)", margin: "0 0 8px", letterSpacing: 4, lineHeight: 1, background: "linear-gradient(135deg,#fff 30%,rgba(240,192,64,0.8) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Predict Plots. Discover Clues. Track Hype.</h1>
        <p style={{ color: "rgba(255,255,255,0.3)", margin: 0, fontSize: 13, fontWeight: 300 }}>Trailer Analysis · Plot Predictions · Fan Theories · AI Insights</p>
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "22px" }}>
        {[
          { label: "Movie Title", value: title, set: setTitle, ph: "e.g. Oppenheimer, Dune: Part Two…" },
          { label: "YouTube Trailer URL", value: youtubeUrl, set: setUrl, ph: "https://youtube.com/watch?v=…" },
        ].map(({ label, value, set, ph }) => (
          <div key={label} className="mb-4">
            <label style={{ display: "block", fontSize: 10, letterSpacing: 3, color: "rgba(240,192,64,0.65)", textTransform: "uppercase", marginBottom: 7 }}>{label}</label>
            <input value={value} onChange={(e) => set(e.target.value)} placeholder={ph}
              style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 13px", color: "white", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          </div>
        ))}

        {vid && (
          <div style={{ marginBottom: 16, borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
            <iframe src={getEmbedUrl(vid)} style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen />
          </div>
        )}

        <div className="mb-4">
          <label style={{ display: "block", fontSize: 10, letterSpacing: 3, color: "rgba(240,192,64,0.65)", textTransform: "uppercase", marginBottom: 7 }}>
            Screenshots <span style={{ textTransform: "none", letterSpacing: 0, color: "rgba(255,255,255,0.22)" }}>(up to {MAX_IMAGES})</span>
          </label>
          <div onClick={() => fileRef.current?.click()} style={{ border: "1.5px dashed rgba(255,255,255,0.13)", borderRadius: 10, padding: "16px", textAlign: "center", cursor: "pointer", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🎞️</div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.3)", fontSize: 12 }}>Click to upload trailer frames</p>
            <input ref={fileRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={onImages} />
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {images.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={`data:${img.type};base64,${img.data}`} alt="" style={{ width: 64, height: 44, objectFit: "cover", borderRadius: 6, border: "1px solid rgba(255,255,255,0.14)" }} />
                  <button onClick={() => setImages((p) => p.filter((_, j) => j !== i))} style={{ position: "absolute", top: -5, right: -5, width: 15, height: 15, background: "#e05050", border: "none", borderRadius: "50%", color: "white", fontSize: 8, cursor: "pointer" }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label style={{ display: "block", fontSize: 10, letterSpacing: 3, color: "rgba(240,192,64,0.65)", textTransform: "uppercase", marginBottom: 7 }}>
            Notes <span style={{ textTransform: "none", letterSpacing: 0, color: "rgba(255,255,255,0.22)" }}>(optional)</span>
          </label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="What stood out? Specific aspects to focus on?"
            style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 13px", color: "white", fontSize: 13, resize: "vertical", outline: "none", fontFamily: "'DM Sans',sans-serif", lineHeight: 1.6 }} />
        </div>

        {error && (
          <div style={{ background: "rgba(224,80,80,0.14)", border: "1px solid rgba(224,80,80,0.28)", borderRadius: 8, padding: "9px 13px", marginBottom: 14, color: "#ff9090", fontSize: 13 }}>{error}</div>
        )}

        <button onClick={onAnalyze} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#f0c040,#e09020)", border: "none", borderRadius: 12, color: "#1a1000", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 3 }}>
          🎬 ANALYZE THIS TRAILER
        </button>
      </div>
    </div>
  );
}

function buildReport(title, r) {
  return [
    `🎬 TRAILER ANALYSIS: ${title}`,
    `Score: ${r.score}/10  Hype: ${r.hype_score}/100`,
    `"${r.tagline}"`,
    `Comparables: ${r.comps?.join(", ")}`,
    "",
    ...ANALYSIS_SECTIONS.filter((s) => r[s.key]).map((s) => `${s.icon} ${s.label}\n${r[s.key]}`),
    "",
    `🔮 TOP THEORY`,
    r.theories?.[0] ? `${r.theories[0].title}: ${r.theories[0].description}` : "N/A",
  ].join("\n");
}