"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AI_LIST } from "@/lib/ai-list";
import { NEWS_ITEMS } from "@/lib/news";
import { newsImage } from "@/lib/news-utils";
import { Footer } from "@/components/Footer";
import { ModelLogo } from "@/components/ModelLogo";
import { NeuralBackground } from "@/components/NeuralBackground";
import { EcosystemArt, LearnAiArt } from "@/components/home/HomeArt";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";

function shift(hex: string, delta: number) {
  const n = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(n.slice(0, 2), 16) + delta));
  const g = Math.max(0, Math.min(255, parseInt(n.slice(2, 4), 16) + delta));
  const b = Math.max(0, Math.min(255, parseInt(n.slice(4, 6), 16) + delta));
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function Crosshair({ t, b, l, r, color }: { t?: number; b?: number; l?: number; r?: number; color: string }) {
  const pos: React.CSSProperties = {};
  if (t != null) pos.top = t;
  if (b != null) pos.bottom = b;
  if (l != null) pos.left = l;
  if (r != null) pos.right = r;
  return (
    <div style={{ position: "absolute", ...pos, width: 14, height: 14, opacity: 0.7 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderTop: t != null ? `1.5px solid ${color}` : "",
          borderBottom: b != null ? `1.5px solid ${color}` : "",
          borderLeft: l != null ? `1.5px solid ${color}` : "",
          borderRight: r != null ? `1.5px solid ${color}` : "",
        }}
      />
    </div>
  );
}

