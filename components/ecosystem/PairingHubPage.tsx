"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ModelLogo } from "@/components/ModelLogo";
import { ECO_LINKS, ECO_MODELS } from "@/lib/ecosystem";
import { getEcoModel, modelSlug } from "@/lib/ecosystem-utils";
import type { EcoModel } from "@/lib/types";

type Props = { slug: string };

type HubPair = {
  partner: EcoModel;
  why: string;
  selfFirst: boolean;
  steps: [string, string][];
};

function buildPairs(model: EcoModel): HubPair[] {
  return ECO_LINKS.filter((l) => l.a === model.name || l.b === model.name).map((l) => {
    const partnerName = l.a === model.name ? l.b : l.a;
    const partner = ECO_MODELS.find((m) => m.name === partnerName)!;
    const selfFirst = l.a === model.name;
    const parts = l.why.split("→").map((s) => s.trim());
    const ordered = selfFirst ? [model, partner] : [partner, model];
    const steps = ordered.map((m, i) => [m.name, parts[i] || ""] as [string, string]);
    return { partner, why: l.why, selfFirst, steps };
  });
}

function markFor(name: string) {
  return ECO_MODELS.find((m) => m.name === name)?.mark ?? "@chatgpt";
}

export function PairingHubPage({ slug }: Props) {
  const model = getEcoModel(slug);
  const pairs = useMemo(() => (model ? buildPairs(model) : []), [model]);
  const [sel, setSel] = useState(0);
  const p = pairs[sel] ?? pairs[0];

  useEffect(() => {
    setSel(0);
  }, [slug]);

  const cx = 240;
  const cy = 235;
  const R = 165;
  const angleFor = (i: number) => (-90 + (i * 360) / pairs.length) * (Math.PI / 180);

  if (!model) {
    return (
      <div className="wf eco-pairing-hub">
        <div className="sec" style={{ padding: "30px max(40px,4vw) 60px" }}>
          <p>Model not found.</p>
          <Link
            href="/ecosystem"
            className="crumb back-web"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12.5,
              color: "var(--violet-deep)",
              fontWeight: 700,
              marginBottom: 22,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span className="bw-arrow" style={{ fontSize: 16 }}>
              ←
            </span>{" "}
            Back to AI spider web
          </Link>
        </div>
      </div>
    );
  }

  const partnerSlug = p ? modelSlug(p.partner.name) : "";
  const flowFromMark = p && p.steps[0][0] === model.name ? model.mark : p?.partner.mark ?? model.mark;

  return (
    <div className="wf eco-pairing-hub">
      <div className="sec" style={{ padding: "30px max(40px,4vw) 60px" }}>
        <Link
          href="/ecosystem"
          className="crumb back-web"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            color: "var(--violet-deep)",
            fontWeight: 700,
            marginBottom: 22,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span className="bw-arrow" style={{ fontSize: 16 }}>
            ←
          </span>{" "}
          Back to AI spider web
        </Link>

        <div
          className="eco-pairing-hub__layout"
          style={{
            display: "grid",
            gridTemplateColumns: "520px 1fr",
            gap: 48,
            alignItems: "center",
            minHeight: "calc(100vh - 220px)",
          }}
        >
          <div style={{ position: "relative", height: 480 }}>
            <svg width="480" height="480" style={{ position: "absolute", inset: 0 }}>
              {pairs.map((pp, i) => {
                const a = angleFor(i);
                const x = cx + R * Math.cos(a);
                const y = cy + R * Math.sin(a);
                const on = i === sel;
                return (
                  <line
                    key={pp.partner.name}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={on ? "#7c3aed" : "#cdbce8"}
                    strokeWidth={on ? 2.5 : 1.2}
                    strokeDasharray={on ? "0" : "4 4"}
                  />
                );
              })}
            </svg>

            <div
              className="glyph"
              style={{
                position: "absolute",
                left: cx - 42,
                top: cy - 42,
                width: 84,
                height: 84,
                fontSize: 30,
                background: "#7c3aed",
                borderColor: "#7c3aed",
              }}
            >
              <ModelLogo mark={model.mark} size={84} />
            </div>

            {pairs.map((pp, i) => {
              const a = angleFor(i);
              const x = cx + R * Math.cos(a);
              const y = cy + R * Math.sin(a);
              const on = i === sel;
              return (
                <button
                  key={pp.partner.name}
                  type="button"
                  onClick={() => setSel(i)}
                  title={pp.partner.name}
                  onMouseEnter={(e) => {
                    if (!on) {
                      e.currentTarget.style.borderColor = "#7c3aed";
                      e.currentTarget.style.boxShadow = "0 0 0 4px rgba(124,58,237,.14)";
                      e.currentTarget.style.transform = "scale(1.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!on) {
                      e.currentTarget.style.borderColor = "#d9cff0";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                  style={{
                    position: "absolute",
                    left: x - 33,
                    top: y - 33,
                    width: 66,
                    height: 66,
                    borderRadius: 15,
                    border: `1.5px solid ${on ? "#7c3aed" : "#d9cff0"}`,
                    background: on ? "#ece6f7" : "#fff",
                    cursor: "pointer",
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                    boxShadow: on ? "0 6px 18px rgba(124,58,237,.25)" : "none",
                    transition: "all .15s ease",
                  }}
                >
                  <span style={{ width: 38, height: 38, display: "grid", placeItems: "center" }}>
                    <ModelLogo mark={pp.partner.mark} size={38} />
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <div className="eco-pairing-hub__model-header" style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div className="glyph" style={{ width: 56, height: 56, fontSize: 22, flexShrink: 0 }}>
                <ModelLogo mark={model.mark} size={56} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 25, letterSpacing: "-.02em" }}>{model.name}</div>
                <div className="label">
                  {model.company} · {model.role}
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.55,
                margin: "14px 0 20px",
                maxWidth: "60ch",
              }}
            >
              Pick a connected model to see how {model.name} pairs with it — which hands off to which, and why.
            </div>

            {p ? (
              <div
                style={{
                  border: "1.5px solid #7c3aed",
                  borderRadius: 14,
                  padding: 20,
                  background: "#fff",
                  boxShadow: "0 14px 30px rgba(124,58,237,.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--mono)",
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ width: 26, height: 26, display: "grid", placeItems: "center" }}>
                    <ModelLogo mark={flowFromMark} size={26} />
                  </span>
                  {p.steps[0][0]}{" "}
                  <span style={{ color: "var(--violet-deep)" }}>→</span> {p.steps[1][0]}
                </div>
                <div className="label" style={{ color: "var(--violet-deep)", marginBottom: 8 }}>
                  The flow
                </div>
                <div style={{ display: "flex", alignItems: "stretch", gap: 8, flexWrap: "wrap" }}>
                  {p.steps.map((s, i) => {
                    const m = ECO_MODELS.find((x) => x.name === s[0]);
                    return (
                      <span key={i} style={{ display: "contents" }}>
                        <div
                          style={{
                            flex: 1,
                            minWidth: 160,
                            background: "#ece6f7",
                            border: "1px solid #d9cff0",
                            borderRadius: 10,
                            padding: "12px 14px",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 22, height: 22, display: "grid", placeItems: "center" }}>
                              <ModelLogo mark={m?.mark ?? markFor(s[0])} size={22} />
                            </span>
                            <span style={{ fontWeight: 700, fontSize: 13.5 }}>{s[0]}</span>
                          </div>
                          <div style={{ fontSize: 12, color: "var(--ink-2)", marginTop: 6 }}>{s[1] || "—"}</div>
                        </div>
                        {i < p.steps.length - 1 ? (
                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              color: "var(--violet-deep)",
                              fontWeight: 700,
                            }}
                          >
                            →
                          </div>
                        ) : null}
                      </span>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px dashed var(--line)",
                  }}
                >
                  <span className="label">Pairing · {p.why}</span>
                  <Link
                    href={`/ecosystem/${slug}/${partnerSlug}`}
                    className="watch-link"
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: "var(--violet-deep)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    Watch the {p.steps[0][0]} + {p.steps[1][0]} workflow <span className="wl-arrow">→</span>
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="label" style={{ marginTop: 14 }}>
              Click another node in the hub to explore a different pairing.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
