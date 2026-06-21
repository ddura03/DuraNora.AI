// Data for the AI Ecosystem page wireframes.

const ECO_MODELS = [
  { name:"ChatGPT",    company:"OpenAI",     mark:"@chatgpt", role:"Generalist" },
  { name:"Claude",     company:"Anthropic",  mark:"@claude", role:"Reasoning & writing" },
  { name:"Gemini",     company:"Google",     mark:"@gemini", role:"Workspace" },
  { name:"Perplexity", company:"Perplexity", mark:"@perplexity", role:"Search" },
  { name:"Cursor",     company:"Anysphere",  mark:"@cursor", role:"Coding" },
  { name:"Midjourney", company:"Midjourney", mark:"@midjourney", role:"Image" },
  { name:"Copilot",    company:"Microsoft",  mark:"@copilot", role:"Office" },
  { name:"Llama",      company:"Meta",       mark:"@llama", role:"Self-host" },
  { name:"DeepSeek",   company:"DeepSeek",   mark:"@deepseek", role:"Cheap reasoning" },
  { name:"Grok",       company:"xAI",        mark:"@grok", role:"Real-time" },
];

// Pairings: which models hand off to each other, and why.
const ECO_LINKS = [
  { a:"Perplexity", b:"Claude",     why:"Research → synthesis" },
  { a:"Perplexity", b:"ChatGPT",    why:"Facts → first draft" },
  { a:"Claude",     b:"Cursor",     why:"Plan → implement code" },
  { a:"ChatGPT",    b:"Midjourney", why:"Brief → visual" },
  { a:"Claude",     b:"Midjourney", why:"Concept → art direction" },
  { a:"Gemini",     b:"ChatGPT",    why:"Workspace data → draft" },
  { a:"Grok",       b:"Perplexity", why:"Live signal → verify" },
  { a:"DeepSeek",   b:"Cursor",     why:"Cheap reasoning → build" },
  { a:"Copilot",    b:"ChatGPT",    why:"Office docs → polish" },
  { a:"Llama",      b:"DeepSeek",   why:"Open stack pairing" },
  { a:"ChatGPT",    b:"Claude",     why:"Cross-check answers" },
];

// Workflow recipes — multi-model chains for one objective.
const ECO_RECIPES = [
  {
    title:"Deep research report",
    goal:"Turn a vague question into a cited, well-written report.",
    steps:[
      { m:"Perplexity", do:"Gather sources & live facts" },
      { m:"Claude",     do:"Synthesize into an outline" },
      { m:"ChatGPT",    do:"Draft & format the report" },
    ],
    tags:["Research", "Writing"],
  },
  {
    title:"Idea → shipped feature",
    goal:"Go from a product idea to working, reviewed code.",
    steps:[
      { m:"Claude",  do:"Spec & break down the work" },
      { m:"Cursor",  do:"Implement in the editor" },
      { m:"Claude",  do:"Review & refactor the diff" },
    ],
    tags:["Code"],
  },
  {
    title:"Brand moodboard",
    goal:"From a one-line brief to art-directed visuals.",
    steps:[
      { m:"ChatGPT",    do:"Expand brief into prompts" },
      { m:"Midjourney", do:"Generate visual options" },
      { m:"Claude",     do:"Critique & pick a direction" },
    ],
    tags:["Design"],
  },
  {
    title:"Inbox → action plan",
    goal:"Summarize a busy Workspace and decide next steps.",
    steps:[
      { m:"Gemini",  do:"Summarize docs & threads" },
      { m:"ChatGPT", do:"Draft replies & a plan" },
    ],
    tags:["Productivity"],
  },
];

// Use-case clusters — group models by objective.
const ECO_CLUSTERS = [
  { goal:"Research the truth",  blurb:"Find facts, verify, cite.",            models:["Perplexity","Grok","Claude"] },
  { goal:"Write & reason",      blurb:"Long-form, nuanced, careful.",          models:["Claude","ChatGPT","DeepSeek"] },
  { goal:"Build software",      blurb:"Spec, implement, review.",             models:["Cursor","Claude","DeepSeek"] },
  { goal:"Make visuals",        blurb:"Concept to art-directed image.",        models:["Midjourney","ChatGPT","Gemini"] },
  { goal:"Run your workday",    blurb:"Docs, email, meetings.",               models:["Gemini","Copilot","ChatGPT"] },
  { goal:"Own your stack",      blurb:"Private, low-cost, self-hosted.",       models:["Llama","DeepSeek"] },
];

Object.assign(window, { ECO_MODELS, ECO_LINKS, ECO_RECIPES, ECO_CLUSTERS });

const LOGO_SRC = { "@chatgpt": "logos/chatgpt.png", "@claude": "logos/claude.svg", "@gemini": "logos/gemini.webp", "@copilot": "logos/copilot.png", "@cursor": "logos/cursor.png", "@midjourney": "logos/midjourney.png", "@perplexity": "logos/perplexity.png", "@llama": "logos/llama.png", "@deepseek": "logos/deepseek.png", "@grok": "logos/grok.webp" };
window.LOGO_SRC = LOGO_SRC;
function MarkGlyph({ mark }) {
  if (LOGO_SRC[mark]) {
    return <img src={LOGO_SRC[mark]} alt="" style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }} />;
  }
  return mark;
}
window.MarkGlyph = MarkGlyph;
