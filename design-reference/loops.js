// Hero background loops — all canvas-rendered, 4K-crisp, seamlessly looping.
// Brand: deep violet #7c3aed, soft violet #b39ddb, dark violet #4c1d95
// Paper: #f6f3fb hero: #ece6f7

const COLORS = {
  paper:  "#ece6f7",
  deep:   "#7c3aed",
  soft:   "#b39ddb",
  dark:   "#4c1d95",
  ink:    "#1a1325",
};

// Set up retina-aware canvas
function setupCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  return { ctx, w: rect.width, h: rect.height, dpr };
}

// ─────────────────────────────────────────────────────────────
// 01 — Orbital Network
// Concentric ellipses, small planets orbiting at different speeds.
function orbital(canvas) {
  const { ctx, w, h } = setupCanvas(canvas);
  const cx = w * 0.55, cy = h * 0.5;
  const rings = [
    { rx: w*0.30, ry: h*0.10, rot: 0,     speed: 0.00015, planets: 2, size: 4 },
    { rx: w*0.22, ry: h*0.22, rot: -0.5,  speed: 0.00022, planets: 3, size: 3.5 },
    { rx: w*0.38, ry: h*0.32, rot: 0.4,   speed: 0.00010, planets: 1, size: 5 },
    { rx: w*0.16, ry: h*0.16, rot: 1.1,   speed: 0.00030, planets: 2, size: 3 },
  ];

  let start = performance.now();

  function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);

    // Soft ambient wash
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h)*0.7);
    g.addColorStop(0, "#e0d4f3");
    g.addColorStop(1, COLORS.paper);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Rings + planets
    rings.forEach((r, idx) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(r.rot);

      // Ring
      ctx.beginPath();
      ctx.ellipse(0, 0, r.rx, r.ry, 0, 0, Math.PI*2);
      ctx.strokeStyle = COLORS.soft + "88";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Planets
      for (let i = 0; i < r.planets; i++) {
        const phase = (t * r.speed) + (i / r.planets) * Math.PI * 2 + idx;
        const px = Math.cos(phase) * r.rx;
        const py = Math.sin(phase) * r.ry;

        // Halo
        ctx.beginPath();
        ctx.arc(px, py, r.size * 3, 0, Math.PI*2);
        ctx.fillStyle = COLORS.deep + "22";
        ctx.fill();
        // Body
        ctx.beginPath();
        ctx.arc(px, py, r.size, 0, Math.PI*2);
        ctx.fillStyle = i % 2 === 0 ? COLORS.deep : COLORS.soft;
        ctx.fill();
      }
      ctx.restore();
    });

    // Center core
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI*2);
    ctx.fillStyle = COLORS.deep + "33";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI*2);
    ctx.fillStyle = COLORS.deep;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI*2);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    canvas._raf = requestAnimationFrame(frame);
  }
  canvas._raf = requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────
// 02 — Neural Constellation
// Drifting nodes; lines drawn between nearby pairs.
function neural(canvas) {
  const { ctx, w, h } = setupCanvas(canvas);
  const N = Math.round((w * h) / 8000); // density scales with area
  const nodes = Array.from({ length: N }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    r: Math.random() * 1.5 + 0.6,
  }));
  const maxDist = Math.min(w, h) * 0.14;

  function frame() {
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, w, h);

    // Ambient wash
    const g = ctx.createRadialGradient(w*0.3, h*0.4, 0, w*0.3, h*0.4, w*0.7);
    g.addColorStop(0, "#dbcef0");
    g.addColorStop(1, COLORS.paper);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Lines first
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < maxDist) {
          const alpha = (1 - d/maxDist) * 0.55;
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
    nodes.forEach(n => {
      n.x += n.vx;  n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = COLORS.deep;
      ctx.fill();
    });

    canvas._raf = requestAnimationFrame(frame);
  }
  canvas._raf = requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────
