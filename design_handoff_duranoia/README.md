# Handoff: DuraNoia.AI — AI Education Platform

## Overview
DuraNoia.AI is an AI-education platform. Users learn the popular AI models (ChatGPT, Claude, Gemini, etc.) through hands-on video lessons, learn how the models intersect ("AI Ecosystem"), follow AI news, and showcase the projects they build with AI (a social, Instagram-meets-Handshake feed). The product has a marketing front, an auth flow, a signed-in learning home (dashboard), per-model lesson pages, and a social showcase with public shareable pages.

The brand idea is a play on **paranoia → DuraNoia**: *"The AI knows you. Now know it back."* Watchful, intelligent, a little mysterious — rendered in a calm violet palette on light lavender (never a black background).

## About the Design Files
The files in this bundle are **design references created in HTML/CSS + in-browser React (Babel)**. They are high-fidelity, interactive prototypes that show the intended look and behavior — **not production code to ship directly**. In-browser Babel transpilation and `localStorage` persistence are prototype conveniences.

**Your task:** recreate these designs in a real, deployable stack (recommended: **Next.js + React**, see `BUILD_PLAN.md`), using a real database + auth in place of the `localStorage` layer. Follow the established visual system documented below; the prototypes are the source of truth for look, copy, and interaction.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, hover states, and interactions are all specified. Recreate the UI faithfully. The only intentionally "placeholder" elements are: lesson **video players** (styled boxes, no real video yet) and showcase **cover art** (brand gradients + monograms instead of uploaded images).

---

## Architecture (prototype)
- Each page is a standalone `*.html` file that loads React 18 + Babel from CDN, then a set of `*.jsx` component files via `<script type="text/babel">`.
- Shared data lives in plain data modules attached to `window` (e.g. `learn-ai-data.jsx` → `AI_CATALOG`, `models-catalog.jsx` → `MODELS_CATALOG`).
- A plain-JS persistence layer, **`duranoia-store.js`** (`window.DStore`), reads/writes `localStorage` under the `duranoia:` namespace. **In production this entire layer becomes API calls to your backend** (see `DATA_SCHEMA.md`).
- Navigation is plain `window.location.href` between `*.html` files. In production these become real routes.

### Page → route map
| Prototype file | Route | Auth |
|---|---|---|
| `DuraNoia Wireframes.html` | `/` (marketing home) | public |
| `Learn AI Page Wireframes.html` | `/learn` (signed-in home / dashboard) | auth |
| `Model Page Wireframes.html?model=<slug>` | `/learn/[model]` (lessons) | auth |
| `AI Ecosystem Page Wireframes.html` | `/ecosystem` | public |
| `News Page Wireframes.html` | `/news` | public |
| `About Page Wireframes.html` | `/about` | public |
| `AI Showcase Page Wireframes.html` | `/showcase` | auth |
| `Public Project Page Wireframes.html?id=<id>` | `/p/[id]` (shareable project) | public |
| `Public Profile Page Wireframes.html?user=<slug>` | `/u/[slug]` (shareable profile) | public |
| `Profile Settings Page Wireframes.html` | `/settings` | auth |
| `Sign In Page Wireframes.html` | `/signin` | public |
| `Create Account Page Wireframes.html` | `/signup` | public |
| `Forgot Password Page Wireframes.html` | `/forgot` | public |

> **Note:** Learn AI and the Dashboard are intentionally **one page** — the signed-in home. There is no separate "Dashboard" nav item.

### Global navigation order (every header)
`Learn AI · AI Ecosystem · Dashboard… ` → actual order is **Learn AI · AI Ecosystem · AI Showcase · News · About**. Marketing headers show **Sign in** (ghost) + **Get started** (solid) pills on the right; signed-in headers (`AppBar`) show a **search box + circular avatar** instead.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| Deep Violet | `#7c3aed` | primary — buttons, links, active states, logo "Noia" |
| Soft Violet | `#b39ddb` | secondary — rings, dots, gradient stops |
| Dark Violet | `#4c1d95` | deepest — headings, dark accents, hover-darken |
| Ink | `#1a1325` | primary text, logo "Dura" |
| Ink-2 | `#5a4e75` | secondary text |
| Muted | `#9087a8` | tertiary text, labels |
| Line | `#d9cff0` | borders, dividers |
| Paper | `#f6f3fb` | page background (light lavender) |
| Paper-2 | `#ece6f7` | raised surfaces, hero stripes |
| OK / success | `#1f8a5b` | completed states |
| Warn (streak) | `#d9711f` | streak flame, highlights |

