// Shared dashboard data + chrome for all 4 directions.

// Mock signed-in user
const USER = { name: "Daniel", initials: "DD", streak: 6, minutes: 840 };

// Per-model progress: lessons completed (totals come from AI_CATALOG.lessons)
const PROGRESS = {
  Claude:     38,  // finished
  ChatGPT:    28,  // in progress — current focus
  Perplexity: 6,
  Gemini:     3,
  // everything else: 0 (not started)
};

// Where the user left off
const RESUME = {
  model: "ChatGPT",
  lessonNo: "29",
  lessonTitle: "Code Interpreter for non-coders",
  level: "Pro",
  dur: "8:55",
};

// Recent activity feed
const ACTIVITY = [
  { c: "#1f8a5b", tx: <>Completed <b>Claude</b> — finished the full track 🎉</>, tm: "2 hours ago" },
  { c: "#7c3aed", tx: <>Lesson 28 of <b>ChatGPT</b> — “Custom GPTs you'll actually use”</>, tm: "Yesterday" },
  { c: "#7c3aed", tx: <>Started <b>Perplexity</b> — “Search, not just chat”</>, tm: "2 days ago" },
  { c: "#d9711f", tx: <>Hit a <b>6-day streak</b> — keep it going</>, tm: "3 days ago" },
];

// Merge catalog + real stored progress into a usable list.
// Totals come from the real lesson counts (DStore.LESSON_COUNTS); done from the store.
function modelsWithProgress() {
  if (window.DStore) DStore.seedIfEmpty();
  return AI_CATALOG.map(m => {
    const slug = m.name.toLowerCase();
    const total = window.DStore ? DStore.totalFor(slug) : m.lessons;
    const done = window.DStore ? Math.min(DStore.doneCount(slug), total) : 0;
    return { ...m, slug, done, total, pct: Math.round((done / total) * 100), started: done > 0, finished: done >= total };
  });
}

// Where the user left off — read from the store (falls back to a sensible default).
function getResume() {
  if (window.DStore) { DStore.seedIfEmpty(); const r = DStore.resume(); if (r) return r; }
  return { slug: "chatgpt", model: "ChatGPT", mark: "@chatgpt", lessonNo: "04", lessonTitle: "Voice mode for thinking out loud", level: "Practical", dur: "6:02" };
}

const goTo = (slug) => { window.location.href = "Model Page Wireframes.html?model=" + slug.toLowerCase(); };

// ---- Logged-in top app bar ----
function AppBar({ active = "Dashboard", showSearch = false }) {
  const links = ["Learn AI", "AI Ecosystem", "AI Showcase", "News", "About"];
  const href = {
    "AI Showcase": "AI Showcase Page Wireframes.html",
    "Learn AI": "Learn AI Page Wireframes.html",
    "AI Ecosystem": "AI Ecosystem Page Wireframes.html",
    "News": "News Page Wireframes.html",
    "About": "About Page Wireframes.html",
  };

  const [q, setQ] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [toast, setToast] = React.useState("");
  const searchRef = React.useRef(null);
  const avRef = React.useRef(null);

  // Profile fields
  const [profile, setProfile] = React.useState({ name: "Daniel Dura", headline: "Learning the AI that already knows me", email: "daniel@duranoia.ai", linkedin: "linkedin.com/in/daniel-dura03" });
  const [draft, setDraft] = React.useState(profile);

  React.useEffect(() => {
    function onDown(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setFocused(false);
      if (avRef.current && !avRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const ql = q.trim().toLowerCase();
  const results = ql
    ? AI_CATALOG.filter(m => m.name.toLowerCase().includes(ql) || m.company.toLowerCase().includes(ql) || m.bestAt.toLowerCase().includes(ql)).slice(0, 6)
    : [];

  const openModal = () => { setDraft(profile); setModal(true); setMenuOpen(false); };
  const saveProfile = () => { setProfile(draft); setModal(false); setToast("Profile saved"); setTimeout(() => setToast(""), 2200); };

  return (
    <div className="appbar" style={{ position: "relative" }}>
      <div className="brand" onClick={() => { window.location.href = "DuraNoia Wireframes.html"; }}>
        <img src="duranoia-icon.svg" alt="" width="30" height="30" />
        <span className="wm"><span className="d">Dura</span><span className="n">Noia</span></span>
        <span className="tag">AI EDUCATION PLATFORM</span>
      </div>
      <div className="navlinks">
        {links.map(l => <span key={l} className={l === active ? "on" : ""} onClick={() => { if (href[l]) window.location.href = href[l]; }}>{l}</span>)}
      </div>

      {/* RIGHT GROUP: avatar (reserves pill-width so nav centers like the home header) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14, minWidth: 190 }}>
      {/* SEARCH */}
      {showSearch && (
      <div className="search-wrap" ref={searchRef}>
        <div className="search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            placeholder="Search models & lessons"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocused(true)} />
        </div>
        {focused && ql && (
          <div className="search-dd">
            {results.length > 0 ? (
              <>
                <div className="cat">Models</div>
                {results.map(m => (
                  <div className="res" key={m.name} onClick={() => goTo(m.name)}>
                    <div className="glyph" style={{ width: 30, height: 30 }}><MarkGlyph mark={m.mark} /></div>
                    <div style={{ flex: 1 }}><div className="nm">{m.name}</div><div className="ds">{m.company} · {m.lessons} lessons</div></div>
                    <span style={{ fontFamily: "var(--mono)", color: "var(--violet-deep)", fontSize: 13 }}>→</span>
                  </div>
                ))}
              </>
            ) : (
              <div className="empty">No models match “{q}”.</div>
            )}
          </div>
        )}
      </div>
      )}
      <div className="streak" style={{ display: "none" }}>🔥 {USER.streak}</div>

      {/* AVATAR + MENU */}
      <div className="av-wrap" ref={avRef}>
        <div className="avatar" title={profile.name} onClick={() => setMenuOpen(o => !o)}>{USER.initials}</div>
        {menuOpen && (
          <div className="menu">
            <div className="mhead">
              <div className="avatar" style={{ cursor: "default" }}>{USER.initials}</div>
              <div><div className="nm">{profile.name}</div><div className="em">{profile.email}</div></div>
            </div>
            <div className="mi" onClick={() => { window.location.href = "Profile Settings Page Wireframes.html"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Edit profile
            </div>
            <div className="mi" onClick={() => { window.location.href = "Profile Settings Page Wireframes.html"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
              Link LinkedIn
            </div>
            <div className="mi" onClick={() => { window.location.href = "Learn AI Page Wireframes.html"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-5"/></svg>
              My progress
            </div>
            <div className="mi" onClick={() => { window.location.href = "Profile Settings Page Wireframes.html"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              Settings
            </div>
            <div className="mdiv" />
            <div className="mi danger" onClick={() => { window.location.href = "Sign In Page Wireframes.html"; }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>
              Sign out
            </div>
          </div>
        )}
      </div>
      </div>

      {/* PROFILE MODAL */}
      {modal && (
        <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="mtop">
              <h3>Edit profile</h3>
              <div className="mx" onClick={() => setModal(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </div>
            </div>
            <div className="mbody">
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
                <div className="avatar-lg">{USER.initials}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{draft.name || "Your name"}</div>
                  <div className="label" style={{ marginTop: 3 }}>Change photo</div>
                </div>
              </div>
              <div className="fld">
                <label>Display name</label>
                <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </div>
              <div className="fld">
                <label>Headline</label>
                <input value={draft.headline} onChange={(e) => setDraft({ ...draft, headline: e.target.value })} />
              </div>
              <div className="fld">
                <label>Email</label>
                <input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
              </div>
              <div className="fld">
                <label>LinkedIn</label>
                <div className="ig">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>
                  <input placeholder="linkedin.com/in/you" value={draft.linkedin} onChange={(e) => setDraft({ ...draft, linkedin: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="mfoot">
              <button className="btn ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn" onClick={saveProfile}>Save changes</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>{toast}</div>}
    </div>
  );
}

// ---- Circular progress ring ----
function Ring({ pct, size = 54, stroke = 5, color = "#7c3aed" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <div className="ring-wrap" style={{ width: size, height: size, flex: `0 0 ${size}px` }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(124,58,237,.15)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div className="pct">{pct}%</div>
    </div>
  );
}

Object.assign(window, { USER, PROGRESS, RESUME, ACTIVITY, modelsWithProgress, getResume, goTo, AppBar, Ring });
