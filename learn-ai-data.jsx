// AI catalog used across the Learn AI page wireframes.
const AI_CATALOG = [
  {
    name: "ChatGPT", company: "OpenAI", mark: "@chatgpt",
    desc: "The household name. Best first AI to learn — strong on everyday writing, brainstorming, light coding, and conversational research.",
    bestAt: "General use", category: "Chat",
    modalities: ["Chat", "Voice", "Vision", "Image"],
    skill: "Beginner", pricing: "Freemium",
    featured: true, lessons: 42,
  },
  {
    name: "Claude", company: "Anthropic", mark: "@claude",
    desc: "The writer's AI. Best for long-document reasoning, careful editing, code refactors, and anything that needs nuance over speed.",
    bestAt: "Writing & reasoning", category: "Chat",
    modalities: ["Chat", "Vision", "Code"],
    skill: "Beginner", pricing: "Freemium",
    lessons: 38,
  },
  {
    name: "Gemini", company: "Google", mark: "@gemini",
    desc: "The Google ecosystem AI. Lives inside Workspace; best when your work already flows through Docs, Sheets, Gmail, and Meet.",
    bestAt: "Workspace integration", category: "Chat",
    modalities: ["Chat", "Voice", "Vision", "Image"],
    skill: "Beginner", pricing: "Freemium",
    lessons: 28,
  },
  {
    name: "Copilot", company: "Microsoft", mark: "@copilot",
    desc: "Microsoft's AI built into Windows, Office, and Edge. Best if you live in Outlook, Excel, or Teams every day.",
    bestAt: "Microsoft 365",  category: "Chat",
    modalities: ["Chat", "Voice", "Vision"],
    skill: "Beginner", pricing: "Paid",
    lessons: 18,
  },
  {
    name: "Cursor", company: "Anysphere", mark: "@cursor",
    desc: "The AI-native code editor. Forked VS Code with Claude / GPT baked in. The IDE professional developers are switching to.",
    bestAt: "Coding", category: "Code",
    modalities: ["Code", "Chat"],
    skill: "Intermediate", pricing: "Freemium",
    lessons: 24,
  },
  {
    name: "Midjourney", company: "Midjourney", mark: "@midjourney",
    desc: "The image AI that defined the aesthetic. Best for polished, painterly, art-directed visuals. Lives inside Discord.",
    bestAt: "Image generation", category: "Image",
    modalities: ["Image"],
    skill: "Intermediate", pricing: "Paid",
    lessons: 20,
  },
  {
    name: "Perplexity", company: "Perplexity", mark: "@perplexity",
    desc: "AI search engine. Live web results with citations and follow-up questions. Best for research where sources matter.",
    bestAt: "Live web research", category: "Search",
    modalities: ["Chat", "Search"],
    skill: "Beginner", pricing: "Freemium",
    lessons: 16,
  },
  {
    name: "Llama", company: "Meta", mark: "@llama",
    desc: "The open-weight foundation model. Run it on your own hardware. Best if you care about privacy, cost, or customization.",
    bestAt: "Self-hosted AI", category: "Foundation",
    modalities: ["Chat", "Code", "Vision"],
    skill: "Advanced", pricing: "Free",
    lessons: 14,
  },
  {
    name: "DeepSeek", company: "DeepSeek", mark: "@deepseek",
    desc: "Frontier reasoning at a fraction of the cost. The model that proved you don't need OpenAI-scale spending to compete.",
    bestAt: "Cheap reasoning", category: "Foundation",
    modalities: ["Chat", "Code"],
    skill: "Intermediate", pricing: "Free",
    lessons: 10,
  },
  {
    name: "Grok", company: "xAI", mark: "@grok",
    desc: "Elon's AI. Tied tightly to X (Twitter) — strong on real-time social signal and unfiltered tone. Polarizing by design.",
    bestAt: "Real-time + social", category: "Chat",
    modalities: ["Chat", "Vision"],
    skill: "Intermediate", pricing: "Paid",
    lessons: 12,
  },
];

// Approximate normalized positions for the constellation map (V2).
// 0–1 scale; converted to % at render time.
const CONSTELLATION = {
  ChatGPT:    { x: 0.30, y: 0.22, cluster: "Chat" },
  Claude:     { x: 0.50, y: 0.18, cluster: "Chat" },
  Gemini:     { x: 0.70, y: 0.22, cluster: "Chat" },
  Grok:       { x: 0.86, y: 0.34, cluster: "Chat" },
  Copilot:    { x: 0.14, y: 0.34, cluster: "Chat" },

  Cursor:     { x: 0.86, y: 0.62, cluster: "Code" },

  Midjourney: { x: 0.50, y: 0.86, cluster: "Image" },

  Perplexity: { x: 0.14, y: 0.62, cluster: "Search" },

  Llama:      { x: 0.34, y: 0.55, cluster: "Foundation" },
  DeepSeek:   { x: 0.66, y: 0.55, cluster: "Foundation" },
};

Object.assign(window, { AI_CATALOG, CONSTELLATION });

const LOGO_SRC = { "@chatgpt": "logos/chatgpt.png", "@claude": "logos/claude.svg", "@gemini": "logos/gemini.webp", "@copilot": "logos/copilot.png", "@cursor": "logos/cursor.png", "@midjourney": "logos/midjourney.png", "@perplexity": "logos/perplexity.png", "@llama": "logos/llama.png", "@deepseek": "logos/deepseek.png", "@grok": "logos/grok.webp" };
window.LOGO_SRC = LOGO_SRC;
function MarkGlyph({ mark }) {
  if (LOGO_SRC[mark]) {
    return <img src={LOGO_SRC[mark]} alt="" style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }} />;
  }
  return mark;
}
window.MarkGlyph = MarkGlyph;
