// V2 — HUD Overlay (light, brand-aligned)
// Brand palette: #7c3aed deep violet · #b39ddb soft violet · #4c1d95 dark violet
// Light, eye-friendly background. Logo uses the duranoia-icon.svg + "Dura"+"Noia" wordmark.
function WireframeV2({ palette, headline, subhead }) {
  // Refs to measure the picker card and mirror its height on the right text block
  const cardRef = React.useRef(null);
  const [cardH, setCardH] = React.useState(420);

  React.useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCardH(entry.contentRect.height);
      }
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  // Default to brand palette (light)
  const P = palette || {
    bg: "#f6f3fb", // slight lavender paper
    bgDeep: "#ece6f7", // hero alt
    ink: "#1a1325", // near-black with violet undertone
    ink2: "#5a4e75", // body / subdued
    muted: "#9087a8",
    accent: "#7c3aed", // deep violet — primary
    accent2: "#4c1d95", // dark violet — strong elements
    soft: "#b39ddb", // soft violet — rings / decoration
    line: "#d9cff0"
  };
  const H1 = headline || "The AI knows you.\nNow know it back.";
  const sub = subhead || "Hands-on lessons for the models shaping how we work. Pick one to begin.";

  return (
    <div className="wf">
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <BrandNav P={P} />
        <div className="wf-body" style={{ background: P.bg, flex: 1, display: "flex", flexDirection: "column" }}>
          {/* HERO */}
          <div className="v2-hero" style={{
            background: P.bgDeep,
            flex: 1,
            minHeight: 560,
            borderColor: P.line
          }}>
          {/* Video stand-in — soft violet field, light */}
          <div style={{
              position: "absolute", inset: 0,
              background: `
              radial-gradient(circle at 22% 35%, ${P.accent}26 0, transparent 55%),
              radial-gradient(circle at 78% 75%, ${P.soft}55 0, transparent 55%),
              radial-gradient(circle at 50% 110%, ${P.accent}1a 0, transparent 60%),
              repeating-linear-gradient(135deg, ${P.bgDeep} 0 18px, ${shift(P.bgDeep, -4)} 18px 36px)
            `, opacity: "1"
            }} />
          {/* faint scan lines */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
              background: "repeating-linear-gradient(0deg, rgba(76,29,149,.025) 0 2px, transparent 2px 4px)" }} />

          {/* Neural Constellation animated background — canvas, 4K-crisp, seamless loop */}
          <NeuralBackground />

          <Crosshair t={20} l={20} color={P.accent2} />
          <Crosshair t={20} r={20} color={P.accent2} />
          <Crosshair b={20} r={20} color={P.accent2} />


          {/* LEFT: AI grid — anchored to content edge, not viewport edge */}
          <div style={{ position: "absolute", left: "max(54px, calc(50% - 660px))", top: 88, width: 500 }}>
            <div ref={cardRef} style={{
                background: `${P.bg}f2`,
                border: `1px solid ${P.accent}55`,
                borderRadius: 12,
                padding: 22,
                backdropFilter: "blur(8px)",
                boxShadow: `0 0 0 1px ${P.accent}1a inset, 0 30px 60px ${P.accent2}26, 0 0 60px ${P.accent}22`
              }}>
              <div style={{ marginBottom: 16, fontFamily: "var(--mono)", fontSize: 13.5, color: P.accent, letterSpacing: ".14em", fontWeight: 700 }}>
                ◇ SELECT A MODEL
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
                {AI_LIST.map((ai, i) =>
                  <button key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    border: `1px solid ${P.line}`,
                    background: "#ffffff",
                    padding: "14px 16px", borderRadius: 7, cursor: "pointer",
                    color: P.ink, fontFamily: "var(--mono)", fontSize: 14,
                    textAlign: "left",
                    transition: "all .15s ease"
                  }}
                  onClick={() => {
                    window.location.href = "Model Page Wireframes.html?model=" + ai.name.toLowerCase();
                  }}
                  onMouseEnter={(e) => {e.currentTarget.style.borderColor = P.accent;e.currentTarget.style.boxShadow = `0 0 0 1px ${P.accent}33`;}}
                  onMouseLeave={(e) => {e.currentTarget.style.borderColor = P.line;e.currentTarget.style.boxShadow = "none";}}>
                    
                    <span style={{
                      width: 38, height: 38, border: `1px solid ${P.line}`, borderRadius: 6,
                      display: "grid", placeItems: "center", background: `${P.soft}33`,
                      fontWeight: 700, fontSize: 16, color: P.accent2,
                      flex: "0 0 38px"
                    }}><MarkGlyph mark={ai.mark} /></span>
                    <span>
                      <div style={{ fontWeight: 600, color: P.ink }}>{ai.name}</div>
                      <div style={{ fontSize: 11, color: P.muted, letterSpacing: ".04em", marginTop: 2 }}>{ai.sub}</div>
                    </span>
                  </button>
                  )}
              </div>
            </div>
          </div>

          {/* RIGHT: H1 + subhead in invisible card matching left card height */}
          <div style={{
              position: "absolute", right: "max(54px, calc(50% - 660px))", top: 88, maxWidth: 660, color: P.ink,
              textAlign: "right", height: cardH,
              display: "flex", flexDirection: "column", justifyContent: "space-between"
            }}>
            <div style={{
                fontFamily: "var(--sans)",
                fontWeight: 800,
                fontSize: 70,
                letterSpacing: "-.028em",
                lineHeight: 1.02,
                color: P.accent2
              }}>
              {H1.split("\n").map((line, i, arr) =>
                <div
                  key={i}
                  style={{
                    color: i === arr.length - 1 ? P.accent : P.accent2,
                    fontStyle: i === arr.length - 1 ? "italic" : "normal",
                    fontWeight: i === arr.length - 1 ? 700 : 800
                  }}>
                  
                  {line}
                </div>
                )}
            </div>
            <div style={{
                marginLeft: "auto",
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12
              }}>
              {/* thin violet rule above for an editorial feel */}
              <div style={{ width: 72, height: 2, background: `linear-gradient(90deg, ${P.soft} 0%, ${P.accent} 100%)`, borderRadius: 2 }}></div>

              <div style={{
                  fontFamily: "var(--sans)", fontSize: 22, fontWeight: 500,
                  color: P.ink, lineHeight: 1.45, whiteSpace: "nowrap"
                }}>
                Hands-on lessons for the models shaping how we work.
              </div>

              <div style={{
                  fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600,
                  color: P.accent, fontStyle: "italic", lineHeight: 1.4,
                  display: "inline-flex", alignItems: "center", gap: 10
                }}>
                <span style={{ fontFamily: "var(--mono)", fontStyle: "normal", color: P.accent, fontWeight: 700 }}>←</span>
                Pick one to begin.
              </div>
            </div>
          </div>
        </div>

        {/* Features + Newswire — flow directly on the page, below the 100vh hero */}
      </div>
      </div>
      <FeatureSection />
      <SectionDivider />
      <NewsSection />
      <BrandFooter P={P} />
    </div>);

}

