// Public, shareable creator profile — reads ?user=<slug>.
function PublicProfile() {
  const slug = new URLSearchParams(window.location.search).get("user") || "daniel-dura";
  const u = USERS[slug] || USERS["daniel-dura"];
  const projects = profileProjects(slug);

  // stats
  const totalLikes = projects.reduce((a, p) => a + p.likes, 0);
  const parseViews = (v) => v.endsWith("K") ? Math.round(parseFloat(v) * 1000) : parseInt(v, 10);
  const totalViews = projects.reduce((a, p) => a + (parseViews(p.views) || 0), 0);
  const viewsLabel = totalViews >= 1000 ? (totalViews / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(totalViews);
  const modelsUsed = new Set(projects.map(p => p.mark)).size;

  return (
    <div>
      <PublicBar />
      <div className="wrap">
        <div className="crumb"><a onClick={() => { window.location.href = "AI Showcase Page Wireframes.html"; }}>AI Showcase</a> / <b>{u.name}</b></div>

        {/* HEADER */}
        <div className="phead">
          <div className="pic" style={{ background: `linear-gradient(135deg, ${u.color}, #4c1d95)` }}>{u.initials}</div>
          <div style={{ flex: 1 }}>
            <div className="nm">{u.name}</div>
            <div className="role">{u.role}</div>
            <div className="hl">{u.headline}</div>
            <div className="meta">
              {u.location && <span>📍 {u.location}</span>}
              <span>🗓 Joined {u.joined}</span>
              {u.linkedin && <a href={"https://" + u.linkedin.replace(/^https?:\/\//, "")} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> {u.linkedin}</a>}
            </div>
          </div>
          <div className="actions">
            <span className="btn" onClick={() => { window.location.href = "Create Account Page Wireframes.html"; }}>Follow</span>
            {u.linkedin && <a className="pill ghost" href={"https://" + u.linkedin.replace(/^https?:\/\//, "")} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7 }}><LinkedInIcon /> Connect</a>}
          </div>
        </div>

        {/* STATS */}
        <div className="pstats">
          <div className="pstat"><div className="v">{projects.length}</div><div className="t">Projects</div></div>
          <div className="pstat"><div className="v">{viewsLabel}</div><div className="t">Total views</div></div>
          <div className="pstat"><div className="v">{totalLikes}</div><div className="t">Total likes</div></div>
          <div className="pstat"><div className="v">{modelsUsed}<small> / 10</small></div><div className="t">Models used</div></div>
        </div>

        {/* MODELS MASTERED */}
        {u.models && u.models.length > 0 && (
          <>
            <div className="sec-h" style={{ margin: "28px 0 14px" }}><h2>Models mastered</h2></div>
            <div className="mastered">
              {u.models.map(mk => (
                <div className="mm" key={mk}>
                  <span className="g"><MarkGlyph mark={mk} /></span>
                  {modelName(mk)}
                  <svg className="chk" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PROJECTS */}
        <div className="sec-h"><h2>Projects · {projects.length}</h2></div>
        {projects.length > 0
          ? <div className="grid">{projects.map(p => <MiniCard key={p.id} p={p} />)}</div>
          : <div style={{ color: "var(--muted)", fontSize: 14 }}>No published projects yet.</div>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PublicProfile />);
