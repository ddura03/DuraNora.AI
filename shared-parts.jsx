// Shared parts used across wireframe variants.
// All components attach to window at the bottom for cross-file scope.

function NavStrip({ dark }) {
  return (
    <div className="navstrip" style={dark ? { background: "#101115", color: "#e9e7df", borderColor: "#2a2c33" } : null}>
      <div className="ident">
        <div className="m" style={dark ? { background:"#0c0d10", color:"#e9e7df", borderColor:"#3a3c43" } : null}>D</div>
        <span>DuraNoia<span style={{ color: dark ? "#8b8e98" : "var(--ink-3)" }}>.AI</span></span>
      </div>
      <div className="links" style={dark ? { color:"#8b8e98" } : null}>
        <b style={dark ? { color:"#e9e7df" } : null}>Learn</b>
        <span>Ecosystem</span>
        <span>News</span>
        <span>Compare</span>
        <span>About</span>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <span className="pill" style={dark ? { background:"transparent", color:"#e9e7df", borderColor:"#3a3c43" } : null}>Sign in</span>
        <span className="pill" style={{ background: "var(--accent)", borderColor:"var(--accent)", color:"#0c0d10", fontWeight:600 }}>Get started →</span>
      </div>
    </div>
  );
}

function AiButton({ ai, dark }) {
  if (dark) {
    return (
      <button className="v4-ai-btn">
        <span className="m"><MarkGlyph mark={ai.mark} /></span>
        <span>
          <div style={{ fontWeight:600 }}>{ai.name}</div>
          <div style={{ fontSize:9.5, color:"#8b8e98", letterSpacing:".04em", marginTop:1 }}>{ai.sub}</div>
        </span>
      </button>
    );
  }
  return (
    <button className="ai-btn">
      <span className="ai-mark"><MarkGlyph mark={ai.mark} /></span>
      <span>
        <span className="name">{ai.name}</span>
        <span className="sub">{ai.sub}</span>
      </span>
    </button>
  );
}

// 2 wide × 4 tall grid of 8 AI buttons
function AiGrid2x4({ dark, compact }) {
  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "repeat(4, auto)",
    gap: compact ? 6 : 8,
  };
  return (
    <div style={style}>
      {AI_LIST.map((ai, i) => <AiButton key={i} ai={ai} dark={dark} />)}
    </div>
  );
}

