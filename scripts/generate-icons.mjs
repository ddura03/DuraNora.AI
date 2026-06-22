import { readFileSync, copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "duranoia-icon.svg");
const svg = readFileSync(svgPath);

mkdirSync(join(root, "public"), { recursive: true });
mkdirSync(join(root, "app"), { recursive: true });

copyFileSync(svgPath, join(root, "public", "icon.svg"));
copyFileSync(svgPath, join(root, "app", "icon.svg"));

const applePng = await sharp(svg).resize(180, 180).png().toBuffer();
await sharp(applePng).toFile(join(root, "public", "apple-touch-icon.png"));

const favicon32 = await sharp(svg).resize(32, 32).png().toBuffer();
const favicon16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico = await toIco([favicon16, favicon32]);
writeFileSync(join(root, "public", "favicon.ico"), ico);

console.log("Generated icon.svg, apple-touch-icon.png, favicon.ico");
