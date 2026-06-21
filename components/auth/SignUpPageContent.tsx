"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PasswordField } from "@/components/auth/PasswordField";
import { ReturnHomeLink } from "@/components/auth/ReturnHomeLink";
import { authCallbackUrl } from "@/lib/auth/client";
import { safeRedirectPath } from "@/lib/auth/routes";
import { createClient } from "@/lib/supabase/client";
import { NeuralBackground } from "@/components/NeuralBackground";

function scorePassword(pw: string) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

const STRENGTH = [
  { label: "", color: "transparent" },
  { label: "WEAK", color: "#d9534f" },
  { label: "FAIR", color: "#e0922f" },
  { label: "GOOD", color: "#7c3aed" },
  { label: "STRONG", color: "#1f8a5b" },
];

export function SignUpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirectPath(searchParams.get("redirectTo"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmSent, setConfirmSent] = useState(false);

  const score = scorePassword(pw);
  const strength = STRENGTH[score];

  const confirmTouched = pwConfirm.length > 0;
  const passwordsMatch = pw.length > 0 && pwConfirm.length > 0 && pw === pwConfirm;
  const passwordsMismatch = confirmTouched && pw !== pwConfirm;
  const confirmMatchState = passwordsMatch ? "ok" : passwordsMismatch ? "bad" : null;
  const canSubmit = agree && passwordsMatch;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password: pw,
      options: {
        data: { name: name.trim() },
        emailRedirectTo: authCallbackUrl(redirectTo),
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push(redirectTo);
      router.refresh();
      return;
    }

    setConfirmSent(true);
    setLoading(false);
  }

  async function signInWithGoogle() {
    setError("");
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: authCallbackUrl(redirectTo) },
    });
    if (oauthError) setError(oauthError.message);
  }

  if (confirmSent) {
    return (
      <div className="auth-stage">
        <NeuralBackground />
        <div className="auth-scan" />
        <Link href="/" className="auth-brand">
          <Image src="/duranoia-icon.svg" alt="" width={34} height={34} unoptimized />
          <span className="wm">
            <span className="d">Dura</span>
            <span className="n">Noia</span>
          </span>
          <span className="tag">AI EDUCATION PLATFORM</span>
        </Link>
        <div className="card" style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              margin: "4px auto 18px",
              borderRadius: "50%",
              background: "rgba(124,58,237,.12)",
              border: "1.5px solid rgba(124,58,237,.35)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h1 style={{ fontSize: 28 }}>Check your inbox</h1>
          <div className="sub" style={{ marginBottom: 24 }}>
            We sent a confirmation link to <b style={{ color: "var(--violet-dark)" }}>{email}</b>. Click it to activate your account.
          </div>
          <Link className="btn" href="/signin" style={{ textDecoration: "none" }}>
            Back to sign in <span className="ar">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-stage">
      <NeuralBackground />
      <div className="auth-scan" />
      <Link href="/" className="auth-brand">
        <Image src="/duranoia-icon.svg" alt="" width={34} height={34} unoptimized />
        <span className="wm">
          <span className="d">Dura</span>
          <span className="n">Noia</span>
        </span>
        <span className="tag">AI EDUCATION PLATFORM</span>
      </Link>
      <form className="card card--signup" onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <div className="sub">Start learning the AI that already knows you.</div>
        {error ? (
          <div className="sub" style={{ color: "#d9534f", marginBottom: 4 }}>
            {error}
          </div>
        ) : null}
        <div className="field">
          <input
            type="text"
            placeholder="Full name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <PasswordField
          value={pw}
          onChange={setPw}
          placeholder="Create a password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <div className="meter">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="seg" style={{ background: i <= score ? strength.color : undefined }} />
          ))}
        </div>
        <div className="meter-label" style={{ color: strength.color === "transparent" ? "var(--muted)" : strength.color }}>
          {pw ? `PASSWORD STRENGTH · ${strength.label}` : ""}
        </div>
        <PasswordField
          value={pwConfirm}
          onChange={setPwConfirm}
          placeholder="Retype password"
          autoComplete="new-password"
          required
          minLength={8}
          matchState={confirmMatchState}
        />
        {passwordsMismatch ? (
          <div className="pw-match-msg bad">Passwords don&apos;t match</div>
        ) : passwordsMatch ? (
          <div className="pw-match-msg ok">✓ Passwords match</div>
        ) : (
          <div className="pw-match-msg" aria-hidden="true" />
        )}
        <label className="terms">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span className="box" />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="link" onClick={(e) => e.stopPropagation()}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="link" onClick={(e) => e.stopPropagation()}>
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <button className="btn" type="submit" disabled={!canSubmit || loading} style={{ opacity: canSubmit && !loading ? 1 : 0.55 }}>
          {loading ? "Creating account…" : "Create account"} <span className="ar">→</span>
        </button>
        <div className="div">OR</div>
        <div className="sso">
          <button type="button" onClick={signInWithGoogle}>
            Google
          </button>
          <button type="button" disabled title="Coming soon">
            X
          </button>
        </div>
        <div className="alt">
          Already have an account? <Link className="link" href="/signin">Sign in</Link>
        </div>
        <ReturnHomeLink />
      </form>
    </div>
  );
}
