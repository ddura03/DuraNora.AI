// Generic pairing lesson page — reads ?a=<slug>&b=<slug>, renders the
// matching workflow lessons from PAIR_LESSONS.

const PLP_LOGO = { "@chatgpt":"logos/chatgpt.png","@claude":"logos/claude.svg","@gemini":"logos/gemini.webp","@perplexity":"logos/perplexity.png","@cursor":"logos/cursor.png","@midjourney":"logos/midjourney.png","@copilot":"logos/copilot.png","@llama":"logos/llama.png","@deepseek":"logos/deepseek.png","@grok":"logos/grok.webp" };
const PMark = ({ name, size=24 }) => {
  const mark = PL_MARK[name];
  return <span className="glyph" style={{ width:size, height:size, borderRadius:Math.round(size*0.22) }}>
    {PLP_LOGO[mark] ? <img src={PLP_LOGO[mark]} alt="" style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }}/> : <span style={{ fontFamily:"var(--mono)", fontWeight:800, color:"var(--violet-dark)" }}>{name[0]}</span>}
  </span>;
};

function PairLessonNav() {
  const link = (label, href) => <span className="nav-link" onClick={() => { window.location.href = href; }}>{label}</span>;
  return (
    <div className="navstrip">
      <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>
        <img src="duranoia-icon.svg" width="30" height="30" alt=""/>
        <div style={{ fontFamily:"var(--sans)", fontSize:18, fontWeight:800 }}><span>Dura</span><span style={{ color:"var(--violet-deep)" }}>Noia</span></div>
        <span style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--violet-dark)", letterSpacing:".18em", marginLeft:8, fontWeight:600 }}>AI EDUCATION PLATFORM</span>
      </div>
      <div className="links">
        {link("Learn AI","Learn AI Page Wireframes.html")}
        {link("AI Ecosystem","AI Ecosystem Page Wireframes.html")}
        {link("AI Showcase","AI Showcase Page Wireframes.html")}
        {link("News","News Page Wireframes.html")}
        {link("About","About Page Wireframes.html")}
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <span className="pill nav-pill ghost" onClick={() => { window.location.href = "Sign In Page Wireframes.html"; }} style={{ background:"transparent", color:"var(--ink)", borderColor:"var(--violet-dark)", fontWeight:600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => { window.location.href = "Create Account Page Wireframes.html"; }} style={{ background:"var(--violet-deep)", borderColor:"var(--violet-deep)", color:"#fff", fontWeight:600 }}>Get started →</span>
      </div>
    </div>
  );
}