**Signature background** (heroes, auth, ecosystem, about): diagonal stripe + violet glow:
```css
background:
  radial-gradient(circle at 22% 28%, rgba(124,58,237,.16) 0, transparent 55%),
  radial-gradient(circle at 82% 78%, rgba(179,157,219,.40) 0, transparent 55%),
  repeating-linear-gradient(135deg, #ece6f7 0 18px, #e3daf2 18px 36px);
```
Plus an optional `repeating-linear-gradient(0deg, rgba(76,29,149,.03) 0 2px, transparent 2px 4px)` scanline overlay. The home + Learn AI heroes add an **animated neural-particle canvas** (see Interactions).

### Typography
- **Sans (display + UI):** "Space Grotesk", system-ui, sans-serif — weights 400/500/600/700/800.
- **Mono (labels, meta, code, nav tags):** "JetBrains Mono", monospace.
- **Hand (annotations only):** "Caveat", cursive — used sparingly for sketch-note callouts.
- Headlines: 800 weight, letter-spacing −0.02em to −0.028em. Hero H1 ~54–70px. Section H2 ~22–30px. Body 14–16px. Mono labels 10–13.5px, letter-spacing .08–.18em, often UPPERCASE.
- Nav links: Space Grotesk, 13.5px, 600, 38px gap between items, with a violet underline that animates left→right on hover (`transform: scaleX(0)→1`, `transform-origin:left`, 0.28s).

### Spacing / radius / shadow
- Card radius: 12–18px. Pills/buttons: 999px or 10–12px. Glyph tiles: 6–14px.
- Card border: `1.5px solid var(--line)`; hover → border `#7c3aed` + `transform: translateY(-4px)` + `box-shadow: 0 14px 30px rgba(124,58,237,.16)`.
- Primary button: `linear-gradient(180deg,#8b4bf0,#7c3aed)`, white text, radius 11–12px, `box-shadow:0 8–10px 20–24px rgba(124,58,237,.28)`; hover → `translateY(-2px)` + bigger shadow + arrow nudges right 4px.
- Section side padding: `max(40–60px, 4–6vw)`.

---

## Screens / Views
Each page is documented in detail in the prototype files; below is the essential spec. (Open the corresponding HTML to see exact layout.)

### 1. Marketing Home (`/`)
- **Full-viewport hero** (nav + hero = 100vh) with the animated neural-particle background. Left: a glass **"SELECT A MODEL"** picker card (10 AI buttons, 2-up grid, each with the real brand logo + name + maker). Right: stacked headline "**The AI knows you. / Now know it back.**" + subhead "Hands-on lessons for the models shaping how we work. ← Pick one to begin." The picker card and headline are constrained to a centered max-width so they don't drift apart on wide screens.
- **Features section:** two cards — **Learn AI** (zero → prompt-fluent) and **AI Ecosystem** (chain models together), each with a bespoke SVG illustration; hover lifts the card + scales the art.
- **Section divider:** a violet gradient rule with a small constellation motif.
- **Newswire section:** filter pills (All / Releases / Funding / Research / Policy) that actually filter, over a grid of 8 story cards (company logo, category, date, headline, excerpt, "Read →" with animated arrow, read-time). Press-kit photos as story images.
- **Footer:** tagline "The AI knows you. / Now know it back.", three link columns (Learn / Ecosystem / Company) with the same underline-hover animation, logo + "DuraNoia" wordmark, a "Join" button with hover animation.

### 2. Learn AI = Signed-in Home (`/learn`)
- `AppBar` (logo + wordmark + "AI EDUCATION PLATFORM" tag, nav, **working search** with live model results dropdown, **avatar dropdown** → Edit profile / Link LinkedIn / My progress / Settings / Sign out, plus an Edit-Profile modal).
- **"Welcome back, {name}"** + streak line.
- **Continue learning** panel — the resume card: model logo, "Lesson NN · level · duration", lesson title, progress bar `done/total`, **Resume lesson** button. *Reads real progress from the store.*
- **Your models** — grid of started models with progress bars / "✓ Completed".
- **Browse all models** — category chips (All / Chat / Code / Image / Search / Foundation) filtering a 4-up grid of all 10 models (logo, name, maker, description, progress or "Start →").

