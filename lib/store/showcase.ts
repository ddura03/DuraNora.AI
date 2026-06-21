import { createClient } from "@/lib/supabase/client";
import { GRAD, PROJECTS } from "@/lib/showcase";
import type { ModelMark, ShowcaseComment, ShowcaseProject } from "@/lib/types";
import type { SupabaseClient } from "@supabase/supabase-js";

const MOCK_BY_LEGACY = new Map(PROJECTS.map((p) => [p.id, p]));

function resolveEngagementCounts(
  projectId: string,
  legacyId: string | null,
  likeCounts: Record<string, number>,
  commentCounts: Record<string, number>,
): { likes: number; commentCount: number } {
  const dbLikes = likeCounts[projectId] ?? 0;
  const dbComments = commentCounts[projectId] ?? 0;
  const mock = legacyId ? MOCK_BY_LEGACY.get(legacyId) : undefined;
  return {
    likes: dbLikes > 0 ? dbLikes : (mock?.likes ?? 0),
    commentCount: dbComments > 0 ? dbComments : (mock?.comments.length ?? 0),
  };
}

type AuthorRow = {
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar_color: string | null;
  role: string | null;
};

type ProjectRow = {
  id: string;
  legacy_id: string | null;
  author_id: string;
  title: string;
  description: string;
  external_url: string;
  model_mark: string;
  tags: string[];
  cover_kind: string;
  cover_value: string;
  monogram: string;
  featured: boolean;
  hidden: boolean;
  views: number;
  created_at: string;
  users: AuthorRow | AuthorRow[] | null;
};

const PROJECT_SELECT =
  "id, legacy_id, author_id, title, description, external_url, model_mark, tags, cover_kind, cover_value, monogram, featured, hidden, views, created_at, users!projects_author_id_fkey ( name, slug, initials, avatar_color, role )";

export function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(count);
}

function mapAuthor(users: ProjectRow["users"]): ShowcaseProject["author"] {
  const u = Array.isArray(users) ? users[0] : users;
  return {
    name: u?.name ?? "Member",
    role: u?.role ?? "DuraNoia member",
    initials: u?.initials ?? "??",
    color: u?.avatar_color ?? "#7c3aed",
    slug: u?.slug ?? "member",
  };
}

export function mapProjectRow(
  row: ProjectRow,
  likeCount: number,
  commentCount: number,
  owner: boolean,
): ShowcaseProject {
  const coverIsImage = row.cover_kind === "image";
  return {
    id: row.legacy_id ?? row.id,
    dbId: row.id,
    title: row.title,
    mono: row.monogram,
    grad: coverIsImage ? GRAD.violet : row.cover_value || GRAD.violet,
    coverImg: coverIsImage ? row.cover_value : undefined,
    link: row.external_url,
    author: mapAuthor(row.users),
    mark: row.model_mark as ModelMark,
    views: formatViews(row.views),
    viewsCount: row.views,
    likes: likeCount,
    featured: row.featured,
    hidden: row.hidden,
    owner,
    tags: row.tags ?? [],
    desc: row.description,
    comments: [],
    commentCount,
    createdAt: row.created_at,
  };
}

export async function loadShowcaseProjects(
  supabase: SupabaseClient,
  userId?: string | null,
): Promise<{
  projects: ShowcaseProject[];
  myProjects: ShowcaseProject[];
  likedDbIds: Set<string>;
}> {
  const { data: rows, error } = await supabase
    .from("projects")
    .select(PROJECT_SELECT)
    .is("deleted_at", null)
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[showcase] projects query failed:", error.message);
    throw new Error(error.message);
  }

  const likesQuery = supabase.from("project_likes").select("project_id, user_id");
  const commentsQuery = supabase.from("project_comments").select("project_id");

  const [likesResult, commentsResult] = await Promise.all([likesQuery, commentsQuery]);

  if (likesResult.error) {
    console.error("[showcase] project_likes query failed:", likesResult.error.message);
  }
  if (commentsResult.error) {
    console.error("[showcase] project_comments query failed:", commentsResult.error.message);
  }

  const likeCounts: Record<string, number> = {};
  const likedDbIds = new Set<string>();
  for (const like of (likesResult.data as { project_id: string; user_id: string }[] | null) ?? []) {
    likeCounts[like.project_id] = (likeCounts[like.project_id] ?? 0) + 1;
    if (userId && like.user_id === userId) likedDbIds.add(like.project_id);
  }

  const commentCounts: Record<string, number> = {};
  for (const comment of (commentsResult.data as { project_id: string }[] | null) ?? []) {
    commentCounts[comment.project_id] = (commentCounts[comment.project_id] ?? 0) + 1;
  }

  const projects = ((rows as ProjectRow[] | null) ?? []).map((row) => {
    const { likes, commentCount } = resolveEngagementCounts(row.id, row.legacy_id, likeCounts, commentCounts);
    return mapProjectRow(row, likes, commentCount, userId === row.author_id);
  });

  let myProjects: ShowcaseProject[] = [];
  if (userId) {
    const { data: mineRows, error: mineError } = await supabase
      .from("projects")
      .select(PROJECT_SELECT)
      .eq("author_id", userId)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (mineError) {
      console.error("[showcase] my projects query failed:", mineError.message);
    } else {
      myProjects = ((mineRows as ProjectRow[] | null) ?? []).map((row) => {
        const { likes, commentCount } = resolveEngagementCounts(row.id, row.legacy_id, likeCounts, commentCounts);
        return mapProjectRow(row, likes, commentCount, true);
      });
    }
  }

  return { projects, myProjects, likedDbIds };
}

