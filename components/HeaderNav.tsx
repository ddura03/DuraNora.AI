"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Learn AI", href: "/learn" },
  { label: "AI Ecosystem", href: "/ecosystem" },
  { label: "AI Showcase", href: "/showcase" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/learn") return pathname === "/learn" || pathname.startsWith("/learn/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <div className="links header-nav-desktop" style={{ color: "var(--ink)", fontWeight: 600, gap: 38, fontSize: "13.5px" }}>
      {LINKS.map((l) => {
        const on = isActive(pathname, l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={"nav-link" + (on ? " is-active" : "")}
            style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