// Brand nav strip with logo SVG + wordmark
function BrandNav({ P }) {
  return (
    <div className="navstrip" style={{ background: P.bg, color: P.ink, borderColor: P.line }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <img src="duranoia-icon.svg" alt="" width="30" height="30" />
        <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: "-.01em" }}>
          <span style={{ color: P.ink }}>Dura</span><span style={{ color: P.accent }}>Noia</span>
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: P.accent2, letterSpacing: ".18em", marginLeft: 8, fontWeight: 600 }}>
          AI EDUCATION PLATFORM
        </span>
      </div>
      <div className="links" style={{ color: P.ink, fontWeight: 600, gap: 38 }}>
        <span className="nav-link" onClick={() => {window.location.href = "Learn AI Page Wireframes.html";}} style={{ cursor: "pointer" }}>Learn AI</span>
        <span className="nav-link" onClick={() => {window.location.href = "AI Ecosystem Page Wireframes.html";}} style={{ cursor: "pointer" }}>AI Ecosystem</span>
        <span className="nav-link" onClick={() => {window.location.href = "AI Showcase Page Wireframes.html";}} style={{ cursor: "pointer" }}>AI Showcase</span>
        <span className="nav-link" onClick={() => {window.location.href = "News Page Wireframes.html";}} style={{ cursor: "pointer" }}>News</span>
        <span className="nav-link" onClick={() => {window.location.href = "About Page Wireframes.html";}} style={{ cursor: "pointer" }}>About</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill nav-pill ghost" onClick={() => {window.location.href = "Sign In Page Wireframes.html";}} style={{ background: "transparent", color: P.ink, borderColor: P.accent2, fontWeight: 600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => {window.location.href = "Create Account Page Wireframes.html";}} style={{ background: P.accent, borderColor: P.accent, color: "#fff", fontWeight: 600 }}>Get started →</span>
      </div>
    </div>);

}

