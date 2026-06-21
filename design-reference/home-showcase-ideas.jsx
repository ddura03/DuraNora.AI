// Four ideas for the home-page "AI Showcase" section.
const HeartI = ({ s = 15 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>;
const EyeI = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const CmtI = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1-4a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 9-8.4 8.5 8.5 0 0 1 8 8.4Z"/></svg>;
const mName = (mark) => (AI_CATALOG.find(m => m.mark === mark) || {}).name;

function Card({ p }) {
  return (
    <a className="pcard" href="#">
      <div className="cover" style={{ background: p.grad }}>
        <div className="mono">{p.mono}</div>
        <div className="badges">
          <span className="views"><EyeI /> {p.views}</span>
          {p.featured && <span className="feat" style={{ marginLeft: "auto" }}>Featured</span>}
        </div>
      </div>
      <div className="pb">
        <div className="pt">{p.title}</div>
        <div className="pby">
          <span className="av" style={{ background: p.author.color }}>{p.author.initials}</span>
          {p.author.name}
        </div>
        <div className="pm">
          <span className="x"><HeartI /> {p.likes}</span>
          <span className="x"><CmtI /> {p.comments.length}</span>
          {mName(p.mark) && <span className="x mk"><span className="glyph" style={{ width: 22, height: 22 }}><MarkGlyph mark={p.mark} /></span></span>}
        </div>
      </div>
    </a>
  );
}

function Header({ align = "left", cta = true }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28, textAlign: align }}>
      <div style={{ flex: align === "center" ? "1 1 100%" : "1 1 auto", textAlign: align }}>
        <div className="eyebrow">◆ AI Showcase</div>
        <div className="h2">Built by the community, <span className="i">powered by AI.</span></div>
        <div className="sub" style={{ marginInline: align === "center" ? "auto" : 0 }}>See what people are building with the models you're learning — then ship your own and get it in front of everyone.</div>
      </div>
      {cta && <a className="btn ghost" href="#">Explore the showcase <span className="ar">→</span></a>}
    </div>
  );
}

// ---- Idea 1: Featured grid (3-up) ----
function Idea1() {
  const items = PROJECTS.filter(p => p.featured).slice(0, 3);
  return (
    <div className="sec">
      <Header />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {items.map(p => <Card key={p.id} p={p} />)}
      </div>
    </div>
  );
}

