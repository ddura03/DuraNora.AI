"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { NeuralBackground } from "@/components/NeuralBackground";

export function ResetPasswordPageContent() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/learn");
      router.refresh();
    }, 1500);
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
        <h1>Set a new password</h1>
        <div className="sub">{done ? "Password updated — redirecting…" : "Choose a strong password for your account."}</div>
        {error ? (
          <div className="sub" style={{ color: "#d9534f", marginBottom: 4 }}>
            {error}
          </div>
        ) : null}
        {!done ? (
          <>
            <div className="field">
              <input
                type="password"
                placeholder="New password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <button className="btn" type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "Updating…" : "Update password"} <span className="ar">→</span>
            </button>
          </>
        ) : null}
        <div className="alt">
          <Link className="link" href="/signin">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
