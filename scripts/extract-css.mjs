import fs from "fs";
import path from "path";

const root = path.resolve(".");
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
const outDir = path.join(root, "styles");
fs.mkdirSync(outDir, { recursive: true });

const chunks = [`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');\n`];

if (fs.existsSync(path.join(root, "public-pages.css"))) {
  chunks.push(fs.readFileSync(path.join(root, "public-pages.css"), "utf8"));
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(root, file), "utf8");
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (m) {
    chunks.push(`/* --- ${file} --- */\n${m[1]}\n`);
  }
}

const globals = `@import "tailwindcss";\n\n${chunks.join("\n")}\n`;
fs.writeFileSync(path.join(root, "app", "globals.css"), globals);
console.log("Wrote app/globals.css from", htmlFiles.length, "HTML files");
