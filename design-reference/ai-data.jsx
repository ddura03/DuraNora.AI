// Placeholder labels for the 8 AI buttons.
// NOTE: Real brand logos to be dropped in later — these are wireframe marks only.
const AI_LIST = [
  { name: "ChatGPT",    mark: "@chatgpt", sub: "OpenAI" },
  { name: "Claude",     mark: "@claude", sub: "Anthropic" },
  { name: "Gemini",     mark: "@gemini", sub: "Google" },
  { name: "Copilot",    mark: "@copilot", sub: "Microsoft" },
  { name: "Cursor",     mark: "@cursor", sub: "Anysphere" },
  { name: "Midjourney", mark: "@midjourney", sub: "Midjourney" },
  { name: "Perplexity", mark: "@perplexity", sub: "Perplexity" },
  { name: "Llama",      mark: "@llama", sub: "Meta" },
  { name: "DeepSeek",   mark: "@deepseek", sub: "DeepSeek" },
  { name: "Grok",       mark: "@grok", sub: "xAI" },
];

const NEWS = [
  { tag: "OpenAI",    cat: "Releases", date: "May 24, 2026", title: "GPT-6 multimodal preview opens to Plus tier",     excerpt: "New voice + vision routing surfaces in the API with sub-200ms latency targets…" },
  { tag: "Anthropic", cat: "Releases", date: "May 21, 2026", title: "Claude 5 Sonnet adds persistent project memory", excerpt: "Memory now spans workspaces; opt-in via the new Memory tab inside Projects…" },
  { tag: "Google",    cat: "Releases", date: "May 19, 2026", title: "Gemini Ultra rolls into Workspace by default",   excerpt: "Docs, Sheets, and Meet pick up the Ultra tier without an add-on subscription…" },
  { tag: "xAI",       cat: "Funding",  date: "May 17, 2026", title: "Grok 4 announces $6B Series D for compute",      excerpt: "Funding earmarked for the Memphis cluster expansion and on-device variants…" },
  { tag: "DeepSeek",  cat: "Research", date: "May 15, 2026", title: "DeepSeek publishes a cheaper RL training recipe", excerpt: "New paper claims frontier reasoning at a fraction of the GPU-hours used elsewhere…" },
  { tag: "EU",        cat: "Policy",   date: "May 13, 2026", title: "EU finalizes the next phase of the AI Act",       excerpt: "Transparency and disclosure rules land for anyone shipping models into Europe…" },
  { tag: "Perplexity",cat: "Funding",  date: "May 11, 2026", title: "Perplexity raises to expand its finance vertical", excerpt: "New round funds real-time market data, filings search, and an analyst mode…" },
  { tag: "Meta",      cat: "Releases", date: "May 9, 2026",  title: "Llama 4 edge models target phones & laptops",     excerpt: "Open weights tuned for on-device inference; runs offline with a 4-bit quant…" },
];

Object.assign(window, { AI_LIST, NEWS });

// Real brand logos by mark sentinel; fall back to the text glyph otherwise.
const LOGO_SRC = { "@chatgpt": "logos/chatgpt.png", "@claude": "logos/claude.svg", "@gemini": "logos/gemini.webp", "@copilot": "logos/copilot.png", "@cursor": "logos/cursor.png", "@midjourney": "logos/midjourney.png", "@perplexity": "logos/perplexity.png", "@llama": "logos/llama.png", "@deepseek": "logos/deepseek.png", "@grok": "logos/grok.webp" };
window.LOGO_SRC = LOGO_SRC;
function MarkGlyph({ mark }) {
  if (LOGO_SRC[mark]) {
    return <img src={LOGO_SRC[mark]} alt="" style={{ width:"70%", height:"70%", objectFit:"contain", display:"block" }} />;
  }
  return mark;
}
window.MarkGlyph = MarkGlyph;