function PairingLesson() {
  const q = new URLSearchParams(window.location.search);
  const found = findPairLessons(q.get("a") || "Perplexity", q.get("b") || "Claude");
  const data = found ? found.data : PAIR_LESSONS["Perplexity|Claude"];
  // model order as in the pairing title (steps[0] = first model)
  const A = data.steps[0].who, B = data.steps[1].who;
  const backSlug = (q.get("from") || A).toLowerCase();

  const [active, setActive] = React.useState(() => {
    const i = data.lessons.findIndex(l => !l.done);
    return i === -1 ? 0 : i;
  });
  const L = data.lessons[active];
  const done = data.lessons.filter(l => l.done).length;

  return (
    <div>
      <PairLessonNav />

      {/* header */}
      <div style={{ padding:"18px max(40px,4vw) 0" }}>
        <div className="back-web" style={{ fontFamily:"var(--mono)", fontSize:12.5, color:"var(--violet-deep)", fontWeight:700, marginBottom:18, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:7 }}
          onClick={() => { window.location.href = "Model Pairing Page Wireframes.html?model=" + backSlug; }}>
          <span className="bw-arrow" style={{ fontSize:16 }}>←</span> Back to {A} spider web
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <PMark name={A} size={48}/>
            <span style={{ color:"var(--violet-deep)", fontFamily:"var(--mono)", fontWeight:700, fontSize:20 }}>+</span>
            <PMark name={B} size={48}/>
          </div>
          <div>
            <div style={{ fontSize:26, fontWeight:800, letterSpacing:"-.02em", lineHeight:1.05 }}>{data.title}</div>
            <div className="label" style={{ marginTop:5 }}>{data.level} · {data.lessons.length} lessons · {data.dur}</div>
          </div>
        </div>
        <div style={{ fontSize:13.5, color:"var(--ink-2)", lineHeight:1.5, margin:"10px 0 0", maxWidth:"none", whiteSpace:"nowrap" }}>{data.sub}</div>
      </div>

      {/* workspace */}
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr 320px", marginTop:16, borderTop:"1.5px solid var(--line)", height:"calc(100vh - 250px)", minHeight:430 }}>
        {/* left lessons */}
        <div style={{ borderRight:"1.5px solid var(--line)", padding:"16px 16px", background:"#fff", overflowY:"auto" }}>
          <div className="label" style={{ marginBottom:12 }}>// Lessons &nbsp; {done} / {data.lessons.length}</div>
          {data.lessons.map((ls,i) => (
            <div key={i} onClick={() => setActive(i)} style={{ display:"flex", gap:11, alignItems:"flex-start", padding:"11px 10px", borderRadius:9, cursor:"pointer", background:i===active?"var(--paper-2)":"transparent", borderLeft:i===active?"3px solid var(--violet-deep)":"3px solid transparent", marginBottom:2 }}>
              <div style={{ width:20, height:20, borderRadius:"50%", flex:"0 0 20px", marginTop:1, border:`1.5px solid ${ls.done?"var(--ok)":"var(--line)"}`, background:ls.done?"var(--ok)":"#fff", display:"grid", placeItems:"center" }}>
                {ls.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:13.5, lineHeight:1.25 }}>{ls.n}. {ls.t}</div>
                <div className="label" style={{ marginTop:3, display:"flex", alignItems:"center", gap:6 }}>
                  {ls.who!=="both" ? <PMark name={ls.who} size={15}/> : <span style={{ fontSize:9 }}>BOTH</span>} · {ls.dur}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* center video + workflow */}
        <div style={{ padding:"16px max(24px,2vw)", overflowY:"auto" }}>
          <div className="label" style={{ marginBottom:10 }}>// Lesson {L.n} · {L.t}</div>
          <div style={{ position:"relative", borderRadius:12, overflow:"hidden", height:"clamp(220px, 40vh, 320px)", background:"repeating-linear-gradient(135deg,#ddd0f0 0 16px,#cbb9ec 16px 32px)", display:"grid", placeItems:"center" }}>
            <div style={{ position:"absolute", top:12, left:12, fontFamily:"var(--mono)", fontSize:11, letterSpacing:".06em", background:"#1a1325", color:"#fff", padding:"4px 9px", borderRadius:4 }}>▶ NOW PLAYING · 0:00 / {L.dur}</div>
            <div style={{ width:74, height:74, borderRadius:"50%", background:"rgba(255,255,255,.92)", display:"grid", placeItems:"center", boxShadow:"0 12px 30px rgba(76,29,149,.3)" }}>
              <div style={{ width:0, height:0, borderStyle:"solid", borderWidth:"13px 0 13px 21px", borderColor:"transparent transparent transparent #7c3aed", marginLeft:5 }}/>
            </div>
          </div>
          <div className="label" style={{ margin:"16px 0 10px", color:"var(--violet-deep)" }}>The workflow</div>
          <div style={{ display:"flex", alignItems:"stretch", gap:8 }}>
            {data.steps.map((s,i) => (
              <React.Fragment key={i}>
                <div style={{ flex:1, border:"1.5px solid var(--line)", borderRadius:11, padding:"14px 16px", background:"#fff" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:7 }}>
                    <PMark name={s.who} size={26}/>
                    <span style={{ fontWeight:800, fontSize:14 }}>{s.who}</span>
                    <span className="label" style={{ marginLeft:"auto" }}>Step {i+1}</span>
                  </div>
                  <div style={{ fontWeight:700, fontSize:13.5, marginBottom:4 }}>{s.t}</div>
                  <div style={{ fontSize:12.5, color:"var(--ink-2)", lineHeight:1.5 }}>{s.d}</div>
                </div>
                {i<data.steps.length-1 && <div style={{ display:"grid", placeItems:"center", color:"var(--violet-deep)", fontWeight:700, fontSize:18 }}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* right try-it */}
        <div style={{ borderLeft:"1.5px solid var(--line)", padding:"16px 20px", background:"#fff", overflowY:"auto" }}>
          <div className="label" style={{ marginBottom:12 }}>// Try it yourself</div>
          <div className="label" style={{ marginBottom:8 }}>The hand-off prompt</div>
          <pre style={{ whiteSpace:"pre-wrap", fontFamily:"var(--mono)", fontSize:12, lineHeight:1.6, background:"var(--paper)", border:"1.5px solid var(--line)", borderRadius:10, padding:14, color:"var(--ink)", margin:0 }}>{data.prompt}</pre>
          <div style={{ display:"flex", gap:8, marginTop:12 }}>
            <button className="pill" style={{ flex:1, textAlign:"center", background:"var(--violet-deep)", borderColor:"var(--violet-deep)", color:"#fff", fontWeight:700, border:0 }}>Open {A} →</button>
            <button className="pill" style={{ flex:1, textAlign:"center", background:"#fff", color:"var(--violet-deep)", fontWeight:700 }}>Open {B} →</button>
          </div>
          <div className="label" style={{ margin:"16px 0 8px" }}>Lesson note</div>
          <div style={{ fontFamily:"var(--hand)", fontSize:17, color:"var(--violet-deep)", lineHeight:1.35, whiteSpace:"pre-line" }}>{data.note}</div>
          <button style={{ width:"100%", marginTop:16, border:0, borderRadius:11, padding:"12px", background:"linear-gradient(180deg,#8b4bf0,var(--violet-deep))", color:"#fff", fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 8px 20px rgba(124,58,237,.28)" }}>✓ Mark complete & next →</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PairingLesson />);
