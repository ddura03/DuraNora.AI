// News page — nav + hero + featured + filterable card grid.
function NewsNav() {
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
        <span className="nav-link" onClick={() => { window.location.href = "About Page Wireframes.html"; }}>About</span>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <span className="pill nav-pill ghost" onClick={() => {window.location.href = "Sign In Page Wireframes.html";}} style={{ background:"transparent", color:"var(--ink)", borderColor:"var(--violet-dark)", fontWeight:600 }}>Sign in</span>
        <span className="pill nav-pill solid" onClick={() => {window.location.href = "Create Account Page Wireframes.html";}} style={{ background:"var(--violet-deep)", borderColor:"var(--violet-deep)", color:"#fff", fontWeight:600 }}>Get started →</span>
      </div>
    </div>
  );
}

function NewsCard({ n }) {
  return (
    <div className="ncard">
      <div className="nimg">
        {n.company === "OpenAI" && <img src="logos/news-openai.png" alt="OpenAI" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Anthropic" && <img src="logos/news-anthropic.png" alt="Claude" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Google" && <img src="logos/news-google.png" alt="Google" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "xAI" && <img src="logos/news-xai.png" alt="xAI" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "DeepSeek" && <img src="logos/news-deepseek.png" alt="DeepSeek" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Perplexity" && <img src="logos/news-perplexity.png" alt="Perplexity" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Meta" && <img src="logos/news-meta.png" alt="Meta Llama" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Policy" && <img src="logos/news-eu.png" alt="European Union" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Cursor" && <img src="logos/news-cursor.png" alt="Cursor" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        {n.company === "Midjourney" && <img src="logos/news-midjourney.png" alt="Midjourney" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
        <div className="co"><span className="glyph g" style={{ width:20, height:20, fontSize:10 }}><MarkGlyph mark={n.mark} /></span>{n.company}</div>
      </div>
      <div className="nbody">
        <div className="nmeta"><b>{n.cat}</b><span>{n.date}</span></div>
        <h3>{n.title}</h3>
        <div className="nex">{n.excerpt}</div>
        <div className="nread">Read <span className="ar">→</span><span style={{ color:"var(--muted)", fontWeight:400, marginLeft:"auto" }}>{n.read}</span></div>
      </div>
    </div>
  );
}

function NewsPage() {
  const [cat, setCat] = React.useState("All");
  const featured = NEWS_ITEMS.find(n => n.featured) || NEWS_ITEMS[0];
  const rest = NEWS_ITEMS.filter(n => n !== featured);
  const list = cat === "All" ? rest : rest.filter(n => n.cat === cat);

  return (
    <div className="wf">
      <NewsNav />

      {/* HERO */}
      <div className="news-hero">
        <div className="super"><span className="live"></span>The Newswire · updated daily</div>
        <h1>What the labs <em>shipped today.</em></h1>
        <div className="sub">Model releases, funding, research, and policy — straight from the AI companies, summarized so you can keep up in five minutes.</div>
      </div>

      {/* FEATURED + GRID */}
      <div className="sec">
        {/* Featured */}
        <div className="featured" style={{ marginBottom:28 }}>
          <div className="img">
            {featured.company === "OpenAI" && <img src="logos/news-openai.png" alt="OpenAI" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
            <span className="tag">★ FEATURED · {featured.cat.toUpperCase()}</span>
            {featured.company !== "OpenAI" && <div className="imgnote">[ story image ]</div>}
          </div>
          <div className="body">
            <div className="meta">
              <span className="glyph" style={{ width:30, height:30, fontSize:14 }}><MarkGlyph mark={featured.mark} /></span>
              <div>
                <div style={{ fontWeight:700, fontSize:13.5 }}>{featured.company}</div>
                <div className="label">{featured.date} · {featured.read} read</div>
              </div>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="more">Read the full story <span className="ar">→</span></span>
          </div>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="chips">
            {NEWS_CATS.map(c => (
              <span key={c} className={"chip" + (c === cat ? " is-on" : "")} onClick={() => setCat(c)}>{c}</span>
            ))}
          </div>
          <span className="label">{list.length} stor{list.length === 1 ? "y" : "ies"}</span>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18 }}>
          {list.map(n => <NewsCard key={n.id} n={n} />)}
        </div>

        {/* Newsletter */}
        <div className="nl">
          <div>
            <h3>One short brief, every Friday.</h3>
            <p>The week's AI news, summarized. No hype, no doom — just what changed and why it matters.</p>
          </div>
          <div className="form">
            <input placeholder="you@domain.com" />
            <button>Subscribe →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.NewsPage = NewsPage;