### 3. Model Lesson Page (`/learn/[model]`)
- Reads `?model=<slug>`; data from `MODELS_CATALOG[slug]` (name, maker, version, tagline, lessons[], compare[]).
- Compact model header (logo, name, maker·version, tagline).
- **Three-pane workspace** (260px / 1fr / 340px), full-height:
  - **Left — lesson list:** each row has a circular complete-toggle (✓), "NN. Title", "level · duration". Active row highlighted with a left violet bar. Header shows `done / total`.
  - **Center — lesson content:** video player placeholder ("▶ NOW PLAYING · 0:00 / dur"), lesson description (H2), and an in-content **callout** box (label + text).
  - **Right — "TRY IT YOURSELF":** the lesson **prompt** in a code block, a "Try in {model} →" button, a hand-written **lesson note**, and a **Mark complete & next** button. When complete it becomes a "Lesson complete" pill that, on hover, rotates its check to a ↺ and reads "Mark incomplete" (click to undo).
- **Persistence:** completing/uncompleting writes to the store per model; the active lesson is saved as the global "resume". Lesson page opens at the first incomplete lesson.

### 4. AI Ecosystem (`/ecosystem`)
- Hero mirrors the home layout: signature striped background, an interactive **spider-web** of model nodes on the left (hover a node → its hand-off links light up, dashed connectors), headline + hover-info panel on the right ("Choose a model you already use, and see how it pairs with others…").
- Below: **Workflow Recipes** — example multi-model chains (e.g. Perplexity → ChatGPT → Claude) with labeled dotted connectors.

### 5. News (`/news`)
- Hero with a pulsing "live" dot + "What the labs shipped today."
- Featured story card, filter chips (All / Releases / Funding / Research / Policy) that filter a 3-column card grid, and a "One short brief, every Friday" newsletter subscribe strip. Story images are press-kit photos / company art.

### 6. About (`/about`)
- Signature striped hero. "About DuraNoia" intro. A **"Why DuraNoia?"** lavender feature panel (Dura = black, Noia = violet, explains the paranoia play). **Founder** section with headshot, name **Daniel Dura**, role, and socials (LinkedIn → `linkedin.com/in/daniel-dura03`, X, YouTube).

