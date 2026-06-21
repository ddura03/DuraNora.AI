// Mock AI Showcase projects.
// Each cover uses an on-brand gradient + a mono monogram (no external images needed).

const GRAD = {
  violet:  "linear-gradient(135deg,#7c3aed,#4c1d95)",
  twilight:"linear-gradient(135deg,#8b5cf6,#3b1d70)",
  orchid:  "linear-gradient(135deg,#b39ddb,#7c3aed)",
  ink:     "linear-gradient(135deg,#2a1a4a,#4c1d95)",
  dawn:    "linear-gradient(135deg,#a78bfa,#6d28d9)",
  plum:    "linear-gradient(135deg,#6d28d9,#1e1033)",
};
const AV = ["#7c3aed", "#4c1d95", "#9d6ef0", "#5b21b6", "#b3722f", "#1f8a5b", "#c0397b", "#2563c0"];

let _i = 0;
const initials = (n) => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const slugify = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
function person(name, role) { return { name, role, initials: initials(name), color: AV[(_i++) % AV.length], slug: slugify(name) }; }

const PROJECTS = [
  {
    id: "promptpilot", title: "PromptPilot — inbox triage agent", mono: "PP", grad: GRAD.violet,
    link: "https://promptpilot.app",
    author: person("Daniel Dura", "Founder · DuraNoia"), mark: "@chatgpt",
    views: "2.4K", likes: 188, featured: true,
    tags: ["Agents", "Productivity", "GPT-5"],
    desc: "A custom GPT that reads my inbox each morning, drafts replies in my voice, and flags the three emails that actually need me. Built with Custom GPTs + the Actions API.",
    comments: [
      { who: person("Maya Chen", ""), text: "The voice-matching is scary good. How many examples did you give it?", when: "2h" },
      { who: person("Andre Silva", ""), text: "Would love a writeup on the Actions setup 🙌", when: "5h" },
    ],
  },
  {
    id: "loreatlas", title: "Lore Atlas — fantasy world cartography", mono: "LA", grad: GRAD.twilight,
    link: "https://loreatlas.studio",
    author: person("Maya Chen", "Illustrator"), mark: "@midjourney",
    views: "5.1K", likes: 342, featured: true,
    tags: ["Image", "World-building", "v8"],
    desc: "A 40-map atlas for a tabletop campaign, generated with a single style reference to keep every region consistent. Midjourney v8's new text rendering finally made the labels usable.",
    comments: [
      { who: person("Tom Rivera", ""), text: "These are gorgeous. The coastline detail is unreal.", when: "1d" },
    ],
  },
  {
    id: "reposage", title: "RepoSage — chat with your codebase", mono: "RS", grad: GRAD.ink,
    link: "https://reposage.dev",
    author: person("Andre Silva", "SWE · early career"), mark: "@cursor",
    views: "1.8K", likes: 96, featured: false,
    tags: ["Code", "Dev tools"],
    desc: "Onboarding to a 200k-line repo by letting Cursor's agent map it for me. It answers 'where does auth happen?' with the actual files and line numbers. Cut my ramp-up from weeks to days.",
    comments: [
      { who: person("Priya Nair", ""), text: "The @-file referencing tip changed how I work. Thanks for sharing!", when: "3h" },
    ],
  },
  {
    id: "citecheck", title: "CiteCheck — research fact verifier", mono: "CC", grad: GRAD.orchid,
    link: "https://citecheck.io",
    author: person("Priya Nair", "PhD candidate"), mark: "@perplexity",
    views: "3.2K", likes: 210, featured: true,
    tags: ["Research", "Citations"],
    desc: "Paste a paragraph and CiteCheck runs every claim through Perplexity, rating source quality 1–5 and flagging anything shaky. Saved me from two bad citations in my last paper.",
    comments: [
      { who: person("Daniel Dura", ""), text: "This should be a browser extension. Incredible idea.", when: "6h" },
      { who: person("Lina Park", ""), text: "Using this for my thesis immediately.", when: "8h" },
    ],
  },
  {
    id: "briefbot", title: "BriefBot — meeting recaps that ship", mono: "BB", grad: GRAD.dawn,
    link: "https://briefbot.app",
    author: person("Jordan Lee", "PM"), mark: "@gemini",
    views: "980", likes: 64, featured: false,
    tags: ["Workspace", "Summaries"],
    desc: "Gemini sits in every Meet call, then drops decisions + owners + open questions straight into a Doc before I've left the room. The whole team stopped taking notes.",
    comments: [],
  },
  {
    id: "quantdesk", title: "QuantDesk — market scanner", mono: "QD", grad: GRAD.plum,
    link: "https://quantdesk.io",
    author: person("Sam Okafor", "Analyst"), mark: "@claude",
    views: "1.2K", likes: 88, featured: false,
    tags: ["Reasoning", "Finance"],
    desc: "Claude reads earnings calls and 10-Ks, then writes me a one-page bull/bear brief with the weakest argument on each side. Long-context means I paste the whole filing, no chunking.",
    comments: [
      { who: person("Jordan Lee", ""), text: "The 'weakest argument' prompt is genius.", when: "2d" },
    ],
  },
  {
    id: "pixelforge", title: "PixelForge — instant brand kits", mono: "PF", grad: GRAD.violet,
    link: "https://pixelforge.design",
    author: person("Lina Park", "Designer"), mark: "@midjourney",
    views: "4.0K", likes: 270, featured: false,
    tags: ["Image", "Branding"],
    desc: "Type a vibe, get a logo mark, palette, and 12 on-brand social templates in one pass. A reference image locks the look so everything matches. Pitched a client in an afternoon.",
    comments: [
      { who: person("Maya Chen", ""), text: "The palette extraction is so clean. What's your reference workflow?", when: "4h" },
    ],
  },
  {
    id: "studyforge", title: "StudyForge — flashcards from any PDF", mono: "SF", grad: GRAD.dawn,
    link: "https://studyforge.app",
    author: person("Daniel Dura", "Founder · DuraNoia"), mark: "@claude",
    views: "1.5K", likes: 132, featured: false,
    tags: ["Reasoning", "Study", "Claude 5"],
    desc: "Drop in a textbook chapter and Claude turns it into a spaced-repetition deck — question, answer, and a one-line 'why it matters'. Long context means a whole chapter in one pass.",
    comments: [
      { who: person("Priya Nair", ""), text: "Wish I had this during my quals. Beautiful.", when: "1d" },
    ],
  },
  {
    id: "threadreader", title: "ThreadReader — your X feed, summarized", mono: "TR", grad: GRAD.plum,
    link: "https://threadreader.app",
    author: person("Daniel Dura", "Founder · DuraNoia"), mark: "@grok",
    views: "890", likes: 73, featured: false,
    tags: ["Real-time", "Social"],
    desc: "Grok scans the accounts I follow and writes a five-bullet morning brief of what actually happened on X overnight — with the spicy takes flagged for a second look.",
    comments: [],
  },
  {
    id: "voicenotes", title: "VoiceNotes — talk-to-journal", mono: "VN", grad: GRAD.twilight,
    link: "https://voicenotes.club",
    author: person("Tom Rivera", "Student"), mark: "@chatgpt",
    views: "760", likes: 51, featured: false,
    tags: ["Voice", "Personal"],
    desc: "I ramble into ChatGPT voice mode on my walk home and it turns the mess into a structured daily journal entry with themes and todos. Non-linear thinking, finally captured.",
    comments: [],
  },
];

Object.assign(window, { PROJECTS, GRAD, AV });

// ---- Public user directory (for profile pages) ----
const USERS = {};
PROJECTS.forEach(p => {
  const a = p.author;
  if (!USERS[a.slug]) USERS[a.slug] = { name: a.name, slug: a.slug, initials: a.initials, color: a.color, role: a.role || "DuraNoia member", headline: "Building with AI on DuraNoia.", location: "", linkedin: "", models: [], joined: "2026" };
});
// Rich profile for the signed-in user
USERS["daniel-dura"] = Object.assign(USERS["daniel-dura"] || {}, {
  name: "Daniel Dura", slug: "daniel-dura", initials: "DD", color: "#7c3aed",
  role: "Founder · DuraNoia",
  headline: "Founder of DuraNoia. Exploring how the popular AI models work — and how to chain them together.",
  location: "United States",
  linkedin: "linkedin.com/in/daniel-dura03",
  models: ["@claude", "@chatgpt"],
  joined: "Jan 2026",
});

const profileProjects = (slug) => PROJECTS.filter(p => p.author.slug === slug);

Object.assign(window, { USERS, profileProjects, slugify });
