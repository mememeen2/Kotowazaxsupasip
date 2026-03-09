import { useState, useEffect } from "react";
import { translations } from "./i18n";

const EXAMPLES = {
  thai: ["น้ำขึ้นให้รีบตัก", "ช้าๆ ได้พร้าสองเล่มงาม", "ไก่งามเพราะขน", "รักยาวให้บั่น"],
  japanese: ["七転び八起き", "急がば回れ", "花より団子", "猿も木から落ちる"],
};

const LANG_OPTIONS = [
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

const THEMES = {
  dark: {
    bg: "#252220", headerBg: "#252220", headerBorder: "#4a3f30", tagline: "#c9a86c", title: "#e8ddd0", subtitle: "#9a8878",
    cardBg: "linear-gradient(145deg, #2a2520, #2e2820)", cardBorder: "#3e3428", cardBorderHover: "#6e5a40",
    inputBg: "#1e1c1a", inputBorder: "#3a3028", inputBorderFocus: "#a07840", inputColor: "#e0d4c4",
    labelColor: "#c9a86c", exampleLabel: "#6a5a48", chipBorder: "#3a3028", chipBorderHover: "#a07840",
    chipColor: "#a08060", chipColorHover: "#d4a860", btnBg: "linear-gradient(135deg, #7a5a30, #b88040)",
    btnDisabled: "#2a2520", btnDisabledColor: "#5a5048", sourceBg: "linear-gradient(145deg, #252220, #2e2820)",
    sourceBorder: "#6a5030", sourceLabelColor: "#c9a86c", sourceProverb: "#ede0cc", sourceMeaning: "#a08878",
    sourceMeaningLabel: "#6a5848", divider: "#3a3028", dividerLabel: "#6a5848",
    matchBg: "linear-gradient(145deg, #222020, #282420)", matchBorder: "#343028", matchRankBorder: "#3e3830",
    matchRankColor: "#6a5a48", matchProverb: "#e8ddd0", matchReading: "#8a7060", meaningBox: "#1e1c1a",
    meaningLabel: "#c9a86c", meaningText: "#c8b898", reasonColor: "#8a7060", reasonDot: "#5a4838",
    scoreLabel: "#6a5a48", langSwitcherBg: "#1e1c1a", langSwitcherBorder: "#3a3028",
    langBtnActive: "linear-gradient(135deg, #7a5a30, #b88040)", langBtnActiveColor: "#fff", langBtnColor: "#8a7060",
    directionBg: "#252220", directionBorder: "#3e3428", directionColor: "#b09060", directionArrow: "#5a4838",
    errorBg: "#2a1e1e", errorBorder: "#7a3030", errorColor: "#e09090", footerBorder: "#2e2820", footerColor: "#5a4e40",
    loadingColor: "#8a7060", themeBtnBg: "#2a2520", themeBtnBorder: "#3e3428", themeBtnColor: "#c9a86c",
  },
  light: {
    bg: "#fdf8f2", headerBg: "#fdf8f2", headerBorder: "#e8c090", tagline: "#9a6020", title: "#3a1a00", subtitle: "#7a4a20",
    cardBg: "linear-gradient(145deg, #fff8f0, #fdf2e4)", cardBorder: "#e8c090", cardBorderHover: "#c8853a",
    inputBg: "#fff", inputBorder: "#e0c0a0", inputBorderFocus: "#c87830", inputColor: "#2a1200",
    labelColor: "#9a6020", exampleLabel: "#a07040", chipBorder: "#e0c0a0", chipBorderHover: "#c87830",
    chipColor: "#8a5a28", chipColorHover: "#7a3a10", btnBg: "linear-gradient(135deg, #c06020, #e88030)",
    btnDisabled: "#f0e0d0", btnDisabledColor: "#c0a080", sourceBg: "linear-gradient(145deg, #fff4e4, #fdebd0)",
    sourceBorder: "#d8a060", sourceLabelColor: "#9a6020", sourceProverb: "#2a1200", sourceMeaning: "#6a4020",
    sourceMeaningLabel: "#a07040", divider: "#e8d0b0", dividerLabel: "#a07040",
    matchBg: "linear-gradient(145deg, #fffaf4, #fff6ec)", matchBorder: "#eed8b8", matchRankBorder: "#e0c8a8",
    matchRankColor: "#b08040", matchProverb: "#2a1200", matchReading: "#8a5a28", meaningBox: "#fff8f0",
    meaningLabel: "#9a6020", meaningText: "#4a2800", reasonColor: "#8a5a28", reasonDot: "#c09060",
    scoreLabel: "#9a7a50", langSwitcherBg: "#fff", langSwitcherBorder: "#e0c0a0",
    langBtnActive: "linear-gradient(135deg, #c06020, #e88030)", langBtnActiveColor: "#fff", langBtnColor: "#9a6838",
    directionBg: "#fff8f0", directionBorder: "#e8d0b0", directionColor: "#9a6020", directionArrow: "#c8a060",
    errorBg: "#fff0f0", errorBorder: "#e08080", errorColor: "#c02020", footerBorder: "#e8d0b0", footerColor: "#b09070",
    loadingColor: "#9a6838", themeBtnBg: "#fff8f0", themeBtnBorder: "#e8c090", themeBtnColor: "#9a6020",
  },
};

async function fetchProverbs(query, lang) {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, lang }),
  });
  if (!res.ok) throw new Error("Server error");
  return res.json();
}

