import fs from "fs";
import path from "path";

const root = path.resolve(".");
const lib = path.join(root, "lib");
fs.mkdirSync(lib, { recursive: true });

function stripTail(code) {
  return code
    .replace(/Object\.assign\(window,[^)]+\);?\n?/g, "")
    .replace(/window\.\w+\s*=\s*\w+;?\n?/g, "")
    .replace(/^const LOGO_SRC[\s\S]*?;\n/m, "")
    .replace(/^function MarkGlyph[\s\S]*?^}/m, "")
    .replace(/ReactDOM\.createRoot[\s\S]*$/m, "");
}

// models-catalog
{
  let c = fs.readFileSync(path.join(root, "models-catalog.jsx"), "utf8");
  const start = c.indexOf("const MODELS_CATALOG");
  const end = c.indexOf("Object.assign(window");
  let body = c.slice(start + "const MODELS_CATALOG".length, end).trim();
  if (body.startsWith("=")) body = body.slice(1).trim();
  const out =
    'import type { ModelCatalogEntry } from "./types";\n\n' +
    `export const MODELS_CATALOG: Record<string, ModelCatalogEntry> = ${body}\n`;
  fs.writeFileSync(path.join(lib, "models-catalog.ts"), out);
  console.log("Wrote lib/models-catalog.ts");
}

// showcase-data
{
  let c = stripTail(fs.readFileSync(path.join(root, "showcase-data.jsx"), "utf8"));
  c =
    'import type { ShowcaseProject } from "./types";\n\n' +
    c +
    "\nexport { PROJECTS, USERS, GRAD, profileProjects, slugify };\n" +
    'export const ME = { name: "Daniel Dura", initials: "DD", color: "#7c3aed", role: "Founder · DuraNoia" };\n';
  fs.writeFileSync(path.join(lib, "showcase.ts"), c);
  console.log("Wrote lib/showcase.ts");
}