// ---- Idea 2: Hero spotlight + side list ----
function Idea2() {
  const hero = PROJECTS.find(p => p.id === "loreatlas");
  const side = PROJECTS.filter(p => ["promptpilot", "citecheck", "pixelforge"].includes(p.id));
  return (
    <div className="sec">
      <Header cta={false} />
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 24, alignItems: "stretch" }}>
        {/* spotlight */}
        <a className="pcard" href="#" style={{ display: "flex", flexDirection: "column" }}>
          <div className="cover" style={{ height: 300, background: hero.grad }}>
            <div className="mono" style={{ fontSize: 64 }}>{hero.mono}</div>
            <div className="badges"><span className="views"><EyeI /> {hero.views}</span><span className="feat" style={{ marginLeft: "auto" }}>Project of the week</span></div>
          </div>
          <div className="pb" style={{ padding: "20px 22px 22px" }}>
            <div className="pt" style={{ fontSize: 21 }}>{hero.title}</div>
            <div className="sub" style={{ margin: "8px 0 0", fontSize: 14 }}>{hero.desc}</div>
            <div className="pm" style={{ marginTop: 14, paddingTop: 14 }}>
              <span className="av" style={{ background: hero.author.color, width: 24, height: 24, fontSize: 10 }}>{hero.author.initials}</span>
              <span style={{ fontWeight: 700, color: "var(--ink)" }}>{hero.author.name}</span>
              <span className="x" style={{ marginLeft: "auto" }}><HeartI /> {hero.likes}</span>
              <span className="x"><CmtI /> {hero.comments.length}</span>
            </div>
          </div>
        </a>
        {/* side list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {side.map(p => (
            <a key={p.id} className="pcard" href="#" style={{ display: "flex", alignItems: "stretch" }}>
              <div className="cover" style={{ height: "auto", width: 96, flex: "0 0 96px", background: p.grad }}>
                <div className="mono" style={{ fontSize: 24 }}>{p.mono}</div>
              </div>
              <div className="pb" style={{ flex: 1, padding: "13px 15px" }}>
                <div className="pt" style={{ fontSize: 14.5 }}>{p.title}</div>
                <div className="pm" style={{ marginTop: 9, paddingTop: 9 }}>
                  <span className="av" style={{ background: p.author.color }}>{p.author.initials}</span>
                  <span style={{ fontSize: 11.5 }}>{p.author.name}</span>
                  <span className="x mk" style={{ marginLeft: "auto" }}><HeartI s={13} /> {p.likes}</span>
                </div>
              </div>
            </a>
          ))}
          <a className="btn ghost" href="#" style={{ justifyContent: "center" }}>See all projects <span className="ar">→</span></a>
        </div>
      </div>
    </div>
  );
}

// ---- Idea 3: Marquee band on a violet field ----
function Idea3() {
  const row = PROJECTS.slice(0, 7);
  return (
    <div className="sec" style={{ background: "radial-gradient(circle at 20% 20%, rgba(124,58,237,.14) 0, transparent 55%), radial-gradient(circle at 85% 80%, rgba(179,157,219,.34) 0, transparent 55%), repeating-linear-gradient(135deg,#ece6f7 0 18px,#e3daf2 18px 36px)" }}>
      <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 30px" }}>
        <div className="eyebrow">◆ AI Showcase</div>
        <div className="h2">Real projects. <span className="i">Real people. Real AI.</span></div>
        <div className="sub" style={{ margin: "12px auto 0" }}>A living wall of what the community is shipping. Like, comment, and post your own.</div>
      </div>
      <div style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "260px", gap: 16, overflowX: "auto", padding: "4px 2px 14px" }}>
        {row.map(p => <Card key={p.id} p={p} />)}
      </div>
      <div style={{ textAlign: "center", marginTop: 22 }}>
        <a className="btn" href="#">Explore the showcase <span className="ar">→</span></a>
      </div>
    </div>
  );
}

// ---- Idea 4: Split — pitch left, mini stack right ----
function Idea4() {
  const stack = PROJECTS.filter(p => ["loreatlas", "promptpilot", "citecheck"].includes(p.id));
  return (
    <div className="sec">
      <div style={{ display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 40, alignItems: "center" }}>
        <div>
          <div className="eyebrow">◆ AI Showcase</div>
          <div className="h2" style={{ fontSize: 40 }}>Don't just learn it.<br/><span className="i">Show what you built.</span></div>
          <div className="sub" style={{ fontSize: 16 }}>Every project here was made with a model you can learn on DuraNoia. Attach your live build, tag the models you used, and collect views, likes, and feedback from the community.</div>
          <div style={{ display: "flex", gap: 24, margin: "22px 0 24px" }}>
            <div><div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>1,200+</div><div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Projects shared</div></div>
            <div><div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em" }}>10</div><div style={{ fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>Models featured</div></div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a className="btn" href="#">Explore showcase <span className="ar">→</span></a>
            <a className="btn ghost" href="#">Submit a project</a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ display: "grid", gap: 16 }}>{stack.slice(0, 2).map(p => <Card key={p.id} p={p} />)}</div>
          <div style={{ display: "grid", gap: 16, marginTop: 30 }}>{stack.slice(2).map(p => <Card key={p.id} p={p} />)}<div className="pcard" style={{ display: "grid", placeItems: "center", minHeight: 120, background: "var(--paper-2)", borderStyle: "dashed", color: "var(--violet-deep)", fontWeight: 700, fontSize: 13.5 }}>+ 1,197 more</div></div>
        </div>
      </div>
    </div>
  );
}

const IDEAS = [
  { id: "i1", n: "01", label: "Featured Grid", short: "3 featured projects, clean", comp: <Idea1 /> },
  { id: "i2", n: "02", label: "Spotlight + List", short: "one hero + a side list", comp: <Idea2 /> },
  { id: "i3", n: "03", label: "Showcase Wall", short: "scrolling band on violet", comp: <Idea3 /> },
  { id: "i4", n: "04", label: "Pitch Split", short: "copy + stats + mini stack", comp: <Idea4 /> },
];

function App() {
  const [active, setActive] = React.useState("i1");
  const cur = IDEAS.find(i => i.id === active);
  return (
    <div className="page">
      <div className="top">
        <div className="kick">DuraNoia · Home page — AI Showcase section</div>
        <h1>Four ways to add the AI Showcase to the home page.</h1>
        <p className="lede">This new section sits between the Learn AI / AI Ecosystem features and the Newswire. Each idea pulls real community projects. Click between them to compare.</p>
      </div>
      <div className="tabs">
        {IDEAS.map(i => (
          <button key={i.id} className={"tab" + (i.id === active ? " is-active" : "")} onClick={() => setActive(i.id)}>
            <span className="n">{i.n}</span>{i.label}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-2)" }}>showing <b style={{ color: "var(--ink)" }}>{cur.label}</b> — {cur.short}</span>
      </div>
      <div className="frame">
        <div className="ctx">↑ … Learn AI / AI Ecosystem feature cards above … ↑</div>
        {cur.comp}
        <div className="ctx" style={{ borderBottom: 0, borderTop: "1px dashed var(--line)" }}>↓ … Newswire section below … ↓</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