export async function fetchShowcaseData(): Promise<{
  projects: ShowcaseProject[];
  myProjects: ShowcaseProject[];
  likedDbIds: Set<string>;
}> {
  const supabase = createClient();

  let userId: string | undefined;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id;
  } catch (err) {
    console.warn("[showcase] auth.getUser failed:", err);
  }

  return loadShowcaseProjects(supabase, userId);
}

export async function fetchFeaturedProjects(limit = 3): Promise<ShowcaseProject[]> {
  const { PROJECTS } = await import("@/lib/showcase");
  const fallback = PROJECTS.filter((p) => p.featured).slice(0, limit);

  try {
    const { projects } = await fetchShowcaseData();
    const featured = projects.filter((p) => p.featured && !p.hidden).slice(0, limit);
    return featured.length > 0 ? featured : fallback;
  } catch {
    return fallback;
  }
}

export async function fetchProjectComments(projectDbId: string): Promise<ShowcaseComment[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project_comments")
    .select("id, text, created_at, users ( name, initials, avatar_color, slug, role )")
    .eq("project_id", projectDbId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => {
    const u = Array.isArray(row.users) ? row.users[0] : row.users;
    return {
      who: {
        name: u?.name ?? "Member",
        role: u?.role ?? "",
        initials: u?.initials ?? "??",
        color: u?.avatar_color ?? "#7c3aed",
        slug: u?.slug ?? "member",
      },
      text: row.text,
      when: "recently",
    };
  });
}

export async function toggleProjectLike(projectDbId: string, currentlyLiked: boolean): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to like projects");

  if (currentlyLiked) {
    const { error } = await supabase.from("project_likes").delete().eq("project_id", projectDbId).eq("user_id", user.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await supabase.from("project_likes").insert({ project_id: projectDbId, user_id: user.id });
  if (error) throw new Error(error.message);
}

export async function addProjectComment(projectDbId: string, text: string): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to comment");

  const trimmed = text.trim();
  if (!trimmed) return;

  const { error } = await supabase.from("project_comments").insert({
    project_id: projectDbId,
    author_id: user.id,
    text: trimmed,
  });
  if (error) throw new Error(error.message);
}

export async function setProjectHidden(projectDbId: string, hidden: boolean): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in required");

  const { error } = await supabase
    .from("projects")
    .update({ hidden })
    .eq("id", projectDbId)
    .eq("author_id", user.id);
  if (error) throw new Error(error.message);
}

export async function deleteProject(projectDbId: string): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in required");

  const { error } = await supabase
    .from("projects")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", projectDbId)
    .eq("author_id", user.id);
  if (error) throw new Error(error.message);
}

export type SubmitProjectInput = {
  title: string;
  link: string;
  mark: ModelMark;
  desc: string;
  tags: string[];
  mono: string;
  grad: string;
  coverImg?: string | null;
};

export async function submitProject(input: SubmitProjectInput): Promise<ShowcaseProject> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Sign in to submit a project");

  const legacyId = `u-${Date.now()}`;
  const coverIsImage = Boolean(input.coverImg);

  const { data: profile } = await supabase
    .from("users")
    .select("name, slug, initials, avatar_color, role")
    .eq("id", user.id)
    .single();

  const { data: row, error } = await supabase
    .from("projects")
    .insert({
      legacy_id: legacyId,
      author_id: user.id,
      title: input.title,
      description: input.desc,
      external_url: input.link,
      model_mark: input.mark,
      tags: input.tags,
      cover_kind: coverIsImage ? "image" : "gradient",
      cover_value: coverIsImage ? input.coverImg! : input.grad,
      monogram: input.mono,
      featured: false,
      hidden: false,
      views: 0,
    })
    .select(
      "id, legacy_id, author_id, title, description, external_url, model_mark, tags, cover_kind, cover_value, monogram, featured, hidden, views, created_at, users!projects_author_id_fkey ( name, slug, initials, avatar_color, role )",
    )
    .single();

  if (error || !row) throw new Error(error?.message ?? "Could not submit project");

  const author = profile
    ? {
        name: profile.name ?? "Member",
        role: profile.role ?? "DuraNoia member",
        initials: profile.initials ?? "??",
        color: profile.avatar_color ?? "#7c3aed",
        slug: profile.slug ?? "member",
      }
    : mapAuthor((row as ProjectRow).users);

  return {
    ...mapProjectRow(row as ProjectRow, 0, 0, true),
    author,
    owner: true,
  };
}