### 7. AI Showcase (`/showcase`)
- Tabs: **AI Showcase** / **My Projects**.
- Showcase tab: **Submit your project** button, a **search** ("Search for a project name…"), a **model filter** dropdown, and a **sort** dropdown (Trending / Newest / Most liked / Featured) — all functional. Grid of project cards: gradient cover + monogram, views, model badge, "Featured"/"Private" badges, title, author.
- **Project modal:** cover, title, author, description, tags, **like** (heart, toggles + counts), **comments** (list + composer), **"View project ↗"** (opens the author's real hosted URL in a new tab — projects are *attached* external links, DuraNoia does not host the code), and a "View full page" link to the public page. Owners see a **Manage your post** block: **Remove from public** (keeps it in My Projects, hides from showcase) and **Delete project** (two-step confirm, removes entirely).
- **My Projects tab:** the signed-in user's own posts (incl. private ones), or an empty state.
- **Submit modal:** project link (required), title (required), model used, writeup, tags, cover (image upload → data URL, or a brand gradient). Publishing prepends the card and switches to the showcase.
- **Persistence:** likes, comments, submissions, hide/unhide, and delete all persist.

### 8. Public Project Page (`/p/[id]`)
- Public, shareable, read-only. Cover, title, clickable author (→ profile), stat row (Views / Likes / Comments), description, tags, **"View project ↗"** external link, read-only comments, and a "More from {author}" row. Likes/comments reflect stored state.

### 9. Public Profile Page (`/u/[slug]`)
- Public, shareable. Avatar, name, role, headline, location, join date, LinkedIn link, **mastered-model badges**, stats, and a grid of the user's public projects.

### 10–13. Auth + Settings
- **Sign In / Create Account / Forgot Password:** the glassmorphic card over the animated neural background; brand top-left. Create Account has a live **password-strength meter** and a terms checkbox that gates the submit button. Forgot Password has a two-step request → "Check your inbox" success state. Cross-links between all three. Submitting Sign in / Create account routes to `/learn`.
- **Profile & Settings:** deeper profile editing (avatar, display name, headline, email, LinkedIn, location), mastered models, etc.

---

## Interactions & Behavior
- **Neural-particle background** (home + Learn AI heroes): a `<canvas>` animation of ~300 violet particles that drift, connect to nearby neighbors with faint lines, periodically **gather into a shape → hold → explode → wander → reform into the next shape**, cycling through 5 shapes (orbital, eye, "D", sparkle, speech-bubble). `prefers-reduced-motion` and print should show a static end-state. Implementation reference: `LearnNeuralBg` / `NeuralBackground`.
- **Nav link hover:** violet underline animates left→right (scaleX 0→1, 0.28s `cubic-bezier(.65,.05,.36,1)`).
- **Card hover:** `translateY(-4px)`, border → deep violet, soft violet drop shadow; feature cards also scale their inner art 1.5%.
- **Buttons/pills hover:** lift 1–2px, darken to `#4c1d95`, arrow glyphs nudge right.
- **Filter pills / chips:** selected = solid violet + lift + shadow; click transitions all properties ~250ms; they actually filter their grid.
- **Lesson complete toggle:** see Model page; hover-to-undo with a rotating ✓→↺.
- **Search (AppBar):** typing filters the model catalog by name/maker/specialty into a results dropdown; click navigates to that model; closes on outside click.
- **Avatar dropdown + Edit-Profile modal:** open on click, close on outside click; modal saves and shows a "Profile saved" toast.

## State Management (prototype → production)
Replace the `localStorage` store with backend-backed state. The store currently tracks:
- **Lesson progress:** `{ [modelSlug]: number[] }` (completed lesson indices).
- **Resume:** `{ slug, model, mark, lessonIdx, lessonNo, lessonTitle, level, dur }` (last lesson viewed).
- **Showcase:** `{ likedByMe: id[], likes: {id:count}, comments: {id:Comment[]}, hidden: id[], deleted: id[], submitted: Project[] }`.
See `DATA_SCHEMA.md` for the production data model and `duranoia-store.js` for the exact current API surface (a clean seam to swap for fetch calls).

## Assets
- **Logo:** `duranoia-icon.svg` (orbital/eye mark). Wordmark is type: "Dura" in ink + "Noia" in deep violet. (Several alternative logo concept boards also exist in the project — `DuraNoia Logo Concepts*.html`, `DuraNoia Raven Logos.html`, `DuraNoia DN Monograms.html` — these are exploration, not final.)
- **Model brand logos:** `logos/chatgpt.png`, `logos/claude.svg`, `logos/gemini.*`, `logos/copilot.*`, `logos/cursor.*`, `logos/midjourney.*`, `logos/perplexity.*`, `logos/llama.*`, `logos/deepseek.*`, `logos/grok.*` — third-party trademarks, used to identify each model. Resolved through a `LOGO_SRC` map + `MarkGlyph` component (logo if known, else a letter glyph). **Verify each company's brand-usage guidelines before production.**
- **News images:** `logos/news-*.png` — press-kit / company photos per story. **Confirm licensing before production.**
- **Founder headshot:** in the About page (user-provided).
- **Fonts:** Google Fonts — Space Grotesk, JetBrains Mono, Caveat.

## Files
Key prototype files (all at project root):
- **Pages:** the `*.html` files listed in the route map above.
- **Data:** `learn-ai-data.jsx` (`AI_CATALOG` — the 10-model directory), `models-catalog.jsx` (`MODELS_CATALOG` — per-model lessons, prompts, notes), `dashboard-data.jsx` (user, progress helpers, `AppBar`), `showcase-data.jsx` (`PROJECTS`, `USERS`), `news-data.jsx`, `ecosystem-data.jsx`, `ai-data.jsx`.
- **Components:** `wireframe-v2.jsx` + `shared-parts.jsx` (home), `learn-ai-home.jsx`, `model-page-v3.jsx`, `ecosystem-v1.jsx`, `news-page.jsx`, `about-page.jsx`, `showcase-page.jsx`, `public-project.jsx`, `public-profile.jsx`, `public-bar.jsx`, `settings-page.jsx`, `signin-page.jsx`, `register-page.jsx`, `forgot-page.jsx`.
- **Persistence:** `duranoia-store.js` (the localStorage layer — the seam to replace with your API).
- **Shared CSS:** `public-pages.css`.

See `BUILD_PLAN.md` for the recommended stack and phased implementation plan, and `DATA_SCHEMA.md` for the database design.
