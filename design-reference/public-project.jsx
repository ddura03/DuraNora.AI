// Public, shareable project page — reads ?id=<projectId>.
function PublicProject() {
  const id = new URLSearchParams(window.location.search).get("id");
  const base = PROJECTS.find(x => x.id === id) || PROJECTS[0];
  // Merge persisted likes + comments from the store so the public view stays consistent.
  const store = window.DStore ? DStore.showcase() : { likes: {}, comments: {}, likedByMe: [] };
  const p = {
    ...base,
    likes: store.likes && store.likes[base.id] != null ? store.likes[base.id] : base.likes,
    comments: (base.comments || []).concat((store.comments && store.comments[base.id]) || [])
  };
  const author = p.author;
  const more = PROJECTS.filter(x => x.author.slug === author.slug && x.id !== p.id).slice(0, 3);

  const [liked, setLiked] = React.useState(window.DStore ? DStore.showcase().likedByMe.indexOf(base.id) !== -1 : false);
  const [likes, setLikes] = React.useState(p.likes);
  const toggle = () => {
    if (window.DStore) { const s = DStore.toggleLike(base.id, base.likes); setLiked(s.likedByMe.indexOf(base.id) !== -1); setLikes(s.likes[base.id]); }
    else { setLiked(l => !l); setLikes(n => n + (liked ? -1 : 1)); }
  };

  return (
    <div>
      <PublicBar />
      <div className="wrap">
        <div className="crumb"><a onClick={() => { window.location.href = "AI Showcase Page Wireframes.html"; }}>AI Showcase</a> / <b>{p.title}</b></div>

        <div className="proj">
          {/* MEDIA */}
          <div className="media" style={{ background: p.coverImg ? "#1a1325" : p.grad }}>
            {p.coverImg ? <img src={p.coverImg} alt="" /> : <div className="mono">{p.mono}</div>}
            <span className="views vchip"><EyeIcon /> {p.views} views</span>
          </div>

          {/* DETAILS */}
          <div>
            <a className="by" href={profileHref(author.slug)}>
              <span className="av" style={{ background: author.color }}>{author.initials}</span>
              <div><div className="nm">{author.name}</div><div className="rl">{author.role || "DuraNoia member"} · View profile →</div></div>
            </a>

            <h1>{p.title}</h1>
            {modelName(p.mark) && <div style={{ marginBottom: 14 }}><span className="mbadge"><span className="g"><MarkGlyph mark={p.mark} /></span> Built with {modelName(p.mark)}</span></div>}
            <p className="desc">{p.desc}</p>
            <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>

            <div className="statline">
              <div className="s"><span className="v">{p.views}</span><span className="t">Views</span></div>
              <div className="s"><span className="v">{likes}</span><span className="t">Likes</span></div>
              <div className="s"><span className="v">{p.comments.length}</span><span className="t">Comments</span></div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
              <a className="btn" href={p.link || "#"} target="_blank" rel="noopener noreferrer">View project <ExtIcon /></a>
              <span className={"heart" + (liked ? " on" : "")} onClick={toggle}><HeartIcon fill={liked} /> {likes}</span>
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="cmts" style={{ maxWidth: 720, marginTop: 36 }}>
          <h3>Comments · {p.comments.length}</h3>
          {p.comments.length === 0 && <div style={{ color: "var(--muted)", fontSize: 13.5 }}>No comments yet.</div>}
          {p.comments.map((c, i) => (
            <div className="cm" key={i}>
              <span className="av" style={{ background: c.who.color }}>{c.who.initials}</span>
              <div><div className="ct"><b>{c.who.name}</b> {c.text}</div><div className="cw">{c.when}</div></div>
            </div>
          ))}
          <div className="signin-bar">
            <span>Sign in to like this project and join the conversation.</span>
            <span className="pill solid" onClick={() => { window.location.href = "Sign In Page Wireframes.html"; }}>Sign in</span>
          </div>
        </div>

        {/* MORE FROM */}
        {more.length > 0 && (
          <>
            <div className="sec-h"><h2>More from {author.name}</h2><a className="pill ghost" href={profileHref(author.slug)}>View profile</a></div>
            <div className="grid">{more.map(m => <MiniCard key={m.id} p={m} />)}</div>
          </>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PublicProject />);
