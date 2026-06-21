// V3 — Workspace / Dashboard (interactive)
// Click a lesson on the left → everything on the right updates.
// Mark lessons complete with a checkmark.
function ModelPageV3() {
  // Which model? Read ?model=<slug> from the URL (default chatgpt).
  const slug = (new URLSearchParams(window.location.search).get("model") || "chatgpt").toLowerCase();
  const MODEL = MODELS_CATALOG[slug] || MODELS_CATALOG.chatgpt;
  const LESSONS = MODEL.lessons;
  const COMPARE = MODEL.compare;

  // Restore completed lessons from the store; start at first incomplete lesson.
  const stored = (window.DStore ? DStore.completed(slug) : []);
  const firstIncomplete = (() => {
    for (let i = 0; i < LESSONS.length; i++) if (stored.indexOf(i) === -1) return i;
    return 0;
  })();

  const [activeIdx, setActiveIdx] = React.useState(firstIncomplete);
  const [completed, setCompleted] = React.useState(() => new Set(stored));
  const [hoverDone, setHoverDone] = React.useState(false);

  const lesson = LESSONS[activeIdx];

  // Persist completed set whenever it changes.
  React.useEffect(() => {
    if (window.DStore) DStore.setCompletedSet(slug, Array.from(completed));
  }, [completed]);

  // Persist "resume" (last lesson viewed) whenever the active lesson changes.
  React.useEffect(() => {
    if (!window.DStore) return;
    DStore.setResume({
      slug, model: MODEL.name, mark: MODEL.mark,
      lessonIdx: activeIdx, lessonNo: lesson.n,
      lessonTitle: lesson.title, level: lesson.level, dur: lesson.dur
    });
  }, [activeIdx]);

  function toggleComplete(idx) {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function go(delta) {
    const next = Math.max(0, Math.min(LESSONS.length - 1, activeIdx + delta));
    setActiveIdx(next);
  }

  function markCurrentDoneAndNext() {
    setCompleted(prev => new Set(prev).add(activeIdx));
    if (activeIdx < LESSONS.length - 1) setActiveIdx(activeIdx + 1);
  }

  const isCurrentComplete = completed.has(activeIdx);

  return (
    <div className="wf">

      <div className="nav-strip">
        <div className="ident" style={{ cursor:"pointer" }} onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>
          <img src="duranoia-icon.svg" alt="" width="30" height="30" />
          <span style={{ fontFamily:"var(--sans)", fontSize:19, fontWeight:800, letterSpacing:"-.01em" }}>
            <span style={{ color:"var(--ink)" }}>Dura</span><span style={{ color:"var(--violet-deep)" }}>Noia</span>
          </span>
        </div>
        <div className="crumbs">Learn AI / <b>{MODEL.name}</b> / Lesson {lesson.n}</div>
        <div style={{ display:"flex", gap:8 }}>
          <span className="pill save-pill">Save progress</span>
        </div>
      </div>

      {/* COMPACT HEADER */}
      <div className="sec" style={{ paddingTop:18, paddingBottom:18, borderBottom:"1px solid var(--line)", background:"var(--paper)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:18 }}>
          <div className="id-glyph" style={{ width:54, height:54, fontSize:24 }}><MarkGlyph mark={MODEL.mark} /></div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:14 }}>
              <div style={{ fontSize:26, fontWeight:800, letterSpacing:"-.01em" }}>{MODEL.name}</div>
              <span className="label">{MODEL.by} · {MODEL.version}</span>
            </div>
            <div style={{ fontSize:14, color:"var(--ink-2)", marginTop:2 }}>{MODEL.tagline}</div>
          </div>
        </div>
      </div>

      {/* THREE-PANE WORKSPACE */}
      <div style={{ display:"grid", gridTemplateColumns:"260px 1fr 340px", height:"calc(100vh - 132px)", minHeight:520, background:"var(--paper)", overflow:"hidden" }}>
        {/* LEFT PANE — lesson list */}
        <div className="pane" style={{ borderRadius:0, borderLeft:0, borderTop:0, borderBottom:0, borderRight:"1px solid var(--line)" }}>
          <div className="pane-head">
            <span>// LESSONS</span>
            <span>{completed.size} / {LESSONS.length}</span>
          </div>
          <div className="pane-body" style={{ padding:0, gap:0, overflowY:"auto" }}>
            {LESSONS.map((L, i) => {
              const isOn   = i === activeIdx;
              const isDone = completed.has(i);
              return (
                <div
                  key={L.n}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"11px 14px", borderBottom:"1px solid var(--line)",
                    background: isOn ? "var(--paper-2)" : "transparent",
                    borderLeft: isOn ? "3px solid var(--violet-deep)" : "3px solid transparent",
                    cursor:"pointer",
                    transition:"background-color .15s ease, border-color .15s ease",
                  }}
                  onMouseEnter={(e) => { if (!isOn) e.currentTarget.style.background = "rgba(124,58,237,0.05)"; }}
                  onMouseLeave={(e) => { if (!isOn) e.currentTarget.style.background = "transparent"; }}
                >
                  <span
                    onClick={(e) => { e.stopPropagation(); toggleComplete(i); }}
                    title={isDone ? "Mark incomplete" : "Mark complete"}
                    style={{
                      width:22, height:22, borderRadius:"50%",
                      border:`1.5px solid ${isDone ? "var(--violet-deep)" : "var(--line)"}`,
                      background: isDone ? "var(--violet-deep)" : "#fff",
                      color:"#fff", display:"grid", placeItems:"center",
                      fontSize:11, fontWeight:700, cursor:"pointer", flexShrink:0,
                      transition:"all .15s ease"
                    }}
                  >{isDone ? "✓" : ""}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12.5, fontWeight: isOn ? 700 : 500, color: isOn ? "var(--violet-dark)" : "var(--ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                      {L.n}. {L.title}
                    </div>
                    <div className="label" style={{ marginTop:2, fontSize:9.5 }}>{L.level} · {L.dur}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER PANE — video + content */}
        <div className="pane" style={{ borderRadius:0, border:0 }}>
          <div className="pane-head" style={{ background:"#fff" }}>
            <span>// LESSON {lesson.n} · {lesson.title.toUpperCase()}</span>
            <span style={{ display:"flex", gap:14, alignItems:"center" }}>
              <span
                onClick={() => activeIdx > 0 && go(-1)}
                className={"lesson-nav prev" + (activeIdx === 0 ? " is-disabled" : "")}
              >
                <span className="a">←</span> Prev
              </span>
              <span
                onClick={() => activeIdx < LESSONS.length - 1 && go(+1)}
                className={"lesson-nav next" + (activeIdx === LESSONS.length - 1 ? " is-disabled" : "")}
                style={{ color:"var(--violet-deep)", fontWeight:700 }}
              >
                Next <span className="a">→</span>
              </span>
            </span>
          </div>
          <div className="pane-body" style={{ padding:20, overflowY:"auto" }}>
            <div className="vid" style={{ height:230 }}>
              <span className="tag">▶ NOW PLAYING · 0:00 / {lesson.dur}</span>
              <div className="play"></div>
              <span className="dur">{lesson.dur}</span>
            </div>
            <div style={{ marginTop:18 }}>
              <div className="label" style={{ color:"var(--violet-deep)", marginBottom:6 }}>{lesson.level} · Lesson {lesson.n}</div>
              <h2 style={{ fontSize:22, marginTop:0 }}>{lesson.desc}</h2>
            </div>

            {/* In-content callout */}
            <div className="box solid" style={{ padding:14, marginTop:18, background:"var(--paper-2)" }}>
              <div className="label" style={{ color:"var(--violet-deep)" }}>▶ {lesson.callout.label}</div>
              <div style={{ marginTop:8, fontSize:14, color:"var(--ink)", lineHeight:1.5 }}>{lesson.callout.text}</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE — sandbox / notes */}
        <div className="pane" style={{ borderRadius:0, borderRight:0, borderTop:0, borderBottom:0, borderLeft:"1px solid var(--line)" }}>
          <div className="pane-head">
            <span>// TRY IT YOURSELF</span>
            <span style={{ color:"var(--violet-deep)" }}>● live</span>
          </div>
          <div className="pane-body" style={{ background:"#fafafa", overflowY:"auto" }}>
            <div className="label">Prompt</div>
            <div className="code" style={{ minHeight:120, background:"#fff", whiteSpace:"pre-wrap" }}>
              {lesson.prompt}
            </div>
            <button className="pill" style={{ background:"var(--violet-deep)", borderColor:"var(--violet-deep)", color:"#fff", fontWeight:700, marginTop:8, cursor:"pointer" }}>Try in {MODEL.name} →</button>

            <div className="label" style={{ marginTop:18 }}>Lesson note</div>
            <div className="box" style={{ background:"#fff", padding:12, minHeight:90 }}>
              <div className="annot" style={{ whiteSpace:"pre-line" }}>{lesson.note}</div>
            </div>

            {/* Mark-complete CTA */}
            <div style={{ marginTop:18 }}>
              {!isCurrentComplete ? (
                <button
                  onClick={markCurrentDoneAndNext}
                  className="complete-btn"
                  style={{ width:"100%", background:"var(--violet-deep)", border:"1.5px solid var(--violet-deep)", color:"#fff", fontWeight:700, fontSize:12.5, padding:"12px 18px", cursor:"pointer", borderRadius:999, fontFamily:"var(--mono)", letterSpacing:".04em" }}
                >
                  <span className="chk">✓</span> Mark complete &amp; next <span className="nx">→</span>
                </button>
              ) : (
                <button
                  onClick={() => toggleComplete(activeIdx)}
                  onMouseEnter={() => setHoverDone(true)}
                  onMouseLeave={() => setHoverDone(false)}
                  style={{
                    width:"100%",
                    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
                    color: hoverDone ? "#fff" : "var(--violet-deep)",
                    background: hoverDone ? "var(--violet-deep)" : "var(--paper-2)",
                    border: "1.5px solid var(--violet-deep)",
                    borderRadius: 999,
                    fontFamily:"var(--mono)", fontSize:12, fontWeight:700, letterSpacing:".06em",
                    padding:"12px 18px", cursor:"pointer", transition:"all .2s ease",
                  }}
                  title="Click to mark incomplete"
                >
                  <span style={{ display:"inline-block", transition:"transform .4s cubic-bezier(.65,.05,.36,1)", transform: hoverDone ? "rotate(-180deg)" : "rotate(0deg)" }}>{hoverDone ? "↺" : "✓"}</span>
                  {hoverDone ? "Mark incomplete" : "Lesson complete"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ModelPageV3 = ModelPageV3;
