"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useUserProfile } from "@/lib/hooks/useUserProfile";
import { createClient } from "@/lib/supabase/client";

function Switch({ on, onClick }: { on: boolean; onClick: () => void }) {
  return <button type="button" className={"sw" + (on ? " on" : "")} onClick={onClick} aria-pressed={on} />;
}

function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="toast">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {msg}
    </div>
  );
}

function Icon({ d }: { d: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICONS: Record<string, string> = {
  profile: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
  account: "M12 1v6m0 0 3-3m-3 3L9 4 M5 21h14a2 2 0 0 0 2-2v-5H3v5a2 2 0 0 0 2 2Z",
  notif: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0",
  conn: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",
  privacy: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
  billing: "M3 10h18 M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  danger: "M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z M12 9v4 M12 17h.01",
};

const inputBase: CSSProperties = {
  width: "100%",
  border: "1.5px solid var(--line)",
  borderRadius: 10,
  padding: "12px 14px",
  fontFamily: "var(--sans)",
  fontSize: 14,
  color: "var(--ink)",
  outline: "none",
};

type Section = "profile" | "account" | "notif" | "conn" | "privacy" | "billing" | "danger";

export function SettingsPageContent() {
  const { profile, initials, reload } = useUserProfile();
  const [sec, setSec] = useState<Section>("profile");
  const [toast, setToast] = useState("");
  const ping = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 2200);
  };

  const [p, setP] = useState({ name: "", headline: "", location: "", username: "" });
  const [acct, setAcct] = useState({ email: "", lang: "English (US)" });
  const [pw, setPw] = useState({ next: "", confirm: "" });
  const [notif, setNotif] = useState({ digest: true, streak: true, newLessons: true, product: false, security: true });
  const [priv, setPriv] = useState({ publicProfile: true, showProgress: true, showStreak: false });
  const [conns, setConns] = useState({ linkedin: false, google: true, x: false, github: false });
  const plan = "Free";

  useEffect(() => {
    if (!profile) return;
    setP({
      name: profile.name ?? "",
      headline: profile.headline ?? "",
      location: profile.location ?? "",
      username: profile.slug ?? "",
    });
    setAcct({ email: profile.email, lang: "English (US)" });
    setConns((c) => ({ ...c, linkedin: Boolean(profile.linkedin) }));
  }, [profile]);

  async function saveProfile() {
    if (!profile) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({
        name: p.name.trim(),
        headline: p.headline.trim(),
        location: p.location.trim(),
      })
      .eq("id", profile.id);
    if (error) {
      ping("Could not save profile");
      return;
    }
    ping("Profile saved");
    reload();
  }

  async function updatePassword() {
    if (pw.next.length < 8) {
      ping("Password must be at least 8 characters");
      return;
    }
    if (pw.next !== pw.confirm) {
      ping("Passwords do not match");
      return;
    }
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pw.next });
    if (error) {
      ping(error.message);
      return;
    }
    setPw({ next: "", confirm: "" });
    ping("Password changed");
  }

  const avatarBg = profile?.avatar_color ? { background: profile.avatar_color } : undefined;

  return (
    <div>
      <div className="settings">
        <div className="crumb">
          <b>Learn AI</b> / Settings
        </div>
        <div className="pagehead">
          <h1>Profile &amp; settings</h1>
          <p>Manage how you show up on DuraNoia and how the platform works for you.</p>
        </div>

        <nav className="snav">
          {(
            [
              ["profile", "Profile"],
              ["account", "Account"],
              ["notif", "Notifications"],
              ["conn", "Connections"],
              ["privacy", "Privacy"],
              ["billing", "Plan & billing"],
            ] as const
          ).map(([id, label]) => (
            <div key={id} className={"it" + (sec === id ? " on" : "")} onClick={() => setSec(id)}>
              <Icon d={ICONS[id]} /> {label}
            </div>
          ))}
          <div className="sep" />
          <div className={"it" + (sec === "danger" ? " on" : "")} onClick={() => setSec("danger")}>
            <Icon d={ICONS.danger} /> Danger zone
          </div>
        </nav>

        <div>
          {sec === "profile" && (
            <div className="scard">
              <div className="pbanner">
                <div className="big" style={avatarBg}>
                  {initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="nm">{p.name || "Your name"}</div>
                  <div className="hl">{p.headline || "Add a headline"}</div>
                </div>
                <button type="button" className="chipbtn">
                  Change photo
                </button>
              </div>
              <div className="grid2">
                <div className="fld">
                  <label>Display name</label>
                  <input style={inputBase} value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Username</label>
                  <input style={inputBase} value={p.username} readOnly />
                </div>
                <div className="fld full">
                  <label>Headline</label>
                  <input style={inputBase} value={p.headline} onChange={(e) => setP({ ...p, headline: e.target.value })} />
                </div>
                <div className="fld">
                  <label>Location</label>
                  <input style={inputBase} value={p.location} onChange={(e) => setP({ ...p, location: e.target.value })} />
                </div>
              </div>
              <div className="savebar">
                <button type="button" className="btn ghost" onClick={() => ping("Changes discarded")}>
                  Reset
                </button>
                <button type="button" className="btn" onClick={saveProfile}>
                  Save changes
                </button>
              </div>
            </div>
          )}

          {sec === "account" && (
            <>
              <div className="scard">
                <h2>Account</h2>
                <p className="desc">Your sign-in details and language.</p>
                <div className="grid2">
                  <div className="fld">
                    <label>Email address</label>
                    <input style={inputBase} value={acct.email} readOnly />
                  </div>
                  <div className="fld">
                    <label>Language</label>
                    <input style={inputBase} value={acct.lang} onChange={(e) => setAcct({ ...acct, lang: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="scard">
                <h2>Password</h2>
                <p className="desc">Choose a strong password you don&apos;t use elsewhere.</p>
                <div className="grid2">
                  <div className="fld">
                    <label>New password</label>
                    <input type="password" style={inputBase} placeholder="••••••••" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
                  </div>
                  <div className="fld">
                    <label>Confirm new password</label>
                    <input type="password" style={inputBase} placeholder="••••••••" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} />
                  </div>
                </div>
                <div className="savebar">
                  <button type="button" className="btn" onClick={updatePassword}>
                    Update password
                  </button>
                </div>
              </div>
            </>
          )}

          {sec === "notif" && (
            <div className="scard">
              <h2>Notifications</h2>
              <p className="desc">Pick what lands in your inbox. You can change these anytime.</p>
              {(
                [
                  ["digest", "Weekly learning digest", "A Friday summary of your progress and new lessons."],
                  ["streak", "Streak reminders", "A nudge when your daily streak is about to break."],
                  ["newLessons", "New lessons for your models", "Get notified when a model you're learning gets new lessons."],
                  ["product", "Product news", "Occasional updates about new DuraNoia features."],
                  ["security", "Security alerts", "Important account and sign-in notifications. Recommended on."],
                ] as const
              ).map(([k, t, d]) => (
                <div className="opt" key={k}>
                  <div>
                    <div className="ot">{t}</div>
                    <div className="od">{d}</div>
                  </div>
                  <Switch on={notif[k]} onClick={() => setNotif({ ...notif, [k]: !notif[k] })} />
                </div>
              ))}
              <div className="savebar" style={{ marginTop: 18 }}>
                <button type="button" className="btn" onClick={() => ping("Preferences saved")}>
                  Save preferences
                </button>
              </div>
            </div>
          )}

          {sec === "conn" && (
            <div className="scard">
              <h2>Connections</h2>
              <p className="desc">Link accounts to sign in faster and show them on your profile.</p>
              {[
                { k: "linkedin" as const, n: "LinkedIn", s: conns.linkedin ? profile?.linkedin || "Connected" : "Not connected", bg: "#0a66c2" },
                { k: "google" as const, n: "Google", s: conns.google ? acct.email : "Not connected", bg: "#fff", border: "1.5px solid var(--line)" },
                { k: "x" as const, n: "X", s: conns.x ? "@connected" : "Not connected", bg: "#15161a" },
                { k: "github" as const, n: "GitHub", s: conns.github ? "@connected" : "Not connected", bg: "#15161a" },
              ].map((c) => (
                <div className="conn" key={c.k}>
                  <div className="ci" style={{ background: c.bg, border: c.border || 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="cn">{c.n}</div>
                    <div className="cs">{c.s}</div>
                  </div>
                  {conns[c.k] ? (
                    <button type="button" className="chipbtn danger" onClick={() => { setConns({ ...conns, [c.k]: false }); ping(`${c.n} disconnected`); }}>
                      Disconnect
                    </button>
                  ) : (
                    <button type="button" className="chipbtn green" onClick={() => { setConns({ ...conns, [c.k]: true }); ping(`${c.n} connected`); }}>
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {sec === "privacy" && (
            <div className="scard">
              <h2>Privacy</h2>
              <p className="desc">Control what others can see and how your data is used.</p>
              {(
                [
                  ["publicProfile", "Public profile", "Let anyone with the link view your profile page."],
                  ["showProgress", "Show learning progress", "Display which models you've completed on your profile."],
                  ["showStreak", "Show streak", "Display your current streak publicly."],
                ] as const
              ).map(([k, t, d]) => (
                <div className="opt" key={k}>
                  <div>
                    <div className="ot">{t}</div>
                    <div className="od">{d}</div>
                  </div>
                  <Switch on={priv[k]} onClick={() => setPriv({ ...priv, [k]: !priv[k] })} />
                </div>
              ))}
            </div>
          )}

          {sec === "billing" && (
            <>
              <div className="scard">
                <h2>Current plan</h2>
                <p className="desc">You&apos;re on the {plan} plan.</p>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ flex: 1, border: "1.5px solid var(--violet-deep)", borderRadius: 14, padding: 18, background: "var(--paper-2)" }}>
                    <div className="label" style={{ color: "var(--violet-deep)" }}>
                      Free
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, margin: "6px 0" }}>
                      $0<small style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>/mo</small>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>Core lessons · 3 models at a time · community support.</div>
                    <div style={{ marginTop: 12 }}>
                      <span className="chipbtn green" style={{ cursor: "default" }}>
                        Current plan
                      </span>
                    </div>
                  </div>
                  <div style={{ flex: 1, border: "1.5px solid var(--line)", borderRadius: 14, padding: 18 }}>
                    <div className="label" style={{ color: "var(--violet-dark)" }}>
                      Pro
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, margin: "6px 0" }}>
                      $12<small style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>/mo</small>
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5 }}>All 10 models · ecosystem recipes · downloadable prompts · priority updates.</div>
                    <div style={{ marginTop: 12 }}>
                      <button type="button" className="btn" onClick={() => ping("Redirecting to checkout…")}>
                        Upgrade to Pro →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {sec === "danger" && (
            <div className="scard danger-zone">
              <h2>Danger zone</h2>
              <p className="desc">These actions are permanent. Proceed carefully.</p>
              <div className="opt">
                <div>
                  <div className="ot">Pause account</div>
                  <div className="od">Temporarily hide your profile and pause all emails. Reactivate anytime.</div>
                </div>
                <button type="button" className="chipbtn" onClick={() => ping("Account paused")}>
                  Pause
                </button>
              </div>
              <div className="opt">
                <div>
                  <div className="ot">Delete account</div>
                  <div className="od">Permanently delete your account, progress, and data. This cannot be undone.</div>
                </div>
                <button type="button" className="chipbtn danger" onClick={() => ping("Deletion requires email confirmation")}>
                  Delete account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast msg={toast} />
    </div>
  );
}
