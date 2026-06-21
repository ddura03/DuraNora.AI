/**
 * DuraNoia seed — loads lib/* catalog data into Supabase.
 * Run: npm run seed
 *
 * Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

import { AI_CATALOG } from "../lib/ai-catalog";
import { LOGO_SRC } from "../lib/logos";
import { MODELS_CATALOG } from "../lib/models-catalog";
import { NEWS_ITEMS } from "../lib/news";
import { PROJECTS, USERS } from "../lib/showcase";
import { createAdminClient } from "../lib/supabase/admin";
import type { ModelMark } from "../lib/types";

const admin = createAdminClient();

const NEWS_IMAGE: Record<string, string> = {
  OpenAI: "/logos/news-openai.png",
  Anthropic: "/logos/news-anthropic.png",
  Google: "/logos/news-google.png",
  xAI: "/logos/news-xai.png",
  DeepSeek: "/logos/news-deepseek.png",
  Perplexity: "/logos/news-perplexity.png",
  Meta: "/logos/news-meta.png",
  Policy: "/logos/news-eu.png",
  Cursor: "/logos/news-cursor.png",
  Midjourney: "/logos/news-midjourney.png",
};

type SeedAuthor = {
  name: string;
  slug: string;
  initials: string;
  color: string;
  role: string;
  headline?: string;
  location?: string;
  linkedin?: string;
};

function parseViews(raw: string): number {
  const s = raw.trim().toUpperCase();
  if (s.endsWith("K")) return Math.round(parseFloat(s.slice(0, -1)) * 1000);
  if (s.endsWith("M")) return Math.round(parseFloat(s.slice(0, -1)) * 1_000_000);
  return parseInt(s.replace(/,/g, ""), 10) || 0;
}

function parseReadMinutes(raw?: string): number {
  if (!raw) return 3;
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : 3;
}

function parsePublishedAt(date: string): string {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function seedEmail(slug: string): string {
  return `seed+${slug}@duranoia.local`;
}

async function getOrCreateSeedUser(author: SeedAuthor): Promise<string> {
  const email = seedEmail(author.slug);

  const { data: bySlug } = await admin
    .from("users")
    .select("id")
    .eq("slug", author.slug)
    .maybeSingle();
  if (bySlug?.id) {
    await admin
      .from("users")
      .update({
        name: author.name,
        initials: author.initials,
        avatar_color: author.color,
        role: author.role,
        headline: author.headline ?? null,
        location: author.location ?? null,
        linkedin: author.linkedin ?? null,
      })
      .eq("id", bySlug.id);
    return bySlug.id;
  }

  const { data: byEmail } = await admin
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();
  if (byEmail?.id) {
    await admin
      .from("users")
      .update({
        slug: author.slug,
        name: author.name,
        initials: author.initials,
        avatar_color: author.color,
        role: author.role,
        headline: author.headline ?? null,
        location: author.location ?? null,
        linkedin: author.linkedin ?? null,
      })
      .eq("id", byEmail.id);
    return byEmail.id;
  }

  const password = crypto.randomUUID() + crypto.randomUUID();
  const { data: created, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: author.name },
  });
  if (error) throw new Error(`createUser ${author.slug}: ${error.message}`);
  if (!created.user) throw new Error(`createUser ${author.slug}: no user returned`);

  const { error: profileError } = await admin
    .from("users")
    .update({
      slug: author.slug,
      name: author.name,
      initials: author.initials,
      avatar_color: author.color,
      role: author.role,
      headline: author.headline ?? null,
      location: author.location ?? null,
      linkedin: author.linkedin ?? null,
    })
    .eq("id", created.user.id);
  if (profileError) throw new Error(`profile ${author.slug}: ${profileError.message}`);

  return created.user.id;
}

async function seedModels() {
  const rows = AI_CATALOG.map((item) => {
    const slug = item.name.toLowerCase();
    const detail = MODELS_CATALOG[slug];
    return {
      slug,
      name: item.name,
      company: item.company,
      version: detail?.version ?? "",
      mark: item.mark,
      tagline: detail?.tagline ?? "",
      description: item.desc,
      best_at: item.bestAt,
      category: item.category,
      modalities: item.modalities,
      skill_level: item.skill,
      pricing: item.pricing,
      advertised_lessons: item.lessons,
      logo_url: LOGO_SRC[item.mark as ModelMark] ?? "",
    };
  });

  const { error } = await admin.from("models").upsert(rows, { onConflict: "slug" });
  if (error) throw new Error(`models: ${error.message}`);
  console.log(`  models: ${rows.length}`);
}

async function seedLessons() {
  const rows: Array<{
    model_slug: string;
    idx: number;
    number: string;
    title: string;
    level: string;
    duration: string;
    description: string;
    callout_label: string;
    callout_text: string;
    prompt: string;
    note: string;
  }> = [];

  for (const [slug, catalog] of Object.entries(MODELS_CATALOG)) {
    catalog.lessons.forEach((lesson, idx) => {
      rows.push({
        model_slug: slug,
        idx,
        number: lesson.n,
        title: lesson.title,
        level: lesson.level,
        duration: lesson.dur,
        description: lesson.desc,
        callout_label: lesson.callout.label,
        callout_text: lesson.callout.text,
        prompt: lesson.prompt,
        note: lesson.note,
      });
    });
  }

  const { error } = await admin.from("lessons").upsert(rows, { onConflict: "model_slug,idx" });
  if (error) throw new Error(`lessons: ${error.message}`);
  console.log(`  lessons: ${rows.length}`);
}

async function seedNews() {
  const rows = NEWS_ITEMS.filter((item) => item.id).map((item) => ({
    legacy_id: item.id!,
    company: item.company ?? item.tag ?? "Unknown",
    model_mark: item.mark && item.mark !== "§" ? item.mark : null,
    category: item.cat,
    title: item.title,
    excerpt: item.excerpt,
    image_url: item.company ? (NEWS_IMAGE[item.company] ?? "") : "",
    read_minutes: parseReadMinutes(item.read),
    featured: item.featured ?? false,
    published_at: parsePublishedAt(item.date),
  }));

  const { error } = await admin.from("news_items").upsert(rows, { onConflict: "legacy_id" });
  if (error) throw new Error(`news_items: ${error.message}`);
  console.log(`  news_items: ${rows.length}`);
}

async function seedAuthors(): Promise<Map<string, string>> {
  const authorMap = new Map<string, string>();
  const seen = new Map<string, SeedAuthor>();

  for (const project of PROJECTS) {
    const a = project.author;
    if (seen.has(a.slug)) continue;

    const extra = USERS[a.slug] as Record<string, string> | undefined;
    seen.set(a.slug, {
      name: a.name,
      slug: a.slug,
      initials: a.initials,
      color: a.color,
      role: a.role || "DuraNoia member",
      headline: extra?.headline,
      location: extra?.location,
      linkedin: extra?.linkedin,
    });
  }

  for (const author of seen.values()) {
    const id = await getOrCreateSeedUser(author);
    authorMap.set(author.slug, id);
    console.log(`  author: ${author.slug}`);
  }

  return authorMap;
}

async function purgeRetiredProjects() {
  const keepLegacyIds = new Set(PROJECTS.map((p) => p.id));
  const keepUrls = new Set(PROJECTS.map((p) => p.link));

  const { data: existing, error } = await admin.from("projects").select("id, legacy_id, external_url");
  if (error) throw new Error(`list projects: ${error.message}`);

  const removeIds = (existing ?? [])
    .filter((p) => !keepLegacyIds.has(p.legacy_id ?? "") && !keepUrls.has(p.external_url))
    .map((p) => p.id);

  if (removeIds.length === 0) return;

  const { error: commentsError } = await admin.from("project_comments").delete().in("project_id", removeIds);
  if (commentsError) throw new Error(`purge project_comments: ${commentsError.message}`);

  const { error: likesError } = await admin.from("project_likes").delete().in("project_id", removeIds);
  if (likesError) throw new Error(`purge project_likes: ${likesError.message}`);

  const { error: projectsError } = await admin.from("projects").delete().in("id", removeIds);
  if (projectsError) throw new Error(`purge projects: ${projectsError.message}`);

  console.log(`  purged ${removeIds.length} retired project(s)`);
}

async function seedProjects(authorIds: Map<string, string>) {
  await purgeRetiredProjects();

  const rows = PROJECTS.map((p) => ({
    legacy_id: p.id,
    author_id: authorIds.get(p.author.slug)!,
    title: p.title,
    description: p.desc,
    external_url: p.link,
    model_mark: p.mark,
    tags: p.tags,
    cover_kind: p.coverImg ? "image" : "gradient",
    cover_value: p.coverImg ?? p.grad,
    monogram: p.mono,
    featured: p.featured,
    hidden: p.hidden ?? false,
    views: parseViews(p.views),
  }));

  const { error } = await admin.from("projects").upsert(rows, { onConflict: "legacy_id" });
  if (error) throw new Error(`projects: ${error.message}`);
  console.log(`  projects: ${rows.length}`);
}

const likerIds: string[] = [];

async function ensureLikerPool(size: number) {
  while (likerIds.length < size) {
    const i = likerIds.length;
    const id = await getOrCreateSeedUser({
      name: `Community Member ${i + 1}`,
      slug: `liker-${i}`,
      initials: "CM",
      color: "#9d6ef0",
      role: "Community member",
    });
    likerIds.push(id);
    if ((i + 1) % 50 === 0 || i + 1 === size) {
      console.log(`  likers: ${i + 1}/${size}`);
    }
  }
}

async function seedProjectEngagement(authorIds: Map<string, string>) {
  const maxLikes = Math.max(...PROJECTS.map((p) => p.likes), 0);
  if (maxLikes > 0) {
    await ensureLikerPool(maxLikes);
  }

  const { data: dbProjects, error: listError } = await admin.from("projects").select("id, legacy_id");
  if (listError) throw new Error(`projects list: ${listError.message}`);

  const legacyToId = new Map((dbProjects ?? []).map((p) => [p.legacy_id, p.id] as const));

  for (const p of PROJECTS) {
    const projectId = legacyToId.get(p.id);
    if (!projectId) continue;

    await admin.from("project_likes").delete().eq("project_id", projectId);
    await admin.from("project_comments").delete().eq("project_id", projectId);

    if (p.likes > 0) {
      const likeRows = Array.from({ length: p.likes }, (_, i) => ({
        project_id: projectId,
        user_id: likerIds[i],
      }));
      for (let offset = 0; offset < likeRows.length; offset += 200) {
        const chunk = likeRows.slice(offset, offset + 200);
        const { error } = await admin.from("project_likes").insert(chunk);
        if (error) throw new Error(`project_likes ${p.id}: ${error.message}`);
      }
    }

    for (const c of p.comments) {
      let authorId = authorIds.get(c.who.slug);
      if (!authorId) {
        authorId = await getOrCreateSeedUser({
          name: c.who.name,
          slug: c.who.slug,
          initials: c.who.initials,
          color: c.who.color,
          role: c.who.role || "Community member",
        });
        authorIds.set(c.who.slug, authorId);
      }
      const { error } = await admin.from("project_comments").insert({
        project_id: projectId,
        author_id: authorId,
        text: c.text,
      });
      if (error) throw new Error(`project_comments ${p.id}: ${error.message}`);
    }
  }

  console.log(`  engagement: likes + comments for ${PROJECTS.length} projects`);
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  console.log("Seeding DuraNoia…");
  await seedModels();
  await seedLessons();
  await seedNews();
  const authorIds = await seedAuthors();
  await seedProjects(authorIds);
  await seedProjectEngagement(authorIds);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
