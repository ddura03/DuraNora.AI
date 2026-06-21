// Forgot password page — request a reset link, then a success confirmation state.

function NeuralBackground() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let raf;
    const COLOR_DEEP = "#7c3aed";

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
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.7
      }));
    }
    let nodes = buildNodes();
    let maxDist = Math.min(w, h) * 0.14;

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.4;
            ctx.strokeStyle = `rgba(124,58,237,${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = COLOR_DEEP; ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const sized = resize(); ctx = sized.ctx; w = sized.w; h = sized.h;
        nodes = buildNodes(); maxDist = Math.min(w, h) * 0.14;
      }, 120);
    }
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", pointerEvents:"none" }} />;
}

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);
const BackArrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

function Forgot() {
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  return (
    <div className="auth-stage">
      <NeuralBackground />
      <div className="auth-scan" />

      {/* Brand top-left → home */}
      <a className="auth-brand" href="DuraNoia Wireframes.html">
        <img src="duranoia-icon.svg" alt="" width="34" height="34" />
        <span className="wm"><span className="d">Dura</span><span className="n">Noia</span></span>
        <span className="tag">AI EDUCATION PLATFORM</span>
      </a>

      {/* Card */}
      {!sent ? (
        <form className="card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h1>Reset password</h1>
          <div className="sub">Enter your email and we'll send you a link to get back in.</div>

          <div className="field">
            <input type="email" placeholder="Email address" autoComplete="email"
                   value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="ic"><MailIcon /></span>
          </div>

          <button className="btn" type="submit" style={{ marginTop: 6 }}>Send reset link <span className="ar">→</span></button>

          <div className="alt">
            <a className="link" href="Sign In Page Wireframes.html" style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
              <BackArrow /> Back to sign in
            </a>
          </div>
        </form>
      ) : (
        <div className="card" style={{ textAlign:"center" }}>
          {/* Success check */}
          <div style={{
            width:64, height:64, margin:"4px auto 18px", borderRadius:"50%",
            background:"rgba(124,58,237,.12)", border:"1.5px solid rgba(124,58,237,.35)",
            display:"grid", placeItems:"center"
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <h1 style={{ fontSize:28 }}>Check your inbox</h1>
          <div className="sub" style={{ marginBottom:24 }}>
            If an account exists for <b style={{ color:"var(--violet-dark)" }}>{email || "your email"}</b>, a reset link is on its way. It expires in 30 minutes.
          </div>

          <a className="btn" href="Sign In Page Wireframes.html" style={{ textDecoration:"none" }}>
            Back to sign in <span className="ar">→</span>
          </a>

          <div className="alt">
            Didn't get it? <a className="link" onClick={() => setSent(false)} style={{ cursor:"pointer" }}>Try another email</a>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Forgot />);