function ScoreBar({ score, label, th }) {
  const color = score >= 80 ? "#d4a040" : score >= 60 ? "#b08030" : "#8a6030";
  return (
    <div style={{ marginBottom: "18px", paddingRight: "44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: th.scoreLabel, marginBottom: "6px", letterSpacing: "1px" }}>
        <span>{label}</span><span style={{ color }}>{score}%</span>
      </div>
      <div style={{ height: "3px", background: th.divider, borderRadius: "3px" }}>
        <div style={{ height: "100%", width: `${score}%`, borderRadius: "3px", background: `linear-gradient(90deg, #8a6030, ${color})`, transition: "width 1.2s ease" }} />
      </div>
    </div>
  );
}

function Chip({ label, onClick, th }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "transparent", border: `1px solid ${hovered ? th.chipBorderHover : th.chipBorder}`, borderRadius: "20px", padding: "5px 14px", color: hovered ? th.chipColorHover : th.chipColor, fontSize: "13px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
      {label}
    </button>
  );
}

function LangSwitcher({ current, onChange, th }) {
  return (
    <div style={{ display: "flex", gap: "5px", background: th.langSwitcherBg, border: `1px solid ${th.langSwitcherBorder}`, borderRadius: "30px", padding: "4px" }}>
      {LANG_OPTIONS.map(({ code, label, flag }) => {
        const active = current === code;
        return (
          <button key={code} onClick={() => onChange(code)}
            style={{ background: active ? th.langBtnActive : "transparent", border: "none", borderRadius: "24px", padding: "6px 12px", color: active ? th.langBtnActiveColor : th.langBtnColor, fontSize: "12px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap" }}>
            {flag} {label}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const getSystemMode = () => window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [mode, setMode] = useState(getSystemMode);
  const [isAuto, setIsAuto] = useState(true);
  const [lang, setLang] = useState("th");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => { if (isAuto) setMode(e.matches ? "dark" : "light"); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [isAuto]);

  const toggleMode = () => { setIsAuto(false); setMode(m => m === "dark" ? "light" : "dark"); };
  const resetToAuto = () => { setIsAuto(true); setMode(getSystemMode()); };

  const th = THEMES[mode];
  const t = translations[lang];

  const search = async (query, forceLang) => {
    const q = (query || input).trim();
    const l = forceLang || lang;
    if (!q) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const data = await fetchProverbs(q, l);
      setResult(data);
    } catch {
      setError(t.errorMsg);
    }
    setLoading(false);
  };

  const isJapanese = 
  result?.source_lang === "japanese" ||
  /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(result?.source_proverb || "") && 
  !/[ก-๙]/.test(result?.source_proverb || "");

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; min-height: 100vh; overflow-x: hidden; background: ${th.bg}; }
      `}</style>
      <div style={{ minHeight: "100vh", width: "100%", background: th.bg, fontFamily: "'Noto Serif Thai', 'Noto Serif JP', Georgia, serif", color: th.inputColor, transition: "all 0.3s ease" }}>
        <header style={{ background: th.headerBg, borderBottom: `1px solid ${th.headerBorder}`, padding: "52px 24px 38px", textAlign: "center", position: "relative", overflow: "hidden", transition: "all 0.3s" }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: `${300 + i * 120}px`, height: `${300 + i * 120}px`, borderRadius: "50%", border: `1px solid ${th.headerBorder}33`, pointerEvents: "none" }} />
          ))}
          <div style={{ position: "absolute", top: "14px", right: "16px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button onClick={toggleMode} style={{ background: th.themeBtnBg, border: `1px solid ${th.themeBtnBorder}`, borderRadius: "30px", padding: "7px 14px", color: th.themeBtnColor, fontSize: "12px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}>
                {mode === "dark" ? "☀️ " : "🌙 "}
              </button>
              {!isAuto && (
                <button onClick={resetToAuto} style={{ background: th.themeBtnBg, border: `1px solid ${th.themeBtnBorder}`, borderRadius: "30px", padding: "7px 12px", color: th.scoreLabel, fontSize: "11px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s" }}>
                  ⟳ auto
                </button>
              )}
            </div>
            <LangSwitcher current={lang} onChange={(l) => {
              setLang(l);
              setError("");
              if (input.trim()) search(input.trim(), l);
            }} th={th} />
          </div>
          {isAuto && (
            <div style={{ position: "absolute", top: "18px", left: "18px", fontSize: "10px", color: th.scoreLabel, letterSpacing: "2px", background: th.themeBtnBg, border: `1px solid ${th.themeBtnBorder}`, borderRadius: "20px", padding: "4px 10px" }}>
              ⟳ auto
            </div>
          )}
          <div style={{ fontSize: "12px", letterSpacing: "8px", color: th.tagline, marginBottom: "14px", textTransform: "uppercase" }}>{t.tagline}</div>
          <h1 style={{ fontSize: "clamp(26px, 5vw, 48px)", fontWeight: "300", margin: "0 0 10px", color: th.title, letterSpacing: "3px" }}>{t.title}</h1>
          <p style={{ fontSize: "14px", color: th.subtitle, margin: 0 }}>{t.subtitle}</p>
        </header>

        <div style={{ maxWidth: "740px", margin: "0 auto", padding: "48px 24px 80px" }}>
          <div style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, borderRadius: "20px", padding: "36px", marginBottom: "36px", boxShadow: mode === "dark" ? "0 8px 30px rgba(0,0,0,0.3)" : "0 8px 30px rgba(0,0,0,0.08)", transition: "all 0.3s" }}>
            <label style={{ display: "block", fontSize: "11px", color: th.labelColor, letterSpacing: "4px", marginBottom: "14px", textTransform: "uppercase" }}>{t.inputLabel}</label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder={t.inputPlaceholder}
                style={{ flex: "1", minWidth: "200px", background: th.inputBg, border: `1px solid ${th.inputBorder}`, borderRadius: "12px", padding: "14px 18px", fontSize: "15px", color: th.inputColor, outline: "none", fontFamily: "inherit", transition: "all 0.3s" }}
                onFocus={e => e.target.style.borderColor = th.inputBorderFocus}
                onBlur={e => e.target.style.borderColor = th.inputBorder} />
              <button onClick={() => search()} disabled={loading}
                style={{ background: loading ? th.btnDisabled : th.btnBg, border: "none", borderRadius: "12px", padding: "14px 26px", color: loading ? th.btnDisabledColor : "#fff", fontSize: "14px", fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer", letterSpacing: "1px", whiteSpace: "nowrap", transition: "all 0.3s" }}>
                {loading ? t.searching : t.searchBtn}
              </button>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: th.exampleLabel, letterSpacing: "3px", marginBottom: "10px" }}>{t.examples}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "12px" }}>🇹🇭</span>
                {EXAMPLES.thai.map(ex => <Chip key={ex} label={ex} th={th} onClick={() => { setInput(ex); search(ex); }} />)}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 8px", alignItems: "center" }}>
                <span style={{ fontSize: "12px" }}>🇯🇵</span>
                {EXAMPLES.japanese.map(ex => <Chip key={ex} label={ex} th={th} onClick={() => { setInput(ex); search(ex); }} />)}
              </div>
            </div>
          </div>

          {error && <div style={{ background: th.errorBg, border: `1px solid ${th.errorBorder}`, borderRadius: "14px", padding: "16px 22px", color: th.errorColor, marginBottom: "24px", fontSize: "14px" }}>{error}</div>}

          {loading && (
            <div style={{ textAlign: "center", padding: "70px 0" }}>
              <div style={{ fontSize: "44px", marginBottom: "18px", display: "inline-block", animation: "pulse 1.4s ease-in-out infinite" }}>⛩️</div>
              <p style={{ color: th.loadingColor, fontSize: "13px", letterSpacing: "4px" }}>{t.loadingText}</p>
              <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(0.9)}}`}</style>
            </div>
          )}

          {result && !loading && (
            <div>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: th.directionBg, border: `1px solid ${th.directionBorder}`, borderRadius: "30px", padding: "8px 22px", fontSize: "13px", color: th.directionColor }}>
                  <span>{isJapanese ? "🇯🇵" : "🇹🇭"}</span>
                  <span style={{ color: th.directionArrow }}>→</span>
                  <span>{isJapanese ? "🇹🇭" : "🇯🇵"}</span>
                </span>
              </div>
              <div style={{ background: th.sourceBg, border: `1px solid ${th.sourceBorder}`, borderRadius: "18px", padding: "28px 32px", marginBottom: "28px", transition: "all 0.3s" }}>
                <div style={{ fontSize: "10px", color: th.sourceLabelColor, letterSpacing: "5px", marginBottom: "12px", textTransform: "uppercase" }}>{isJapanese ? t.sourceLabel_japanese : t.sourceLabel_thai}</div>
                <div style={{ fontSize: "24px", fontWeight: "500", color: th.sourceProverb, marginBottom: "6px", letterSpacing: isJapanese ? "4px" : "1px" }}>「{result.source_proverb}」</div>
                           {result.source_reading && (
                <div style={{ fontSize: "13px", color: th.matchReading, fontStyle: "italic", marginBottom: "12px" }}>
                {result.source_reading}
               </div>
                  )}
               <div style={{ fontSize: "14px", color: th.sourceMeaning, lineHeight: "1.8" }}>
                  <span style={{ color: th.sourceMeaningLabel }}>{t.meaning}: </span>{result.source_meaning}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
                <div style={{ flex: 1, height: "1px", background: th.divider }} />
                <span style={{ fontSize: "11px", color: th.dividerLabel, letterSpacing: "2px" }}>{isJapanese ? t.matchLabel_thai : t.matchLabel_japanese}</span>
                <div style={{ flex: 1, height: "1px", background: th.divider }} />
              </div>
              {result.matches?.filter(m => m.score > 0).map((match, i) => (
                <div key={i}
                  style={{ background: th.matchBg, border: `1px solid ${th.matchBorder}`, borderRadius: "18px", padding: "28px 32px", marginBottom: "18px", position: "relative", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = th.cardBorderHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = th.matchBorder; e.currentTarget.style.transform = "none"; }}>
                  <div style={{ position: "absolute", top: "22px", right: "26px", width: "32px", height: "32px", borderRadius: "50%", border: `1px solid ${th.matchRankBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: th.matchRankColor, zIndex: 1 }}>{i + 1}</div>
                  <ScoreBar score={match.score} label={t.similarity} th={th} />
                  <div style={{ fontSize: "22px", fontWeight: "600", color: th.matchProverb, marginBottom: "6px", letterSpacing: !isJapanese ? "2px" : "1px" }}>{match.proverb}</div>
                  {match.reading && <div style={{ fontSize: "13px", color: th.matchReading, fontStyle: "italic", marginBottom: "16px" }}>{match.reading}</div>}
                  <div style={{ background: th.meaningBox, borderRadius: "10px", padding: "14px 18px", marginBottom: "14px" }}>
                    <span style={{ fontSize: "10px", color: th.meaningLabel, letterSpacing: "3px" }}>{t.meaning}  </span>
                    <span style={{ fontSize: "14px", color: th.meaningText, lineHeight: "1.7" }}>{match.meaning}</span>
                  </div>
                  <div style={{ fontSize: "13px", color: th.reasonColor, lineHeight: "1.7" }}>
                    <span style={{ color: th.reasonDot }}>✦ </span>{match.similarity_reason}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "64px", paddingTop: "28px", borderTop: `1px solid ${th.footerBorder}` }}>
            <p style={{ fontSize: "11px", color: th.footerColor, letterSpacing: "3px" }}>{t.footer}</p>
          </div>
        </div>
      </div>
    </>
  );
}