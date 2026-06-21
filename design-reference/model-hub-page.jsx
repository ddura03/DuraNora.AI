// Model Hub page — the intermediate landing you reach by clicking a model.
// Offers two paths: video lessons, or "how it connects" (pairing hub).
// Reads ?model=<slug>. Uses MODELS_CATALOG + ECO_MODELS.

function ModelHubNav() {
  const link = (label, href) => <span className="nav-link" onClick={() => { window.location.href = href; }}>{label}</span>;
  return (
    <div className="navstrip">
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>
        <img src="duranoia-icon.svg" alt="" width="30" height="30" />
        <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: "-.01em" }}>
          <span style={{ color: "var(--ink)" }}>Dura</span><span style={{ color: "var(--violet-deep)" }}>Noia</span>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet-dark)", letterSpacing: ".18em", marginLeft: 8, fontWeight: 600 }}>AI EDUCATION PLATFORM</span>
      </div>
      <div className="links">
        {link("Learn AI", "Learn AI Page Wireframes.html")}
        {link("AI Ecosystem", "AI Ecosystem Page Wireframes.html")}
        {link("AI Showcase", "AI Showcase Page Wireframes.html")}
        {link("News", "News Page Wireframes.html")}
        {link("About", "About Page Wireframes.html")}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill nav-pill ghost" onClick={() => { window.location.href = "Sign In Page Wireframes.html"; }} style={{ background: "transparent", color: "var(--ink)", borderColor: "var(--violet-dark)", fontWeight: 600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => { window.location.href = "Create Account Page Wireframes.html"; }} style={{ background: "var(--violet-deep)", borderColor: "var(--violet-deep)", color: "#fff", fontWeight: 600 }}>Get started →</span>
      </div>
    </div>
  );
}

function ModelHub() {
  const slug = (new URLSearchParams(window.location.search).get("model") || "chatgpt").toLowerCase();
  const M = MODELS_CATALOG[slug] || MODELS_CATALOG.chatgpt;
  const eco = (typeof ECO_MODELS !== "undefined") ? ECO_MODELS.find(m => m.name.toLowerCase() === slug) : null;
  const lessonCount = M.lessons.length;
  const pairCount = (typeof ECO_LINKS !== "undefined") ? ECO_LINKS.filter(l => l.a === M.name || l.b === M.name).length : 4;

  const Card = ({ accent, kicker, title, desc, foot, onClick, art }) => (
    <div onClick={onClick}
      style={{ background: "#fff", border: "1.5px solid var(--line)", borderRadius: 18, overflow: "hidden", cursor: "pointer", transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease", display: "flex", flexDirection: "column" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(124,58,237,.18)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "#d9cff0"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ height: 150, display: "grid", placeItems: "center", background: accent, position: "relative" }}>{art}</div>
      <div style={{ padding: "22px 24px 24px" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--violet-deep)", fontWeight: 700 }}>{kicker}</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", margin: "8px 0 8px" }}>{title}</div>
        <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55 }}>{desc}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
          <span className="label">{foot}</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700, color: "var(--violet-deep)" }}>Open →</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wf">
      <ModelHubNav />
      <div className="sec" style={{ padding: "30px max(40px,4vw) 60px", maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)", marginBottom: 24 }}>
          <span style={{ cursor: "pointer" }} onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>Learn AI</span>
          {" / "}<b style={{ color: "var(--ink)" }}>{M.name}</b>
        </div>

        {/* model header */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 8 }}>
          <div className="glyph" style={{ width: 66, height: 66, fontSize: 26, borderRadius: 14 }}><MarkGlyph mark={M.mark} /></div>
          <div>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1 }}>{M.name}</div>
            <div className="label" style={{ marginTop: 6 }}>{M.by} · {M.version}</div>
          </div>
        </div>
        <div style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.55, margin: "14px 0 34px", maxWidth: "62ch" }}>
          {M.tagline} Choose how you want to explore it.
        </div>

        {/* two choice cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          <Card
            accent="radial-gradient(circle at 50% 35%, rgba(124,58,237,.25) 0, transparent 65%), repeating-linear-gradient(135deg,#ece6f7 0 16px,#e3daf2 16px 32px)"
            kicker="Hands-on lessons"
            title="Video lessons"
            desc={`Learn ${M.name} step by step — short videos, real prompts to try, and notes that stick. From the basics to pro workflows.`}
            foot={`${lessonCount} lessons`}
            onClick={() => { window.location.href = "Model Page Wireframes.html?model=" + slug; }}
            art={<div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.9)", display: "grid", placeItems: "center", boxShadow: "0 10px 26px rgba(76,29,149,.25)" }}>
              <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "11px 0 11px 18px", borderColor: "transparent transparent transparent #7c3aed", marginLeft: 4 }} />
            </div>}
          />
          <Card
            accent="radial-gradient(circle at 50% 40%, rgba(179,157,219,.45) 0, transparent 65%), repeating-linear-gradient(135deg,#f1ecfa 0 16px,#e6dcf4 16px 32px)"
            kicker="Better together"
            title="How it connects"
            desc={`See how ${M.name} pairs with other models — which hands off to which, and the workflows that chain them for research, code, and design.`}
            foot={`${pairCount} pairings`}
            onClick={() => { window.location.href = "Model Pairing Page Wireframes.html?model=" + slug; }}
            art={<svg width="120" height="80" viewBox="0 0 120 80">
              <line x1="60" y1="40" x2="22" y2="20" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="60" y1="40" x2="100" y2="22" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="60" y1="40" x2="34" y2="66" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="60" y1="40" x2="92" y2="64" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="22" cy="20" r="7" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
              <circle cx="100" cy="22" r="7" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
              <circle cx="34" cy="66" r="7" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
              <circle cx="92" cy="64" r="7" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
              <circle cx="60" cy="40" r="12" fill="#7c3aed" />
            </svg>}
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ModelHub />);
