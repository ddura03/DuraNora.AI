import { ECO_LINKS, ECO_MODELS } from "@/lib/ecosystem";
import { PAIRINGS_CATALOG } from "@/lib/pairings-catalog";
import type { EcoModel, PairingContent } from "@/lib/types";

export function modelSlug(name: string): string {
  return name.toLowerCase();
}

const MODEL_URLS: Record<string, string> = {
  ChatGPT: "https://chatgpt.com",
  Claude: "https://claude.ai",
  Gemini: "https://gemini.google.com",
  Perplexity: "https://www.perplexity.ai",
  Cursor: "https://cursor.com",
  Midjourney: "https://www.midjourney.com",
  Copilot: "https://copilot.microsoft.com",
  Llama: "https://llama.meta.com",
  DeepSeek: "https://chat.deepseek.com",
  Grok: "https://grok.com",
};

export function getModelUrl(name: string): string {
  return MODEL_URLS[name] ?? `https://${modelSlug(name)}.com`;
}

export function getEcoModel(nameOrSlug: string): EcoModel | undefined {
  const slug = nameOrSlug.toLowerCase();
  return ECO_MODELS.find((m) => modelSlug(m.name) === slug);
}

export function getEcoModelName(slug: string): string | undefined {
  return getEcoModel(slug)?.name;
}

export function getPartnersForModel(slug: string): string[] {
  const name = getEcoModelName(slug);
  if (!name) return [];
  return ECO_LINKS.filter((l) => l.a === name || l.b === name).map((l) => (l.a === name ? l.b : l.a));
}

export function getLinkBetween(aName: string, bName: string) {
  return ECO_LINKS.find((l) => (l.a === aName && l.b === bName) || (l.a === bName && l.b === aName));
}

export function pairingKey(from: string, to: string): string {
  return `${modelSlug(from)}-${modelSlug(to)}`;
}

export function getPairing(modelSlugA: string, modelSlugB: string): PairingContent | undefined {
  const nameA = getEcoModelName(modelSlugA);
  const nameB = getEcoModelName(modelSlugB);
  if (!nameA || !nameB) return undefined;

  const link = getLinkBetween(nameA, nameB);
  if (!link) return undefined;

  const key = pairingKey(link.a, link.b);
  return PAIRINGS_CATALOG[key];
}

export function countPairingsForModel(slug: string): number {
  return getPartnersForModel(slug).length;
}

export function allEcoSlugs(): string[] {
  return ECO_MODELS.map((m) => modelSlug(m.name));
}

export function allPairingRoutes(): { slug: string; partner: string }[] {
  const routes: { slug: string; partner: string }[] = [];
  for (const m of ECO_MODELS) {
    const slug = modelSlug(m.name);
    for (const partner of getPartnersForModel(slug)) {
      routes.push({ slug, partner: modelSlug(partner) });
    }
  }
  return routes;
}

export const ECO_BG = `
  radial-gradient(circle at 22% 35%, rgba(124,58,237,.15) 0, transparent 55%),
  radial-gradient(circle at 78% 75%, rgba(179,157,219,.33) 0, transparent 55%),
  radial-gradient(circle at 50% 110%, rgba(124,58,237,.10) 0, transparent 60%),
  repeating-linear-gradient(135deg, #ece6f7 0 18px, #e8e2f3 18px 36px)
`;

export const ECO_BG_OVERLAY = "repeating-linear-gradient(0deg, rgba(76,29,149,.025) 0 2px, transparent 2px 4px)";
