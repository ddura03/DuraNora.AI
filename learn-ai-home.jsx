// Learn AI = signed-in home. Merges the dashboard (resume + your progress)
// with the full model directory (browse & learn all 10).
function LearnAiHome() {
  const models = modelsWithProgress();
  const started = models.filter(m => m.started);
  const RESUME = getResume();
  const resumeModel = models.find(m => m.name === RESUME.model) || models[0];

  const CATS = ["All", "Chat", "Code", "Image", "Search", "Foundation"];
  const [cat, setCat] = React.useState("All");
  const list = cat === "All" ? models : models.filter(m => m.category === cat);

  return (
    <div className="wf">
      <AppBar active="Learn AI" />
      <div className="body">
        <h1 className="hello">Welcome back, {USER.name}.</h1>
        <p className="sub">You're on a {USER.streak}-day streak. Pick up where you left off — or start a new model below.</p>

        {/* RESUME HERO */}
        <div className="panel" style={{ padding: 0, overflow: "hidden", display: "grid", gridTemplateColumns: "1.4fr .9fr", border: "1.5px solid var(--violet-deep)" }}>
          <div style={{ padding: "30px 32px" }}>
            <div className="label" style={{ color: "var(--violet-deep)" }}>◷ Continue learning</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "16px 0 14px" }}>
              <div className="glyph" style={{ width: 52, height: 52 }}><MarkGlyph mark={resumeModel.mark} /></div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em" }}>{RESUME.model}</div>
                <div className="label">Lesson {RESUME.lessonNo} · {RESUME.level} · {RESUME.dur}</div>
              </div>
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-.01em", marginBottom: 16 }}>{RESUME.lessonTitle}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div className="bar" style={{ flex: 1 }}><span style={{ width: resumeModel.pct + "%" }} /></div>
              <span className="label">{resumeModel.done}/{resumeModel.total}</span>
            </div>
            <button className="btn" onClick={() => goTo(RESUME.model)}>▶ Resume lesson <span className="ar">→</span></button>
          </div>
          <div style={{ position: "relative", display: "grid", placeItems: "center", background: "radial-gradient(circle at 60% 30%, rgba(124,58,237,.22) 0, transparent 60%), repeating-linear-gradient(135deg,#ece6f7 0 16px,#e3daf2 16px 32px)" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,.85)", display: "grid", placeItems: "center", boxShadow: "0 10px 26px rgba(76,29,149,.25)" }}>
              <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "11px 0 11px 18px", borderColor: "transparent transparent transparent #7c3aed", marginLeft: 4 }} />
            </div>
          </div>
        </div>

        {/* YOUR MODELS */}
        <div className="sh"><h2>Your models</h2><span className="label">{started.length} in progress</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {started.map(m => (
            <div className="mcard" key={m.name} onClick={() => goTo(m.name)}>
              <div className="h">
                <div className="glyph" style={{ width: 40, height: 40 }}><MarkGlyph mark={m.mark} /></div>
                <div><div className="nm">{m.name}</div><div className="co">{m.company}</div></div>
              </div>
              <div className="bar"><span style={{ width: m.pct + "%" }} /></div>
              <div className="meta">
                {m.finished ? <span className="done">✓ Completed</span> : <span>{m.done}/{m.total} lessons</span>}
                <span>{m.pct}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* ALL MODELS DIRECTORY */}
        <div className="sh" style={{ marginTop: 38 }}>
          <h2>Browse all models</h2>
          <span className="label">{list.length} model{list.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="chips" style={{ margin: "0 0 18px" }}>
          {CATS.map(c => (
            <span key={c} className={"chip" + (c === cat ? " is-on" : "")} onClick={() => setCat(c)}>{c}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {list.map(m => (
            <div className="mcard" key={m.name} onClick={() => goTo(m.name)}>
              <div className="h">
                <div className="glyph" style={{ width: 40, height: 40 }}><MarkGlyph mark={m.mark} /></div>
                <div><div className="nm">{m.name}</div><div className="co">{m.company}</div></div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.45, flex: 1 }}>{m.desc}</div>
              {m.started ? (
                <>
                  <div className="bar"><span style={{ width: m.pct + "%" }} /></div>
                  <div className="meta">
                    {m.finished ? <span className="done">✓ Completed</span> : <span>{m.done}/{m.total} lessons</span>}
                    <span>{m.pct}%</span>
                  </div>
                </>
              ) : (
                <div className="meta"><span>{m.total} lessons</span><span className="start">Start →</span></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LearnAiHome />);
