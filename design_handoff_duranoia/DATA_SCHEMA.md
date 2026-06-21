# DuraNoia.AI — Production Data Schema

This maps the prototype's `localStorage` state (`duranoia-store.js`) and hardcoded data modules onto a real relational schema. Written DB-agnostic (works on Postgres / Supabase). Use UUIDs for PKs unless noted.

## users
The signed-in account.
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| email | text unique | login |
| password_hash | text | (or delegate to an auth provider) |
| name | text | display name, e.g. "Daniel Dura" |
| slug | text unique | for `/u/[slug]` public profile, e.g. `daniel-dura` |
| initials | text | derived from name (avatar fallback) |
| avatar_color | text | hex for the gradient avatar |
| avatar_url | text null | uploaded photo |
| role | text null | e.g. "Founder · DuraNoia" |
| headline | text null | one-line bio |
| location | text null | |
| linkedin | text null | |
| streak_days | int default 0 | |
| created_at | timestamptz | "joined" |

## models
The 10 AI models (seed/admin data — mirrors `AI_CATALOG` + `MODELS_CATALOG`).
| column | type | notes |
|---|---|---|
| slug | text pk | `chatgpt`, `claude`, … |
| name | text | "ChatGPT" |
| company | text | "OpenAI" |
| version | text | "GPT-5 · 2026" |
| mark | text | logo key, e.g. `@chatgpt` |
| tagline | text | |
| description | text | directory blurb |
| best_at | text | "General use" |
| category | text | Chat/Code/Image/Search/Foundation |
| modalities | text[] | ["Chat","Voice","Vision"] |
| skill_level | text | Beginner/Intermediate/Advanced |
| pricing | text | Free/Freemium/Paid |
| advertised_lessons | int | the "42 lessons" marketing count |
| logo_url | text | |

## lessons
Per-model lessons (mirrors `MODELS_CATALOG[slug].lessons`).
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| model_slug | text fk→models.slug | |
| idx | int | order within model (0-based; UI shows "NN") |
| number | text | "01" |
| title | text | |
| level | text | Basics/Practical/Pro |
| duration | text | "8:55" |
| description | text | |
| callout_label | text | |
| callout_text | text | |
| prompt | text | the "try it" prompt |
| note | text | hand-written note |
| video_url | text null | **to be filled — the real lessons** |
| unique(model_slug, idx) | | |

## lesson_progress
Replaces the store's `progress` map. One row per completed lesson.
| column | type | notes |
|---|---|---|
| user_id | uuid fk→users.id | |
| model_slug | text fk→models.slug | |
| lesson_idx | int | |
| completed_at | timestamptz | |
| pk(user_id, model_slug, lesson_idx) | | |

Derive `done/total` per model from counts. "Started" = any row for that model.

## resume_state
Replaces the store's `resume` (one row per user — the last lesson viewed).
| column | type | notes |
|---|---|---|
| user_id | uuid pk fk→users.id | |
| model_slug | text | |
| lesson_idx | int | |
| updated_at | timestamptz | |

(Or compute "continue learning" as the most recently `updated_at` in-progress model — then `resume_state` is optional.)

## projects
Showcase posts (mirrors `PROJECTS` + the store's `submitted`).
| column | type | notes |
|---|---|---|
| id | uuid pk | (prototype uses string ids like `loreatlas`, `u-<ts>`) |
| author_id | uuid fk→users.id | |
| title | text | |
| description | text | writeup |
| external_url | text | the attached live project link ("View project ↗") |
| model_mark | text | which model powered it, e.g. `@claude` |
| tags | text[] | |
| cover_kind | text | `gradient` or `image` |
| cover_value | text | gradient css OR uploaded image url |
| monogram | text | 2-letter fallback |
| featured | bool default false | editorial flag |
| hidden | bool default false | "Removed from public" (still in My Projects) |
| views | int default 0 | |
| created_at | timestamptz | |

`deleted` in the store → a real DELETE (or `deleted_at` soft-delete).

## project_likes
Replaces `likes` + `likedByMe`.
| column | type | notes |
|---|---|---|
| project_id | uuid fk→projects.id | |
| user_id | uuid fk→users.id | |
| created_at | timestamptz | |
| pk(project_id, user_id) | | |

Like count = `count(*)`. "Liked by me" = row exists for current user.

## project_comments
Replaces `comments`.
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| project_id | uuid fk→projects.id | |
| author_id | uuid fk→users.id | |
| text | text | |
| created_at | timestamptz | render "now"/"2h"/"1d" as relative time |

## user_models (optional)
"Mastered model" badges on the public profile — derive from `lesson_progress` (model fully complete) or store explicitly.

## news_items
Mirrors `news-data.jsx`.
| column | type | notes |
|---|---|---|
| id | uuid pk | |
| company | text | |
| model_mark | text null | for the badge/logo |
| category | text | Releases/Funding/Research/Policy |
| title | text | |
| excerpt | text | |
| image_url | text | |
| read_minutes | int | |
| featured | bool | |
| published_at | timestamptz | |

## newsletter_subscribers
| column | type |
|---|---|
| email | text unique |
| created_at | timestamptz |

## ecosystem_links (optional / admin)
The model→model hand-offs shown in the spider web + workflow recipes (mirrors `ECO_LINKS` / recipes in `ecosystem-data.jsx`). Can stay as static config.
| column | type | notes |
|---|---|---|
| from_slug | text | |
| to_slug | text | |
| why | text | "Research → synthesis" |

---

## API surface (suggested)
A thin REST/RPC layer that the front-end calls where it currently calls `DStore`:
- `GET /api/me` · `PATCH /api/me` (profile)
- `GET /api/models` · `GET /api/models/:slug` (incl. lessons + my progress)
- `POST /api/progress` `{model_slug, lesson_idx, completed}` · `GET /api/progress`
- `PUT /api/resume` · `GET /api/resume`
- `GET /api/showcase?search=&model=&sort=` · `POST /api/projects` · `PATCH /api/projects/:id` (hide) · `DELETE /api/projects/:id`
- `POST /api/projects/:id/like` (toggle) · `POST /api/projects/:id/comments`
- `GET /api/p/:id` (public project) · `GET /api/u/:slug` (public profile)
- `GET /api/news?category=` · `POST /api/newsletter`
- Auth: `POST /api/auth/signup` · `/signin` · `/forgot` (or use Supabase Auth / Auth.js).
