import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const linkUl = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9, fontSize: 13.5 } as const;

  return (
    <div
      className="ftr"
      style={{
        background: "#ece6f7",
        color: "var(--ink)",
        borderRadius: 0,
        border: 0,
        borderTop: "1px solid var(--line)",
        padding: "44px max(60px, 6vw) 26px",
      }}
    >
      <div className="ftr-grid">
        <div className="ftr-col ftr-brand">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: -4 }}>
            <Image src="/duranoia-icon.svg" alt="" width={30} height={30} unoptimized />
            <div style={{ fontFamily: "var(--sans)", fontSize: 19, fontWeight: 800, letterSpacing: "-.01em", lineHeight: 1 }}>
              <span style={{ color: "var(--ink)" }}>Dura</span>
              <span style={{ color: "var(--violet-deep)" }}>Noia</span>
            </div>
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--violet-dark)", letterSpacing: ".18em", fontWeight: 600 }}>
            AI EDUCATION PLATFORM
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.4, maxWidth: "30ch", marginTop: 6 }}>
            <div style={{ color: "var(--ink)", fontWeight: 600 }}>The AI knows you.</div>
            <div style={{ color: "var(--violet-deep)", fontWeight: 600, fontStyle: "italic" }}>Now know it back.</div>
          </div>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: "var(--violet-dark)", fontWeight: 700 }}>Learn</h6>
          <ul style={linkUl}>
            <li><span className="nav-link">All models</span></li>
            <li><span className="nav-link">Prompt library</span></li>
            <li><span className="nav-link">Comparisons</span></li>
            <li><span className="nav-link">Glossary</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: "var(--violet-dark)", fontWeight: 700 }}>Ecosystem</h6>
          <ul style={linkUl}>
            <li><span className="nav-link">Workflows</span></li>
            <li><span className="nav-link">Recipes</span></li>
            <li><span className="nav-link">Integrations</span></li>
            <li><span className="nav-link">Cost calculator</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: "var(--violet-dark)", fontWeight: 700 }}>Company</h6>
          <ul style={linkUl}>
            <li><Link href="/about" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>About</Link></li>
            <li><Link href="/news" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Newswire</Link></li>
            <li><Link href="/terms" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Terms of Service</Link></li>
            <li><Link href="/privacy" className="nav-link" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</Link></li>
            <li><span className="nav-link">Careers</span></li>
            <li><span className="nav-link">Contact</span></li>
          </ul>
        </div>
        <div className="ftr-col">
          <h6 style={{ color: "var(--violet-dark)", fontWeight: 700 }}>Newsletter</h6>
          <div style={{ fontSize: 12.5, color: "var(--ink-2)", marginBottom: 8 }}>One short brief, weekly. No hype.</div>
          <div className="ftr-news">
            <input placeholder="you@domain.com" style={{ borderColor: "var(--line)", color: "var(--ink)", background: "#fff" }} />
            <button type="button" className="join-btn" style={{ background: "var(--violet-deep)", borderColor: "var(--violet-deep)", color: "#fff" }}>
              Join <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
      <div className="ftr-bot" style={{ borderTopColor: "var(--line)", color: "var(--ink-2)" }}>
        <span>© 2026 DuraNoia.AI</span>
        <span>v0.wireframe · all marks property of their owners</span>
      </div>
    </div>
  );
}