// Brand footer (light)
function BrandFooter({ P }) {
  const linkUl = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9, fontSize: 13.5 };
  return (
    <div className="ftr" style={{
      background: "#ece6f7",
      color: P.ink,
      borderRadius: 0,
      border: 0,
      borderTop: `1px solid ${P.line}`,
      padding: "44px max(60px, 6vw) 26px"
    }}>
      <div className="ftr-grid">
        <div className="ftr-col ftr-brand">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: -4 }}>
            <img src="duranoia-icon.svg" alt="" width="30" height="30" />
            <div style={{ fontFamily: "var(--sans)", fontSize: 19, fontWeight: 800, letterSpacing: "-.01em", lineHeight: 1 }}>
              <span style={{ color: P.ink }}>Dura</span><span style={{ color: P.accent }}>Noia</span>
            </div>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: P.accent2, letterSpacing: ".18em", fontWeight: 600 }}>
            AI EDUCATION PLATFORM
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.4, maxWidth: "30ch", marginTop: 6 }}>
            <div style={{ color: P.ink, fontWeight: 600 }}>The AI knows you.</div>
            <div style={{ color: P.accent, fontWeight: 600, fontStyle: "italic" }}>Now know it back.</div>
          </div>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: P.accent2, fontWeight: 700 }}>Learn</h6>
          <ul style={linkUl}>
            <li><span className="nav-link">All models</span></li>
            <li><span className="nav-link">Prompt library</span></li>
            <li><span className="nav-link">Comparisons</span></li>
            <li><span className="nav-link">Glossary</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: P.accent2, fontWeight: 700 }}>Ecosystem</h6>
          <ul style={linkUl}>
            <li><span className="nav-link">Workflows</span></li>
            <li><span className="nav-link">Recipes</span></li>
            <li><span className="nav-link">Integrations</span></li>
            <li><span className="nav-link">Cost calculator</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: P.accent2, fontWeight: 700 }}>Company</h6>
          <ul style={linkUl}>
            <li><span className="nav-link">About</span></li>
            <li><span className="nav-link">Newswire</span></li>
            <li><span className="nav-link">Careers</span></li>
            <li><span className="nav-link">Contact</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: P.accent2, fontWeight: 700 }}>Newsletter</h6>
          <div style={{ fontSize: 12.5, color: P.ink2, marginBottom: 8 }}>One short brief, weekly. No hype.</div>
          <div className="ftr-news">
            <input placeholder="you@domain.com" style={{ borderColor: P.line, color: P.ink, background: "#fff" }} />
            <button className="join-btn" style={{ background: P.accent, borderColor: P.accent, color: "#fff" }}>Join <span className="arr">→</span></button>
          </div>
        </div>
      </div>
      <div className="ftr-bot" style={{ borderTopColor: P.line, color: P.ink2 }}>
        <span>© 2026 DuraNoia.AI</span>
        <span>v0.wireframe · all marks property of their owners</span>
      </div>
    </div>);

}

// Tiny crosshair tick
function Crosshair({ t, b, l, r, color }) {
  const pos = {};
  if (t != null) pos.top = t;
  if (b != null) pos.bottom = b;
  if (l != null) pos.left = l;
  if (r != null) pos.right = r;
  return (
    <div style={{ position: "absolute", ...pos, width: 14, height: 14, opacity: .7 }}>
      <div style={{ position: "absolute", inset: 0,
        borderTop: t != null ? `1.5px solid ${color}` : "",
        borderBottom: b != null ? `1.5px solid ${color}` : "",
        borderLeft: l != null ? `1.5px solid ${color}` : "",
        borderRight: r != null ? `1.5px solid ${color}` : ""
      }}></div>
    </div>);

}

