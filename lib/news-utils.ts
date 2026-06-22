import { MODELS_CATALOG } from "./models-catalog";
import { NEWS_ITEMS } from "./news";
import type { ModelMark, NewsArticleBody, NewsItem } from "./types";

const MARK_TO_SLUG: Partial<Record<ModelMark | "§", string>> = {
  "@chatgpt": "chatgpt",
  "@claude": "claude",
  "@gemini": "gemini",
  "@grok": "grok",
  "@deepseek": "deepseek",
  "@perplexity": "perplexity",
  "@llama": "llama",
};

const SKIP_LEARN_MARKS = new Set<ModelMark | "§">(["@cursor", "@midjourney", "§"]);

export function markToModelSlug(mark?: ModelMark | "§"): string | undefined {
  if (!mark || SKIP_LEARN_MARKS.has(mark)) return undefined;
  const slug = MARK_TO_SLUG[mark];
  return slug && slug in MODELS_CATALOG ? slug : undefined;
}

export function newsImage(company: string): string | undefined {
  const map: Record<string, string> = {
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
  return map[company];
}

const ARTICLE_BODIES: Record<string, NewsArticleBody> = {
  "gpt6-voice": {
    paragraphs: [
      "OpenAI is rolling out a multimodal preview of GPT-6 to Plus subscribers this week, pairing a redesigned realtime API with voice and vision routing that targets sub-200ms round-trip latency on common prompts.",
      "The preview ships with a new session model: developers open a persistent websocket, stream audio or frames, and receive structured tool calls alongside natural-language replies. Early testers report smoother barge-in during voice mode and fewer dropped partial transcripts.",
      "Pricing stays on the existing Plus tier for consumer access; API usage is metered separately with a modest uplift on realtime endpoints compared to GPT-5. OpenAI says the uplift reflects dedicated inference capacity reserved for low-latency paths.",
      "For builders, the biggest shift is unified multimodal context — a single thread can mix uploaded screenshots, live camera frames, and spoken follow-ups without manually swapping modes. Custom GPTs inherit the same routing automatically.",
      "If you rely on voice for brainstorming or field notes, revisit prompts that assumed higher latency: shorter clauses, explicit “wait for my pause” instructions, and tool schemas that tolerate partial input all behave better under the new stack.",
    ],
    subheadings: [
      { after: 1, text: "What changed in the API" },
      { after: 3, text: "Who should care" },
    ],
    pullQuote:
      "Unified multimodal context means one thread can mix screenshots, live camera frames, and spoken follow-ups — no mode switching.",
    pullQuoteAfter: 3,
  },
  "claude5-mem": {
    paragraphs: [
      "Anthropic’s Claude 5 Sonnet update introduces persistent project memory that spans workspaces, so long-running initiatives keep context even when you switch between personal and team Projects.",
      "Memory is opt-in per Project via a new Memory tab. You choose what Claude may retain — style preferences, recurring stakeholders, glossary terms — and can audit or purge entries at any time. Nothing crosses Projects unless you explicitly link them.",
      "The feature targets product teams and researchers who previously re-pasted the same brief every session. Early documentation emphasizes that memory complements, rather than replaces, uploaded files: docs still win for dense reference material.",
      "Anthropic also tightened default retention windows for free-tier workspaces and added export for memory entries, aligning with enterprise audit expectations.",
    ],
    subheadings: [{ after: 1, text: "How to turn it on" }],
    pullQuote: "Memory complements uploaded files — docs still win for dense reference material.",
    pullQuoteAfter: 2,
  },
  "gemini-ws": {
    paragraphs: [
      "Google is enabling Gemini Ultra by default across Workspace — Docs, Sheets, Gmail, and Meet — for eligible business and education plans, removing the separate add-on SKU that slowed adoption last year.",
      "The rollout is phased by region and admin console settings. Admins can still cap which apps expose Ultra features, but the default path now assumes AI assistance is on unless explicitly restricted.",
      "In Docs and Sheets, side-panel prompts inherit file context automatically. Meet gains live recap and Q&A grounded in the active call transcript, with citations back to speaker timestamps.",
      "Google positions the move as closing the gap with consumer Gemini Advanced: the same Ultra model family, tuned for Workspace permissions and data residency rules.",
    ],
    subheadings: [{ after: 1, text: "Admin controls" }],
    pullQuote: "Ultra in Workspace inherits file context automatically — no copy-paste into a separate chat window.",
    pullQuoteAfter: 2,
  },
  "xai-raise": {
    paragraphs: [
      "xAI closed a $6B Series D earmarked almost entirely for compute — expanding the Memphis training cluster and funding on-device Grok variants aimed at phones and edge appliances.",
      "The round values the company sharply higher than its prior raise, reflecting investor appetite for real-time, social-native models even as frontier labs race on raw benchmarks.",
      "xAI says a meaningful slice of the capital will go toward power and cooling at Memphis, plus networking upgrades to cut all-reduce latency across the expanded pod count.",
      "Product-wise, Grok 4’s roadmap emphasizes tighter X integration, lower-latency vision on mobile, and enterprise tiers with stricter logging — details expected at a summer infra keynote.",
    ],
    subheadings: [{ after: 1, text: "Where the money goes" }],
    pullQuote: "Most of the round is compute — power, cooling, and networking at Memphis, not another consumer feature sprint.",
    pullQuoteAfter: 2,
  },
  "ds-paper": {
    paragraphs: [
      "DeepSeek published a training recipe that claims frontier-grade reasoning with a fraction of the GPU-hours used by comparable RL runs, sparking immediate debate among labs optimizing post-training stacks.",
      "The method combines curriculum-style difficulty ramping, selective replay of failure modes, and a smaller critic model that gates expensive rollouts — only promising trajectories receive full GPU budget.",
      "On public math and code suites cited in the paper, results land within a few points of much larger baselines, though independent replication is still early. Several teams note sensitivity to base-model choice and tokenizer quirks.",
      "For practitioners, the practical takeaway is cost routing: cheaper RL loops may let smaller orgs iterate on reasoning behaviors without reserving entire clusters for weeks.",
      "DeepSeek released partial logs and ablation configs under a research license; weights remain on their existing open-weight terms for the accompanying checkpoint.",
    ],
    subheadings: [
      { after: 1, text: "The method in plain terms" },
      { after: 3, text: "Replication watch" },
    ],
    pullQuote: "Only promising trajectories get full GPU budget — a gated rollout loop that trims waste.",
    pullQuoteAfter: 2,
  },
  "cursor-agents": {
    paragraphs: [
      "Cursor shipped background agents that can plan and execute whole-repo tasks — refactors, test fixes, migration scaffolds — while you close the laptop and review the resulting pull request later.",
      "Agents run in an isolated workspace snapshot with explicit file allowlists. You approve shell commands before they execute, and diffs stream into a review panel similar to inline Cmd-K edits.",
      "Early access opens to Pro subscribers this week, with queue limits based on repo size. Cursor recommends committing or stashing before kicking off long agents, and keeping task descriptions scoped to a single outcome.",
      "The feature pairs naturally with frontier models for planning and faster models for file churn, mirroring guidance Cursor already gives for interactive agent mode.",
    ],
    subheadings: [{ after: 1, text: "Safety rails" }],
    pullQuote: "Kick off a refactor, walk away, and review a PR — agents run against a snapshot, not your live dirty tree.",
    pullQuoteAfter: 2,
  },
  "mj-v8": {
    paragraphs: [
      "Midjourney v8 focuses on legible typography inside images and finer control over composition via expanded reference-image tooling.",
      "Text rendering — long a weak spot — uses a dedicated glyph pass that designers report is finally usable for short headlines and poster mockups, though paragraph-length copy still falters.",
      "Reference controls now accept multiple mood boards with weighted influence, making brand-locked sets easier without endless re-rolling.",
      "v8 also refreshes default aspect ratios and upscaler quality, with a migration guide for prompts that relied on deprecated flags from v7.",
    ],
    subheadings: [{ after: 1, text: "Typography pass" }],
    pullQuote: "Short headlines finally look intentional — paragraph-length copy still needs manual touch-up.",
    pullQuoteAfter: 1,
  },
  "eu-policy": {
    paragraphs: [
      "European regulators finalized the next enforcement phase of the AI Act, sharpening transparency and disclosure duties for general-purpose models and downstream deployers shipping into the EU.",
      "Builders must document training-data summaries, publish systemic-risk mitigations where applicable, and provide contact points for downstream integrators. Smaller open-weight releases face lighter templates but not a full exemption.",
      "The rules land on a staggered calendar: largest frontier providers first, then mid-tier model makers, then deployers embedding models in customer-facing products.",
      "Legal teams advise treating disclosure packs as living documents — updated with each major fine-tune or capability unlock, not a one-time PDF at launch.",
    ],
    subheadings: [{ after: 1, text: "Timeline" }],
    pullQuote: "Disclosure packs should update with every major fine-tune — not a one-time launch PDF.",
    pullQuoteAfter: 3,
  },
  "llama-edge": {
    paragraphs: [
      "Meta released Llama 4 edge checkpoints tuned for phones and laptops, targeting offline inference with 4-bit quantization and sub-2B active-parameter variants for battery-constrained devices.",
      "The weights ship under Meta’s open license with reference runtimes for Android, iOS, and desktop via popular local runners. Meta claims parity within a few points of cloud APIs on summarization and lightweight coding tasks.",
      "On-device privacy is the headline: sensitive dictation, field notes, and CRM snippets can stay local while still benefiting from a capable chat model.",
      "Developers get updated fine-tuning notebooks aimed at domain adapters small enough to fit beside the base edge checkpoint in unified memory.",
    ],
    subheadings: [{ after: 1, text: "Running locally" }],
    pullQuote: "Sensitive dictation and field notes can stay on-device — no token bill, no upload queue.",
    pullQuoteAfter: 2,
  },
  "perp-fin": {
    paragraphs: [
      "Perplexity raised a new round to expand its finance vertical — real-time market data, SEC filings search, and an analyst mode that stitches citations across earnings transcripts and news wires.",
      "The product push targets individual investors and small funds who want sourced answers without hopping between terminals. Integrations with major market-data vendors roll out region by region.",
      "Analyst mode adds structured tables, footnoted KPI extracts, and export to CSV for models users paste into spreadsheets or downstream LLM workflows.",
      "Perplexity stresses that citations remain central: every numeric claim links to primary filings or exchange data, with freshness badges when quotes are delayed.",
    ],
    subheadings: [{ after: 1, text: "Analyst mode" }],
    pullQuote: "Every numeric claim links to primary filings — freshness badges when quotes are delayed.",
    pullQuoteAfter: 3,
  },
};

const SOURCE_URLS: Record<string, string> = {
  "gpt6-voice": "https://openai.com/news",
  "claude5-mem": "https://www.anthropic.com/news",
  "gemini-ws": "https://blog.google/technology/ai/",
  "xai-raise": "https://x.ai/news",
  "ds-paper": "https://www.deepseek.com/",
  "cursor-agents": "https://cursor.com/blog",
  "mj-v8": "https://www.midjourney.com/updates",
  "eu-policy": "#",
  "llama-edge": "https://ai.meta.com/blog/",
  "perp-fin": "https://www.perplexity.ai/hub/blog",
};

const TOPICS: Record<string, string[]> = {
  "gpt6-voice": ["Multimodal", "API", "Voice", "Latency"],
  "claude5-mem": ["Memory", "Projects", "Enterprise"],
  "gemini-ws": ["Workspace", "Enterprise", "Ultra"],
  "xai-raise": ["Funding", "Compute", "Infrastructure"],
  "ds-paper": ["Research", "RL", "Cost"],
  "cursor-agents": ["Agents", "IDE", "Developer tools"],
  "mj-v8": ["Image gen", "Typography", "Creative"],
  "eu-policy": ["Regulation", "Compliance", "EU"],
  "llama-edge": ["Open weights", "On-device", "Privacy"],
  "perp-fin": ["Finance", "Search", "Funding"],
};

function enrichItem(item: NewsItem): NewsItem {
  if (!item.id) return item;
  return {
    ...item,
    sourceUrl: SOURCE_URLS[item.id] ?? "#",
    topics: TOPICS[item.id] ?? [],
    modelSlug: markToModelSlug(item.mark),
    body: ARTICLE_BODIES[item.id],
  };
}

const ENRICHED_NEWS = NEWS_ITEMS.map(enrichItem);

export function getNewsById(id: string): NewsItem | undefined {
  return ENRICHED_NEWS.find((n) => n.id === id);
}

export function getRelatedNews(id: string, limit = 3): NewsItem[] {
  const current = getNewsById(id);
  if (!current) return ENRICHED_NEWS.filter((n) => n.id !== id).slice(0, limit);

  const sameCat = ENRICHED_NEWS.filter((n) => n.id !== id && n.cat === current.cat);
  const rest = ENRICHED_NEWS.filter((n) => n.id !== id && n.cat !== current.cat);
  return [...sameCat, ...rest].slice(0, limit);
}

export function getAllNewsIds(): string[] {
  return NEWS_ITEMS.map((n) => n.id!).filter(Boolean);
}
