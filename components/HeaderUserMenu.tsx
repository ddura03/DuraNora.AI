"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { HeaderProfile } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/client";

type ProfileDraft = {
  name: string;
  headline: string;
  email: string;
};

type Props = {
  profile: HeaderProfile;
};

export function HeaderUserMenu({ profile }: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);
  const avRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<ProfileDraft>({
    name: profile.name ?? "",
    headline: profile.headline ?? "",
    email: profile.email,
  });

  useEffect(() => {
    setDraft({
      name: profile.name ?? "",
      headline: profile.headline ?? "",
      email: profile.email,
    });
  }, [profile]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (avRef.current && !avRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const initials = profile.initials ?? "??";
  const avatarStyle = profile.avatar_color ? { background: profile.avatar_color } : undefined;

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setMenuOpen(false);
    router.push("/signin");
    router.refresh();
  }

  async function saveProfile() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("users")
      .update({
        name: draft.name.trim(),
        headline: draft.headline.trim(),
      })
      .eq("id", profile.id);

    setSaving(false);
    if (error) {
      setToast("Could not save profile");
      setTimeout(() => setToast(""), 2200);
      return;
    }

    setModal(false);
    setToast("Profile saved");
    setTimeout(() => setToast(""), 2200);
    router.refresh();
  }

  return (
    <>
      <div className="navstrip-actions">
        <div className="av-wrap" ref={avRef}>
          <div className="avatar header-avatar" title={profile.name ?? "Account"} style={avatarStyle} onClick={() => setMenuOpen((o) => !o)}>
            {initials}
          </div>
          {menuOpen ? (
            <div className="menu">
              <div className="mhead">
                <div className="avatar header-avatar" style={{ cursor: "default", ...avatarStyle }}>
                  {initials}
                </div>
                <div>
                  <div className="nm">{profile.name ?? "Account"}</div>
                  <div className="em">{profile.email}</div>
                </div>
              </div>
              <div
                className="mi"
                onClick={() => {
                  setDraft({
                    name: profile.name ?? "",
                    headline: profile.headline ?? "",
                    email: profile.email,
                  });
                  setModal(true);
                  setMenuOpen(false);
                }}
              >
                Edit profile
              </div>
              <div className="mi" onClick={() => router.push("/learn")}>
                My progress
              </div>
              <div className="mi" onClick={() => router.push("/settings")}>
                Settings
              </div>
              <div className="mdiv" />
              <div className="mi danger" onClick={signOut}>
                Sign out
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {modal ? (
        <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className="modal">
            <div className="mtop">
              <h3>Edit profile</h3>
              <div className="mx" onClick={() => setModal(false)}>×</div>
            </div>
            <div className="mbody">
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
                <input value={draft.email} readOnly />
              </div>
            </div>
            <div className="mfoot">
              <button type="button" className="btn ghost" onClick={() => setModal(false)}>Cancel</button>
              <button type="button" className="btn" disabled={saving} onClick={saveProfile}>
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {toast ? <div className="toast">{toast}</div> : null}
    </>
  );
}
