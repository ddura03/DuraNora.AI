"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AI_CATALOG } from "@/lib/ai-catalog";
import { GRAD } from "@/lib/showcase";
import { useUserProfile } from "@/lib/hooks/useUserProfile";
import {
  addProjectComment,
  fetchProjectComments,
  fetchShowcaseData,
  submitProject,
  toggleProjectLike,
  type SubmitProjectInput,
} from "@/lib/store/showcase";
import type { ModelMark, ShowcaseComment, ShowcaseProject } from "@/lib/types";
import { ShowcaseProjectCard } from "@/components/showcase/ShowcaseProjectCard";

function modelName(mark: string) {
  return AI_CATALOG.find((m) => m.mark === mark)?.name || mark.replace("@", "");
}

function SelectChevron() {
  return (
    <span className="chev" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </span>
  );
}

function MyProjectsPanel({
  signedIn,
  authLoading,
  myProjects,
  onNew,
  onOpen,
}: {
  signedIn: boolean;
  authLoading: boolean;
  myProjects: ShowcaseProject[];
  onNew: () => void;
  onOpen: (p: ShowcaseProject) => void;
}) {
  if (authLoading) {
    return (
      <div style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 13, padding: "24px 0" }}>
        Loading your projects…
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 560, margin: "0 auto" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 8px" }}>Sign in to view your projects</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 22px" }}>
          Submit projects, manage visibility, and see everything you&apos;ve published in the showcase.
        </p>
        <Link href="/signin" className="btn">
          Sign in
        </Link>
      </div>
    );
  }

  if (myProjects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px", maxWidth: 560, margin: "0 auto" }}>
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 20px",
            borderRadius: 18,
            background: "var(--paper-2)",
            border: "1.5px solid var(--violet-soft)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em", margin: "0 0 8px" }}>Submit your first project</h2>
        <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.55, margin: "0 0 22px" }}>
          Built something with one of the models you&apos;re learning? Attach a link, add a cover and a short writeup, and join the showcase.
        </p>
        <button type="button" className="btn" onClick={onNew}>
          ＋ Submit a project
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="sc-head">
        <h2>My projects</h2>
        <button type="button" className="btn" onClick={onNew}>
          ＋ Submit a project
        </button>
      </div>
      <div className="sc-grid">
        {myProjects.map((p) => (
          <ProjectCard key={p.dbId ?? p.id} p={p} onOpen={onOpen} />
        ))}
      </div>
    </>
  );
}

function ProjectCard({ p, onOpen }: { p: ShowcaseProject; onOpen: (p: ShowcaseProject) => void }) {
  return <ShowcaseProjectCard project={p} coverModelBadge onClick={() => onOpen(p)} />;
}

