import Image from "next/image";
import Link from "next/link";
import { getHeaderAuth } from "@/lib/auth/session";
import { HeaderNav } from "@/components/HeaderNav";
import { HeaderUserMenu } from "@/components/HeaderUserMenu";

export async function Header() {
  const auth = await getHeaderAuth();

  return (
    <header
      className="navstrip site-header"
      style={{ background: "var(--paper)", color: "var(--ink)", borderColor: "var(--line)" }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", color: "inherit" }}>
        <Image src="/duranoia-icon.svg" alt="" width={30} height={30} unoptimized />
        <div style={{ fontFamily: "var(--sans)", fontSize: 18, fontWeight: 800, letterSpacing: "-.01em" }}>
          <span style={{ color: "var(--ink)" }}>Dura</span>
          <span style={{ color: "var(--violet-deep)" }}>Noia</span>
        </div>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--violet-dark)",
            letterSpacing: ".18em",
            marginLeft: 8,
            fontWeight: 600,
          }}
        >
          AI EDUCATION PLATFORM
        </span>
      </Link>
      <HeaderNav />
      {auth.loggedIn && auth.profile ? (
        <HeaderUserMenu profile={auth.profile} />
      ) : (
        <div className="navstrip-actions">
          <Link
            href="/signin"
            className="pill nav-pill ghost"
            style={{ background: "transparent", color: "var(--ink)", borderColor: "var(--violet-dark)", fontWeight: 600, textDecoration: "none" }}
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="pill nav-pill solid"
            style={{ background: "var(--violet-deep)", borderColor: "var(--violet-deep)", color: "#fff", fontWeight: 600, textDecoration: "none" }}
          >
            Get started →
          </Link>
        </div>
      )}
    </header>
  );
}
