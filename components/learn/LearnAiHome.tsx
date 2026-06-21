"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ModelLogo } from "@/components/ModelLogo";
import { useLearningDashboard } from "@/lib/hooks/useLearningDashboard";
import { useUserProfile } from "@/lib/hooks/useUserProfile";
import { defaultResume, lessonTotal } from "@/lib/store/progress";

export function LearnAiHome() {
  const router = useRouter();
  const { firstName, streak, profile } = useUserProfile();
  const { models, resume: RESUME, loading } = useLearningDashboard();
  const started = models.filter((m) => m.started);
  const resumeModel = models.find((m) => m.name === RESUME.model) ?? models[0] ?? null;
  const CATS = ["All", "Chat", "Code", "Image", "Search", "Foundation"];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? models : models.filter((m) => m.category === cat);

  const goTo = (name: string) => router.push(`/learn/${name.toLowerCase()}`);

  const isSignedIn = Boolean(profile);
  const guestResume = defaultResume();
  const cardResume = isSignedIn ? RESUME : guestResume;
  const progressSource = isSignedIn && resumeModel ? resumeModel : null;
  const cardProgress = progressSource
    ? { mark: progressSource.mark, done: progressSource.done, total: progressSource.total, pct: progressSource.pct }
    : { mark: guestResume.mark, done: 0, total: lessonTotal("chatgpt"), pct: 0 };

  const bodyWrapStyle = { maxWidth: 1320, margin: "0 auto", padding: "40px max(28px, 3vw) 0" } as const;

  if (loading) {
    return (
      <div className="wf">
        <div className="learn-page-body learn-dash" style={{ ...bodyWrapStyle, color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 13 }}>
          Loading your progress…
        </div>
      </div>
    );
  }

  return (
    <div className="wf">
      <div className="learn-page-body learn-dash" style={bodyWrapStyle}>
        <h1 className="hello">{profile ? `Welcome back, ${firstName}.` : "Welcome to DuraNoia."}</h1>
        <p className="sub">
          {profile
            ? `You're on a ${streak}-day streak. Pick up where you left off — or start a new model below.`
            : "Explore every model below — sign in anytime to save your progress and pick up where you left off."}
        </p>

        <div className="panel resume-panel">
          <div className="resume-panel__body">
            <div className="label resume-panel__eyebrow">
              ◷ {isSignedIn ? "Continue learning" : "Start learning"}
            </div>
            <div className="resume-panel__model-row">
              <div className="glyph resume-panel__glyph">
                <ModelLogo mark={cardProgress.mark} size={44} />
              </div>
              <div className="resume-panel__model-copy">
                <div className="resume-panel__model-name">{cardResume.model}</div>
                <div className="label resume-panel__meta">
                  Lesson {cardResume.lessonNo} · {cardResume.level} · {cardResume.dur}
                </div>
              </div>
            </div>
            <div className="resume-panel__title">{cardResume.lessonTitle}</div>
            <div className="resume-panel__progress">
              <div className="bar resume-panel__bar">
                <span style={{ width: cardProgress.pct + "%" }} />
              </div>
              <span className="label">
                {cardProgress.done}/{cardProgress.total}
              </span>
            </div>
            <button type="button" className="btn resume-panel__btn" onClick={() => goTo(cardResume.model)}>
              ▶ {isSignedIn ? "Resume lesson" : "Start lesson"} <span className="ar">→</span>
            </button>
          </div>
          <div className="resume-panel__video">
            <div className="resume-panel__play">
              <div className="resume-panel__play-icon" />
            </div>
          </div>
        </div>

        {started.length > 0 && (
          <>
            <div className="sh">
              <h2>Your models</h2>
              <span className="label">{started.length} in progress</span>
            </div>
            <div className="model-grid">
              {started.map((m) => (
                <div className="mcard" key={m.name} onClick={() => goTo(m.name)}>
                  <div className="h">
                    <div className="glyph" style={{ width: 40, height: 40 }}>
                      <ModelLogo mark={m.mark} />
                    </div>
                    <div>
                      <div className="nm">{m.name}</div>
                      <div className="co">{m.company}</div>
                    </div>
                  </div>
                  <div className="bar">
                    <span style={{ width: m.pct + "%" }} />
                  </div>
                  <div className="meta">
                    {m.finished ? <span className="done">✓ Completed</span> : <span>{m.done}/{m.total} lessons</span>}
                    <span>{m.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>

      <section className="learn-browse">
        <div className="learn-browse__inner learn-dash">
          <div className="sh">
            <h2>Browse all models</h2>
            <span className="label">{list.length} model{list.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="chips">
            {CATS.map((c) => (
              <span key={c} className={"chip" + (c === cat ? " is-on" : "")} onClick={() => setCat(c)}>
                {c}
              </span>
            ))}
          </div>
          <div className="model-grid">
            {list.map((m) => (
              <div className="mcard" key={m.name} onClick={() => goTo(m.name)}>
                <div className="h">
                  <div className="glyph" style={{ width: 40, height: 40 }}>
                    <ModelLogo mark={m.mark} />
                  </div>
                  <div>
                    <div className="nm">{m.name}</div>
                    <div className="co">{m.company}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.45, flex: 1 }}>{m.desc}</div>
                {m.started ? (
                  <>
                    <div className="bar">
                      <span style={{ width: m.pct + "%" }} />
                    </div>
                    <div className="meta">
                      {m.finished ? <span className="done">✓ Completed</span> : <span>{m.done}/{m.total} lessons</span>}
                      <span>{m.pct}%</span>
                    </div>
                  </>
                ) : (
                  <div className="meta">
                    <span>{m.total} lessons</span>
                    <span className="start">Start →</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
