// Lesson content for every model pairing in the ecosystem.
// Keyed by "A|B" in the ECO_LINKS flow order (A hands off to B).
// The pairing lesson page reads ?a=<slug>&b=<slug> and looks up the match.

const PL_MARK = {
  ChatGPT:"@chatgpt", Claude:"@claude", Gemini:"@gemini", Perplexity:"@perplexity",
  Cursor:"@cursor", Midjourney:"@midjourney", Copilot:"@copilot", Llama:"@llama",
  DeepSeek:"@deepseek", Grok:"@grok",
};

// helper to build a lesson entry list quickly
const L = (n,t,who,dur,done) => ({ n, t, who, dur, done: !!done });

const PAIR_LESSONS = {
  "Perplexity|Claude": {
    title:"Research → synthesis: Perplexity + Claude",
    sub:"Turn a vague question into a cited, well-written brief by chaining live web research with careful synthesis.",
    level:"Workflow", dur:"7:24",
    steps:[
      { who:"Perplexity", t:"Gather cited facts", d:"Ask in Perplexity. Use Focus → Academic when sources matter. Keep the answer with its citations." },
      { who:"Claude", t:"Synthesize the draft", d:"Paste the cited findings into Claude. Ask it to structure, weigh sources, and write in your voice." },
    ],
    lessons:[ L("01","Why chain these two","both","1:40",1), L("02","Gathering cited facts in Perplexity","Perplexity","2:10",1), L("03","Handing off to Claude cleanly","Claude","2:05"), L("04","Synthesizing a sourced brief","Claude","1:29") ],
    prompt:"(In Claude, paste your Perplexity findings)\n\"Here are cited findings on {topic}.\nWrite a 1-page brief: structure it, weigh the\nsources, and flag anything to verify. Keep my voice.\"",
    note:"Perplexity finds & cites.\nClaude reasons & writes.\nDon't make one do both.",
  },
  "Perplexity|ChatGPT": {
    title:"Facts → first draft: Perplexity + ChatGPT",
    sub:"Pull live, sourced facts in Perplexity, then move fast to a usable first draft in ChatGPT.",
    level:"Workflow", dur:"6:10",
    steps:[
      { who:"Perplexity", t:"Collect the facts", d:"Get a cited answer to your question. Copy the key points and their sources." },
      { who:"ChatGPT", t:"Draft fast", d:"Drop the facts into ChatGPT and have it expand them into a structured first draft." },
    ],
    lessons:[ L("01","When to research first","both","1:30",1), L("02","Sourced answers in Perplexity","Perplexity","1:55"), L("03","Turning facts into a draft","ChatGPT","1:45"), L("04","Tightening the draft","ChatGPT","1:00") ],
    prompt:"(In ChatGPT, paste your Perplexity facts)\n\"Expand these cited facts into a clear first draft\nabout {topic}. Keep the structure logical and\nmark anything that still needs a source.\"",
    note:"Perplexity = the facts.\nChatGPT = the speed.\nVerify before you publish.",
  },
  "Claude|Cursor": {
    title:"Plan → implement: Claude + Cursor",
    sub:"Think through the architecture in Claude, then implement and review it across files in Cursor.",
    level:"Workflow", dur:"8:05",
    steps:[
      { who:"Claude", t:"Spec & plan", d:"Use Claude to break the work into a clear plan: files to touch, edge cases, the approach." },
      { who:"Cursor", t:"Implement in the editor", d:"Hand the plan to Cursor's agent to edit across files — then review the diff." },
    ],
    lessons:[ L("01","Plan before you code","both","1:50",1), L("02","Writing a spec in Claude","Claude","2:20"), L("03","Driving Cursor's agent","Cursor","2:25"), L("04","Reviewing the diff","Cursor","1:30") ],
    prompt:"(In Claude)\n\"Break this feature into an implementation plan:\nfiles to change, function signatures, edge cases,\nand a test plan. Don't write the code yet.\"",
    note:"Plan & review in Claude.\nImplement in Cursor.\nAlways read the diff.",
  },
  "ChatGPT|Midjourney": {
    title:"Brief → visual: ChatGPT + Midjourney",
    sub:"Expand a one-line brief into rich image prompts in ChatGPT, then generate the visuals in Midjourney.",
    level:"Workflow", dur:"6:40",
    steps:[
      { who:"ChatGPT", t:"Write the prompts", d:"Turn your brief into 3-5 detailed Midjourney prompts — subject, style, lighting, aspect ratio." },
      { who:"Midjourney", t:"Generate & iterate", d:"Run the prompts, then Vary/Remix the strongest result instead of re-rolling." },
    ],
    lessons:[ L("01","From brief to prompt","both","1:35",1), L("02","Prompt-writing in ChatGPT","ChatGPT","2:00"), L("03","Generating in Midjourney","Midjourney","1:55"), L("04","Iterating on a result","Midjourney","1:10") ],
    prompt:"(In ChatGPT)\n\"Give me 5 Midjourney prompts for {brief}.\nVary style and mood. Each: subject, style,\nlighting, composition, and --ar 16:9.\"",
    note:"ChatGPT writes prompts.\nMidjourney renders them.\nVary > re-roll once close.",
  },
  "Claude|Midjourney": {
    title:"Concept → art direction: Claude + Midjourney",
    sub:"Develop a considered creative concept and mood language in Claude, then art-direct it in Midjourney.",
    level:"Workflow", dur:"6:20",
    steps:[
      { who:"Claude", t:"Shape the concept", d:"Use Claude to define the mood, palette, and art direction in precise, promptable language." },
      { who:"Midjourney", t:"Direct the visuals", d:"Translate that direction into prompts and reference-guided generations." },
    ],
    lessons:[ L("01","Concept before image","both","1:40",1), L("02","Art direction in Claude","Claude","2:10"), L("03","Promptable mood language","Claude","1:30"), L("04","Generating on-brief","Midjourney","1:20") ],
    prompt:"(In Claude)\n\"Define an art direction for {project}:\nmood, palette, lighting, references. Then write\n3 Midjourney prompts that express it.\"",
    note:"Claude sets the direction.\nMidjourney executes it.\nConsistency beats randomness.",
  },
  "Gemini|ChatGPT": {
    title:"Workspace data → draft: Gemini + ChatGPT",
    sub:"Summarize your real Docs, Sheets, and email in Gemini, then polish the output in ChatGPT.",
    level:"Workflow", dur:"5:50",
    steps:[
      { who:"Gemini", t:"Pull from Workspace", d:"Let Gemini summarize the real documents and threads it already has access to." },
      { who:"ChatGPT", t:"Polish & restructure", d:"Refine the summary into the final format and tone in ChatGPT." },
    ],
    lessons:[ L("01","Why start in Gemini","both","1:25",1), L("02","Summarizing Workspace data","Gemini","2:05"), L("03","Polishing in ChatGPT","ChatGPT","1:30"), L("04","Final formatting","ChatGPT","0:50") ],
    prompt:"(In ChatGPT, paste Gemini's summary)\n\"Rewrite this summary as a {email/brief/post}.\nTighten it, fix the structure, and match a\nplain, professional tone.\"",
    note:"Gemini reaches your data.\nChatGPT refines the words.",
  },
  "Grok|Perplexity": {
    title:"Live signal → verify: Grok + Perplexity",
    sub:"Catch the real-time conversation on X with Grok, then verify the claims with cited sources in Perplexity.",
    level:"Workflow", dur:"5:30",
    steps:[
      { who:"Grok", t:"Read the room", d:"Use Grok to see what's trending and what people are saying right now." },
      { who:"Perplexity", t:"Fact-check it", d:"Take the top claims to Perplexity and confirm them against real sources." },
    ],
    lessons:[ L("01","Signal vs. truth","both","1:30",1), L("02","Real-time pulse in Grok","Grok","1:50"), L("03","Verifying claims in Perplexity","Perplexity","1:40"), L("04","Separating noise from fact","both","0:30") ],
    prompt:"(In Perplexity)\n\"Fact-check these claims trending about {topic}.\nFor each, give the verdict and cite a\nprimary source.\"",
    note:"Grok for the vibe.\nPerplexity for the facts.\nConfident ≠ correct.",
  },
  "DeepSeek|Cursor": {
    title:"Cheap reasoning → build: DeepSeek + Cursor",
    sub:"Use DeepSeek's low-cost reasoning to plan and grind through code, wired into Cursor for repo context.",
    level:"Workflow", dur:"6:00",
    steps:[
      { who:"DeepSeek", t:"Reason cheaply", d:"Let DeepSeek handle the routine reasoning and code generation at low cost." },
      { who:"Cursor", t:"Build with context", d:"Run it inside Cursor so it sees your repo and edits the real files." },
    ],
    lessons:[ L("01","Why a cheap model","both","1:30",1), L("02","Reasoning with DeepSeek","DeepSeek","2:00"), L("03","Wiring it into Cursor","Cursor","1:50"), L("04","Cost-aware routing","both","0:40") ],
    prompt:"(In Cursor, model = DeepSeek)\n\"Implement {task} across the relevant files.\nKeep it simple, add a test, and explain any\ntradeoffs you made.\"",
    note:"DeepSeek for cheap grind.\nCursor for repo context.\nEscalate only the hard parts.",
  },
  "Copilot|ChatGPT": {
    title:"Office docs → polish: Copilot + ChatGPT",
    sub:"Draft and summarize inside Microsoft 365 with Copilot, then polish the result in ChatGPT.",
    level:"Workflow", dur:"5:20",
    steps:[
      { who:"Copilot", t:"Work in Office", d:"Let Copilot draft, summarize, or analyze right inside Word, Excel, or Outlook." },
      { who:"ChatGPT", t:"Refine the output", d:"Bring the draft into ChatGPT for sharper tone, structure, or rewriting." },
    ],
    lessons:[ L("01","Where Copilot wins","both","1:20",1), L("02","Drafting in Office","Copilot","1:55"), L("03","Polishing in ChatGPT","ChatGPT","1:25"), L("04","Round-tripping safely","both","0:40") ],
    prompt:"(In ChatGPT, paste Copilot's draft)\n\"Refine this {document}: tighten the language,\nfix the structure, and make the tone confident\nbut plain.\"",
    note:"Copilot lives in Office.\nChatGPT sharpens the words.",
  },
  "Llama|DeepSeek": {
    title:"Own your stack: Llama + DeepSeek",
    sub:"Pair two open-weight models you can self-host — Llama for general tasks, DeepSeek for cheap reasoning.",
    level:"Workflow", dur:"6:30",
    steps:[
      { who:"Llama", t:"Run it locally", d:"Use Llama on your own hardware for private, offline general-purpose work." },
      { who:"DeepSeek", t:"Add cheap reasoning", d:"Bring in DeepSeek for stronger reasoning or code, still self-hosted." },
    ],
    lessons:[ L("01","Why go open","both","1:40",1), L("02","Running Llama locally","Llama","2:10"), L("03","Adding DeepSeek","DeepSeek","1:50"), L("04","A private two-model stack","both","0:50") ],
    prompt:"(Local stack)\n\"Route this request: simple chat → Llama,\nhard reasoning/code → DeepSeek. Explain which\nyou'd pick for {task} and why.\"",
    note:"Both open, both private.\nLlama generalizes.\nDeepSeek reasons.",
  },
  "ChatGPT|Claude": {
    title:"Cross-check answers: ChatGPT + Claude",
    sub:"Use two strong models to pressure-test each other — draft in one, critique in the other.",
    level:"Workflow", dur:"5:15",
    steps:[
      { who:"ChatGPT", t:"Draft an answer", d:"Get a fast, complete first answer or solution from ChatGPT." },
      { who:"Claude", t:"Critique & refine", d:"Ask Claude to find flaws, edge cases, and a more careful version." },
    ],
    lessons:[ L("01","Two heads are better","both","1:20",1), L("02","Fast draft in ChatGPT","ChatGPT","1:35"), L("03","Critique in Claude","Claude","1:40"), L("04","Reconciling the two","both","0:40") ],
    prompt:"(In Claude, paste ChatGPT's answer)\n\"Critique this answer about {topic}. Where is it\nwrong, shallow, or missing an edge case? Then\ngive a more careful version.\"",
    note:"Draft in one.\nCritique in the other.\nDisagreement is signal.",
  },
};

// Look up a pairing in either order; returns { key, data, flipped }
function findPairLessons(a, b) {
  const names = Object.keys(PL_MARK);
  const A = names.find(n => n.toLowerCase() === (a||"").toLowerCase());
  const B = names.find(n => n.toLowerCase() === (b||"").toLowerCase());
  if (!A || !B) return null;
  if (PAIR_LESSONS[`${A}|${B}`]) return { data: PAIR_LESSONS[`${A}|${B}`], flipped:false };
  if (PAIR_LESSONS[`${B}|${A}`]) return { data: PAIR_LESSONS[`${B}|${A}`], flipped:true };
  return null;
}

Object.assign(window, { PAIR_LESSONS, PL_MARK, findPairLessons });
