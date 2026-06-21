// Four versions of the "Model Pairing" page — what you see after clicking a
// node (e.g. Claude) in the AI Ecosystem spider web.

// Marks: simple SVG glyphs so this is self-contained.
const G = {
  claude:     <span style={{color:"#d97757",fontSize:18}}>✳</span>,
  chatgpt:    <span style={{fontSize:16}}>◎</span>,
  perplexity: <span style={{color:"#7c3aed",fontSize:16}}>✦</span>,
  cursor:     <span style={{fontSize:15}}>❯_</span>,
  midjourney: <span style={{fontSize:15}}>⛵</span>,
  gemini:     <span style={{color:"#4285f4",fontSize:16}}>✦</span>,
};

const MODEL = { slug:"claude", name:"Claude", company:"Anthropic", glyph:G.claude,
  role:"Reasoning & writing",
  blurb:"Claude is the careful one — long-document reasoning, nuanced writing, and code review. It shines in the middle of a workflow: take messy inputs, think hard, hand off something clean." };

// Claude's pairings with other models
const PAIRS = [
  { with:"Perplexity", glyph:G.perplexity, dir:"in",  flow:"Perplexity → Claude",
    why:"Perplexity gathers cited, live facts; Claude synthesizes them into a structured, well-written piece.",
    use:"Research reports, briefs, literature reviews",
    steps:[ ["Perplexity","Gather sources & live facts"], ["Claude","Synthesize into a written draft"] ] },
  { with:"ChatGPT", glyph:G.chatgpt, dir:"both", flow:"Claude ⇄ ChatGPT",
    why:"Use Claude for careful reasoning and editing, ChatGPT for fast ideation, images, and its Code Interpreter.",
    use:"Drafting, brainstorming, data analysis",
    steps:[ ["ChatGPT","Brainstorm angles fast"], ["Claude","Refine & pressure-test the best one"] ] },
  { with:"Cursor", glyph:G.cursor, dir:"out", flow:"Claude → Cursor",
    why:"Plan and review architecture in Claude, then implement across files in Cursor (which runs Claude under the hood).",
    use:"Shipping reviewed, working code",
    steps:[ ["Claude","Spec & break down the work"], ["Cursor","Implement in the editor"] ] },
  { with:"Midjourney", glyph:G.midjourney, dir:"out", flow:"Claude → Midjourney",
    why:"Claude writes art-directed prompts and mood language; Midjourney turns them into polished visuals.",
    use:"Brand moodboards, concept art",
    steps:[ ["Claude","Write art-directed prompts"], ["Midjourney","Generate visual options"] ] },
];

const Arrow = ({dir}) => dir==="both"
  ? <span style={{color:"#7c3aed",fontFamily:"var(--mono)"}}>⇄</span>
  : <span style={{color:"#7c3aed",fontFamily:"var(--mono)"}}>→</span>;

function ModelHeader({ compact }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14 }}>
      <div className="glyph" style={{ width: compact?44:58, height: compact?44:58, fontSize:22 }}>{MODEL.glyph}</div>
      <div>
        <div style={{ fontWeight:800, fontSize: compact?20:26, letterSpacing:"-.02em" }}>{MODEL.name}</div>
        <div className="label">{MODEL.company} · {MODEL.role}</div>
      </div>
    </div>
  );
}

