// Shared public (logged-out) top bar for shareable pages.
function PublicBar() {
  return (
    <div className="pbar">
      <a className="brand" href="DuraNoia Wireframes.html">
        <img src="duranoia-icon.svg" alt="" width="28" height="28" />
        <span className="wm"><span className="d">Dura</span><span className="n">Noia</span></span>
        <span className="tag">AI EDUCATION PLATFORM</span>
      </a>
      <div className="sp"></div>
      <div className="links">
        <span onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>Learn AI</span>
        <span onClick={() => { window.location.href = "AI Ecosystem Page Wireframes.html"; }}>AI Ecosystem</span>
        <span onClick={() => { window.location.href = "AI Showcase Page Wireframes.html"; }}>AI Showcase</span>
        <span onClick={() => { window.location.href = "News Page Wireframes.html"; }}>News</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <span className="pill ghost" onClick={() => { window.location.href = "Sign In Page Wireframes.html"; }}>Sign in</span>
        <span className="pill solid" onClick={() => { window.location.href = "Create Account Page Wireframes.html"; }}>Get started →</span>
      </div>
    </div>
  );
}
window.PublicBar = PublicBar;

// Shared icons
const EyeIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const HeartIcon = ({ fill }) => <svg width="18" height="18" viewBox="0 0 24 24" fill={fill ? "#e0245e" : "none"} stroke={fill ? "#e0245e" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>;
const CommentIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1-4a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 9-8.4 8.5 8.5 0 0 1 8 8.4Z"/></svg>;
const ExtIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>;
const LinkedInIcon = ({ s = 15 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>;
const modelName = (mark) => (AI_CATALOG.find(m => m.mark === mark) || {}).name;
const projectHref = (id) => "Public Project Page Wireframes.html?id=" + id;
const profileHref = (slug) => "Public Profile Page Wireframes.html?user=" + slug;

// Shared small project card (used on profile + "more from")
function MiniCard({ p }) {
  return (
    <a className="pjcard" href={projectHref(p.id)}>
      <div className="cover" style={{ background: p.coverImg ? "#1a1325" : p.grad }}>
        {p.coverImg ? <img src={p.coverImg} alt="" /> : <div className="mono">{p.mono}</div>}
        <div className="badges">
          <span className="views"><EyeIcon /> {p.views}</span>
          {p.featured && <span className="feat">Featured</span>}
        </div>
      </div>
      <div className="pb">
        <div className="pt">{p.title}</div>
        <div className="pm">
          <span className="x"><HeartIcon /> {p.likes}</span>
          <span className="x"><CommentIcon /> {p.comments.length}</span>
          {modelName(p.mark) && <span className="x" style={{ marginLeft: "auto" }}><span className="glyph" style={{ width: 20, height: 20 }}><MarkGlyph mark={p.mark} /></span></span>}
        </div>
      </div>
    </a>
  );
}
window.MiniCard = MiniCard;
Object.assign(window, { EyeIcon, HeartIcon, CommentIcon, ExtIcon, LinkedInIcon, modelName, projectHref, profileHref });
