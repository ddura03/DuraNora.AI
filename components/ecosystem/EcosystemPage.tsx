"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ECO_LINKS, ECO_MODELS } from "@/lib/ecosystem";
import { ECO_BG_OVERLAY, modelSlug } from "@/lib/ecosystem-utils";
import { LOGO_SRC } from "@/lib/logos";
import { ModelLogo } from "@/components/ModelLogo";

export function EcosystemPage() {
  const router = useRouter();
  const [hover, setHover] = useState<string | null>(null);
  const sizeW = 640;
  const sizeH = 600;
  const cx = 320;
  const cy = 300;
  const R = 210;

  const pos: Record<string, { x: number; y: number; a: number }> = {};
  ECO_MODELS.forEach((m, i) => {
    const a = (i / ECO_MODELS.length) * Math.PI * 2 - Math.PI / 2;
    pos[m.name] = { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, a };
  });

  const linksFor = (name: string) => ECO_LINKS.filter((l) => l.a === name || l.b === name);
  const isLit = (l: (typeof ECO_LINKS)[0]) => hover && (l.a === hover || l.b === hover);
  const nodeLit = (name: string) => !hover || name === hover || linksFor(hover).some((l) => l.a === name || l.b === name);

  return (
    <div className="wf eco-page">
      <div className="eco-page__hero">
        <div className="eco-page__hero-overlay" style={{ background: ECO_BG_OVERLAY }} />
        <div className="eco-page__hero-grid">
          <div className="eco-page__web">
            <svg viewBox={`0 0 ${sizeW} ${sizeH}`} className="eco-page__svg">
              {ECO_LINKS.map((l, i) => {
                const p1 = pos[l.a];
                const p2 = pos[l.b];
                const lit = isLit(l);
                const dim = hover && !lit;
                return (
                  <line
                    key={i}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={lit ? "#7c3aed" : "#a88fd8"}
                    strokeWidth={lit ? 2.2 : 1.3}
                    strokeOpacity={dim ? 0.18 : lit ? 1 : 0.7}
                    strokeDasharray={lit ? "0" : "5 5"}
                  />
                );
              })}
              <circle cx={cx} cy={cy} r="30" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
              <text x={cx} y={cy - 2} textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="#4c1d95">
                YOUR
              </text>
              <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fontWeight="700" fill="#4c1d95">
                GOAL
              </text>
              {ECO_MODELS.map((m) => {
                const p = pos[m.name];
                const lit = nodeLit(m.name);
                const lr = R + 40;
                const lx = cx + Math.cos(p.a) * lr;
                const ly = cy + Math.sin(p.a) * lr;
                const anchor = Math.cos(p.a) > 0.3 ? "start" : Math.cos(p.a) < -0.3 ? "end" : "middle";
                const ldy = Math.sin(p.a) > 0.3 ? 12 : Math.sin(p.a) < -0.3 ? -6 : 4;
                const slug = modelSlug(m.name);
                return (
                  <g
                    key={m.name}
                    className="eco-node"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHover(m.name)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => router.push(`/ecosystem/${slug}`)}
                    opacity={lit ? 1 : 0.3}
                  >
                      <circle cx={p.x} cy={p.y} r="26" fill={m.name === hover ? "#7c3aed" : "#fff"} stroke="#7c3aed" strokeWidth="1.5" />
                      {LOGO_SRC[m.mark] ? (
                        <image href={LOGO_SRC[m.mark]} x={p.x - 15} y={p.y - 15} width="30" height="30" preserveAspectRatio="xMidYMid meet" />
                      ) : (
                        <text x={p.x} y={p.y + 1} textAnchor="middle" fontFamily="var(--mono)" fontSize="15" fontWeight="800" fill={m.name === hover ? "#fff" : "#4c1d95"}>
                          {m.mark}
                        </text>
                      )}
                      <text x={lx} y={ly + ldy} textAnchor={anchor} fontFamily="var(--sans)" fontSize="12" fontWeight="700" fill="#1a1325">
                        {m.name}
                      </text>
                    </g>
                );
              })}
            </svg>
          </div>
          <div className="eco-page__intro">
            <div>
              <h1 className="eco-page__title">
                The AI ecosystem,
                <br />
                <span className="eco-page__title-accent">woven together.</span>
              </h1>
              <p className="eco-page__lead">
                No model does everything. Click any node to explore its pairings — or hover to preview who it hands off to.
              </p>
            </div>
            {hover ? (
              (() => {
                const m = ECO_MODELS.find((x) => x.name === hover)!;
                const ls = linksFor(hover);
                return (
                  <div className="eco-page__hover-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div className="glyph" style={{ width: 38, height: 38, fontSize: 18 }}>
                        <ModelLogo mark={m.mark} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: 16 }}>{m.name}</div>
                        <div className="label">{m.role}</div>
                      </div>
                    </div>
                    <div className="label" style={{ marginTop: 10, color: "var(--violet-deep)" }}>
                      Hands off to
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 8 }}>
                      {ls.map((l, i) => {
                        const other = l.a === hover ? l.b : l.a;
                        return (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid var(--line)", borderRadius: 8, padding: "8px 10px", background: "var(--paper)" }}>
                            <span style={{ fontWeight: 700, fontSize: 13 }}>{other}</span>
                            <span style={{ fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-2)" }}>{l.why}</span>
                          </div>
                        );
                      })}
                    </div>
                    <Link href={`/ecosystem/${modelSlug(m.name)}`} className="eco-forward-link" style={{ marginTop: 14, display: "inline-flex" }}>
                      Explore {m.name} pairings <span className="eco-forward-link__arr">→</span>
                    </Link>
                  </div>
                );
              })()
            ) : (
              <div className="eco-page__hint-card">
                <div className="annot">← hover or click a model</div>
                <div style={{ marginTop: 12, fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
                  Choose a model you already use, and see how it pairs with others to automate work and make your day easier.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