function SectionDivider() {
  return (
    <div style={{ width: "100%", padding: "6px max(60px, 6vw)", display: "flex", alignItems: "center", gap: 18, background: "#f6f3fb" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent 0%, #b39ddb 35%, #7c3aed 100%)" }} />
      <svg width="68" height="24" viewBox="0 0 68 24" style={{ display: "block" }}>
        <line x1="0" y1="12" x2="22" y2="12" stroke="#7c3aed" strokeWidth="1" />
        <line x1="46" y1="12" x2="68" y2="12" stroke="#7c3aed" strokeWidth="1" />
        <circle cx="14" cy="12" r="2" fill="#b39ddb" />
        <circle cx="54" cy="12" r="2" fill="#b39ddb" />
        <circle cx="34" cy="12" r="4.5" fill="#7c3aed" />
        <circle cx="34" cy="12" r="2" fill="#ffffff" />
      </svg>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(270deg, transparent 0%, #b39ddb 35%, #7c3aed 100%)" }} />
    </div>
  );
}

function NewsImage({ company }: { company: string }) {
  const base: React.CSSProperties = {
    height: 110,
    border: "1px solid #d9cff0",
    borderRadius: 5,
    background: "linear-gradient(135deg, #f6f3fb 0%, #ece6f7 100%)",
    display: "grid",
    placeItems: "center",
    position: "relative",
    overflow: "hidden",
  };
  const src = newsImage(company);
  if (src) {
    return (
      <div style={base}>
        <Image src={src} alt={company} fill style={{ objectFit: "cover" }} unoptimized />
      </div>
    );
  }
  return <div style={base} />;
}

function NewsSection() {
  const FILTERS = ["All", "Releases", "Funding", "Research", "Policy"];
  const [active, setActive] = useState("All");
  const homeNews = NEWS_ITEMS.filter((n) => n.id !== "cursor-agents" && n.id !== "mj-v8");
  const list = active === "All" ? homeNews : homeNews.filter((n) => n.cat === active);

  return (
    <div className="sec" style={{ padding: "30px 22px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }} className="home-news-head">
        <div>
          <div className="kicker">Live feed</div>
          <div style={{ fontFamily: "var(--sans)", fontSize: 30, fontWeight: 700, letterSpacing: "-.01em", lineHeight: 1, marginTop: 4 }}>
            What&apos;s new from the labs
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, position: "relative" }} className="home-news-filters">
          {FILTERS.map((f) => (
            <button key={f} type="button" onClick={() => setActive(f)} className={"filter-pill" + (f === active ? " is-on" : "")} aria-pressed={f === active}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="home-news-grid">
        {list.map((n) => (
          <Link href={`/news/${n.id}`} className="news-card" key={n.id}>
            <NewsImage company={n.company || ""} />
            <div className="news-meta">
              <b>{n.company}</b>
              <span>{n.date}</span>
            </div>
            <div className="news-title">{n.title}</div>
            <div className="news-excerpt">{n.excerpt}</div>
            <div className="read-link" style={{ marginTop: 4, fontFamily: "var(--mono)", fontSize: 10.5, letterSpacing: ".06em", fontWeight: 600 }}>
              READ <span className="arr">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FeatureSection() {
  const router = useRouter();
  return (
    <div className="sec" style={{ padding: "30px 22px 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 8 }} className="home-feature-grid">
        <div className="feat-card" onClick={() => router.push("/learn")}>
          <div className="feat-title">
            Learn AI
            <br />
            <span style={{ fontFamily: "var(--mono)", fontWeight: 500, fontSize: 18, color: "#7c3aed", letterSpacing: 0 }}>from zero → prompt-fluent</span>
          </div>
          <div className="feat-body">Deep-dive courses on every model: what it does, what it&apos;s bad at, prompting patterns, hidden flags, and side-by-side capability scorecards.</div>
          <LearnAiArt />
          <div style={{ display: "flex", gap: 10 }}>
            <span className="pill">8 models</span>
            <span className="pill">42 lessons</span>
            <span className="pill">Prompt library</span>
          </div>
        </div>
        <div className="feat-card" onClick={() => router.push("/ecosystem")}>
          <div className="feat-title">
            AI Ecosystem
            <br />
            <span style={{ fontFamily: "var(--mono)", fontWeight: 500, fontSize: 18, color: "#7c3aed", letterSpacing: 0 }}>chain them together</span>
          </div>
          <div className="feat-body">Visual map of how today&apos;s models intersect. Recipes for using many together for one objective — research, code, design, and compare.</div>
          <EcosystemArt />
          <div style={{ display: "flex", gap: 10 }}>
            <span className="pill">Workflows</span>
            <span className="pill">Handoffs</span>
            <span className="pill">Cost map</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MarketingHome() {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(420);

  const P = {
    bg: "#f6f3fb",
    bgDeep: "#ece6f7",
    ink: "#1a1325",
    ink2: "#5a4e75",
    muted: "#9087a8",
    accent: "#7c3aed",
    accent2: "#4c1d95",
    soft: "#b39ddb",
    line: "#d9cff0",
  };

  useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setCardH(entry.contentRect.height);
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="wf" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div className="home-hero-shell">
        <div className="wf-body" style={{ background: P.bg, flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="v2-hero home-hero" style={{ background: P.bgDeep, flex: 1, minHeight: 560, borderColor: P.line, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `
              radial-gradient(circle at 22% 35%, ${P.accent}26 0, transparent 55%),
              radial-gradient(circle at 78% 75%, ${P.soft}55 0, transparent 55%),
              radial-gradient(circle at 50% 110%, ${P.accent}1a 0, transparent 60%),
              repeating-linear-gradient(135deg, ${P.bgDeep} 0 18px, ${shift(P.bgDeep, -4)} 18px 36px)
            `,
              }}
            />
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "repeating-linear-gradient(0deg, rgba(76,29,149,.025) 0 2px, transparent 2px 4px)" }} />
            <NeuralBackground />
            <Crosshair t={20} l={20} color={P.accent2} />
            <Crosshair t={20} r={20} color={P.accent2} />
            <Crosshair b={20} r={20} color={P.accent2} />

            <div className="home-hero-layout">
            <div className="home-hero-picker" style={{ position: "absolute", left: "max(54px, calc(50% - 660px))", top: 88, width: 500 }}>
              <div
                ref={cardRef}
                style={{
                  background: `${P.bg}f2`,
                  border: `1px solid ${P.accent}55`,
                  borderRadius: 12,
                  padding: 22,
                  backdropFilter: "blur(8px)",
                  boxShadow: `0 0 0 1px ${P.accent}1a inset, 0 30px 60px ${P.accent2}26, 0 0 60px ${P.accent}22`,
                }}
              >
                <div style={{ marginBottom: 16, fontFamily: "var(--mono)", fontSize: 13.5, color: P.accent, letterSpacing: ".14em", fontWeight: 700 }}>◇ SELECT A MODEL</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }} className="home-model-picker-grid">
                  {AI_LIST.map((ai) => (
                    <button
                      key={ai.name}
                      type="button"
                      className="model-picker-btn"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: "#ffffff",
                        padding: "14px 16px",
                        borderRadius: 7,
                        cursor: "pointer",
                        color: P.ink,
                        fontFamily: "var(--mono)",
                        fontSize: 14,
                        textAlign: "left",
                      }}
                      onClick={() => router.push(`/learn/${ai.name.toLowerCase()}`)}
                    >
                      <span style={{ width: 38, height: 38, border: `1px solid ${P.line}`, borderRadius: 6, display: "grid", placeItems: "center", background: `${P.soft}33`, fontWeight: 700, fontSize: 16, color: P.accent2, flex: "0 0 38px" }}>
                        <ModelLogo mark={ai.mark} />
                      </span>
                      <span>
                        <div style={{ fontWeight: 600, color: P.ink }}>{ai.name}</div>
                        <div style={{ fontSize: 11, color: P.muted, letterSpacing: ".04em", marginTop: 2 }}>{ai.sub}</div>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="home-hero-copy" style={{ position: "absolute", right: "max(54px, calc(50% - 660px))", top: 88, maxWidth: 660, color: P.ink, textAlign: "right", height: cardH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="home-hero-headline" style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: 70, letterSpacing: "-.028em", lineHeight: 1.02, color: P.accent2 }}>
                <div style={{ color: P.accent2, fontStyle: "normal", fontWeight: 800 }}>The AI knows you.</div>
                <div style={{ color: P.accent, fontStyle: "italic", fontWeight: 700 }}>Now know it back.</div>
              </div>
              <div className="home-hero-subcopy" style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                <div style={{ width: 72, height: 2, background: `linear-gradient(90deg, ${P.soft} 0%, ${P.accent} 100%)`, borderRadius: 2 }} />
                <div className="home-hero-tagline" style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 500, color: P.ink, lineHeight: 1.45, whiteSpace: "nowrap" }}>Hands-on lessons for the models shaping how we work.</div>
                <div style={{ fontFamily: "var(--sans)", fontSize: 22, fontWeight: 600, color: P.accent, fontStyle: "italic", lineHeight: 1.4, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--mono)", fontStyle: "normal", color: P.accent, fontWeight: 700 }}>←</span>
                  Pick one to begin.
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureSection />
      <SectionDivider />
      <ShowcaseSection />
      <SectionDivider />
      <NewsSection />
      <Footer />
    </div>
  );
}
