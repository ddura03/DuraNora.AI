import type { ModelMark } from "./types";

export const LOGO_SRC: Record<ModelMark, string> = {
  "@chatgpt": "/logos/chatgpt.png",
  "@claude": "/logos/claude.svg",
  "@gemini": "/logos/gemini.webp",
  "@copilot": "/logos/copilot.png",
  "@cursor": "/logos/cursor.png",
  "@midjourney": "/logos/midjourney.png",
  "@perplexity": "/logos/perplexity.png",
  "@llama": "/logos/llama.png",
  "@deepseek": "/logos/deepseek.png",
  "@grok": "/logos/grok.webp",
};

export function modelSlug(name: string): string {
  return name.toLowerCase();
}
