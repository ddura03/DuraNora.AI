import type { PairingContent } from "@/lib/types";

export const PAIRINGS_CATALOG: Record<string, PairingContent> = {
  "perplexity-claude": {
    from: "Perplexity",
    to: "Claude",
    why: "Research → synthesis",
    workflowTitle: "Cited research → polished report",
    summary: "Gather live, sourced facts in Perplexity, then hand the outline to Claude for synthesis and long-form writing.",
    meta: "Research · Writing · 2 models",
    flow: [
      { model: "Perplexity", action: "Gather sources & live facts" },
      { model: "Claude", action: "Synthesize into a structured report" },
    ],
    lessons: [
      { n: "01", title: "Frame the research question", level: "Basics", dur: "4:10", desc: "Write a Perplexity prompt that returns citable sources, not just a summary." },
      { n: "02", title: "Export a sourced outline", level: "Basics", dur: "5:20", desc: "Turn Perplexity's thread into a bullet outline with links you can verify." },
      { n: "03", title: "Hand off to Claude", level: "Practical", dur: "6:05", desc: "Paste the outline into Claude with instructions for tone, structure, and what to flag as uncertain." },
      { n: "04", title: "Cross-check weak claims", level: "Pro", dur: "4:45", desc: "Use Claude to stress-test Perplexity's findings and send shaky claims back for a second search pass." },
    ],
    handoffPrompt:
      "Here is a sourced research outline from Perplexity:\n\n{paste outline with links}\n\nTurn this into a 800-word report.\nKeep every factual claim tied to a source.\nFlag anything that needs a second verification pass.",
    lessonNote: "Perplexity finds.\nClaude writes.\nNever skip the cite step.",
  },

  "perplexity-chatgpt": {
    from: "Perplexity",
    to: "ChatGPT",
    why: "Facts → first draft",
    workflowTitle: "Verified facts → fast first draft",
    summary: "Use Perplexity for cited research, then ChatGPT to turn findings into a quick, formatted first draft.",
    meta: "Research · Drafting · 2 models",
    flow: [
      { model: "Perplexity", action: "Pull cited facts & stats" },
      { model: "ChatGPT", action: "Draft in your chosen format" },
    ],
    lessons: [
      { n: "01", title: "Search with citations on", level: "Basics", dur: "3:50", desc: "Run a focused Perplexity query and confirm every key claim has a linked source." },
      { n: "02", title: "Build a fact sheet", level: "Basics", dur: "4:30", desc: "Condense Perplexity's answer into a clean fact sheet: claim, source, confidence." },
      { n: "03", title: "Prompt ChatGPT for format", level: "Practical", dur: "5:40", desc: "Give ChatGPT the fact sheet plus an explicit output format — email, memo, thread, or deck bullets." },
      { n: "04", title: "Speed-run revisions", level: "Pro", dur: "4:15", desc: "Use ChatGPT's conversational edits to tighten the draft without re-running the research." },
    ],
    handoffPrompt:
      "Fact sheet from Perplexity (all claims sourced):\n\n{paste fact sheet}\n\nWrite a {format: email | memo | blog post} in a direct, no-jargon tone.\nDo not invent facts — only use what's in the sheet.",
    lessonNote: "Facts first in Perplexity.\nSpeed second in ChatGPT.",
  },

  "claude-cursor": {
    from: "Claude",
    to: "Cursor",
    why: "Plan → implement code",
    workflowTitle: "Spec in Claude → ship in Cursor",
    summary: "Break down the feature in Claude, then implement across your repo with Cursor's agent and inline edits.",
    meta: "Code · Planning · 2 models",
    flow: [
      { model: "Claude", action: "Spec & break down the work" },
      { model: "Cursor", action: "Implement in the editor" },
    ],
    lessons: [
      { n: "01", title: "Write a tight spec", level: "Basics", dur: "5:10", desc: "Ask Claude for acceptance criteria, edge cases, and a file-level plan before touching code." },
      { n: "02", title: "Generate a task checklist", level: "Basics", dur: "4:20", desc: "Turn the spec into ordered tasks small enough for Cursor agent runs." },
      { n: "03", title: "Implement with @-references", level: "Practical", dur: "7:30", desc: "Feed Cursor the spec and @-reference the files Claude flagged as touch points." },
      { n: "04", title: "Review the diff in Claude", level: "Pro", dur: "5:55", desc: "Paste Cursor's diff back into Claude for a final review before you merge." },
    ],
    handoffPrompt:
      "Feature spec:\n\n{paste Claude spec}\n\nImplement task 1 only.\n@-reference the files listed in the spec.\nShow me the diff before applying.",
    lessonNote: "Claude plans.\nCursor builds.\nYou review both.",
  },

  "chatgpt-midjourney": {
    from: "ChatGPT",
    to: "Midjourney",
    why: "Brief → visual",
    workflowTitle: "Creative brief → Midjourney prompts",
    summary: "Expand a one-line idea in ChatGPT into structured Midjourney prompts with style, lighting, and aspect ratio.",
    meta: "Design · Image · 2 models",
    flow: [
      { model: "ChatGPT", action: "Expand brief into prompts" },
      { model: "Midjourney", action: "Generate visual options" },
    ],
    lessons: [
      { n: "01", title: "Start with a one-line brief", level: "Basics", dur: "3:40", desc: "Describe mood, audience, and constraints in plain language before asking for prompts." },
      { n: "02", title: "Generate prompt variants", level: "Basics", dur: "5:00", desc: "Ask ChatGPT for 5 Midjourney prompts varying composition and palette." },
      { n: "03", title: "Add parameters", level: "Practical", dur: "4:50", desc: "Append --ar, --stylize, and style references ChatGPT suggests for brand consistency." },
      { n: "04", title: "Iterate with Remix", level: "Pro", dur: "5:30", desc: "Take the best Midjourney result back to ChatGPT for a Remix prompt that nudges one variable." },
    ],
    handoffPrompt:
      "Brand brief:\n\"{one-line brief}\"\n\nGive me 5 Midjourney prompts.\nInclude subject, style, lighting, and end each with --ar 16:9.",
    lessonNote: "ChatGPT writes prompts.\nMidjourney renders them.",
  },

  "claude-midjourney": {
    from: "Claude",
    to: "Midjourney",
    why: "Concept → art direction",
    workflowTitle: "Concept critique → art direction",
    summary: "Use Claude to sharpen the creative direction, then Midjourney to explore visual options against that brief.",
    meta: "Design · Direction · 2 models",
    flow: [
      { model: "Claude", action: "Define concept & art direction" },
      { model: "Midjourney", action: "Explore visual directions" },
    ],
    lessons: [
      { n: "01", title: "Write a concept deck", level: "Basics", dur: "4:55", desc: "Ask Claude for mood, references, do-nots, and a one-paragraph art direction." },
      { n: "02", title: "Translate to prompt language", level: "Basics", dur: "5:15", desc: "Have Claude convert art-direction prose into Midjourney-native prompt structure." },
      { n: "03", title: "Generate a direction set", level: "Practical", dur: "6:20", desc: "Run 3–4 prompts in Midjourney and keep notes on what each direction communicates." },
      { n: "04", title: "Critique & pick a winner", level: "Pro", dur: "4:40", desc: "Upload results to Claude for a structured critique against the original brief." },
    ],
    handoffPrompt:
      "Art direction from Claude:\n\n{paste direction}\n\nConvert this into 3 Midjourney prompts.\nVary composition but keep palette and mood consistent.\nEnd each with --ar 1:1.",
    lessonNote: "Claude directs.\nMidjourney explores.",
  },

  "gemini-chatgpt": {
    from: "Gemini",
    to: "ChatGPT",
    why: "Workspace data → draft",
    workflowTitle: "Workspace context → polished draft",
    summary: "Pull summaries and data from Gemini inside Google Workspace, then polish the output in ChatGPT.",
    meta: "Productivity · Workspace · 2 models",
    flow: [
      { model: "Gemini", action: "Summarize docs & threads" },
      { model: "ChatGPT", action: "Draft replies & a plan" },
    ],
    lessons: [
      { n: "01", title: "Summarize in Gemini", level: "Basics", dur: "4:25", desc: "Use Gemini in Docs or Gmail to extract decisions, open questions, and action items." },
      { n: "02", title: "Export structured notes", level: "Basics", dur: "3:50", desc: "Ask Gemini for a bullet export: context, decisions, owners, deadlines." },
      { n: "03", title: "Draft in ChatGPT", level: "Practical", dur: "5:35", desc: "Paste Gemini's export into ChatGPT with tone and format instructions for the deliverable." },
      { n: "04", title: "Build an action plan", level: "Pro", dur: "4:10", desc: "Have ChatGPT turn the thread into a prioritized next-steps list with owner assignments." },
    ],
    handoffPrompt:
      "Workspace summary from Gemini:\n\n{paste structured notes}\n\nDraft a reply email confirming next steps.\nTone: professional, concise.\nInclude a numbered action plan at the end.",
    lessonNote: "Gemini reads your files.\nChatGPT writes the send.",
  },

  "grok-perplexity": {
    from: "Grok",
    to: "Perplexity",
    why: "Live signal → verify",
    workflowTitle: "Social pulse → verified facts",
    summary: "Scan live social signal in Grok, then verify the top claims in Perplexity with primary sources.",
    meta: "Research · Real-time · 2 models",
    flow: [
      { model: "Grok", action: "Read live social signal" },
      { model: "Perplexity", action: "Verify claims with sources" },
    ],
    lessons: [
      { n: "01", title: "Map the conversation", level: "Basics", dur: "4:05", desc: "Ask Grok what's trending on a topic and list the main camps, not just the loudest takes." },
      { n: "02", title: "Extract checkable claims", level: "Basics", dur: "4:40", desc: "Pull 3–5 factual claims from Grok's summary that can be verified independently." },
      { n: "03", title: "Verify in Perplexity", level: "Practical", dur: "5:50", desc: "Run each claim through Perplexity with Academic or News focus and collect citations." },
      { n: "04", title: "Write a balanced brief", level: "Pro", dur: "4:30", desc: "Combine Grok's sentiment read with Perplexity's verified facts into a one-page brief." },
    ],
    handoffPrompt:
      "Claims to verify from Grok:\n\n1. {claim}\n2. {claim}\n3. {claim}\n\nFor each claim: confirm or refute with primary sources.\nRate source quality 1–5.",
    lessonNote: "Grok for the pulse.\nPerplexity for the proof.",
  },

  "deepseek-cursor": {
    from: "DeepSeek",
    to: "Cursor",
    why: "Cheap reasoning → build",
    workflowTitle: "Budget reasoning → repo edits",
    summary: "Use DeepSeek for cheap logic and boilerplate, then Cursor for multi-file implementation with full repo context.",
    meta: "Code · Cost-aware · 2 models",
    flow: [
      { model: "DeepSeek", action: "Reason through the approach" },
      { model: "Cursor", action: "Apply changes across the repo" },
    ],
    lessons: [
      { n: "01", title: "Route by difficulty", level: "Basics", dur: "4:15", desc: "Decide which parts of a task are grind work (DeepSeek) vs repo-aware (Cursor)." },
      { n: "02", title: "Generate boilerplate", level: "Basics", dur: "5:05", desc: "Ask DeepSeek for schemas, test cases, or utility functions before opening the editor." },
      { n: "03", title: "Wire it in with Cursor", level: "Practical", dur: "7:15", desc: "Paste DeepSeek's output into Cursor agent mode with @-references to integrate safely." },
      { n: "04", title: "Escalate when stuck", level: "Pro", dur: "4:50", desc: "Know when to swap Cursor's model to a frontier option for the hardest 10% of a task." },
    ],
    handoffPrompt:
      "DeepSeek generated this utility + tests:\n\n{paste code}\n\nIntegrate into @src/utils/.\nUpdate imports and run tests.\nShow diff before applying.",
    lessonNote: "DeepSeek for cheap logic.\nCursor for real repo context.",
  },

  "copilot-chatgpt": {
    from: "Copilot",
    to: "ChatGPT",
    why: "Office docs → polish",
    workflowTitle: "Office draft → polished send",
    summary: "Draft inside Word, Outlook, or Excel with Copilot, then refine tone and structure in ChatGPT.",
    meta: "Productivity · Microsoft 365 · 2 models",
    flow: [
      { model: "Copilot", action: "Draft inside Office apps" },
      { model: "ChatGPT", action: "Polish tone & structure" },
    ],
    lessons: [
      { n: "01", title: "Draft with Copilot in-place", level: "Basics", dur: "4:35", desc: "Use Copilot in Word or Outlook to get a first draft without leaving your document." },
      { n: "02", title: "Export the raw draft", level: "Basics", dur: "3:25", desc: "Copy the Copilot output with track-changes off — keep it messy, you'll polish next." },
      { n: "03", title: "Polish in ChatGPT", level: "Practical", dur: "5:10", desc: "Ask ChatGPT to tighten tone, fix structure, and match your voice guide." },
      { n: "04", title: "Final pass in Office", level: "Pro", dur: "4:00", desc: "Paste the polished version back and use Copilot for formatting or slide layout only." },
    ],
    handoffPrompt:
      "Rough draft from Copilot:\n\n{paste draft}\n\nPolish for {audience}.\nCut 20% length, remove filler, keep all factual claims intact.\nReturn ready to paste into Outlook.",
    lessonNote: "Copilot drafts in Office.\nChatGPT makes it sharp.",
  },

  "llama-deepseek": {
    from: "Llama",
    to: "DeepSeek",
    why: "Open stack pairing",
    workflowTitle: "Local Llama → cloud reasoning",
    summary: "Run Llama locally for private preprocessing, then escalate hard reasoning to DeepSeek when quality matters.",
    meta: "Open weights · Privacy · 2 models",
    flow: [
      { model: "Llama", action: "Preprocess & redact locally" },
      { model: "DeepSeek", action: "Reason on the sanitized task" },
    ],
    lessons: [
      { n: "01", title: "Define the privacy boundary", level: "Basics", dur: "4:50", desc: "Decide what stays on-device with Llama vs what can leave for DeepSeek." },
      { n: "02", title: "Redact with Llama", level: "Basics", dur: "5:20", desc: "Use local Llama to strip PII and summarize sensitive docs before any cloud call." },
      { n: "03", title: "Escalate hard steps", level: "Practical", dur: "6:10", desc: "Send only the sanitized problem statement to DeepSeek reasoning mode." },
      { n: "04", title: "Merge results locally", level: "Pro", dur: "4:35", desc: "Bring DeepSeek's output back into your local stack for final formatting and storage." },
    ],
    handoffPrompt:
      "Sanitized task (PII removed locally):\n\n{paste redacted summary}\n\nSolve with step-by-step reasoning.\nReturn structured JSON: { steps[], conclusion, confidence }.",
    lessonNote: "Llama keeps secrets local.\nDeepSeek handles the hard part.",
  },

  "chatgpt-claude": {
    from: "ChatGPT",
    to: "Claude",
    why: "Cross-check answers",
    bidirectional: true,
    workflowTitle: "Dual-model cross-check",
    summary: "Generate a first answer in ChatGPT, then stress-test it in Claude — swap order when you want a second opinion.",
    meta: "Quality · Verification · 2 models",
    flow: [
      { model: "ChatGPT", action: "Generate first answer" },
      { model: "Claude", action: "Cross-check & refine" },
    ],
    lessons: [
      { n: "01", title: "Set up the same prompt", level: "Basics", dur: "3:35", desc: "Write one neutral prompt and run it in ChatGPT first — save the full response." },
      { n: "02", title: "Ask Claude to critique", level: "Basics", dur: "4:55", desc: "Paste ChatGPT's answer into Claude and ask for errors, gaps, and stronger framing." },
      { n: "03", title: "Merge the best of both", level: "Practical", dur: "5:25", desc: "Combine the strongest sections from each model into a final version." },
      { n: "04", title: "Reverse the order", level: "Pro", dur: "4:10", desc: "Try Claude first on nuanced tasks, then ChatGPT for formatting — note when each wins." },
    ],
    handoffPrompt:
      "First answer from ChatGPT:\n\n{paste answer}\n\nCross-check this answer.\nList: factual errors, missing context, weak arguments.\nThen provide an improved version.",
    lessonNote: "Two models, one truth.\nDisagreement = dig deeper.",
  },
};
