import { createClient } from "@/lib/supabase/client";
import { MODELS_CATALOG } from "@/lib/models-catalog";
import type { ModelMark, ResumeState } from "@/lib/types";

export function lessonTotal(slug: string): number {
  return MODELS_CATALOG[slug]?.lessons.length ?? 0;
}

export function defaultResume(): ResumeState {
  const catalog = MODELS_CATALOG.chatgpt;
  const lesson = catalog.lessons[0];
  return {
    slug: "chatgpt",
    model: catalog.name,
    mark: catalog.mark,
    lessonIdx: 0,
    lessonNo: lesson.n,
    lessonTitle: lesson.title,
    level: lesson.level,
    dur: lesson.dur,
  };
}

async function requireUserId(): Promise<string | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export async function fetchCompletedLessons(modelSlug: string): Promise<number[]> {
  const userId = await requireUserId();
  if (!userId) return [];

  const supabase = createClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_idx")
    .eq("user_id", userId)
    .eq("model_slug", modelSlug)
    .order("lesson_idx");

  return (data ?? []).map((row) => row.lesson_idx);
}

export async function fetchAllProgress(): Promise<Record<string, number[]>> {
  const userId = await requireUserId();
  if (!userId) return {};

  const supabase = createClient();
  const { data } = await supabase.from("lesson_progress").select("model_slug, lesson_idx").eq("user_id", userId);

  const out: Record<string, number[]> = {};
  for (const row of data ?? []) {
    if (!out[row.model_slug]) out[row.model_slug] = [];
    out[row.model_slug].push(row.lesson_idx);
  }
  for (const slug of Object.keys(out)) {
    out[slug].sort((a, b) => a - b);
  }
  return out;
}

export async function setCompletedLessons(modelSlug: string, indices: number[]): Promise<void> {
  const userId = await requireUserId();
  if (!userId) return;

  const supabase = createClient();
  const sorted = [...indices].sort((a, b) => a - b);

  await supabase.from("lesson_progress").delete().eq("user_id", userId).eq("model_slug", modelSlug);

  if (sorted.length === 0) return;

  const { error } = await supabase.from("lesson_progress").insert(
    sorted.map((lesson_idx) => ({
      user_id: userId,
      model_slug: modelSlug,
      lesson_idx,
    })),
  );

  if (error) throw new Error(error.message);
}

export async function fetchResumeState(): Promise<ResumeState | null> {
  const userId = await requireUserId();
  if (!userId) return null;

  const supabase = createClient();
  const { data } = await supabase
    .from("resume_state")
    .select("model_slug, lesson_idx")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) return null;

  const catalog = MODELS_CATALOG[data.model_slug];
  if (!catalog) return null;

  const lesson = catalog.lessons[data.lesson_idx] ?? catalog.lessons[0];
  return {
    slug: data.model_slug,
    model: catalog.name,
    mark: catalog.mark as ModelMark,
    lessonIdx: data.lesson_idx,
    lessonNo: lesson.n,
    lessonTitle: lesson.title,
    level: lesson.level,
    dur: lesson.dur,
  };
}

export async function saveResumeState(modelSlug: string, lessonIdx: number): Promise<void> {
  const userId = await requireUserId();
  if (!userId) return;

  const supabase = createClient();
  const { error } = await supabase.from("resume_state").upsert({
    user_id: userId,
    model_slug: modelSlug,
    lesson_idx: lessonIdx,
  });

  if (error) throw new Error(error.message);
}
