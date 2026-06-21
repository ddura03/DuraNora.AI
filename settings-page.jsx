// Dedicated Profile & Settings page.

function Switch({ on, onClick }) {
  return <button className={"sw" + (on ? " on" : "")} onClick={onClick} aria-pressed={on} />;
}

function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>{msg}</div>;
}

const SECTIONS = [
  { id: "profile", label: "Profile", icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7 a4 4 0 1 0 0 .01" /> },
];

function Icon({ d, ...p }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d={d} /></svg>;
}
const ICONS = {
  profile: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
  account: "M12 1v6m0 0 3-3m-3 3L9 4 M5 21h14a2 2 0 0 0 2-2v-5H3v5a2 2 0 0 0 2 2Z",
  notif: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  conn: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  privacy: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  billing: "M3 10h18 M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  danger: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z M12 9v4 M12 17h.01",
};

function NavItem({ id, label, active, onClick }) {
  return (
    <div className={"it" + (active ? " on" : "")} onClick={onClick}>
      <Icon d={ICONS[id]} /> {label}
    </div>
  );
}

const inputBase = { width: "100%", border: "1.5px solid var(--line)", borderRadius: 10, padding: "12px 14px", fontFamily: "var(--sans)", fontSize: 14, color: "var(--ink)", outline: "none" };

function SettingsApp() {
  const [sec, setSec] = React.useState("profile");
  const [toast, setToast] = React.useState("");
  const ping = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  // profile state
  const [p, setP] = React.useState({
    name: "Daniel Dura", headline: "Learning the AI that already knows me",
    bio: "Founder of DuraNoia. Exploring how the popular AI models work, how they differ, and how to chain them together.",
    location: "United States", username: "danieldura",
  });
  const [acct, setAcct] = React.useState({ email: "daniel@duranoia.ai", lang: "English (US)" });
  const [notif, setNotif] = React.useState({ digest: true, streak: true, newLessons: true, product: false, security: true });
  const [priv, setPriv] = React.useState({ publicProfile: true, showProgress: true, showStreak: false });
  const [conns, setConns] = React.useState({ linkedin: true, google: true, x: false, github: false });
  const [plan] = React.useState("Free");

  const set = (obj, setter, k) => (v) => setter({ ...obj, [k]: v });

  return (
    <div>
      <AppBar active="" />
      <div className="settings">
        <div className="crumb"><b>Learn AI</b> / Settings</div>
        <div className="pagehead">
          <h1>Profile &amp; settings</h1>
          <p>Manage how you show up on DuraNoia and how the platform works for you.</p>
        </div>

        {/* SIDEBAR */}
        <nav className="snav">
          <NavItem id="profile" label="Profile" active={sec === "profile"} onClick={() => setSec("profile")} />
          <NavItem id="account" label="Account" active={sec === "account"} onClick={() => setSec("account")} />
          <NavItem id="notif" label="Notifications" active={sec === "notif"} onClick={() => setSec("notif")} />
          <NavItem id="conn" label="Connections" active={sec === "conn"} onClick={() => setSec("conn")} />
          <NavItem id="privacy" label="Privacy" active={sec === "privacy"} onClick={() => setSec("privacy")} />
          <NavItem id="billing" label="Plan & billing" active={sec === "billing"} onClick={() => setSec("billing")} />
          <div className="sep" />
          <NavItem id="danger" label="Danger zone" active={sec === "danger"} onClick={() => setSec("danger")} />
        </nav>

        {/* CONTENT */}
        <div>
          {sec === "profile" && (
            <div className="scard">
              <div className="pbanner">
                <div className="big">DD</div>
                <div style={{ flex: 1 }}>
                  <div className="nm">{p.name}</div>
                  <div className="hl">{p.headline}</div>
                </div>
                <button className="chipbtn">Change photo</button>
              </div>
              <div className="grid2">
                <div className="fld"><label>Display name</label><input style={inputBase} value={p.name} onChange={(e) => set(p, setP, "name")(e.target.value)} /></div>
                <div className="fld"><label>Username</label><input style={inputBase} value={p.username} onChange={(e) => set(p, setP, "username")(e.target.value)} /></div>
                <div className="fld full"><label>Headline</label><input style={inputBase} value={p.headline} onChange={(e) => set(p, setP, "headline")(e.target.value)} /></div>
                <div className="fld full"><label>Bio</label><textarea style={{ ...inputBase, minHeight: 92, resize: "vertical", lineHeight: 1.5 }} value={p.bio} onChange={(e) => set(p, setP, "bio")(e.target.value)} /></div>
                <div className="fld"><label>Location</label><input style={inputBase} value={p.location} onChange={(e) => set(p, setP, "location")(e.target.value)} /></div>
              </div>
              <div className="savebar">
                <button className="btn ghost" onClick={() => ping("Changes discarded")}>Reset</button>
                <button className="btn" onClick={() => ping("Profile saved")}>Save changes</button>
              </div>
            </div>
          )}

          {sec === "account" && (
            <>
              <div className="scard">
                <h2>Account</h2>
                <p className="desc">Your sign-in details and language.</p>
                <div className="grid2">
                  <div className="fld"><label>Email address</label><input style={inputBase} value={acct.email} onChange={(e) => set(acct, setAcct, "email")(e.target.value)} /></div>
                  <div className="fld"><label>Language</label><input style={inputBase} value={acct.lang} onChange={(e) => set(acct, setAcct, "lang")(e.target.value)} /></div>
                </div>
                <div className="savebar"><button className="btn" onClick={() => ping("Account updated")}>Save</button></div>
              </div>
              <div className="scard">
                <h2>Password</h2>
                <p className="desc">Choose a strong password you don't use elsewhere.</p>
                <div className="grid2">
                  <div className="fld full"><label>Current password</label><input type="password" style={inputBase} placeholder="••••••••" /></div>
                  <div className="fld"><label>New password</label><input type="password" style={inputBase} placeholder="••••••••" /></div>
                  <div className="fld"><label>Confirm new password</label><input type="password" style={inputBase} placeholder="••••••••" /></div>
                </div>
                <div className="savebar"><button className="btn" onClick={() => ping("Password changed")}>Update password</button></div>
              </div>
            </>
          )}

          {sec === "notif" && (
            <div className="scard">
              <h2>Notifications</h2>
              <p className="desc">Pick what lands in your inbox. You can change these anytime.</p>
              {[
                ["digest", "Weekly learning digest", "A Friday summary of your progress and new lessons."],
                ["streak", "Streak reminders", "A nudge when your daily streak is about to break."],
                ["newLessons", "New lessons for your models", "Get notified when a model you're learning gets new lessons."],
                ["product", "Product news", "Occasional updates about new DuraNoia features."],
                ["security", "Security alerts", "Important account and sign-in notifications. Recommended on."],
              ].map(([k, t, d]) => (
                <div className="opt" key={k}>
                  <div><div className="ot">{t}</div><div className="od">{d}</div></div>
                  <Switch on={notif[k]} onClick={() => setNotif({ ...notif, [k]: !notif[k] })} />
                </div>
              ))}
              <div className="savebar" style={{ marginTop: 18 }}><button className="btn" onClick={() => ping("Preferences saved")}>Save preferences</button></div>
            </div>
          )}

          {sec === "conn" && (
            <div className="scard">
              <h2>Connections</h2>
              <p className="desc">Link accounts to sign in faster and show them on your profile.</p>
              {[
                { k: "linkedin", n: "LinkedIn", s: conns.linkedin ? "linkedin.com/in/daniel-dura03" : "Not connected", bg: "#0a66c2", ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg> },
                { k: "google", n: "Google", s: conns.google ? "daniel@duranoia.ai" : "Not connected", bg: "#fff", border: "1.5px solid var(--line)", ic: <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 0 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.4 14.7 1.5 12 1.5a10.5 10.5 0 0 0 0 21c6.1 0 10.1-4.3 10.1-10.3 0-.7-.1-1.2-.2-1.7H12z"/></svg> },
                { k: "x", n: "X", s: conns.x ? "@danieldura" : "Not connected", bg: "#15161a", ic: <svg width="17" height="17" viewBox="0 0 24 24" fill="#fff"><path d="M16.4 1.6h3.2l-7 8 8.2 10.8h-6.4l-5-6.6-5.8 6.6H.4l7.5-8.6L0 1.6h6.6l4.5 6 5.3-6Zm-1.1 17h1.8L6.1 3.4H4.2L15.3 18.6Z"/></svg> },
                { k: "github", n: "GitHub", s: conns.github ? "@danieldura" : "Not connected", bg: "#15161a", ic: <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.300000000000001-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg> },
              ].map(c => (
                <div className="conn" key={c.k}>
                  <div className="ci" style={{ background: c.bg, border: c.border || 0 }}>{c.ic}</div>
                  <div style={{ flex: 1 }}><div className="cn">{c.n}</div><div className="cs">{c.s}</div></div>
                  {conns[c.k]
                    ? <button className="chipbtn danger" onClick={() => { setConns({ ...conns, [c.k]: false }); ping(c.n + " disconnected"); }}>Disconnect</button>
                    : <button className="chipbtn green" onClick={() => { setConns({ ...conns, [c.k]: true }); ping(c.n + " connected"); }}>Connect</button>}
                </div>
              ))}
            </div>
          )}

          {sec === "privacy" && (
            <div className="scard">
              <h2>Privacy</h2>
              <p className="desc">Control what others can see and how your data is used.</p>
              {[
                ["publicProfile", "Public profile", "Let anyone with the link view your profile page."],
                ["showProgress", "Show learning progress", "Display which models you've completed on your profile."],
                ["showStreak", "Show streak", "Display your current streak publicly."],
              ].map(([k, t, d]) => (
                <div className="opt" key={k}>
                  <div><div className="ot">{t}</div><div className="od">{d}</div></div>
                  <Switch on={priv[k]} onClick={() => setPriv({ ...priv, [k]: !priv[k] })} />
                </div>
              ))}
              <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                <button className="chipbtn" onClick={() => ping("Export started — check your email")}>Download my data</button>
              </div>
            </div>
          )}

          {sec === "billing" && (
            <>
              <div className="scard">
                <h2>Current plan</h2>
                <p className="desc">You're on the {plan} plan.</p>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ flex: 1, border: "1.5px solid var(--violet-deep)", borderRadius: 14, padding: 18, background: "var(--paper-2)" }}>
                    <div className="label" style={{ color: "var(--violet-deep)" }}>Free</div>
                    <div style={{ fontSize: 26, fontWeight: 800, margin: "6px 0" }}>$0<small style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>/mo</small></div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>Core lessons · 3 models at a time · community support.</div>
                    <div style={{ marginTop: 12 }}><span className="chipbtn green" style={{ cursor: "default" }}>Current plan</span></div>
                  </div>
                  <div style={{ flex: 1, border: "1.5px solid var(--line)", borderRadius: 14, padding: 18 }}>
                    <div className="label" style={{ color: "var(--violet-dark)" }}>Pro</div>
                    <div style={{ fontSize: 26, fontWeight: 800, margin: "6px 0" }}>$12<small style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>/mo</small></div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>All 10 models · ecosystem recipes · downloadable prompts · priority updates.</div>
                    <div style={{ marginTop: 12 }}><button className="btn" onClick={() => ping("Redirecting to checkout…")}>Upgrade to Pro →</button></div>
                  </div>
                </div>
              </div>
              <div className="scard">
                <h2>Payment method</h2>
                <p className="desc">No card on file. Add one when you upgrade.</p>
                <button className="chipbtn" onClick={() => ping("Add payment method")}>Add payment method</button>
              </div>
            </>
          )}

          {sec === "danger" && (
            <div className="scard danger-zone">
              <h2>Danger zone</h2>
              <p className="desc">These actions are permanent. Proceed carefully.</p>
              <div className="opt">
                <div><div className="ot">Pause account</div><div className="od">Temporarily hide your profile and pause all emails. Reactivate anytime.</div></div>
                <button className="chipbtn" onClick={() => ping("Account paused")}>Pause</button>
              </div>
              <div className="opt">
                <div><div className="ot">Delete account</div><div className="od">Permanently delete your account, progress, and data. This cannot be undone.</div></div>
                <button className="chipbtn danger" onClick={() => ping("Deletion requires email confirmation")}>Delete account</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast msg={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<SettingsApp />);
