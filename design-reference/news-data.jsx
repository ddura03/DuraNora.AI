// News data for the DuraNoia Newswire page.
// (June 2026 timeframe — placeholder editorial copy.)
const NEWS_ITEMS = [
  {
    id:"gpt6-voice", featured:true,
    company:"OpenAI", mark:"@chatgpt", cat:"Releases", date:"Jun 1, 2026", read:"4 min",
    title:"GPT-6 opens multimodal preview to Plus tier",
    excerpt:"OpenAI's voice + vision routing now ships in the API with sub-200ms latency targets and a redesigned realtime endpoint. Here's what changed, what it costs, and which of your prompts to revisit.",
  },
  { id:"claude5-mem",  company:"Anthropic", mark:"@claude", cat:"Releases", date:"May 28, 2026", read:"3 min",
    title:"Claude 5 Sonnet adds persistent project memory",
    excerpt:"Memory now spans workspaces; opt-in via the new Memory tab inside Projects." },
  { id:"gemini-ws",    company:"Google", mark:"@gemini", cat:"Releases", date:"May 26, 2026", read:"2 min",
    title:"Gemini Ultra rolls into Workspace by default",
    excerpt:"Docs, Sheets, and Meet pick up the Ultra tier without an add-on subscription." },
  { id:"xai-raise",    company:"xAI", mark:"@grok", cat:"Funding", date:"May 24, 2026", read:"2 min",
    title:"Grok maker announces $6B Series D for compute",
    excerpt:"Funding earmarked for the Memphis cluster expansion and on-device variants." },
  { id:"ds-paper",     company:"DeepSeek", mark:"@deepseek", cat:"Research", date:"May 22, 2026", read:"6 min",
    title:"DeepSeek publishes a cheaper RL training recipe",
    excerpt:"New paper claims frontier reasoning at a fraction of the GPU-hours. We break down the method." },
  { id:"cursor-agents",company:"Cursor", mark:"@cursor", cat:"Releases", date:"May 20, 2026", read:"3 min",
    title:"Cursor ships background agents for whole-repo tasks",
    excerpt:"Kick off a refactor, close the laptop, review the PR later. Early access opens this week." },
  { id:"mj-v8",        company:"Midjourney", mark:"@midjourney", cat:"Releases", date:"May 18, 2026", read:"3 min",
    title:"Midjourney v8 focuses on text rendering & control",
    excerpt:"Typography in images finally looks intentional; new reference-image controls land too." },
  { id:"eu-policy",    company:"Policy", mark:"§", cat:"Policy", date:"May 16, 2026", read:"5 min",
    title:"EU finalizes the next phase of the AI Act",
    excerpt:"What the transparency and disclosure rules mean for builders shipping to Europe." },
  { id:"llama-edge",   company:"Meta", mark:"@llama", cat:"Releases", date:"May 14, 2026", read:"4 min",
    title:"Llama 4 edge models target phones & laptops",
    excerpt:"Open weights tuned for on-device inference; runs offline with a 4-bit quant." },
  { id:"perp-fin",     company:"Perplexity", mark:"@perplexity", cat:"Funding", date:"May 12, 2026", read:"2 min",
    title:"Perplexity raises to expand its finance vertical",
    excerpt:"New round funds real-time market data, filings search, and an analyst mode." },
];

const NEWS_CATS = ["All", "Releases", "Funding", "Research", "Policy"];

Object.assign(window, { NEWS_ITEMS, NEWS_CATS });

const LOGO_SRC = { "@chatgpt": "logos/chatgpt.png", "@claude": "logos/claude.svg", "@gemini": "logos/gemini.webp", "@copilot": "logos/copilot.png", "@cursor": "logos/cursor.png", "@midjourney": "logos/midjourney.png", "@perplexity": "logos/perplexity.png", "@llama": "logos/llama.png", "@deepseek": "logos/deepseek.png", "@grok": "logos/grok.webp" };
window.LOGO_SRC = LOGO_SRC;
function MarkGlyph({ mark }) {
  if (LOGO_SRC[mark]) {
    return <img src={LOGO_SRC[mark]} alt="" style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }} />;
  }
  return mark;
}
window.MarkGlyph = MarkGlyph;
