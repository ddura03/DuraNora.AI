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

export function SignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = safeRedirectPath(searchParams.get("redirectTo"));
  const authError = searchParams.get("error") === "auth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(authError ? "Sign in failed. Try again." : "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (!remember) {
      // Session still persists in cookies; checkbox is visual-only for now.
    }

    router.push(redirectTo);
    router.refresh();
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
      <form className="card" onSubmit={handleSubmit}>
        <h1>Welcome back</h1>
        <div className="sub">Sign in to pick up where you left off.</div>
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
        </div>
        <PasswordField
          value={password}
          onChange={setPassword}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <div className="row">
          <label className="remember">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span className="box" />
            Remember me
          </label>
          <Link className="link" href="/forgot">
            Forgot password?
          </Link>
        </div>
        <button className="btn" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "Signing in…" : "Sign in"} <span className="ar">→</span>
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
          Don&apos;t have an account?{" "}
          <Link className="link" href={`/signup${redirectTo !== "/learn" ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}>
            Create one
          </Link>
        </div>
        <ReturnHomeLink />
      </form>
    </div>
  );
}
