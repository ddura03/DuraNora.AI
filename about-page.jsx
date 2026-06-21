// About page
function AboutNav() {
  return (
    <div className="navstrip">
      <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>
        <img src="duranoia-icon.svg" alt="" width="30" height="30" />
        <div style={{ fontFamily:"var(--sans)", fontSize:18, fontWeight:800, letterSpacing:"-.01em" }}>
          <span style={{ color:"var(--ink)" }}>Dura</span><span style={{ color:"var(--violet-deep)" }}>Noia</span>
        </div>
        <span style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--violet-dark)", letterSpacing:".18em", marginLeft:8, fontWeight:600 }}>AI EDUCATION PLATFORM</span>
      </div>
      <div className="links">
        <span className="nav-link" onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>Learn AI</span>
        <span className="nav-link" onClick={() => { window.location.href = "AI Ecosystem Page Wireframes.html"; }}>AI Ecosystem</span>
        <span className="nav-link" onClick={() => { window.location.href = "AI Showcase Page Wireframes.html"; }}>AI Showcase</span>
        <span className="nav-link" onClick={() => { window.location.href = "News Page Wireframes.html"; }}>News</span>
        <span className="nav-link">About</span>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <span className="pill nav-pill ghost" onClick={() => {window.location.href = "Sign In Page Wireframes.html";}} style={{ background:"transparent", color:"var(--ink)", borderColor:"var(--violet-dark)", fontWeight:600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => {window.location.href = "Create Account Page Wireframes.html";}} style={{ background:"var(--violet-deep)", borderColor:"var(--violet-deep)", color:"#fff", fontWeight:600 }}>Get started →</span>
      </div>
    </div>
  );
}

const VALUES = [
  { n:"01", t:"Clarity over hype", d:"The AI conversation is full of noise. We teach what each tool actually does — and what it can't — without the breathless marketing." },
  { n:"02", t:"Hands-on, not theory", d:"You learn AI by using it. Every lesson is a short video plus a prompt you can run yourself, today." },
  { n:"03", t:"Stay current", d:"The field moves weekly. Our lessons and newswire update as models ship, so what you learn doesn't go stale." },
  { n:"04", t:"Tools, not magic", d:"Models are instruments in a toolbox. We show you which to reach for, and how to combine them." },
  { n:"05", t:"Know it back", d:"AI already knows a lot about you. Understanding how it works is how you stay in control of the relationship." },
  { n:"06", t:"For everyone", d:"From total beginners to power users — the curriculum meets you where you are and takes you further." },
];

function AboutPage() {
  return (
    <div className="wf">
      <AboutNav />

      {/* HERO */}
      <div className="about-hero">
        <div className="inner">
          <div className="kicker">◆ About DuraNoia</div>
          <h1>We help people understand the AI <em><br/>that already understands them.</em></h1>
          <div className="sub">DuraNoia is a field guide to modern AI — hands-on lessons, ecosystem maps, and a daily newswire that turn the overwhelming pace of AI into something you can actually keep up with.</div>
        </div>
      </div>

      {/* MISSION */}
      <div className="sec">
        <div className="mission">
          <div>
            <div className="kicker">Our mission</div>
            <h2>Turn AI anxiety into AI fluency.</h2>
            <p>Most people's relationship with AI is one-sided: the models learn everything about us, while we barely understand them. That gap breeds the low-grade unease the name <strong>DuraNoia</strong> plays on.</p>
            <p>We close that gap. Pick any of the ten models shaping how we work, and we'll teach you what it's good at, where it falls short, and how to chain it with the others to actually get things done.</p>
          </div>
          <div className="quote">"The AI knows you. Now know it back."</div>
        </div>
      </div>

      {/* NAME ORIGIN */}
      <div className="sec" style={{ paddingTop:0 }}>
        <div className="origin">
          <div className="kicker">Why "DuraNoia"?</div>
          <div className="big" style={{ marginTop:10 }}><span className="a">Dura</span><span className="b">Noia</span></div>
          <div style={{ fontSize:18, color:"var(--ink)", lineHeight:1.55, marginTop:16, maxWidth:"60ch" }}>
            A nod to the quiet paranoia of living alongside systems that know us better than we know them — flipped into something durable and empowering. The cure for that unease isn't fear. It's understanding.
          </div>
          <div className="row">
            <div className="chip"><div className="t">Dura —</div><div className="d">durable, lasting know-how that outlives the hype cycle</div></div>
            <div className="chip"><div className="t">Noia —</div><div className="d">from paranoia: the instinct to question what AI is really doing</div></div>
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div className="sec" style={{ paddingTop:0 }}>
        <div className="kicker">The founder</div>
        <h2 style={{ fontSize:30, letterSpacing:"-.02em", margin:"8px 0 24px" }}>Built by someone learning in public.</h2>
        <div className="founder">
          <div className="photo">
            <img src="founder-headshot.jpg" alt="Daniel Dura" />
            <div className="ring"></div>
          </div>
          <div>
            <h2>Daniel Dura</h2>
            <div className="role">Founder &amp; Creator</div>
            <p>I started DuraNoia because keeping up with AI felt like a second job — and most resources were either too shallow or too academic. I wanted one place that taught the tools honestly, showed how they fit together, and stayed current as the field moved.</p>
            <p>If that resonates, you're exactly who this is for. Learn the models, chain them together, and stop feeling like AI is happening <em>to</em> you.</p>
            <div className="socials">
              <a href="https://www.linkedin.com/in/daniel-dura03/" target="_blank" rel="noopener noreferrer" onClick={(e) => { e.preventDefault(); window.open("https://www.linkedin.com/in/daniel-dura03/", "_blank", "noopener"); }} style={{ cursor:"pointer" }}>LinkedIn ↗</a>
              <a style={{ cursor:"pointer" }}>X / Twitter ↗</a>
              <a style={{ cursor:"pointer" }}>YouTube ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sec" style={{ paddingTop:0 }}>
        <div className="cta">
          <h2>Ready to know it back?</h2>
          <p>Start with any of the ten most-used AI models. Free to begin, no account required.</p>
          <div className="btns">
            <span className="btn solid" onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>Explore the models →</span>
            <span className="btn ghost" onClick={() => { window.location.href = "AI Ecosystem Page Wireframes.html"; }}>See the ecosystem</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.AboutPage = AboutPage;
