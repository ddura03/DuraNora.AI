// Model Pairing page — the "Hub Diagram" you land on after clicking a node
// in the AI Ecosystem spider web. Reads ?model=<slug>.

function PairingPage() {
  const slug = (new URLSearchParams(window.location.search).get("model") || "claude").toLowerCase();
  const MODEL = ECO_MODELS.find(m => m.name.toLowerCase() === slug) || ECO_MODELS.find(m => m.name === "Claude");

  // Build this model's pairings from ECO_LINKS.
  const pairs = ECO_LINKS
    .filter(l => l.a === MODEL.name || l.b === MODEL.name)
    .map(l => {
      const partnerName = l.a === MODEL.name ? l.b : l.a;
      const partner = ECO_MODELS.find(m => m.name === partnerName);
      // direction: as stored a → b
      const selfFirst = l.a === MODEL.name;
      const parts = l.why.split("→").map(s => s.trim());
      // steps in stored order a → b
      const ordered = selfFirst ? [MODEL, partner] : [partner, MODEL];
      const steps = ordered.map((m, i) => [m.name, parts[i] || ""]);
      return { partner, why: l.why, selfFirst, steps };
    });

  const [sel, setSel] = React.useState(0);
  const p = pairs[sel] || pairs[0];

  // hub geometry
  const cx = 240, cy = 235, R = 165;
  const angleFor = (i) => (-90 + i * (360 / pairs.length)) * Math.PI / 180;

  return (
    <div className="wf">
      <EcoNav />
      <div className="sec" style={{ padding: "30px max(40px,4vw) 60px" }}>
        <div className="crumb back-web" style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--violet-deep)", fontWeight: 700, marginBottom: 22, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 }}
          onClick={() => { window.location.href = "AI Ecosystem Page Wireframes.html"; }}>
          <span className="bw-arrow" style={{ fontSize: 16 }}>←</span> Back to AI spider web
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "520px 1fr", gap: 48, alignItems: "center", minHeight: "calc(100vh - 220px)" }}>
          {/* LEFT — hub diagram */}
          <div style={{ position: "relative", height: 480 }}>
            <svg width="480" height="480" style={{ position: "absolute", inset: 0 }}>
              {pairs.map((pp, i) => {
                const a = angleFor(i);
                const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
                const on = i === sel;
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y}
                  stroke={on ? "#7c3aed" : "#cdbce8"} strokeWidth={on ? 2.5 : 1.2}
                  strokeDasharray={on ? "0" : "4 4"} />;
              })}
            </svg>
            {/* center node */}
            <div className="glyph" style={{ position: "absolute", left: cx - 42, top: cy - 42, width: 84, height: 84, fontSize: 30, background: "#7c3aed", borderColor: "#7c3aed" }}>
              <MarkGlyph mark={MODEL.mark} />
            </div>
            {/* partner nodes */}
            {pairs.map((pp, i) => {
              const a = angleFor(i);
              const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
              const on = i === sel;
              return (
                <button key={i} onClick={() => setSel(i)} title={pp.partner.name}
                  onMouseEnter={(e) => { if (!on) { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(124,58,237,.14)"; e.currentTarget.style.transform = "scale(1.06)"; } }}
                  onMouseLeave={(e) => { if (!on) { e.currentTarget.style.borderColor = "#d9cff0"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "scale(1)"; } }}
                  style={{
                    position: "absolute", left: x - 33, top: y - 33, width: 66, height: 66, borderRadius: 15,
                    border: `1.5px solid ${on ? "#7c3aed" : "#d9cff0"}`, background: on ? "#ece6f7" : "#fff",
                    cursor: "pointer", display: "grid", placeItems: "center", overflow: "hidden",
                    boxShadow: on ? "0 6px 18px rgba(124,58,237,.25)" : "none", transition: "all .15s ease"
                  }}>
                  <span style={{ width: 38, height: 38, display: "grid", placeItems: "center" }}><MarkGlyph mark={pp.partner.mark} /></span>
                </button>
              );
            })}
          </div>

          {/* RIGHT — detail */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="glyph" style={{ width: 56, height: 56, fontSize: 22 }}><MarkGlyph mark={MODEL.mark} /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 25, letterSpacing: "-.02em" }}>{MODEL.name}</div>
                <div className="label">{MODEL.company} · {MODEL.role}</div>
              </div>
            </div>
            <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, margin: "14px 0 20px", maxWidth: "60ch" }}>
              Pick a connected model to see how {MODEL.name} pairs with it — which hands off to which, and why.
            </div>

            {/* pairing card */}
            <div style={{ border: "1.5px solid var(--violet-deep)", borderRadius: 14, padding: 20, background: "#fff", boxShadow: "0 14px 30px rgba(124,58,237,.12)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--mono)", fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
                <span style={{ width: 26, height: 26, display: "grid", placeItems: "center" }}><MarkGlyph mark={p.steps[0][0] === MODEL.name ? MODEL.mark : p.partner.mark } /></span>
                {p.steps[0][0]} <span style={{ color: "var(--violet-deep)" }}>→</span> {p.steps[1][0]}
              </div>
              <div className="label" style={{ color: "var(--violet-deep)", marginBottom: 8 }}>The flow</div>
              <div style={{ display: "flex", alignItems: "stretch", gap: 8, flexWrap: "wrap" }}>
                {p.steps.map((s, i) => {
                  const m = ECO_MODELS.find(x => x.name === s[0]);
                  return (
                    <React.Fragment key={i}>
                      <div style={{ flex: 1, minWidth: 160, background: "var(--paper-2)", border: "1px solid var(--line)", borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 22, height: 22, display: "grid", placeItems: "center" }}><MarkGlyph mark={m.mark} /></span>
                          <span style={{ fontWeight: 700, fontSize: 13.5 }}>{s[0]}</span>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 6 }}>{s[1] || "—"}</div>
                      </div>
                      {i < p.steps.length - 1 && <div style={{ display: "grid", placeItems: "center", color: "var(--violet-deep)", fontWeight: 700 }}>→</div>}
                    </React.Fragment>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: "1px dashed var(--line)" }}>
                <span className="label">Pairing · {p.why}</span>
                <span className="watch-link" style={{ fontFamily: "var(--mono)", fontSize: 12.5, fontWeight: 700, color: "var(--violet-deep)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}
                  onClick={() => { window.location.href = "Pairing Lesson Page Wireframes.html?a=" + p.steps[0][0].toLowerCase() + "&b=" + p.steps[1][0].toLowerCase() + "&from=" + MODEL.name.toLowerCase(); }}>
                  Watch the {p.steps[0][0]} + {p.steps[1][0]} workflow <span className="wl-arrow">→</span>
                </span>
              </div>
            </div>

            <div className="label" style={{ marginTop: 14 }}>Click another node in the hub to explore a different pairing.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PairingPage />);
