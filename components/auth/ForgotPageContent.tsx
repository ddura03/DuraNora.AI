"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { authCallbackUrl } from "@/lib/auth/client";
import { createClient } from "@/lib/supabase/client";
import { NeuralBackground } from "@/components/NeuralBackground";

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function BackArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function ForgotPageContent() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: authCallbackUrl("/reset-password"),
    });

    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
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

      {!sent ? (
        <form className="card" onSubmit={handleSubmit}>
          <h1>Reset password</h1>
          <div className="sub">Enter your email and we&apos;ll send you a link to get back in.</div>
          {error ? (
            <div className="sub" style={{ color: "#d9534f", marginBottom: 4 }}>
              {error}
            </div>
          ) : null}
          <div className="field">
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="ic">
              <MailIcon />
            </span>
          </div>
          <button className="btn" type="submit" disabled={loading} style={{ marginTop: 6, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Sending…" : "Send reset link"} <span className="ar">→</span>
          </button>
          <div className="alt">
            <Link className="link" href="/signin" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <BackArrow /> Back to sign in
            </Link>
          </div>
        </form>
      ) : (
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
            If an account exists for <b style={{ color: "var(--violet-dark)" }}>{email || "your email"}</b>, a reset link is on its way. It expires in 30 minutes.
          </div>
          <Link className="btn" href="/signin" style={{ textDecoration: "none" }}>
            Back to sign in <span className="ar">→</span>
          </Link>
          <div className="alt">
            Didn&apos;t get it?{" "}
            <button type="button" className="link" onClick={() => setSent(false)} style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}>
              Try another email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
