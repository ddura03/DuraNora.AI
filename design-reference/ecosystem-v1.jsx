// Shared nav for the ecosystem wireframes (matches homepage)
function EcoNav() {
  return (
    <div className="navstrip">
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => {window.location.href = "DuraNoia Wireframes.html";}}>
        <img src="duranoia-icon.svg" alt="" width="30" height="30" />
        <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: "-.01em" }}>
          <span style={{ color: "var(--ink)" }}>Dura</span><span style={{ color: "var(--violet-deep)" }}>Noia</span>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet-dark)", letterSpacing: ".18em", marginLeft: 8, fontWeight: 600 }}>AI EDUCATION PLATFORM</span>
      </div>
      <div className="links">
        <span className="nav-link" onClick={() => {window.location.href = "Learn AI Page Wireframes.html";}}>Learn AI</span>
        <span className="nav-link" onClick={() => {window.location.href = "AI Ecosystem Page Wireframes.html";}}>AI Ecosystem</span>
        <span className="nav-link" onClick={() => {window.location.href = "AI Showcase Page Wireframes.html";}}>AI Showcase</span>
        <span className="nav-link" onClick={() => {window.location.href = "News Page Wireframes.html";}}>News</span>
        <span className="nav-link" onClick={() => {window.location.href = "About Page Wireframes.html";}}>About</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill nav-pill ghost" onClick={() => {window.location.href = "Sign In Page Wireframes.html";}} style={{ background: "transparent", color: "var(--ink)", borderColor: "var(--violet-dark)", fontWeight: 600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => {window.location.href = "Create Account Page Wireframes.html";}} style={{ background: "var(--violet-deep)", borderColor: "var(--violet-deep)", color: "#fff", fontWeight: 600 }}>Get started →</span>
      </div>
    </div>);

}
window.EcoNav = EcoNav;

