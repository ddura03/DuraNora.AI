"use client";

import { AI_CATALOG } from "@/lib/ai-catalog";
import type { ShowcaseProject } from "@/lib/types";
import { ModelLogo } from "@/components/ModelLogo";

function modelName(mark: string) {
  return AI_CATALOG.find((m) => m.mark === mark)?.name || mark.replace("@", "");
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1-4a8.4 8.4 0 0 1-1-4 8.5 8.5 0 0 1 9-8.4 8.5 8.5 0 0 1 8 8.4Z" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

type Props = {
  project: ShowcaseProject;
  onClick?: () => void;
  /** Show model name badge on the cover (showcase grid). */
  coverModelBadge?: boolean;
  /** Meta row trailing content. */
  metaEnd?: "model" | "view";
};

export function ShowcaseProjectCard({ project: p, onClick, coverModelBadge = false, metaEnd = "view" }: Props) {
  const coverStyle = p.coverImg
    ? { backgroundImage: `url(${p.coverImg})`, backgroundSize: "cover" as const, backgroundPosition: "center" as const }
    : { background: p.grad };

  return (
    <div className="pjcard" onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}>
      <div className="cover" style={coverStyle}>
        {!p.coverImg ? <div className="mono">{p.mono}</div> : null}
        <div className="badges">
          <span className="views">👁 {p.views}</span>
          {coverModelBadge && modelName(p.mark) ? (
            <span className="mbadge">
              <span className="mbadge-glyph">
                <ModelLogo mark={p.mark} size={14} />
              </span>
              <span className="mbadge-label">{modelName(p.mark)}</span>
            </span>
          ) : null}
          {p.featured ? <span className="feat">Featured</span> : null}
        </div>
      </div>
      <div className="pb">
        <div className="pt">{p.title}</div>
        <div className="auth">
          <span className="av" style={{ background: p.author.color }}>
            {p.author.initials}
          </span>
          By {p.author.name}
          {p.author.role ? ` · ${p.author.role}` : ""}
        </div>
        <div className="pm">
          <span className="x">
            <HeartIcon /> {p.likes}
          </span>
          <span className="x">
            <CommentIcon /> {p.commentCount ?? p.comments.length}
          </span>
          {metaEnd === "model" && p.mark ? (
            <span className="x" style={{ marginLeft: "auto" }}>
              <span className="glyph" style={{ width: 20, height: 20, display: "grid", placeItems: "center" }}>
                <ModelLogo mark={p.mark} />
              </span>
            </span>
          ) : null}
          {metaEnd === "view" ? (
            <span className="x" style={{ marginLeft: "auto", color: "var(--violet-deep)" }}>
              <ExtIcon /> View
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