function StepChips({ steps, bg }) {
  return (
    <div style={{ display:"flex", alignItems:"stretch", gap:8, flexWrap:"wrap" }}>
      {steps.map((s,i) => (
        <React.Fragment key={i}>
          <div style={{ background: bg||"var(--paper-2)", border:"1px solid var(--line)", borderRadius:10, padding:"10px 13px", minWidth:150, flex:1 }}>
            <div style={{ fontWeight:700, fontSize:13 }}>{s[0]}</div>
            <div style={{ fontSize:11.5, color:"var(--ink-2)", marginTop:3 }}>{s[1]}</div>
          </div>
          {i<steps.length-1 && <div style={{ display:"grid", placeItems:"center", color:"var(--violet-deep)", fontWeight:700 }}>→</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ───────────── V1 · Pairing Cards Grid ───────────── */
function V1(){
  return (
    <div className="frame">
      <div className="sec">
        <div className="crumb">AI Ecosystem / <b>{MODEL.name}</b></div>
        <ModelHeader />
        <div style={{ fontSize:15, color:"var(--ink-2)", lineHeight:1.55, margin:"14px 0 26px", maxWidth:"70ch" }}>{MODEL.blurb}</div>
        <div className="eyebrow" style={{ marginBottom:14 }}>◆ Pairs well with</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {PAIRS.map((p,i)=>(
            <div key={i} style={{ background:"#fff", border:"1.5px solid var(--line)", borderRadius:14, padding:18 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div className="glyph" style={{ width:34, height:34, fontSize:15 }}>{MODEL.glyph}</div>
                <Arrow dir={p.dir}/>
                <div className="glyph" style={{ width:34, height:34, fontSize:15 }}>{p.glyph}</div>
                <div style={{ fontWeight:800, fontSize:15, marginLeft:4 }}>{MODEL.name} + {p.with}</div>
              </div>
              <div style={{ fontSize:13, color:"var(--ink-2)", lineHeight:1.5 }}>{p.why}</div>
              <div className="label" style={{ marginTop:12, color:"var(--violet-deep)" }}>Best for</div>
              <div style={{ fontSize:12.5, fontWeight:600, marginTop:3 }}>{p.use}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── V2 · Hub diagram + detail ───────────── */
function V2(){
  const [sel,setSel] = React.useState(0);
  const p = PAIRS[sel];
  const angle = (i)=> (-90 + i*(360/PAIRS.length)) * Math.PI/180;
  const R=120, cx=180, cy=170;
  return (
    <div className="frame">
      <div className="sec">
        <div className="crumb">AI Ecosystem / <b>{MODEL.name}</b></div>
        <div style={{ display:"grid", gridTemplateColumns:"380px 1fr", gap:30, alignItems:"center" }}>
          {/* hub */}
          <div style={{ position:"relative", height:340 }}>
            <svg width="360" height="340" style={{ position:"absolute", inset:0 }}>
              {PAIRS.map((_,i)=>{ const a=angle(i); return <line key={i} x1={cx} y1={cy} x2={cx+R*Math.cos(a)} y2={cy+R*Math.sin(a)} stroke={i===sel?"#7c3aed":"#cdbce8"} strokeWidth={i===sel?2.5:1.2} strokeDasharray={i===sel?"0":"4 4"} />; })}
            </svg>
            <div className="glyph" style={{ position:"absolute", left:cx-32, top:cy-32, width:64, height:64, fontSize:24, background:"#7c3aed", borderColor:"#7c3aed", color:"#fff" }}>{MODEL.glyph}</div>
            {PAIRS.map((pp,i)=>{ const a=angle(i); const x=cx+R*Math.cos(a), y=cy+R*Math.sin(a); return (
              <button key={i} onClick={()=>setSel(i)} style={{ position:"absolute", left:x-26, top:y-26, width:52, height:52, borderRadius:12, border:`1.5px solid ${i===sel?"#7c3aed":"var(--line)"}`, background: i===sel?"var(--paper-2)":"#fff", cursor:"pointer", display:"grid", placeItems:"center", boxShadow:i===sel?"0 6px 16px rgba(124,58,237,.22)":"none" }}>
                {pp.glyph}
              </button> ); })}
          </div>
          {/* detail */}
          <div>
            <ModelHeader compact />
            <div style={{ marginTop:18, padding:18, background:"#fff", border:"1.5px solid var(--violet-deep)", borderRadius:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"var(--mono)", fontWeight:700, fontSize:14, marginBottom:10 }}>
                {MODEL.name} <Arrow dir={p.dir}/> {p.with}
              </div>
              <div style={{ fontSize:13.5, color:"var(--ink-2)", lineHeight:1.55 }}>{p.why}</div>
              <div className="label" style={{ marginTop:14, marginBottom:8, color:"var(--violet-deep)" }}>The flow</div>
              <StepChips steps={p.steps} />
            </div>
            <div className="label" style={{ marginTop:12 }}>Click another node to explore a different pairing.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── V3 · Workflow recipes (stacked) ───────────── */
function V3(){
  return (
    <div className="frame">
      <div className="sec">
        <div className="crumb">AI Ecosystem / <b>{MODEL.name}</b></div>
        <ModelHeader />
        <div style={{ fontSize:15, color:"var(--ink-2)", lineHeight:1.55, margin:"14px 0 8px", maxWidth:"70ch" }}>{MODEL.blurb}</div>
        <div className="eyebrow" style={{ margin:"20px 0 14px" }}>◆ Workflows that use {MODEL.name}</div>
        <div style={{ display:"grid", gap:16 }}>
          {PAIRS.map((p,i)=>(
            <div key={i} style={{ background:"#fff", border:"1.5px solid var(--line)", borderRadius:14, padding:"18px 20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:14 }}>
                <div style={{ fontWeight:800, fontSize:16 }}>{p.use}</div>
                <span className="label">{p.flow}</span>
              </div>
              <StepChips steps={p.steps} />
              <div style={{ fontSize:12.5, color:"var(--ink-2)", lineHeight:1.5, marginTop:12 }}>{p.why}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────── V4 · Comparison table ───────────── */
function V4(){
  return (
    <div className="frame">
      <div className="sec">
        <div className="crumb">AI Ecosystem / <b>{MODEL.name}</b></div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16 }}>
          <ModelHeader />
          <a className="btn ghost" href="#">Open {MODEL.name} lessons →</a>
        </div>
        <div style={{ fontSize:15, color:"var(--ink-2)", lineHeight:1.55, margin:"14px 0 24px", maxWidth:"70ch" }}>{MODEL.blurb}</div>
        <div style={{ background:"#fff", border:"1.5px solid var(--line)", borderRadius:14, overflow:"hidden" }}>
          <div style={{ display:"grid", gridTemplateColumns:"180px 1fr 200px 120px", padding:"12px 18px", background:"var(--paper-2)", borderBottom:"1.5px solid var(--line)" }} className="label">
            <span>Pair with</span><span>Why it works</span><span>Best for</span><span>Direction</span>
          </div>
          {PAIRS.map((p,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"180px 1fr 200px 120px", padding:"15px 18px", borderBottom:i<PAIRS.length-1?"1px solid var(--line)":"0", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div className="glyph" style={{ width:30, height:30, fontSize:13 }}>{p.glyph}</div>
                <span style={{ fontWeight:700, fontSize:13.5 }}>{p.with}</span>
              </div>
              <div style={{ fontSize:12.5, color:"var(--ink-2)", lineHeight:1.5, paddingRight:14 }}>{p.why}</div>
              <div style={{ fontSize:12.5, fontWeight:600 }}>{p.use}</div>
              <div style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--violet-deep)" }}>{p.flow}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const VERS=[
  {id:"v1",n:"01",label:"Pairing Cards",short:"2x2 grid of pairing cards",comp:<V1/>},
  {id:"v2",n:"02",label:"Hub Diagram",short:"interactive spokes + detail",comp:<V2/>},
  {id:"v3",n:"03",label:"Workflow Recipes",short:"stacked step-by-step flows",comp:<V3/>},
  {id:"v4",n:"04",label:"Comparison Table",short:"sortable-style table",comp:<V4/>},
];

function App(){
  const [a,setA]=React.useState("v1");
  const cur=VERS.find(v=>v.id===a);
  return (
    <div className="page">
      <div className="top">
        <div className="kick">DuraNoia · AI Ecosystem — model pairing page</div>
        <h1>Four ways to show "how to pair this model."</h1>
        <p className="lede">This is the page you land on after clicking a node (here, Claude) in the spider web. Each version answers: which models pair with this one, why, and how. Click between them to compare.</p>
      </div>
      <div className="tabs">
        {VERS.map(v=>(
          <button key={v.id} className={"tab"+(v.id===a?" is-active":"")} onClick={()=>setA(v.id)}>
            <span className="n">{v.n}</span>{v.label}
          </button>
        ))}
        <span style={{flex:1}}/>
        <span style={{fontFamily:"var(--mono)",fontSize:11,color:"var(--ink-2)"}}>showing <b style={{color:"var(--ink)"}}>{cur.label}</b> — {cur.short}</span>
      </div>
      {cur.comp}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
