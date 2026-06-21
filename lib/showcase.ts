import type { ShowcaseProject } from "./types";

// Launch showcase catalog — real projects only (seeded into Supabase via scripts/seed.ts).

const GRAD = {
  violet:  "linear-gradient(135deg,#7c3aed,#4c1d95)",
  twilight:"linear-gradient(135deg,#8b5cf6,#3b1d70)",
  orchid:  "linear-gradient(135deg,#b39ddb,#7c3aed)",
  ink:     "linear-gradient(135deg,#2a1a4a,#4c1d95)",
  dawn:    "linear-gradient(135deg,#a78bfa,#6d28d9)",
  plum:    "linear-gradient(135deg,#6d28d9,#1e1033)",
};
const AV = ["#7c3aed", "#4c1d95", "#9d6ef0", "#5b21b6", "#b3722f", "#1f8a5b", "#c0392b", "#2563c0"];

let _i = 0;
const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const slugify = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function person(name: string, role: string) {
  return { name, role, initials: initials(name), color: AV[_i++ % AV.length], slug: slugify(name) };
}

const PROJECTS: ShowcaseProject[] = [
  {
    id: "promptforge",
    title: "PromptForge — a working prompt library",
    mono: "PF",
    grad: GRAD.violet,
    link: "https://venerable-sorbet-c3ec05.netlify.app/",
    author: person("Daniel Dura", "Founder · DuraNoia"),
    mark: "@chatgpt",
    views: "0",
    likes: 0,
    featured: true,
    tags: ["Writing", "Prompts", "ChatGPT", "Claude"],
    desc: "A free, copy-paste prompt library — 18 battle-tested prompts for ChatGPT and Claude organized by the job you're doing: writing, research, coding, work, learning, and ideas. Live search, one-click copy, and editable {placeholders}. Built end-to-end with AI.",
    comments: [],
  },
];

// ---- Public user directory (for profile pages) ----
const USERS: Record<string, Record<string, unknown>> = {};
PROJECTS.forEach((p) => {
  const a = p.author;
  if (!USERS[a.slug]) {
    USERS[a.slug] = {
      name: a.name,
      slug: a.slug,
      initials: a.initials,
      color: a.color,
      role: a.role || "DuraNoia member",
      headline: "Building with AI on DuraNoia.",
      location: "",
      linkedin: "",
      models: [],
      joined: "2026",
    };
  }
});
USERS["daniel-dura"] = Object.assign(USERS["daniel-dura"] || {}, {
  name: "Daniel Dura",
  slug: "daniel-dura",
  initials: "DD",
  color: "#7c3aed",
  role: "Founder · DuraNoia",
  headline: "Founder of DuraNoia. Exploring how the popular AI models work — and how to chain them together.",
  location: "United States",
  linkedin: "linkedin.com/in/daniel-dura03",
  models: ["@claude", "@chatgpt"],
  joined: "Jan 2026",
});

const profileProjects = (slug: string) => PROJECTS.filter((p) => p.author.slug === slug);

export { PROJECTS, USERS, GRAD, profileProjects, slugify };
export const ME = { name: "Daniel Dura", initials: "DD", color: "#7c3aed", role: "Founder · DuraNoia" };
