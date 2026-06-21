-- DuraNoia.AI — Row Level Security policies

-- ---------------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.models enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.resume_state enable row level security;
alter table public.projects enable row level security;
alter table public.project_likes enable row level security;
alter table public.project_comments enable row level security;
alter table public.news_items enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- ---------------------------------------------------------------------------
-- users
-- ---------------------------------------------------------------------------
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Inserts only via handle_new_user() trigger (security definer)

-- ---------------------------------------------------------------------------
-- models & lessons — public read; writes via service role (seed/admin)
-- ---------------------------------------------------------------------------
create policy "Models are viewable by everyone"
  on public.models for select
  using (true);

create policy "Lessons are viewable by everyone"
  on public.lessons for select
  using (true);

-- ---------------------------------------------------------------------------
-- lesson_progress — own rows only
-- ---------------------------------------------------------------------------
create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own lesson progress"
  on public.lesson_progress for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- resume_state — own row only
-- ---------------------------------------------------------------------------
create policy "Users can view own resume state"
  on public.resume_state for select
  using (auth.uid() = user_id);

create policy "Users can insert own resume state"
  on public.resume_state for insert
  with check (auth.uid() = user_id);

create policy "Users can update own resume state"
  on public.resume_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own resume state"
  on public.resume_state for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- projects — public non-hidden; authors manage own
-- ---------------------------------------------------------------------------
create policy "Public projects are viewable"
  on public.projects for select
  using (
    deleted_at is null
    and (hidden = false or author_id = auth.uid())
  );

create policy "Authors can insert own projects"
  on public.projects for insert
  with check (auth.uid() = author_id);

create policy "Authors can update own projects"
  on public.projects for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Authors can delete own projects"
  on public.projects for delete
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- project_likes — read all; write own
-- ---------------------------------------------------------------------------
create policy "Project likes are viewable by everyone"
  on public.project_likes for select
  using (true);

create policy "Users can like projects"
  on public.project_likes for insert
  with check (auth.uid() = user_id);

create policy "Users can unlike projects"
  on public.project_likes for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- project_comments — read all; write own
-- ---------------------------------------------------------------------------
create policy "Project comments are viewable by everyone"
  on public.project_comments for select
  using (true);

create policy "Users can add comments"
  on public.project_comments for insert
  with check (auth.uid() = author_id);

create policy "Users can update own comments"
  on public.project_comments for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

create policy "Users can delete own comments"
  on public.project_comments for delete
  using (auth.uid() = author_id);

-- ---------------------------------------------------------------------------
-- news_items — public read
-- ---------------------------------------------------------------------------
create policy "News items are viewable by everyone"
  on public.news_items for select
  using (true);

-- ---------------------------------------------------------------------------
-- newsletter_subscribers — anyone can subscribe; no public read
-- ---------------------------------------------------------------------------
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers for insert
  with check (true);

-- ---------------------------------------------------------------------------
-- Grants (RLS still applies)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;
grant select on public.users to anon, authenticated;
grant select on public.models to anon, authenticated;
grant select on public.lessons to anon, authenticated;
grant select on public.news_items to anon, authenticated;
grant select on public.projects to anon, authenticated;
grant select on public.project_likes to anon, authenticated;
grant select on public.project_comments to anon, authenticated;

grant select, insert, update, delete on public.lesson_progress to authenticated;
grant select, insert, update, delete on public.resume_state to authenticated;
grant select, insert, update, delete on public.projects to authenticated;
grant select, insert, delete on public.project_likes to authenticated;
grant select, insert, update, delete on public.project_comments to authenticated;
grant update on public.users to authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
