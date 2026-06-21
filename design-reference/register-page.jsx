// Create account page — same glass card system as sign-in, with strength meter + terms.

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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const EyeIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3 3.6M6.2 6.2A18.5 18.5 0 0 0 2 11s3.5 7 10 7a10.9 10.9 0 0 0 4.1-.8" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /><path d="m2 2 20 20" />
  </svg>
);

// Simple password strength: length + variety
function scorePassword(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}
const STRENGTH = [
  { label: "", color: "transparent" },
  { label: "WEAK", color: "#d9534f" },
  { label: "FAIR", color: "#e0922f" },
  { label: "GOOD", color: "#7c3aed" },
  { label: "STRONG", color: "#1f8a5b" },
];

function Register() {
  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [showPw2, setShowPw2] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const score = scorePassword(pw);
  const strength = STRENGTH[score];
  const mismatch = pw2.length > 0 && pw !== pw2;
  const matched = pw2.length > 0 && pw === pw2;
  const canSubmit = agree && pw.length > 0 && pw === pw2;

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
        <h1>Create your account</h1>
        <div className="sub">Start learning the AI that already knows you.</div>

        <div className="field">
          <input type="text" placeholder="Full name" autoComplete="name" />
          <span className="ic"><UserIcon /></span>
        </div>
        <div className="field">
          <input type="email" placeholder="Email address" autoComplete="email" />
          <span className="ic"><MailIcon /></span>
        </div>
        <div className="field">
          <input type={showPw ? "text" : "password"} placeholder="Create a password" autoComplete="new-password"
                 value={pw} onChange={(e) => setPw(e.target.value)} />
          <span className="ic" onClick={() => setShowPw(s => !s)} role="button" tabIndex={0} aria-label={showPw ? "Hide password" : "Show password"} title={showPw ? "Hide password" : "Show password"} style={{ pointerEvents: "auto", cursor: "pointer" }}>
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>

        {/* Strength meter */}
        <div className="meter">
          {[1,2,3,4].map(i => (
            <div key={i} className="seg" style={{ background: i <= score ? strength.color : undefined }} />
          ))}
        </div>
        <div className="meter-label" style={{ color: strength.color === "transparent" ? "var(--muted)" : strength.color }}>
          {pw ? `PASSWORD STRENGTH · ${strength.label}` : ""}
        </div>

        {/* Retype password */}
        <div className="field">
          <input type={showPw2 ? "text" : "password"} placeholder="Retype password" autoComplete="new-password"
                 value={pw2} onChange={(e) => setPw2(e.target.value)}
                 style={{ borderColor: mismatch ? "#d9534f" : (matched ? "#1f8a5b" : undefined) }} />
          <span className="ic" onClick={() => setShowPw2(s => !s)} role="button" tabIndex={0} aria-label={showPw2 ? "Hide password" : "Show password"} title={showPw2 ? "Hide password" : "Show password"} style={{ pointerEvents: "auto", cursor: "pointer" }}>
            {showPw2 ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        </div>
        <div className="meter-label" style={{ color: mismatch ? "#d9534f" : "#1f8a5b", minHeight: 14 }}>
          {mismatch ? "PASSWORDS DON'T MATCH" : (matched ? "✓ PASSWORDS MATCH" : "")}
        </div>

        {/* Terms */}
        <label className="terms">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span className="box" />
          <span>I agree to the <a className="link" href="Terms of Service Page Wireframes.html">Terms of Service</a> and <a className="link" href="Privacy Policy Page Wireframes.html">Privacy Policy</a>.</span>
        </label>

        <button className="btn" type="submit" onClick={() => { if (canSubmit) window.location.href = "Learn AI Page Wireframes.html"; }} style={{ opacity: canSubmit ? 1 : 0.55 }}>
          Create account <span className="ar">→</span>
        </button>

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

        <div className="alt">Already have an account? <a className="link" href="Sign In Page Wireframes.html">Sign in</a></div>
        <div style={{ marginTop: 14, textAlign: "center" }}><a className="home-link" href="DuraNoia Wireframes.html"><span className="ar">←</span> Return to home</a></div>
      </form>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Register />);
