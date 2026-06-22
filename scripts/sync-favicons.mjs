import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stale = ["public/icon.svg", "public/apple-touch-icon.png", "public/icon.png", "public/apple-icon.png"];

for (const file of stale) {
  try {
    unlinkSync(join(root, file));
  } catch {
    /* already removed */
  }
}

const favicon32 = readFileSync(join(root, "public", "favicon-32.png"));
const ico = await toIco([favicon32]);
writeFileSync(join(root, "public", "favicon.ico"), ico);

console.log("Rebuilt public/favicon.ico and removed stale public icon files");