function FeatureSection() {
  return (
    <div className="sec" style={{ padding: "30px 22px 24px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 18, marginTop: 8 }}>
        <div className="feat-card" onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>
          <div className="feat-title">Learn AI<br/><span style={{ fontFamily:"var(--mono)", fontWeight:500, fontSize:18, color:"#7c3aed", letterSpacing:0 }}>from zero → prompt-fluent</span></div>
          <div className="feat-body">Deep-dive courses on every model: what it does, what it's bad at, prompting patterns, hidden flags, and side-by-side capability scorecards.</div>
          <LearnAiArt />
          <div style={{ display:"flex", gap:10 }}>
            <span className="pill">8 models</span>
            <span className="pill">42 lessons</span>
            <span className="pill">Prompt library</span>
          </div>
        </div>
        <div className="feat-card" onClick={() => { window.location.href = "AI Ecosystem Page Wireframes.html"; }}>
          <div className="feat-title">AI Ecosystem<br/><span style={{ fontFamily:"var(--mono)", fontWeight:500, fontSize:18, color:"#7c3aed", letterSpacing:0 }}>chain them together</span></div>
          <div className="feat-body">Visual map of how today's models intersect. Recipes for using many together for one objective — research, code, design, and compare.</div>
          <EcosystemArt />
          <div style={{ display:"flex", gap:10 }}>
            <span className="pill">Workflows</span>
            <span className="pill">Handoffs</span>
            <span className="pill">Cost map</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── On-brand newswire image placeholders ─────────
function NewsImage({ kind, index }) {
  const base = {
    height: 110,
    border: "1px solid #d9cff0",
    borderRadius: 5,
    background: "linear-gradient(135deg, #f6f3fb 0%, #ece6f7 100%)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
  };

  // Real photo for the OpenAI story
  if (kind === "OpenAI") {
    return (
      <div style={base}>
        <img src="logos/news-openai.png" alt="OpenAI" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Anthropic / Claude story
  if (kind === "Anthropic") {
    return (
      <div style={base}>
        <img src="logos/news-anthropic.png" alt="Claude" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Google / Gemini story
  if (kind === "Google") {
    return (
      <div style={base}>
        <img src="logos/news-google.png" alt="Google" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the xAI / Grok story
  if (kind === "xAI") {
    return (
      <div style={base}>
        <img src="logos/news-xai.png" alt="xAI" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the DeepSeek story
  if (kind === "DeepSeek") {
    return (
      <div style={base}>
        <img src="logos/news-deepseek.png" alt="DeepSeek" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Perplexity story
  if (kind === "Perplexity") {
    return (
      <div style={base}>
        <img src="logos/news-perplexity.png" alt="Perplexity" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Meta / Llama story
  if (kind === "Meta") {
    return (
      <div style={base}>
        <img src="logos/news-meta.png" alt="Meta Llama" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the EU / policy story
  if (kind === "EU") {
    return (
      <div style={base}>
        <img src="logos/news-eu.png" alt="European Union" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Cursor / Anysphere story
  if (kind === "Anysphere") {
    return (
      <div style={base}>
        <img src="logos/news-cursor.png" alt="Cursor" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  // Real photo for the Midjourney story
  if (kind === "Midjourney") {
    return (
      <div style={base}>
        <img src="logos/news-midjourney.png" alt="Midjourney" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
      </div>
    );
  }

  const Corner = () => (
    <div style={{
      position: "absolute", top: 6, right: 8,
      fontFamily: "JetBrains Mono, monospace", fontSize: 8.5,
      color: "#9087a8", letterSpacing: ".1em", opacity: .7
    }}>
      IMG · 0{index + 1}
    </div>
  );

  const Grid = () => (
    <svg viewBox="0 0 240 110" preserveAspectRatio="none" style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.45 }}>
      <defs>
        <pattern id={`news-grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0 L0 0 0 20" fill="none" stroke="#d9cff0" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="240" height="110" fill={`url(#news-grid-${index})`} />
    </svg>
  );

  let art = null;

  if (kind === "OpenAI") {
    art = (
      <svg viewBox="0 0 240 110" style={{ position:"relative", width:"86%", height:"86%" }}>
        <g transform="translate(56,55)">
          <circle r="22" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
          <circle r="14" fill="none" stroke="#b39ddb" strokeWidth="1.2"/>
          <circle r="6" fill="#7c3aed"/>
          <circle cx="-8" cy="-8" r="2" fill="#ffffff"/>
        </g>
        <path d="M 86 55 L 110 55" stroke="#b39ddb" strokeWidth="1.2" strokeDasharray="3 3"/>
        <g transform="translate(120,55)" stroke="#4c1d95" strokeWidth="2.5" strokeLinecap="round">
          <line x1="0"  y1="-8"  x2="0"  y2="8"/>
          <line x1="10" y1="-18" x2="10" y2="18"/>
          <line x1="20" y1="-12" x2="20" y2="12"/>
          <line x1="30" y1="-22" x2="30" y2="22"/>
          <line x1="40" y1="-14" x2="40" y2="14"/>
          <line x1="50" y1="-26" x2="50" y2="26"/>
          <line x1="60" y1="-10" x2="60" y2="10"/>
          <line x1="70" y1="-18" x2="70" y2="18"/>
          <line x1="80" y1="-6"  x2="80" y2="6"/>
        </g>
      </svg>
    );
  } else if (kind === "Anthropic") {
    art = (
      <svg viewBox="0 0 240 110" style={{ position:"relative", width:"86%", height:"86%" }}>
        <g transform="translate(120,55)">
          <g transform="translate(-60,-26) rotate(-6 60 26)" opacity="0.55">
            <rect width="120" height="52" rx="6" fill="#ffffff" stroke="#d9cff0" strokeWidth="1"/>
            <rect x="10" y="10" width="40" height="4" rx="2" fill="#b39ddb"/>
            <rect x="10" y="20" width="80" height="4" rx="2" fill="#ece6f7"/>
            <rect x="10" y="30" width="60" height="4" rx="2" fill="#ece6f7"/>
          </g>
          <g transform="translate(-58,-22)" opacity="0.8">
            <rect width="120" height="52" rx="6" fill="#ffffff" stroke="#c4b3e6" strokeWidth="1"/>
            <rect x="10" y="10" width="50" height="4" rx="2" fill="#7c3aed"/>
            <rect x="10" y="20" width="95" height="4" rx="2" fill="#ece6f7"/>
            <rect x="10" y="30" width="70" height="4" rx="2" fill="#ece6f7"/>
          </g>
          <g transform="translate(-56,-18) rotate(4 60 26)">
            <rect width="120" height="52" rx="6" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
            <circle cx="18" cy="18" r="6" fill="#7c3aed"/>
            <rect x="32" y="14" width="60" height="4" rx="2" fill="#4c1d95"/>
            <rect x="10" y="30" width="100" height="3" rx="1.5" fill="#ece6f7"/>
            <rect x="10" y="38" width="80"  height="3" rx="1.5" fill="#ece6f7"/>
          </g>
        </g>
      </svg>
    );
  } else if (kind === "Google") {
    art = (
      <svg viewBox="0 0 240 110" style={{ position:"relative", width:"86%", height:"86%" }}>
        <g transform="translate(48,30)">
          <g>
            <rect width="36" height="50" rx="4" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
            <rect x="6" y="8"  width="24" height="3" rx="1" fill="#b39ddb"/>
            <rect x="6" y="16" width="24" height="3" rx="1" fill="#ece6f7"/>
            <rect x="6" y="24" width="18" height="3" rx="1" fill="#ece6f7"/>
            <rect x="6" y="32" width="22" height="3" rx="1" fill="#ece6f7"/>
          </g>
          <g transform="translate(54,0)">
            <rect width="36" height="50" rx="4" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
            <rect x="4"  y="8"  width="28" height="8" rx="1" fill="#ece6f7"/>
            <rect x="4"  y="20" width="12" height="6" rx="1" fill="#b39ddb"/>
            <rect x="20" y="20" width="12" height="6" rx="1" fill="#ece6f7"/>
            <rect x="4"  y="30" width="12" height="6" rx="1" fill="#ece6f7"/>
            <rect x="20" y="30" width="12" height="6" rx="1" fill="#b39ddb"/>
          </g>
          <g transform="translate(108,0)">
            <rect width="36" height="50" rx="4" fill="#7c3aed" stroke="#7c3aed" strokeWidth="1.5"/>
            <path d="M 8 17 L 22 17 L 22 33 L 8 33 Z" fill="#ffffff"/>
            <path d="M 22 22 L 30 17 L 30 33 L 22 28 Z" fill="#ffffff"/>
          </g>
        </g>
        <g transform="translate(72,18)" fill="#4c1d95">
          <path d="M 0 -6 L 1.6 -1.6 L 6 0 L 1.6 1.6 L 0 6 L -1.6 1.6 L -6 0 L -1.6 -1.6 Z"/>
        </g>
      </svg>
    );
  } else if (kind === "xAI") {
    art = (
      <svg viewBox="0 0 240 110" style={{ position:"relative", width:"86%", height:"86%" }}>
        <g transform="translate(36,86)">
          <line x1="0"   y1="0"   x2="180" y2="0"   stroke="#c4b3e6" strokeWidth="1"/>
          <line x1="0"   y1="0"   x2="0"   y2="-60" stroke="#c4b3e6" strokeWidth="1"/>
          <rect x="14"  y="-18" width="18" height="18" rx="2" fill="#b39ddb"/>
          <rect x="42"  y="-26" width="18" height="26" rx="2" fill="#b39ddb"/>
          <rect x="70"  y="-32" width="18" height="32" rx="2" fill="#7c3aed"/>
          <rect x="98"  y="-42" width="18" height="42" rx="2" fill="#7c3aed"/>
          <rect x="126" y="-56" width="18" height="56" rx="2" fill="#4c1d95"/>
          <path d="M 14 -10 L 144 -64" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3"/>
          <path d="M 138 -70 L 146 -64 L 138 -56" stroke="#4c1d95" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <text x="160" y="-66" fontFamily="Space Grotesk, sans-serif" fontSize="16" fontWeight="800" fill="#4c1d95">$6B</text>
        </g>
      </svg>
    );
  } else {
    art = (
      <svg viewBox="0 0 60 60" style={{ width:48, height:48 }}>
        <rect x="4" y="4" width="52" height="52" rx="6" fill="none" stroke="#b39ddb" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="4" fill="#b39ddb"/>
        <path d="M 8 50 L 24 32 L 36 42 L 50 24" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
      </svg>
    );
  }

  return (
    <div style={base}>
      <Grid />
      {art}
    </div>
  );
}

// ─────── On-brand SVG illustrations ─────────
// Brand: #7c3aed deep, #b39ddb soft, #4c1d95 dark

function LearnAiArt() {
  // Three layered "lesson cards" with a highlighted model node + annotation marks.
  // Echoes the idea of studying a model card up close.
  return (
    <div className="feat-art" style={{
      background: "linear-gradient(135deg, #f6f3fb 0%, #ece6f7 100%)",
      borderColor: "#d9cff0",
      padding: 0, overflow:"hidden", position:"relative"
    }}>
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet" style={{ width:"100%", height:"100%", display:"block" }}>
        <defs>
          <pattern id="learn-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="#d9cff0" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="learn-card" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="100%" stopColor="#f6f3fb"/>
          </linearGradient>
        </defs>
        <rect width="480" height="240" fill="url(#learn-grid)" />

        {/* Back card (offset, faded) */}
        <g opacity="0.55" transform="translate(80,40) rotate(-4 130 70)">
          <rect width="260" height="140" rx="8" fill="#ffffff" stroke="#d9cff0" strokeWidth="1"/>
          <rect x="18" y="18" width="36" height="36" rx="6" fill="#ece6f7"/>
          <rect x="66" y="22" width="110" height="8" rx="3" fill="#d9cff0"/>
          <rect x="66" y="38" width="70"  height="6" rx="3" fill="#e7dff3"/>
          <rect x="18" y="74" width="224" height="4" rx="2" fill="#ece6f7"/>
          <rect x="18" y="86" width="180" height="4" rx="2" fill="#ece6f7"/>
          <rect x="18" y="98" width="200" height="4" rx="2" fill="#ece6f7"/>
        </g>

        {/* Middle card */}
        <g opacity="0.85" transform="translate(100,52) rotate(2 130 70)">
          <rect width="260" height="140" rx="8" fill="url(#learn-card)" stroke="#c4b3e6" strokeWidth="1"/>
          <rect x="18" y="18" width="36" height="36" rx="6" fill="#ece6f7"/>
          <text x="36" y="42" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="16" fontWeight="700" fill="#4c1d95">C</text>
          <rect x="66" y="22" width="120" height="8" rx="3" fill="#b39ddb"/>
          <rect x="66" y="38" width="60"  height="6" rx="3" fill="#d9cff0"/>
          <rect x="18" y="74" width="224" height="4" rx="2" fill="#e7dff3"/>
          <rect x="18" y="86" width="180" height="4" rx="2" fill="#e7dff3"/>
          <rect x="18" y="98" width="200" height="4" rx="2" fill="#e7dff3"/>
        </g>

        {/* Front card — in focus, with annotation circle + marks */}
        <g transform="translate(120,64)">
          <rect width="260" height="140" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
          {/* Model badge */}
          <rect x="18" y="18" width="40" height="40" rx="8" fill="#7c3aed"/>
          <circle cx="38" cy="38" r="7" fill="none" stroke="#ffffff" strokeWidth="2.5"/>
          {/* Title bars */}
          <rect x="70" y="22" width="130" height="10" rx="3" fill="#4c1d95"/>
          <rect x="70" y="40" width="80"  height="6"  rx="3" fill="#b39ddb"/>
          {/* Body lines */}
          <rect x="18" y="78"  width="224" height="5" rx="2" fill="#ece6f7"/>
          <rect x="18" y="92"  width="190" height="5" rx="2" fill="#ece6f7"/>
          <rect x="18" y="106" width="170" height="5" rx="2" fill="#ece6f7"/>
          {/* Annotation circle highlighting body */}
          <circle cx="100" cy="95" r="22" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3 3"/>
          {/* Caret tag near annotation */}
          <g transform="translate(140,82)">
            <rect width="58" height="18" rx="4" fill="#4c1d95"/>
            <text x="29" y="12" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#fff" letterSpacing="0.6">LESSON 03</text>
          </g>
        </g>

        {/* Progress dots bottom */}
        <g transform="translate(180,218)">
          <circle cx="0"  cy="0" r="4" fill="#7c3aed"/>
          <circle cx="16" cy="0" r="4" fill="#7c3aed"/>
          <circle cx="32" cy="0" r="4" fill="#7c3aed"/>
          <circle cx="48" cy="0" r="4" fill="#b39ddb"/>
          <circle cx="64" cy="0" r="4" fill="#b39ddb"/>
          <circle cx="80" cy="0" r="4" fill="#d9cff0"/>
          <circle cx="96" cy="0" r="4" fill="#d9cff0"/>
          <circle cx="112" cy="0" r="4" fill="#d9cff0"/>
        </g>

      </svg>
    </div>
  );
}

function EcosystemArt() {
  // Three named model nodes connected by data-flow edges, showing handoffs.
  // Echoes the neural constellation in the hero, scoped to a clear narrative.
  return (
    <div className="feat-art" style={{
      background: "linear-gradient(135deg, #ece6f7 0%, #f6f3fb 100%)",
      borderColor: "#d9cff0",
      padding: 0, overflow:"hidden", position:"relative"
    }}>
      <svg viewBox="0 0 480 240" preserveAspectRatio="xMidYMid meet" style={{ width:"100%", height:"100%", display:"block" }}>
        <defs>
          <pattern id="eco-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="#d9cff0" strokeWidth="0.5"/>
          </pattern>
          <marker id="eco-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#7c3aed"/>
          </marker>
        </defs>
        <rect width="480" height="240" fill="url(#eco-grid)"/>

        {/* Edges — clean node-to-node */}
        {/* Perplexity (bottom) → Claude */}
        <path d="M 90,110 C 100,140 150,170 180,170" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eco-arrow)"/>
        {/* Claude → Midjourney (bottom) */}
        <path d="M 320,170 C 350,170 390,140 390,110" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#eco-arrow)"/>

        {/* Faint background data dots (neural echo) */}
        <g fill="#b39ddb" opacity="0.45">
          <circle cx="40"  cy="25"  r="2"/>
          <circle cx="90"  cy="220" r="1.5"/>
          <circle cx="250" cy="35"  r="1.5"/>
          <circle cx="430" cy="25"  r="2"/>
          <circle cx="440" cy="220" r="1.5"/>
        </g>

        {/* Node A — Perplexity (top-left) */}
        <g transform="translate(20,50)">
          <rect width="140" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ece6f7"/>
          <text x="24" y="32" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700" fill="#4c1d95">P</text>
          <text x="48" y="24" fontFamily="Space Grotesk, sans-serif" fontSize="11" fontWeight="700" fill="#1a1325">Perplexity</text>
          <text x="48" y="40" fontFamily="JetBrains Mono, monospace" fontSize="8"  fill="#9087a8" letterSpacing="1">SEARCH</text>
        </g>

        {/* Node B — Claude (centered, lower — reasons over the facts) */}
        <g transform="translate(180,140)">
          <rect width="140" height="60" rx="10" fill="#7c3aed" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ffffff" opacity="0.2"/>
          <text x="24" y="32" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700" fill="#ffffff">C</text>
          <text x="48" y="24" fontFamily="Space Grotesk, sans-serif" fontSize="11" fontWeight="700" fill="#ffffff">Claude</text>
          <text x="48" y="40" fontFamily="JetBrains Mono, monospace" fontSize="8"  fill="#d9cff0" letterSpacing="1">REASON</text>
        </g>

        {/* Node C — Midjourney (top-right — visualizes the brief) */}
        <g transform="translate(320,50)">
          <rect width="140" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5"/>
          <rect x="10" y="12" width="28" height="28" rx="6" fill="#ece6f7"/>
          <text x="24" y="32" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700" fill="#4c1d95">◈</text>
          <text x="48" y="24" fontFamily="Space Grotesk, sans-serif" fontSize="11" fontWeight="700" fill="#1a1325">Midjourney</text>
          <text x="48" y="40" fontFamily="JetBrains Mono, monospace" fontSize="8"  fill="#9087a8" letterSpacing="1">VISUAL</text>
        </g>

        {/* Edge labels removed for cleaner look */}
      </svg>
    </div>
  );
}

function NewsSection() {
  const FILTERS = ["All", "Releases", "Funding", "Research", "Policy"];
  const [active, setActive] = React.useState("All");
  const list = active === "All" ? NEWS : NEWS.filter(n => n.cat === active);

  return (
    <div className="sec" style={{ padding: "30px 22px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom: 14 }}>
        <div>
          <div className="kicker">Live feed</div>
          <div style={{ fontFamily:"var(--sans)", fontSize:30, fontWeight:700, letterSpacing:"-.01em", lineHeight:1, marginTop:4 }}>
            What's new from the labs
          </div>
        </div>
        <div style={{ display:"flex", gap:6, position:"relative" }}>
          {FILTERS.map(f => {
            const on = f === active;
            return (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={"filter-pill" + (on ? " is-on" : "")}
                aria-pressed={on}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14 }}>
        {list.map((n, i) => (
          <div className="news-card" key={n.title}>
            <NewsImage kind={n.tag} index={i} />
            <div className="news-meta"><b>{n.tag}</b><span>{n.date}</span></div>
            <div className="news-title">{n.title}</div>
            <div className="news-excerpt">{n.excerpt}</div>
            <div className="read-link" style={{ marginTop:4, fontFamily:"var(--mono)", fontSize:10.5, color:"var(--accent)", letterSpacing:".06em", fontWeight:600 }}>READ <span className="arr">→</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="ftr" style={{ borderRadius: 6, margin: "0 0 0 0" }}>
      <div className="ftr-grid">
        <div className="ftr-col ftr-brand">
          <div className="bm">D</div>
          <div style={{ fontFamily:"var(--mono)", fontWeight:600, letterSpacing:".04em" }}>DuraNoia<span style={{ color:"#8b8e98" }}>.AI</span></div>
          <div style={{ fontSize:13, color:"#8b8e98", lineHeight:1.5, maxWidth:"28ch" }}>
            The field guide to modern AI. Learn every model, chain them together, stay current.
          </div>
        </div>
        <div className="ftr-col">
          <h6>Learn</h6>
          <ul><li>All models</li><li>Prompt library</li><li>Comparisons</li><li>Glossary</li></ul>
        </div>
        <div className="ftr-col">
          <h6>Ecosystem</h6>
          <ul><li>Workflows</li><li>Recipes</li><li>Integrations</li><li>Cost calculator</li></ul>
        </div>
        <div className="ftr-col">
          <h6>Company</h6>
          <ul><li>About</li><li>Newswire</li><li>Careers</li><li>Contact</li></ul>
        </div>
        <div className="ftr-col">
          <h6>Newsletter</h6>
          <div style={{ fontSize:12.5, color:"#8b8e98", marginBottom:8 }}>One short brief, weekly. No hype.</div>
          <div className="ftr-news">
            <input placeholder="you@domain.com" />
            <button>Join →</button>
          </div>
        </div>
      </div>
      <div className="ftr-bot">
        <span>© 2026 DuraNoia.AI — built for the curious</span>
        <span>v0.wireframe · all marks property of their owners</span>
      </div>
    </div>
  );
}

// Decorative separator between sections — echoes the neural constellation hero
function SectionDivider() {
  return (
    <div style={{
      width:"100%",
      padding:"6px max(60px, 6vw)",
      display:"flex", alignItems:"center", gap:18,
      background:"#f6f3fb",
    }}>
      {/* left line + small nodes */}
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg, transparent 0%, #b39ddb 35%, #7c3aed 100%)" }}></div>
      <svg width="68" height="24" viewBox="0 0 68 24" style={{ display:"block" }}>
        <line x1="0"  y1="12" x2="22" y2="12" stroke="#7c3aed" strokeWidth="1" />
        <line x1="46" y1="12" x2="68" y2="12" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="14" cy="12" r="2"   fill="#b39ddb" />
        <circle cx="54" cy="12" r="2"   fill="#b39ddb" />
        <circle cx="34" cy="12" r="4.5" fill="#7c3aed" />
        <circle cx="34" cy="12" r="2"   fill="#ffffff" />
      </svg>
      <div style={{ flex:1, height:1, background:"linear-gradient(270deg, transparent 0%, #b39ddb 35%, #7c3aed 100%)" }}></div>
    </div>
  );
}

Object.assign(window, { NavStrip, AiButton, AiGrid2x4, FeatureSection, NewsSection, NewsImage, Footer, LearnAiArt, EcosystemArt, SectionDivider });
