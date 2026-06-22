"use client";

import { useEffect, useMemo, useState } from "react";
import { useLessonProgress } from "@/lib/hooks/useLessonProgress";
import { fetchResumeState } from "@/lib/store/progress";
import { MODELS_CATALOG } from "@/lib/models-catalog";
import { ModelLogo } from "@/components/ModelLogo";

type Props = { modelSlug: string };

export function ModelLessonPage({ modelSlug }: Props) {
  const slug = modelSlug.toLowerCase();
  const MODEL = MODELS_CATALOG[slug] || MODELS_CATALOG.chatgpt;
  const LESSONS = MODEL.lessons;

  const { completed, loading, updateCompleted, saveResume } = useLessonProgress(slug);

  const firstIncomplete = useMemo(() => {
    for (let i = 0; i < LESSONS.length; i++) if (!completed.has(i)) return i;
    return 0;
  }, [LESSONS.length, completed]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [hoverDone, setHoverDone] = useState(false);

  useEffect(() => {
    if (loading || initialized) return;
    fetchResumeState().then((resume) => {
      if (resume?.slug === slug) setActiveIdx(resume.lessonIdx);
      else setActiveIdx(firstIncomplete);
      setInitialized(true);
    });
  }, [loading, initialized, firstIncomplete, slug]);

  const lesson = LESSONS[activeIdx];

  useEffect(() => {
    if (loading || !initialized) return;
    saveResume(activeIdx);
  }, [activeIdx, loading, initialized, saveResume]);

  function toggleComplete(idx: number) {
    updateCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function go(delta: number) {
    setActiveIdx(Math.max(0, Math.min(LESSONS.length - 1, activeIdx + delta)));
  }

  function markCurrentDoneAndNext() {
    updateCompleted((prev) => new Set(prev).add(activeIdx));
    if (activeIdx < LESSONS.length - 1) setActiveIdx(activeIdx + 1);
  }

  const isCurrentComplete = completed.has(activeIdx);

  if (loading || !initialized) {
    return (
      <div className="wf" style={{ padding: 48, color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 13 }}>
        Loading your progress…
      </div>
    );
  }

  return (
    <div className="wf model-lesson-page">
      <div className="model-lesson-header">
        <div className="model-lesson-header__row">
          <div className="model-lesson-header__glyph">
            <ModelLogo mark={MODEL.mark} size={52} />
          </div>
          <div className="model-lesson-header__copy">
            <div className="model-lesson-header__title-row">
              <div className="model-lesson-header__name">{MODEL.name}</div>
              <span className="model-lesson-header__meta">
                {MODEL.by} · {MODEL.version}
              </span>
            </div>
            <div className="model-lesson-header__tagline">{MODEL.tagline}</div>
          </div>
        </div>
      </div>

      <div className="model-lesson-workspace">
        <div className="pane" style={{ borderRadius: 0, borderLeft: 0, borderTop: 0, borderBottom: 0, borderRight: "1px solid var(--line)" }}>
          <div className="pane-head">
            <span>// LESSONS</span>
            <span>
              {completed.size} / {LESSONS.length}
            </span>
          </div>
          <div className="pane-body" style={{ padding: 0, gap: 0, overflowY: "auto" }}>
            {LESSONS.map((L, i) => {
              const isOn = i === activeIdx;
              const isDone = completed.has(i);
              return (
                <div
                  key={L.n}
                  onClick={() => setActiveIdx(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "11px 14px",
                    borderBottom: "1px solid var(--line)",
                    background: isOn ? "var(--paper-2)" : "transparent",
                    borderLeft: isOn ? "3px solid var(--violet-deep)" : "3px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(i);
                    }}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `1.5px solid ${isDone ? "var(--violet-deep)" : "var(--line)"}`,
                      background: isDone ? "var(--violet-deep)" : "#fff",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {isDone ? "✓" : ""}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: isOn ? 700 : 500, color: isOn ? "var(--violet-dark)" : "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {L.n}. {L.title}
                    </div>
                    <div className="label" style={{ marginTop: 2, fontSize: 9.5 }}>
                      {L.level} · {L.dur}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pane model-lesson-center" style={{ borderRadius: 0, border: 0 }}>
          <div className="pane-head" style={{ background: "#fff" }}>
            <span>
              // LESSON {lesson.n} · {lesson.title.toUpperCase()}
            </span>
            <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span onClick={() => activeIdx > 0 && go(-1)} className={"lesson-nav prev" + (activeIdx === 0 ? " is-disabled" : "")}>
                <span className="a">←</span> Prev
              </span>
              <span onClick={() => activeIdx < LESSONS.length - 1 && go(+1)} className={"lesson-nav next" + (activeIdx === LESSONS.length - 1 ? " is-disabled" : "")} style={{ color: "var(--violet-deep)", fontWeight: 700 }}>
                Next <span className="a">→</span>
              </span>
            </span>
          </div>
          <div className="pane-body model-lesson-center__body">
            <div className="vid model-lesson-center__video">
              <span className="tag">▶ NOW PLAYING · 0:00 / {lesson.dur}</span>
              <div className="play" />
              <span className="dur">{lesson.dur}</span>
            </div>
          </div>
        </div>

        <div className="pane" style={{ borderRadius: 0, borderRight: 0, borderTop: 0, borderBottom: 0, borderLeft: "1px solid var(--line)" }}>
          <div className="pane-head">
            <span>// TRY IT YOURSELF</span>
            <span style={{ color: "var(--violet-deep)" }}>● live</span>
          </div>
          <div className="pane-body" style={{ background: "#fafafa", overflowY: "auto" }}>
            <div className="label">Prompt</div>
            <div className="code" style={{ minHeight: 120, background: "#fff", whiteSpace: "pre-wrap" }}>
              {lesson.prompt}
            </div>
            <button type="button" className="pill" style={{ background: "var(--violet-deep)", borderColor: "var(--violet-deep)", color: "#fff", fontWeight: 700, marginTop: 8, cursor: "pointer" }}>
              Try in {MODEL.name} →
            </button>
            <div className="label" style={{ marginTop: 18 }}>
              Lesson note
            </div>
            <div className="box" style={{ background: "#fff", padding: 12, minHeight: 90 }}>
              <div className="annot" style={{ whiteSpace: "pre-line" }}>
                {lesson.note}
              </div>
            </div>
            <div style={{ marginTop: 18 }}>
              {!isCurrentComplete ? (
                <button type="button" onClick={markCurrentDoneAndNext} className="complete-btn" style={{ width: "100%", background: "var(--violet-deep)", border: "1.5px solid var(--violet-deep)", color: "#fff", fontWeight: 700, fontSize: 12.5, padding: "12px 18px", cursor: "pointer", borderRadius: 999, fontFamily: "var(--mono)", letterSpacing: ".04em" }}>
                  <span className="chk">✓</span> Mark complete &amp; next <span className="nx">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => toggleComplete(activeIdx)}
                  onMouseEnter={() => setHoverDone(true)}
                  onMouseLeave={() => setHoverDone(false)}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: hoverDone ? "#fff" : "var(--violet-deep)",
                    background: hoverDone ? "var(--violet-deep)" : "var(--paper-2)",
                    border: "1.5px solid var(--violet-deep)",
                    borderRadius: 999,
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    padding: "12px 18px",
                    cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                >
                  <span style={{ display: "inline-block", transition: "transform .4s cubic-bezier(.65,.05,.36,1)", transform: hoverDone ? "rotate(-180deg)" : "rotate(0deg)" }}>{hoverDone ? "↺" : "✓"}</span>
                  {hoverDone ? "Mark incomplete" : "Lesson complete"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}