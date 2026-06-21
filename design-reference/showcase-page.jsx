// AI Showcase — Handshake-style grid, Instagram-style detail, + project submission.

const EyeIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const HeartIcon = ({ fill }) => <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "#e0245e" : "none"} stroke={fill ? "#e0245e" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>;
const CommentIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1-4a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 9-8.4 8.5 8.5 0 0 1 8 8.4Z"/></svg>;
const ExtIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>;

const ME = { name: "Daniel Dura", initials: "DD", color: "#7c3aed", role: "Founder · DuraNoia" };
const modelName = (mark) => (AI_CATALOG.find(m => m.mark === mark) || {}).name;

function Cover({ p, children }) {
  if (p.coverImg) {
    return <div className="cover" style={{ background: "#1a1325" }}><img src={p.coverImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />{children}</div>;
  }
  return <div className="cover" style={{ background: p.grad }}>{children}<div className="mono">{p.mono}</div></div>;
}

function ProjectCard({ p, onOpen }) {
  return (
    <div className="pjcard" onClick={() => onOpen(p)}>
      <Cover p={p}>
        <div className="badges">
          <span className="views"><EyeIcon /> {p.views}</span>
          {modelName(p.mark) && <span className="mbadge"><span className="g"><MarkGlyph mark={p.mark} /></span> {modelName(p.mark)}</span>}
          {p.hidden && <span className="feat" style={{ background: "#5a4e75" }}>Private</span>}
          {p.featured && !p.hidden && <span className="feat">Featured</span>}
        </div>
      </Cover>
      <div className="pb">
        <div className="pt">{p.title}</div>
        <div className="auth">
          <span className="av" style={{ background: p.author.color }}>{p.author.initials}</span>
          By {p.author.name}{p.author.role ? " · " + p.author.role : ""}
        </div>
        <div className="pm">
          <span className="x"><HeartIcon /> {p.likes}</span>
          <span className="x"><CommentIcon /> {p.comments.length}</span>
          <span className="x" style={{ marginLeft: "auto", color: "var(--violet-deep)" }}><ExtIcon /> View</span>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ p, onClose, onUnpublish, onDelete }) {
  const initLiked = window.DStore ? DStore.showcase().likedByMe.indexOf(p.id) !== -1 : false;
  const [liked, setLiked] = React.useState(initLiked);
  const [likes, setLikes] = React.useState(p.likes);
  const [comments, setComments] = React.useState(p.comments);
  const [draft, setDraft] = React.useState("");
  const [confirmDel, setConfirmDel] = React.useState(false);

  const toggleLike = () => {
    if (window.DStore) {
      const s = DStore.toggleLike(p.id, p.likes);
      setLiked(s.likedByMe.indexOf(p.id) !== -1);
      setLikes(s.likes[p.id]);
    } else {
      setLiked(l => !l); setLikes(n => n + (liked ? -1 : 1));
    }
  };
  const post = () => {
    const t = draft.trim();
    if (!t) return;
    const c = { who: ME, text: t, when: "now" };
    if (window.DStore) DStore.addComment(p.id, c);
    setComments(cs => [...cs, c]);
    setDraft("");
  };

  return (
    <div className="pv-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="pv">
        <div className="pv-media" style={{ background: p.coverImg ? "#1a1325" : p.grad }}>
          {p.coverImg ? <img src={p.coverImg} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> : <div className="mono">{p.mono}</div>}
          <span className="views vchip"><EyeIcon /> {p.views} views</span>
        </div>

        <div className="pv-side">
          <div className="pv-top">
            <span className="av" style={{ background: p.author.color, cursor: "pointer" }} onClick={() => { window.location.href = "Public Profile Page Wireframes.html?user=" + p.author.slug; }}>{p.author.initials}</span>
            <div style={{ flex: 1 }}>
              <div className="nm" style={{ cursor: "pointer" }} onClick={() => { window.location.href = "Public Profile Page Wireframes.html?user=" + p.author.slug; }}>{p.author.name}</div>
              <div className="rl">{p.author.role || "DuraNoia member"}</div>
            </div>
            {modelName(p.mark) && <span className="mbadge" style={{ margin: 0 }}><span className="g"><MarkGlyph mark={p.mark} /></span> {modelName(p.mark)}</span>}
            <div className="pv-x" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></div>
          </div>

          <div className="pv-desc">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="pv-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
            <a className="viewproj" href={p.link || "#"} target="_blank" rel="noopener noreferrer">View project <ExtIcon /></a>
            <a className="viewproj" href={"Public Project Page Wireframes.html?id=" + p.id} style={{ background: "#fff", color: "var(--violet-deep)", border: "1.5px solid var(--line)", marginLeft: 8 }}>Public page <ExtIcon /></a>

            {p.owner && (
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                <div className="label" style={{ marginBottom: 9 }}>Manage your post</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => onUnpublish(p)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1.5px solid var(--line)", background: "#fff", color: "var(--ink)", borderRadius: 10, padding: "10px 14px", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    {p.hidden
                      ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg> Make public again</>
                      : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68M6.6 6.6A13.3 13.3 0 0 0 2 11s3.5 7 10 7a9 9 0 0 0 5.4-1.6M2 2l20 20"/></svg> Remove from public</>}
                  </button>

                  {!confirmDel ? (
                    <button
                      onClick={() => setConfirmDel(true)}
                      style={{ display: "inline-flex", alignItems: "center", gap: 7, border: "1.5px solid #f0c4c4", background: "#fff", color: "#c0392b", borderRadius: 10, padding: "10px 14px", fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
                      Delete project
                    </button>
                  ) : (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fdf0f0", border: "1.5px solid #f0c4c4", borderRadius: 10, padding: "7px 10px" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: "#c0392b" }}>Delete permanently?</span>
                      <button onClick={() => onDelete(p)} style={{ border: 0, background: "#c0392b", color: "#fff", borderRadius: 8, padding: "7px 12px", fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Yes, delete</button>
                      <button onClick={() => setConfirmDel(false)} style={{ border: "1.5px solid var(--line)", background: "#fff", color: "var(--ink-2)", borderRadius: 8, padding: "7px 12px", fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                    </div>
                  )}
                </div>
                <div className="label" style={{ marginTop: 9, textTransform: "none", letterSpacing: 0, fontSize: 11.5 }}>
                  {p.hidden ? "Hidden from the public showcase — still in My Projects." : "“Remove from public” keeps it in My Projects but hides it from everyone else."}
                </div>
              </div>
            )}
          </div>

          <div className="pv-comments">
            {comments.length === 0 && <div style={{ color: "var(--muted)", fontSize: 13, padding: "8px 0" }}>No comments yet — be the first.</div>}
            {comments.map((c, i) => (
              <div className="cm" key={i}>
                <span className="av" style={{ background: c.who.color }}>{c.who.initials}</span>
                <div>
                  <div className="ct"><b>{c.who.name}</b> {c.text}</div>
                  <div className="cw">{c.when}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pv-actions">
            <span className={"heart" + (liked ? " on" : "")} onClick={toggleLike}><HeartIcon fill={liked} /> {likes}</span>
            <span className="heart" style={{ cursor: "default" }}><CommentIcon /> {comments.length}</span>
          </div>

          <div className="pv-input">
            <input placeholder="Add a comment…" value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") post(); }} />
            <button onClick={post}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Submission modal ----
function SubmitModal({ onClose, onPublish }) {
  const [link, setLink] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [mark, setMark] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [coverImg, setCoverImg] = React.useState(null);
  const [grad, setGrad] = React.useState(GRAD.violet);

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setCoverImg(r.result);
    r.readAsDataURL(f);
  };

  const initials = ((title.trim().match(/[A-Za-z0-9]+/g) || ["PR"]).map(w => w[0]).join("").slice(0, 2) || "PR").toUpperCase();
  const valid = link.trim() && title.trim() && mark;

  const publish = () => {
    if (!valid) return;
    onPublish({
      id: "u-" + Date.now(),
      title: title.trim(),
      mono: initials,
      grad,
      coverImg,
      link: link.trim().match(/^https?:\/\//) ? link.trim() : "https://" + link.trim(),
      author: ME,
      mark,
      views: "0",
      likes: 0,
      featured: false,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean).slice(0, 4),
      desc: desc.trim() || "No description yet.",
      comments: [],
      owner: true,
    });
  };

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="mtop">
          <h3>Submit a project</h3>
          <div className="mx" onClick={onClose}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></div>
        </div>
        <div className="mbody">
          <div className="fld">
            <label>Project link <span style={{ color: "#c0397b" }}>*</span></label>
            <input placeholder="yourproject.com  ·  opens when people click “View project”" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <div className="fld">
            <label>Title <span style={{ color: "#c0397b" }}>*</span></label>
            <input placeholder="e.g. InfraMap — live US grid dashboard" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="fld">
            <label>Cover image</label>
            <div className="upzone">
              <input type="file" accept="image/*" onChange={onFile} />
              {coverImg
                ? <img src={coverImg} alt="" />
                : <div className="gradprev" style={{ background: grad }}>{initials}</div>}
              {!coverImg && <div className="ph" style={{ position: "absolute", bottom: 8, left: 0, right: 0, color: "#fff", fontSize: 11.5, textShadow: "0 1px 4px rgba(0,0,0,.4)" }}>Click to upload a screenshot — or pick a color below</div>}
            </div>
            {!coverImg && (
              <div className="gradrow">
                {Object.values(GRAD).map((g, i) => (
                  <div key={i} className={"sw" + (g === grad ? " on" : "")} style={{ background: g }} onClick={() => setGrad(g)} />
                ))}
              </div>
            )}
            {coverImg && <div className="label" style={{ marginTop: 7, cursor: "pointer", color: "var(--violet-deep)" }} onClick={() => setCoverImg(null)}>Remove image</div>}
          </div>

          <div className="fld">
            <label>Which AI did you use? <span style={{ color: "#c0397b" }}>*</span></label>
            <div className="mpick">
              {AI_CATALOG.map(m => (
                <div key={m.name} className={"ch" + (mark === m.mark ? " on" : "")} onClick={() => setMark(m.mark)}>
                  <span className="g"><MarkGlyph mark={m.mark} /></span>{m.name}
                </div>
              ))}
            </div>
          </div>

          <div className="fld">
            <label>Writeup</label>
            <textarea style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 10, padding: "12px 14px", fontFamily: "var(--sans)", fontSize: 14, minHeight: 88, resize: "vertical", lineHeight: 1.5, outline: "none" }} placeholder="What does it do, and how did you build it?" value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="fld">
            <label>Tags <span style={{ color: "var(--muted)", fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>(comma separated)</span></label>
            <input placeholder="Agents, Productivity, GPT-5" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
        </div>
        <div className="mfoot">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={publish} style={{ opacity: valid ? 1 : 0.5 }}>Publish project</button>
        </div>
      </div>
    </div>
  );
}

function MyProjects({ mine, onNew, onOpen }) {
  if (mine.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 560, margin: "0 auto" }}>
        <div style={{ width: 72, height: 72, margin: "0 auto 20px", borderRadius: 18, background: "var(--paper-2)", border: "1.5px solid var(--violet-soft)", display: "grid", placeItems: "center" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 8px" }}>Submit your first project</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 22px" }}>
          Built something with one of the models you're learning? Attach a link to your live project, add a cover and a short writeup, and it joins the showcase where the community can view, like, and comment.
        </p>
        <button className="btn" onClick={onNew}>＋ Submit a project</button>
      </div>
    );
  }
  return (
    <>
      <div className="sc-head"><h2>My projects</h2><button className="btn" onClick={onNew}>＋ Submit a project</button></div>
      <div className="sc-grid">{mine.map(p => <ProjectCard key={p.id} p={p} onOpen={onOpen} />)}</div>
    </>
  );
}

function ShowcaseApp() {
  const [tab, setTab] = React.useState("showcase");
  const [open, setOpen] = React.useState(null);
  const [submit, setSubmit] = React.useState(false);
  // Merge persisted store state (submitted, deleted, hidden, likes, comments) over the seed data.
  const [projects, setProjects] = React.useState(() => {
    const s = window.DStore ? DStore.showcase() : { submitted: [], deleted: [], hidden: [], likes: {}, comments: {} };
    const base = (s.submitted || []).concat(PROJECTS);
    return base
      .filter(p => (s.deleted || []).indexOf(p.id) === -1)
      .map(p => ({
        ...p,
        hidden: (s.hidden || []).indexOf(p.id) !== -1 ? true : !!p.hidden,
        likes: s.likes && s.likes[p.id] != null ? s.likes[p.id] : p.likes,
        comments: (p.comments || []).concat((s.comments && s.comments[p.id]) || [])
      }));
  });
  const [toast, setToast] = React.useState("");

  // Search + filter state
  const [query, setQuery] = React.useState("");
  const [model, setModel] = React.useState("all");
  const [sort, setSort] = React.useState("trending");

  const mine = projects.filter(p => p.owner);

  // Models present in the showcase → dropdown options
  const modelLabel = (mark) => {
    const m = (typeof AI_CATALOG !== "undefined") && AI_CATALOG.find(x => x.mark === mark);
    if (m) return m.name;
    return mark.replace("@", "").replace(/^\w/, c => c.toUpperCase());
  };
  const modelOptions = Array.from(new Set(projects.map(p => p.mark)));
  const viewsNum = (v) => {
    if (typeof v === "number") return v;
    const s = String(v).trim().toUpperCase();
    if (s.endsWith("K")) return parseFloat(s) * 1000;
    if (s.endsWith("M")) return parseFloat(s) * 1000000;
    return parseFloat(s) || 0;
  };

  // Apply search + model filter + sort
  const visible = React.useMemo(() => {
    let list = projects.slice().filter(p => !p.hidden);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q)));
    if (model !== "all") list = list.filter(p => p.mark === model);
    if (sort === "trending") list.sort((a, b) => viewsNum(b.views) - viewsNum(a.views));
    else if (sort === "liked") list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    else if (sort === "newest") list = list; // array order = newest first
    else if (sort === "featured") list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [projects, query, model, sort]);

  const publish = (p) => {
    if (window.DStore) DStore.addSubmitted(p);
    setProjects(ps => [p, ...ps]);
    setSubmit(false);
    setTab("showcase");
    setToast("Project published 🎉");
    setTimeout(() => setToast(""), 2400);
  };

  const togglePublic = (proj) => {
    if (window.DStore) DStore.setHidden(proj.id, !proj.hidden);
    setProjects(ps => ps.map(x => x.id === proj.id ? { ...x, hidden: !x.hidden } : x));
    setOpen(null);
    setToast(proj.hidden ? "Project is public again ✓" : "Removed from public showcase");
    setTimeout(() => setToast(""), 2400);
  };

  const removeProject = (proj) => {
    if (window.DStore) DStore.addDeleted(proj.id);
    setProjects(ps => ps.filter(x => x.id !== proj.id));
    setOpen(null);
    setToast("Project deleted");
    setTimeout(() => setToast(""), 2400);
  };

  return (
    <div>
      <AppBar active="AI Showcase" showSearch={false} />
      <div className="sc-wrap">
        <div className="sc-tabs">
          <div className={"t" + (tab === "showcase" ? " on" : "")} onClick={() => setTab("showcase")}>AI Showcase</div>
          <div className={"t" + (tab === "projects" ? " on" : "")} onClick={() => setTab("projects")}>My Projects</div>
        </div>

        {tab === "showcase" ? (
          <>
            <div className="sc-head">
              <h2>Project showcase</h2>
              <button className="btn" onClick={() => setSubmit(true)}>＋ Submit your project</button>
            </div>
            <div className="sc-filters">
              <div className="sc-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
                <input placeholder="Search for a project name…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="sc-select">
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="all">All models</option>
                  {modelOptions.map(mk => <option key={mk} value={mk}>{modelLabel(mk)}</option>)}
                </select>
                <span className="chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
              <div className="sc-select">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="liked">Most liked</option>
                  <option value="featured">Featured</option>
                </select>
                <span className="chev"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m6 9 6 6 6-6"/></svg></span>
              </div>
            </div>
            <div className="sc-grid">
              {visible.length > 0
                ? visible.map(p => <ProjectCard key={p.id} p={p} onOpen={setOpen} />)
                : <div className="sc-empty">No projects match your search. Try a different name, model, or filter.</div>}
            </div>
          </>
        ) : (
          <MyProjects mine={mine} onNew={() => setSubmit(true)} onOpen={setOpen} />
        )}
      </div>

      {open && <ProjectModal key={open.id} p={open} onClose={() => setOpen(null)} onUnpublish={togglePublic} onDelete={removeProject} />}
      {submit && <SubmitModal onClose={() => setSubmit(false)} onPublish={publish} />}
      {toast && <div className="toast"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ShowcaseApp />);
