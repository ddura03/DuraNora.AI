// Sign in page — glassmorphic card over the homepage neural-nodes background.

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

const UserIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

function SignIn() {
  const [remember, setRemember] = React.useState(true);

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
      <form className="card" onSubmit={(e) => e.preventDefault()}>
        <h1>Welcome back</h1>
        <div className="sub">Sign in to pick up where you left off.</div>

        <div className="field">
          <input type="text" placeholder="Email or username" autoComplete="username" />
          <span className="ic"><UserIcon /></span>
        </div>
        <div className="field">
          <input type="password" placeholder="Password" autoComplete="current-password" />
          <span className="ic"><LockIcon /></span>
        </div>

        <div className="row">
          <label className="remember">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span className="box" />
            Remember me
          </label>
          <a className="link" href="Forgot Password Page Wireframes.html">Forgot password?</a>
        </div>

        <button className="btn" type="submit" onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>Sign in <span className="ar">→</span></button>

        <div className="div">OR</div>
        <div className="sso">
          <button type="button">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 0 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.4 14.7 1.5 12 1.5a10.5 10.5 0 0 0 0 21c6.1 0 10.1-4.3 10.1-10.3 0-.7-.1-1.2-.2-1.7H12z"/></svg>
            Google
          </button>
          <button type="button">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#1a1325"><path d="M16.4 1.6h3.2l-7 8 8.2 10.8h-6.4l-5-6.6-5.8 6.6H.4l7.5-8.6L0 1.6h6.6l4.5 6 5.3-6Zm-1.1 17h1.8L6.1 3.4H4.2L15.3 18.6Z"/></svg>
            X
          </button>
        </div>

        <div className="alt">Don't have an account? <a className="link" href="Create Account Page Wireframes.html">Create one</a></div>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SignIn />);