// V1 — Spider Web (radial interactive network)
function EcoV1() {
  const [hover, setHover] = React.useState(null);
  const sizeW = 640, sizeH = 600, cx = 320, cy = 300, R = 210;

  // positions around a circle
  const pos = {};
  ECO_MODELS.forEach((m, i) => {
    const a = i / ECO_MODELS.length * Math.PI * 2 - Math.PI / 2;
    pos[m.name] = { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, a };
  });

  const linksFor = (name) => ECO_LINKS.filter((l) => l.a === name || l.b === name);
  const isLit = (l) => hover && (l.a === hover || l.b === hover);
  const nodeLit = (name) => !hover || name === hover || linksFor(hover).some((l) => l.a === name || l.b === name);

  return (
    <div className="wf">
      <EcoNav />

      {/* HERO — matches homepage: visual left, headline right, full height */}
      <div style={{
        position: "relative", overflow: "hidden",
        minHeight: "calc(100vh - 74px)",
        display: "grid", gridTemplateColumns: "1.05fr .95fr", alignItems: "center",
        gap: 30, padding: "30px max(40px, 4vw)",
        background: `
          radial-gradient(circle at 22% 35%, rgba(124,58,237,.15) 0, transparent 55%),
          radial-gradient(circle at 78% 75%, rgba(179,157,219,.33) 0, transparent 55%),
          radial-gradient(circle at 50% 110%, rgba(124,58,237,.10) 0, transparent 60%),
          repeating-linear-gradient(135deg, #ece6f7 0 18px, #e8e2f3 18px 36px)
        `, opacity: "1", fontWeight: "400"
      }}>
        {/* faint scan lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg, rgba(76,29,149,.025) 0 2px, transparent 2px 4px)" }} />

        {/* LEFT — WEB */}
        <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
          <svg viewBox={`0 0 ${sizeW} ${sizeH}`} style={{ width: "100%", maxWidth: sizeW, height: "auto" }}>
            {/* links */}
            {ECO_LINKS.map((l, i) => {
              const p1 = pos[l.a],p2 = pos[l.b];
              const lit = isLit(l);
              const dim = hover && !lit;
              return (
                <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={lit ? "#7c3aed" : "#a88fd8"}
                strokeWidth={lit ? 2.2 : 1.3}
                strokeOpacity={dim ? 0.18 : lit ? 1 : 0.7}
                strokeDasharray={lit ? "0" : "5 5"} />);

            })}
            {/* center hub */}
            <circle cx={cx} cy={cy} r="30" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="#4c1d95">YOUR</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="#4c1d95">GOAL</text>
            {/* nodes */}
            {ECO_MODELS.map((m) => {
              const p = pos[m.name];
              const lit = nodeLit(m.name);
              const lr = R + 40;
              const lx = cx + Math.cos(p.a) * lr;
              const ly = cy + Math.sin(p.a) * lr;
              const anchor = Math.cos(p.a) > 0.3 ? "start" : Math.cos(p.a) < -0.3 ? "end" : "middle";
              const ldy = Math.sin(p.a) > 0.3 ? 12 : Math.sin(p.a) < -0.3 ? -6 : 4;
              return (
                <g key={m.name} style={{ cursor: "pointer" }}
                onClick={() => { window.location.href = "Model Pairing Page Wireframes.html?model=" + m.name.toLowerCase(); }}
                onMouseEnter={() => setHover(m.name)} onMouseLeave={() => setHover(null)}
                opacity={lit ? 1 : 0.3}>
                  <circle cx={p.x} cy={p.y} r="26" fill={m.name === hover ? "#7c3aed" : "#fff"} stroke="#7c3aed" strokeWidth="1.5" />
                  {LOGO_SRC[m.mark]
                    ? <image href={LOGO_SRC[m.mark]} x={p.x - 15} y={p.y - 15} width="30" height="30" preserveAspectRatio="xMidYMid meet" />
                    : <text x={p.x} y={p.y + 1} textAnchor="middle" fontFamily="var(--mono)" fontSize="15" fontWeight="800" fill={m.name === hover ? "#fff" : "#4c1d95"}>{m.mark}</text>}
                  <text x={lx} y={ly + ldy} textAnchor={anchor} fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="#1a1325">{m.name}</text>
                </g>);

            })}
          </svg>
        </div>

        {/* RIGHT — headline + hover panel */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 54, fontWeight: 800, letterSpacing: "-.025em", lineHeight: 1.0, color: "var(--violet-dark)" }}>
              The AI ecosystem,<br /><span style={{ fontStyle: "italic", color: "var(--violet-deep)" }}>woven together.</span>
            </h1>
            <div style={{ fontSize: 16, color: "var(--ink)", maxWidth: "46ch", lineHeight: 1.5, marginTop: 14 }}>
              No model does everything. Hover any node to see who it hands off to — and what each pairing is good for.
            </div>
          </div>

          {/* hover panel */}
          {hover ? (() => {
            const m = ECO_MODELS.find((x) => x.name === hover);
            const ls = linksFor(hover);
            return (
              <div style={{ border: "1.5px solid var(--violet-deep)", borderRadius: 12, padding: 18, background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)", boxShadow: "0 14px 30px rgba(124,58,237,.16)", maxWidth: 440 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div className="glyph" style={{ width: 38, height: 38, fontSize: 18 }}><MarkGlyph mark={m.mark} /></div>
                  <div><div style={{ fontWeight: 800, fontSize: 16 }}>{m.name}</div><div className="label">{m.role}</div></div>
                </div>
                <div className="label" style={{ marginTop: 10, color: "var(--violet-deep)" }}>Hands off to</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                  {ls.map((l, i) => {
                    const other = l.a === hover ? l.b : l.a;
                    return (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--line)", borderRadius: 8, padding: "8px 10px", background: "var(--paper)" }}>
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{other}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-2)" }}>{l.why}</span>
                      </div>);

                  })}
                </div>
              </div>);

          })() :
          <div style={{ border: "1.25px dashed var(--violet-soft)", borderRadius: 12, padding: 20, background: "rgba(255,255,255,.55)", maxWidth: 440 }}>
              <div className="annot">← hover a model to light up the web</div>
              <div style={{ marginTop: 12, fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                Choose a model you already use, and see how it pairs with others to automate work and make your day easier.
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}
window.EcoV1 = EcoV1;

// Workflow Recipes section (lives below the spider web)
function EcoRecipes() {
  const markFor = (name) => (ECO_MODELS.find((m) => m.name === name) || {}).mark || "?";
  const g = (mark) => <span className="glyph g" style={{ width: 28, height: 28, fontSize: 13 }}><MarkGlyph mark={mark} /></span>;
  return (
    <div className="sec" style={{ background: "var(--paper)" }}>
      <h2 style={{ fontSize: 28, marginBottom: 6 }}>Don't pick one AI. <span style={{ color: "var(--violet-deep)", fontStyle: "italic" }}>Chain them.</span></h2>
      <div style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: "62ch", lineHeight: 1.5, marginBottom: 24 }}>
        Each recipe is a tested hand-off — which model to use at each step, and why. Copy the flow, swap models as you like.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {ECO_RECIPES.map((r, i) =>
        <div className="recipe" key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
              <div>
                <div className="rtitle">{r.title}</div>
                <div className="rgoal">{r.goal}</div>
              </div>
              <span className="label" style={{ whiteSpace: "nowrap" }}>{r.steps.length} steps</span>
            </div>
            <div className="chain">
              {r.steps.map((s, j) =>
            <React.Fragment key={j}>
                  <div className="step">
                    <div className="sm">{g(markFor(s.m))}<span className="nm">{s.m}</span></div>
                    <div className="sd">{s.do}</div>
                  </div>
                  {j < r.steps.length - 1 ? <div className="arrow">→</div> : null}
                </React.Fragment>
            )}
            </div>
            <div className="rtags">
              {r.tags.map((t) => <span className="rtag" key={t}>{t}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>);

}
window.EcoRecipes = EcoRecipes;