function ProjectModal({
  project,
  liked,
  onClose,
  onLike,
  onCommentsChange,
}: {
  project: ShowcaseProject;
  liked: boolean;
  onClose: () => void;
  onLike: () => void;
  onCommentsChange: (comments: ShowcaseComment[]) => void;
}) {
  const [comments, setComments] = useState<ShowcaseComment[]>(project.comments);
  const [draft, setDraft] = useState("");
  const [likes, setLikes] = useState(project.likes);

  useEffect(() => {
    if (!project.dbId) return;

    let cancelled = false;
    fetchProjectComments(project.dbId).then((rows) => {
      if (cancelled) return;
      setComments(rows);
      onCommentsChange(rows);
    });

    return () => {
      cancelled = true;
    };
  }, [project.dbId, onCommentsChange]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  async function postComment() {
    if (!project.dbId || !draft.trim()) return;
    await addProjectComment(project.dbId, draft);
    setDraft("");
    const rows = await fetchProjectComments(project.dbId);
    setComments(rows);
    onCommentsChange(rows);
  }

  async function handleLike() {
    if (!project.dbId) return;
    await toggleProjectLike(project.dbId, liked);
    setLikes((n) => (liked ? Math.max(0, n - 1) : n + 1));
    onLike();
  }

  const coverStyle = project.coverImg
    ? { backgroundImage: `url(${project.coverImg})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { background: project.grad };

  return createPortal(
    <div
      className="pv-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className="pv" onClick={(e) => e.stopPropagation()}>
        <div className="pv-media" style={coverStyle}>
          {!project.coverImg ? <div className="mono">{project.mono}</div> : null}
        </div>
        <div className="pv-side">
          <div className="pv-top">
            <h3>{project.title}</h3>
            <button type="button" className="pv-x" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
          <div className="pv-desc">
            <p>{project.desc}</p>
            <a className="viewproj" href={project.link} target="_blank" rel="noopener noreferrer">
              View project ↗
            </a>
          </div>
          <div className="pv-comments">
            {comments.length === 0 ? (
              <div style={{ color: "var(--muted)", fontSize: 13, padding: "8px 0" }}>No comments yet — be the first.</div>
            ) : null}
            {comments.map((c, i) => (
              <div className="cm" key={i}>
                <span className="av" style={{ background: c.who.color }}>{c.who.initials}</span>
                <div>
                  <div className="ct">
                    <b>{c.who.name}</b> {c.text}
                  </div>
                  <div className="cw">{c.when}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="pv-actions">
            <span className={"heart" + (liked ? " on" : "")} onClick={handleLike}>
              ♥ {likes}
            </span>
            <span className="heart" style={{ cursor: "default" }}>
              💬 {comments.length}
            </span>
          </div>
          <div className="pv-input">
            <input
              placeholder="Add a comment…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") postComment(); }}
            />
            <button type="button" onClick={postComment}>Post</button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function SubmitModal({ onClose, onPublish }: { onClose: () => void; onPublish: (input: SubmitProjectInput) => Promise<void> }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [mark, setMark] = useState<ModelMark | "">("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [grad, setGrad] = useState(GRAD.violet);
  const [saving, setSaving] = useState(false);

  const initials = ((title.trim().match(/[A-Za-z0-9]+/g) || ["PR"]).map((w) => w[0]).join("").slice(0, 2) || "PR").toUpperCase();
  const valid = link.trim() && title.trim() && mark;

  async function publish() {
    if (!valid || !mark) return;
    setSaving(true);
    const url = link.trim().match(/^https?:\/\//) ? link.trim() : `https://${link.trim()}`;
    await onPublish({
      title: title.trim(),
      link: url,
      mark,
      desc: desc.trim() || "No description yet.",
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 4),
      mono: initials,
      grad,
    });
    setSaving(false);
  }

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <div className="mtop">
          <h3>Submit a project</h3>
          <div className="mx" onClick={onClose}>×</div>
        </div>
        <div className="mbody">
          <div className="fld">
            <label>Project link</label>
            <input placeholder="yourproject.com" value={link} onChange={(e) => setLink(e.target.value)} />
          </div>
          <div className="fld">
            <label>Title</label>
            <input placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="fld">
            <label>Primary model</label>
            <select value={mark} onChange={(e) => setMark(e.target.value as ModelMark)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--line)" }}>
              <option value="">Select model…</option>
              {AI_CATALOG.map((m) => (
                <option key={m.mark} value={m.mark}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="fld">
            <label>Description</label>
            <textarea placeholder="What did you build?" value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} />
          </div>
          <div className="fld">
            <label>Tags (comma-separated)</label>
            <input placeholder="Agents, Productivity" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
        </div>
        <div className="mfoot">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn" disabled={!valid || saving} onClick={publish}>
            {saving ? "Publishing…" : "Publish project"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShowcasePageContent({
  initialData,
  initialError,
}: {
  initialData?: { projects: ShowcaseProject[]; myProjects: ShowcaseProject[]; likedDbIds: string[] };
  initialError?: string;
} = {}) {
  const { profile, loading: authLoading } = useUserProfile();
  const [tab, setTab] = useState<"showcase" | "projects">("showcase");
  const [query, setQuery] = useState("");
  const [model, setModel] = useState("all");
  const [sort, setSort] = useState("trending");
  const [open, setOpen] = useState<ShowcaseProject | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [projects, setProjects] = useState<ShowcaseProject[]>(initialData?.projects ?? []);
  const [myProjects, setMyProjects] = useState<ShowcaseProject[]>(initialData?.myProjects ?? []);
  const [likedDbIds, setLikedDbIds] = useState<Set<string>>(
    () => new Set(initialData?.likedDbIds ?? []),
  );
  const [loading, setLoading] = useState(!initialData && !initialError);
  const [loadError, setLoadError] = useState<string | null>(initialError ?? null);

  const reload = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const { projects: rows, myProjects: mine, likedDbIds: liked } = await fetchShowcaseData();
      setProjects(rows);
      setMyProjects(mine);
      setLikedDbIds(liked);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not load projects";
      console.error("[showcase] fetch failed:", err);
      setLoadError(message);
      setProjects([]);
      setMyProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialData || initialError) return;
    reload();
  }, [initialData, initialError, reload]);

  const visible = useMemo(() => {
    let list = projects.filter((p) => !p.hidden);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));
    if (model !== "all") list = list.filter((p) => p.mark === model);

    if (sort === "newest") {
      list = [...list].sort(
        (a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime(),
      );
    } else if (sort === "liked") {
      list = [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sort === "featured") {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    } else {
      list = [...list].sort((a, b) => {
        const scoreA = (a.viewsCount ?? 0) + (a.likes || 0) * 25;
        const scoreB = (b.viewsCount ?? 0) + (b.likes || 0) * 25;
        return scoreB - scoreA;
      });
    }

    return list;
  }, [projects, query, model, sort]);

  const modelOptions = Array.from(new Set(projects.map((p) => p.mark)));

  async function handlePublish(input: SubmitProjectInput) {
    const created = await submitProject(input);
    setProjects((prev) => [created, ...prev]);
    setMyProjects((prev) => [created, ...prev]);
    setSubmitOpen(false);
    setTab("showcase");
  }

  const closeProjectModal = useCallback(() => setOpen(null), []);

  const handleProjectCommentsChange = useCallback((comments: ShowcaseComment[]) => {
    setOpen((prev) => (prev ? { ...prev, comments } : null));
  }, []);

  return (
    <div>
      <div className="sc-wrap">
        <div className="sc-tabs">
          <button
            type="button"
            className={"t" + (tab === "showcase" ? " on" : "")}
            onClick={() => setTab("showcase")}
          >
            AI Showcase
          </button>
          <button
            type="button"
            className={"t" + (tab === "projects" ? " on" : "")}
            onClick={() => setTab("projects")}
          >
            My Projects
          </button>
        </div>

        {tab === "showcase" ? (
          <>
            <div className="sc-head">
              <h2>Project showcase</h2>
              <button type="button" className="btn" onClick={() => setSubmitOpen(true)}>
                ＋ Submit your project
              </button>
            </div>
            <div className="sc-filters">
              <div className="sc-search">
                <input placeholder="Search for a project name…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="sc-select">
                <select value={model} onChange={(e) => setModel(e.target.value)}>
                  <option value="all">All models</option>
                  {modelOptions.map((mk) => (
                    <option key={mk} value={mk}>
                      {modelName(mk)}
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
              <div className="sc-select">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="trending">Trending</option>
                  <option value="newest">Newest</option>
                  <option value="liked">Most liked</option>
                  <option value="featured">Featured</option>
                </select>
                <SelectChevron />
              </div>
            </div>
            {loading ? (
              <div style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 13, padding: "24px 0" }}>Loading projects…</div>
            ) : loadError ? (
              <div style={{ color: "var(--ink-2)", fontFamily: "var(--sans)", fontSize: 14, padding: "24px 0", lineHeight: 1.5 }}>
                Couldn&apos;t load projects right now. {loadError}
              </div>
            ) : visible.length === 0 ? (
              <div style={{ color: "var(--ink-2)", fontFamily: "var(--sans)", fontSize: 14, padding: "24px 0", lineHeight: 1.5 }}>
                {projects.length === 0
                  ? "No projects in the showcase yet — be the first to submit one."
                  : "No projects match your search or filters."}
              </div>
            ) : (
              <div className="sc-grid">
                {visible.map((p) => (
                  <ProjectCard key={p.dbId ?? p.id} p={p} onOpen={setOpen} />
                ))}
              </div>
            )}
          </>
        ) : (
          <MyProjectsPanel
            signedIn={Boolean(profile)}
            authLoading={authLoading}
            myProjects={myProjects}
            onNew={() => setSubmitOpen(true)}
            onOpen={setOpen}
          />
        )}
      </div>
      {open && open.dbId ? (
        <ProjectModal
          project={open}
          liked={likedDbIds.has(open.dbId)}
          onClose={closeProjectModal}
          onLike={() => {
            setLikedDbIds((prev) => {
              const next = new Set(prev);
              if (next.has(open.dbId!)) next.delete(open.dbId!);
              else next.add(open.dbId!);
              return next;
            });
          }}
          onCommentsChange={handleProjectCommentsChange}
        />
      ) : null}
      {submitOpen ? <SubmitModal onClose={() => setSubmitOpen(false)} onPublish={handlePublish} /> : null}
    </div>
  );
}
