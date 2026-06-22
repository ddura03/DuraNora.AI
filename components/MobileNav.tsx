"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-nav-toggle"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="mobile-nav-toggle__bar" />
        <span className="mobile-nav-toggle__bar" />
        <span className="mobile-nav-toggle__bar" />
      </button>
      {open ? (
        <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />
      ) : null}
      <nav id="mobile-nav-drawer" className={"mobile-nav-drawer" + (open ? " is-open" : "")} aria-hidden={!open}>
        {LINKS.map((l) => {
          const on = isActive(pathname, l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={"mobile-nav-link" + (on ? " is-active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
