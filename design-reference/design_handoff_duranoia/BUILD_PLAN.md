# DuraNoia.AI — Recommended Stack & Build Plan

## Recommended stack
- **Framework:** Next.js (App Router) + React + TypeScript. Your prototype components port over with minimal change; routes map 1:1 to the page table in `README.md`.
- **Styling:** Tailwind CSS (fastest path; encode the tokens in `README.md` as your theme) *or* CSS Modules / vanilla-extract if you prefer to paste the existing CSS. Keep the violet token set + Space Grotesk / JetBrains Mono.
- **DB + Auth + Storage:** Supabase (Postgres + Auth + file storage) — covers accounts, social login (Google/X, which the UI already mocks), the schema in `DATA_SCHEMA.md`, and cover-image/avatar uploads. (Firebase or a custom Postgres + Auth.js stack are fine alternatives.)
- **Video:** YouTube/Vimeo (unlisted) or Mux, embedded where the lesson player placeholders are.
- **Hosting:** Vercel — push to GitHub, auto-deploy, point `duranoia.ai` at it.

## Phased plan
**Phase 1 — Static site live.** Port all pages to Next.js with the data still as local TS modules (`AI_CATALOG`, `MODELS_CATALOG`, etc. become typed seed data). Deploy to Vercel on the real domain. No backend yet. Quick, real, shareable.

**Phase 2 — Auth + progress.** Add Supabase. Implement `users`, `models`, `lessons`, `lesson_progress`, `resume_state`. Wire real Sign in / Create account / Forgot password. The Learn AI home + lesson pages now read/write real progress (replace the `DStore` calls — they were written as a clean seam for exactly this).

**Phase 3 — Showcase backend.** Implement `projects`, `project_likes`, `project_comments`, cover-image upload. Submissions, likes, comments, hide/delete, and the public `/p/[id]` + `/u/[slug]` pages become real and shareable.

**Phase 4 — Content + news.** Fill in real lesson videos/copy (`lessons.video_url`), back the news feed with `news_items` (and optionally a CMS), wire the newsletter.

**Cross-cutting:** responsive/mobile pass (prototypes are desktop-first), SEO/meta + favicon, analytics, and brand-asset/trademark review for the third-party model logos and press photos.

## Porting notes
- The prototype attaches data + components to `window` because each page loads independent Babel scripts. In Next.js these become normal `import`s — drop the `window.X = X` / `Object.assign(window, …)` lines.
- `MarkGlyph` + `LOGO_SRC` → a small `<ModelLogo mark=… />` component.
- `duranoia-store.js` is the persistence seam: every `DStore.*` call becomes an API/Supabase call. Its method names already mirror the operations you need (completed/toggleLesson/resume/toggleLike/addComment/addSubmitted/setHidden/addDeleted).
- Navigation via `window.location.href = "X.html"` → `<Link href="/route">` / `router.push`.
- The neural-particle canvas is self-contained; keep it as a client component and gate on `prefers-reduced-motion`.
