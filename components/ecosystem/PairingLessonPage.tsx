"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ModelLogo } from "@/components/ModelLogo";
import { ECO_MODELS } from "@/lib/ecosystem";
import { getEcoModel, getModelUrl, getPairing, modelSlug } from "@/lib/ecosystem-utils";
import type { PairingContent } from "@/lib/types";

type Props = { slug: string; partnerSlug: string };

function markFor(name: string) {
  return ECO_MODELS.find((m) => m.name === name)?.mark ?? "@chatgpt";
}

function totalDur(lessons: { dur: string }[]) {
  let sec = 0;
  for (const l of lessons) {
    const [m, s] = l.dur.split(":").map(Number);
    sec += (m || 0) * 60 + (s || 0);
  }
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
function storageKey(pairing: PairingContent) {
  return `pairing-progress-${modelSlug(pairing.from)}-${modelSlug(pairing.to)}`;
}

function ModelMark({ name, size = 24 }: { name: string; size?: number }) {
  const radius = Math.round(size * 0.22);
  return (
    <span className="glyph" style={{ width: size, height: size, borderRadius: radius, flexShrink: 0 }}>
      <ModelLogo mark={markFor(name)} size={size} />
    </span>
  );
}

export function PairingLessonPage({ slug, partnerSlug }: Props) {
  const model = getEcoModel(slug);
  const pairing = getPairing(slug, partnerSlug);

  const [activeIdx, setActiveIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [hoverDone, setHoverDone] = useState(false);

  useEffect(() => {
    if (!pairing) return;
    try {
      const raw = localStorage.getItem(storageKey(pairing));
      if (raw) setCompleted(new Set(JSON.parse(raw) as number[]));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, [pairing]);

  useEffect(() => {
    if (!pairing || !hydrated) return;
    localStorage.setItem(storageKey(pairing), JSON.stringify([...completed]));
  }, [completed, pairing, hydrated]);

  useEffect(() => {
    setHoverDone(false);
  }, [activeIdx]);

  const lessons = pairing?.lessons ?? [];
  const lesson = lessons[activeIdx];
  const done = completed.size;
  const isCurrentComplete = completed.has(activeIdx);

  if (!model || !pairing || !lesson) {
    return (
      <div className="wf" style={{ padding: 48 }}>
        <p>Pairing not found.</p>
        <Link href="/ecosystem" className="back-web">
          <span className="bw-arrow">←</span> Back to AI spider web
        </Link>
      </div>
    );
  }

  function toggleComplete(idx: number) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function markCurrentDoneAndNext() {
    setCompleted((prev) => new Set(prev).add(activeIdx));
    if (activeIdx < lessons.length - 1) setActiveIdx(activeIdx + 1);
  }

  const hubHref = `/ecosystem/${slug}`;
  const A = pairing.from;
  const B = pairing.to;

  return (
    <div className="eco-pairing-lesson">
      <div style={{ padding: "18px max(40px,4vw) 0" }}>
        <Link
          href={hubHref}
          className="back-web"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12.5,
            color: "var(--violet-deep)",
            fontWeight: 700,
            marginBottom: 18,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span className="bw-arrow" style={{ fontSize: 16 }}>
            ←
          </span>{" "}
          Back to {model.name} pairing hub
        </Link>

        <div className="eco-pairing-lesson__title-row" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <ModelMark name={A} size={48} />
            <span style={{ color: "var(--violet-deep)", fontFamily: "var(--mono)", fontWeight: 700, fontSize: 20 }}>+</span>
            <ModelMark name={B} size={48} />
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.05 }}>{pairing.workflowTitle}</div>
            <div className="eco-pairing-lesson__meta label" style={{ marginTop: 5 }}>
              Workflow · {lessons.length} lessons · {totalDur(lessons)}
            </div>
          </div>
        </div>

        <div
          className="eco-pairing-lesson__subtitle"
          style={{
            fontSize: 13.5,
            color: "var(--ink-2)",
            lineHeight: 1.5,
            margin: "10px 0 0",
            maxWidth: "none",
            whiteSpace: "nowrap",
          }}
        >
          {pairing.summary}
        </div>
      </div>

      <div
        className="eco-pairing-lesson__workspace"
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 320px",
          marginTop: 16,
          borderTop: "1.5px solid var(--line)",
          height: "calc(100vh - 250px)",
          minHeight: 430,
        }}
      >
        <div style={{ borderRight: "1.5px solid var(--line)", padding: "16px 16px", background: "#fff", overflowY: "auto" }}>
          <div className="eco-pairing-lesson__lessons-label label" style={{ marginBottom: 12 }}>
            // Lessons &nbsp; {done} / {lessons.length}
          </div>
          {lessons.map((ls, i) => {
            const isDone = completed.has(i);
            const isOn = i === activeIdx;
            return (
              <div
                key={ls.n}
                onClick={() => setActiveIdx(i)}
                style={{
                  display: "flex",
                  gap: 11,
                  alignItems: "flex-start",
                  padding: "11px 10px",
                  borderRadius: 9,
                  cursor: "pointer",
                  background: isOn ? "var(--paper-2)" : "transparent",
                  borderLeft: isOn ? "3px solid var(--violet-deep)" : "3px solid transparent",
                  marginBottom: 2,
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComplete(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation();
                      toggleComplete(i);
                    }
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    flex: "0 0 20px",
                    marginTop: 1,
                    border: `1.5px solid ${isDone ? "var(--ok)" : "var(--line)"}`,
                    background: isDone ? "var(--ok)" : "#fff",
                    display: "grid",
                    placeItems: "center",
                    cursor: "pointer",
                  }}
                >
                  {isDone ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : null}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, lineHeight: 1.25 }}>
                    {ls.n}. {ls.title}
                  </div>
                  <div className="eco-pairing-lesson__lesson-meta label" style={{ marginTop: 3, display: "flex", alignItems: "center", gap: 6 }}>
                    {ls.level} · {ls.dur}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "16px max(24px,2vw)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: 0,
          }}
        >
          <div className="label" style={{ marginBottom: 10, flexShrink: 0 }}>
            // Lesson {lesson.n} · {lesson.title}
          </div>
          <div
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              flex: "1 1 auto",
              minHeight: 240,
              background: "repeating-linear-gradient(135deg,#ddd0f0 0 16px,#cbb9ec 16px 32px)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: ".06em",
                background: "#1a1325",
                color: "#fff",
                padding: "4px 9px",
                borderRadius: 4,
              }}
            >
              ▶ NOW PLAYING · 0:00 / {lesson.dur}
            </div>
            <div
              style={{
                width: 74,
                height: 74,
                borderRadius: "50%",
                background: "rgba(255,255,255,.92)",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 12px 30px rgba(76,29,149,.3)",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderStyle: "solid",
                  borderWidth: "13px 0 13px 21px",
                  borderColor: "transparent transparent transparent #7c3aed",
                  marginLeft: 5,
                }}
              />
            </div>
          </div>
          {lesson.desc ? (
            <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5, margin: "14px 0 0", flexShrink: 0 }}>{lesson.desc}</div>
          ) : null}
          <div style={{ flexShrink: 0, marginTop: "auto", paddingTop: 16 }}>
            <div className="label" style={{ margin: "0 0 10px", color: "var(--violet-deep)" }}>
              The workflow
            </div>
            <div style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
            {pairing.flow.map((step, i) => (
              <span key={i} style={{ display: "contents" }}>
                <div style={{ flex: 1, border: "1.5px solid var(--line)", borderRadius: 11, padding: "14px 16px", background: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 7 }}>
                    <ModelMark name={step.model} size={26} />
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{step.model}</span>
                    <span className="label" style={{ marginLeft: "auto", marginTop: 0, marginBottom: 0, display: "block" }}>
                      Step {i + 1}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 4 }}>{step.action}</div>
                </div>
                {i < pairing.flow.length - 1 ? (
                  <div style={{ display: "grid", placeItems: "center", color: "var(--violet-deep)", fontWeight: 700, fontSize: 18 }}>→</div>
                ) : null}
              </span>
            ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderLeft: "1.5px solid var(--line)",
            padding: "16px 20px",
            background: "#fff",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            minHeight: 0,
          }}
        >
          <div className="label" style={{ marginBottom: 12, flexShrink: 0 }}>
            // Try it yourself
          </div>
          <div className="label" style={{ marginBottom: 8, flexShrink: 0 }}>
            The hand-off prompt
          </div>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "var(--mono)",
              fontSize: 12,
              lineHeight: 1.6,
              background: "var(--paper)",
              border: "1.5px solid var(--line)",
              borderRadius: 10,
              padding: 14,
              color: "var(--ink)",
              margin: 0,
              flexShrink: 0,
            }}
          >
            {pairing.handoffPrompt}
          </pre>
          <div className="eco-pairing-lesson__open-row" style={{ display: "flex", gap: 8, marginTop: "auto", flexShrink: 0, paddingTop: 12 }}>
            <a
              href={getModelUrl(A)}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-pairing-lesson__open-btn"
            >
              Open {A} →
            </a>
            <a
              href={getModelUrl(B)}
              target="_blank"
              rel="noopener noreferrer"
              className="eco-pairing-lesson__open-btn"
            >
              Open {B} →
            </a>
          </div>
          {!isCurrentComplete ? (
            <button
              type="button"
              onClick={markCurrentDoneAndNext}
              className="eco-pairing-lesson__complete-btn"
              style={{ flexShrink: 0 }}
            >
              ✓ Mark complete & next →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => toggleComplete(activeIdx)}
              onMouseEnter={() => setHoverDone(true)}
              onMouseLeave={() => setHoverDone(false)}
              className={`eco-pairing-lesson__complete-btn eco-pairing-lesson__complete-btn--done${hoverDone ? " eco-pairing-lesson__complete-btn--undo" : ""}`}
              style={{ flexShrink: 0 }}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform .4s cubic-bezier(.65,.05,.36,1)",
                  transform: hoverDone ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              >
                {hoverDone ? "↺" : "✓"}
              </span>{" "}
              {hoverDone ? "Mark incomplete" : "Lesson complete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