function shift(hex, delta) {
  const n = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(n.slice(0, 2), 16) + delta));
  const g = Math.max(0, Math.min(255, parseInt(n.slice(2, 4), 16) + delta));
  const b = Math.max(0, Math.min(255, parseInt(n.slice(4, 6), 16) + delta));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

// ───────── Orbital Network animated background ─────────
function OrbitalBackground() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf;

    const COLORS = { paper: "#ece6f7", deep: "#7c3aed", soft: "#b39ddb", dark: "#4c1d95" };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: rect.width, h: rect.height };
    }

    let { ctx, w, h } = resize();

    // Position the orbital system slightly left of horizontal center,
    // so it sits between the AI grid (bottom-left) and the headline (right).
    function centers() {return { cx: w * 0.45, cy: h * 0.5 };}

    let rings = [];
    function buildRings() {
      // Sized relative to viewport so it scales with the hero
      rings = [
      { rx: w * 0.30, ry: h * 0.10, rot: 0, speed: 0.00015, planets: 2, size: 4 },
      { rx: w * 0.22, ry: h * 0.22, rot: -0.5, speed: 0.00022, planets: 3, size: 3.5 },
      { rx: w * 0.42, ry: h * 0.34, rot: 0.4, speed: 0.00010, planets: 1, size: 5 },
      { rx: w * 0.16, ry: h * 0.16, rot: 1.1, speed: 0.00030, planets: 2, size: 3 }];

    }
    buildRings();

    const start = performance.now();

    function frame(now) {
      const t = now - start;
      const { cx, cy } = centers();
      // Transparent clear — let the underlying hero gradients show through
      ctx.clearRect(0, 0, w, h);

      // Rings + orbiting planets
      rings.forEach((r, idx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(r.rot);

        ctx.beginPath();
        ctx.ellipse(0, 0, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.soft + "99";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        for (let i = 0; i < r.planets; i++) {
          const phase = t * r.speed + i / r.planets * Math.PI * 2 + idx;
          const px = Math.cos(phase) * r.rx;
          const py = Math.sin(phase) * r.ry;

          // Halo
          ctx.beginPath();
          ctx.arc(px, py, r.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = COLORS.deep + "22";
          ctx.fill();
          // Body
          ctx.beginPath();
          ctx.arc(px, py, r.size, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? COLORS.deep : COLORS.soft;
          ctx.fill();
        }
        ctx.restore();
      });

      // Central core (echoes the logo)
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.deep + "22";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.deep;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const sized = resize();
        ctx = sized.ctx;w = sized.w;h = sized.h;
        buildRings();
      }, 120);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }} />);


}

window.WireframeV2 = WireframeV2;
window.BrandNav = BrandNav;
window.BrandFooter = BrandFooter;
// ───────── Neural Constellation animated background ─────────
function NeuralBackground() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf;

    const COLOR_DEEP = "#7c3aed";
    const COLOR_DARK = "#4c1d95";

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: rect.width, h: rect.height };
    }

    let { ctx, w, h } = resize();

    function buildNodes() {
      const density = w * h / 9000;
      const N = Math.max(40, Math.round(density));
      return Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7
      }));
    }
    let nodes = buildNodes();
    let maxDist = Math.min(w, h) * 0.14;

    function frame() {
      // Transparent clear so the hero's soft-violet gradients show through
      ctx.clearRect(0, 0, w, h);

      // Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],b = nodes[j];
          const dx = a.x - b.x,dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.45;
            ctx.strokeStyle = `rgba(124,58,237,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        n.x += n.vx;n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = COLOR_DEEP;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const sized = resize();
        ctx = sized.ctx;w = sized.w;h = sized.h;
        nodes = buildNodes();
        maxDist = Math.min(w, h) * 0.14;
      }, 120);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }} />);


}

window.NeuralBackground = NeuralBackground;