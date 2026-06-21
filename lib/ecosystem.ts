export const ECO_MODELS = [
  { name: "ChatGPT", company: "OpenAI", mark: "@chatgpt" as const, role: "Generalist" },
  { name: "Claude", company: "Anthropic", mark: "@claude" as const, role: "Reasoning & writing" },
  { name: "Gemini", company: "Google", mark: "@gemini" as const, role: "Workspace" },
  { name: "Perplexity", company: "Perplexity", mark: "@perplexity" as const, role: "Search" },
  { name: "Cursor", company: "Anysphere", mark: "@cursor" as const, role: "Coding" },
  { name: "Midjourney", company: "Midjourney", mark: "@midjourney" as const, role: "Image" },
  { name: "Copilot", company: "Microsoft", mark: "@copilot" as const, role: "Office" },
  { name: "Llama", company: "Meta", mark: "@llama" as const, role: "Self-host" },
  { name: "DeepSeek", company: "DeepSeek", mark: "@deepseek" as const, role: "Cheap reasoning" },
  { name: "Grok", company: "xAI", mark: "@grok" as const, role: "Real-time" },
];

export const ECO_LINKS = [
  { a: "Perplexity", b: "Claude", why: "Research → synthesis" },
  { a: "Perplexity", b: "ChatGPT", why: "Facts → first draft" },
  { a: "Claude", b: "Cursor", why: "Plan → implement code" },
  { a: "ChatGPT", b: "Midjourney", why: "Brief → visual" },
  { a: "Claude", b: "Midjourney", why: "Concept → art direction" },
  { a: "Gemini", b: "ChatGPT", why: "Workspace data → draft" },
  { a: "Grok", b: "Perplexity", why: "Live signal → verify" },
  { a: "DeepSeek", b: "Cursor", why: "Cheap reasoning → build" },
  { a: "Copilot", b: "ChatGPT", why: "Office docs → polish" },
  { a: "Llama", b: "DeepSeek", why: "Open stack pairing" },
  { a: "ChatGPT", b: "Claude", why: "Cross-check answers" },
];

export const ECO_RECIPES = [
  {
    title: "Deep research report",
    goal: "Turn a vague question into a cited, well-written report.",
    steps: [
      { m: "Perplexity", do: "Gather sources & live facts" },
      { m: "Claude", do: "Synthesize into an outline" },
      { m: "ChatGPT", do: "Draft & format the report" },
    ],
    tags: ["Research", "Writing"],
  },
  {
    title: "Idea → shipped feature",
    goal: "Go from a product idea to working, reviewed code.",
    steps: [
      { m: "Claude", do: "Spec & break down the work" },
      { m: "Cursor", do: "Implement in the editor" },
      { m: "Claude", do: "Review & refactor the diff" },
    ],
    tags: ["Code"],
  },
  {
    title: "Brand moodboard",
    goal: "From a one-line brief to art-directed visuals.",
    steps: [
      { m: "ChatGPT", do: "Expand brief into prompts" },
      { m: "Midjourney", do: "Generate visual options" },
      { m: "Claude", do: "Critique & pick a direction" },
    ],
    tags: ["Design"],
  },
  {
    title: "Inbox → action plan",
    goal: "Summarize a busy Workspace and decide next steps.",
    steps: [
      { m: "Gemini", do: "Summarize docs & threads" },
      { m: "ChatGPT", do: "Draft replies & a plan" },
    ],
    tags: ["Productivity"],
  },
];