// 03 — Signal Sweep (radar)
function sweep(canvas) {
  const { ctx, w, h } = setupCanvas(canvas);
  const cx = w * 0.5, cy = h * 0.5;
  const R = Math.hypot(w, h) * 0.6;

  // Scatter dormant nodes
  const N = 90;
  const nodes = Array.from({ length: N }, () => {
    const ang = Math.random() * Math.PI * 2;
    const dist = Math.sqrt(Math.random()) * R * 0.95;
    return {
      x: cx + Math.cos(ang) * dist,
      y: cy + Math.sin(ang) * dist,
      ang: Math.atan2(Math.sin(ang) * dist, Math.cos(ang) * dist),
      lastLit: -9999,
    };
  });

  let start = performance.now();

  function frame(now) {
    const t = (now - start) / 1000;

    // Bg
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, w, h);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, "#dccff0");
    g.addColorStop(0.8, COLORS.paper);
    g.addColorStop(1, COLORS.paper);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // Concentric rings
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, (R / 5) * i, 0, Math.PI*2);
      ctx.strokeStyle = COLORS.soft + "55";
      ctx.lineWidth = 0.7;
      ctx.stroke();
    }
    // Cross
    ctx.strokeStyle = COLORS.soft + "44";
    ctx.beginPath();
    ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
    ctx.stroke();

    // Sweep
    const sweepAng = (t * 0.55) % (Math.PI*2);  // ~11s revolution
    const fan = ctx.createConicGradient(sweepAng - Math.PI/2.5, cx, cy);
    fan.addColorStop(0,    "rgba(124,58,237,0)");
    fan.addColorStop(0.05, "rgba(124,58,237,0.30)");
    fan.addColorStop(0.10, "rgba(124,58,237,0.05)");
    fan.addColorStop(1,    "rgba(124,58,237,0)");
    ctx.fillStyle = fan;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI*2);
    ctx.fill();

    // Light up nodes the sweep crosses
    nodes.forEach(n => {
      const ang = Math.atan2(n.y - cy, n.x - cx);
      let diff = ((sweepAng - ang) + Math.PI*2) % (Math.PI*2);
      if (diff < 0.05) n.lastLit = t;
      const since = t - n.lastLit;
      const lit = Math.max(0, 1 - since / 2.5);
      const r = 1.5 + lit * 4;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(124,58,237,${(0.25 + lit*0.7).toFixed(3)})`;
      ctx.fill();
      if (lit > 0.3) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r*2.5, 0, Math.PI*2);
        ctx.strokeStyle = `rgba(124,58,237,${(lit*0.4).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Sweep leading edge
    ctx.strokeStyle = COLORS.deep;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(sweepAng) * R, cy + Math.sin(sweepAng) * R);
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI*2);
    ctx.fillStyle = COLORS.dark;
    ctx.fill();

    canvas._raf = requestAnimationFrame(frame);
  }
  canvas._raf = requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────
// 04 — Data Field (vertical drift)
function field(canvas) {
  const { ctx, w, h } = setupCanvas(canvas);
  const cols = Math.floor(w / 16);
  const colW = w / cols;
  const glyphs = "01ΔΛΦΨ∞◇◆▲∇<>";
  const trails = Array.from({ length: cols }, (_, i) => ({
    x: i * colW + colW/2,
    y: Math.random() * h,
    speed: 0.15 + Math.random() * 0.4,
    chars: Array.from({ length: 18 }, () => glyphs[Math.floor(Math.random()*glyphs.length)]),
    nextSwap: Math.random() * 2000,
  }));

  ctx.font = "11px JetBrains Mono, monospace";
  ctx.textAlign = "center";

  let last = performance.now();
  function frame(now) {
    const dt = now - last; last = now;

    // Bg with slight trail (very subtle fade)
    ctx.fillStyle = "rgba(236,230,247,0.18)";
    ctx.fillRect(0, 0, w, h);

    trails.forEach(t => {
      t.y += t.speed;
      if (t.y > h + 200) t.y = -200;
      t.nextSwap -= dt;
      if (t.nextSwap < 0) {
        t.chars[Math.floor(Math.random()*t.chars.length)] = glyphs[Math.floor(Math.random()*glyphs.length)];
        t.nextSwap = 300 + Math.random()*1500;
      }
      for (let i = 0; i < t.chars.length; i++) {
        const y = t.y - i * 16;
        const fade = (1 - i / t.chars.length);
        const alpha = fade * 0.35;
        ctx.fillStyle = i === 0
          ? `rgba(76,29,149,${(0.55).toFixed(2)})`
          : `rgba(124,58,237,${alpha.toFixed(2)})`;
        ctx.fillText(t.chars[i], t.x, y);
      }
    });

    canvas._raf = requestAnimationFrame(frame);
  }
  canvas._raf = requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────
const LOOPS = { orbital, neural, sweep, field };

function startLoop(canvas, kind) {
  if (canvas._raf) cancelAnimationFrame(canvas._raf);
  const fn = LOOPS[kind];
  if (fn) fn(canvas);
}

// Start each preview canvas
document.querySelectorAll("canvas[data-loop]").forEach(c => {
  startLoop(c, c.dataset.loop);
});

// Hero canvas with switcher
const heroCanvas = document.getElementById("hero-canvas");
const switcher = document.getElementById("switcher");
let currentPick = "orbital";

function applyPick(kind) {
  currentPick = kind;
  switcher.querySelectorAll("button").forEach(b => b.classList.toggle("on", b.dataset.pick === kind));
  startLoop(heroCanvas, kind);
}

switcher.querySelectorAll("button").forEach(b => {
  b.addEventListener("click", () => applyPick(b.dataset.pick));
});

applyPick("orbital");

// Handle resize for hero canvas
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.querySelectorAll("canvas[data-loop]").forEach(c => startLoop(c, c.dataset.loop));
    startLoop(heroCanvas, currentPick);
  }, 150);
});
