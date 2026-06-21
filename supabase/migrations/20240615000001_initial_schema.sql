-- DuraNoia.AI — initial schema (DATA_SCHEMA.md)
-- Run in Supabase SQL Editor or via supabase db push

-- ---------------------------------------------------------------------------
-- Extensions & helpers
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.slugify(input text)
returns text
language sql
immutable
as $$
  select trim(both '-' from regexp_replace(lower(coalesce(input, '')), '[^a-z0-9]+', '-', 'g'));
$$;

create or replace function public.initials_from_name(input text)
returns text
language plpgsql
immutable
as $$
declare
  parts text[];
begin
  parts := regexp_split_to_array(trim(coalesce(input, '')), '\s+');
  if array_length(parts, 1) is null or array_length(parts, 1) = 0 then
    return '??';
  end if;
  if array_length(parts, 1) = 1 then
    return upper(left(parts[1], 2));
  end if;
  return upper(left(parts[1], 1) || left(parts[array_length(parts, 1)], 1));
end;
$$;

-- ---------------------------------------------------------------------------
-- users (profile row; auth handled by auth.users)
-- ---------------------------------------------------------------------------
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text,
  slug text unique,
  initials text,
  avatar_color text not null default '#7c3aed',
  avatar_url text,
  role text,
  headline text,
  location text,
  linkedin text,
  streak_days integer not null default 0,
  created_at timestamptz not null default now()
);

create index users_slug_idx on public.users (slug);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_name text;
  base_slug text;
  final_slug text;
begin
  base_name := coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1));
  base_slug := public.slugify(base_name);
  if base_slug = '' then
    base_slug := 'user';
  end if;
  final_slug := base_slug;

  while exists (select 1 from public.users u where u.slug = final_slug) loop
    final_slug := base_slug || '-' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 6);
  end loop;

  insert into public.users (id, email, name, slug, initials, avatar_color)
  values (
    new.id,
    new.email,
    base_name,
    final_slug,
    public.initials_from_name(base_name),
    '#7c3aed'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- models & lessons (seed data)
-- ---------------------------------------------------------------------------
create table public.models (
  slug text primary key,
  name text not null,
  company text not null,
  version text not null default '',
  mark text not null,
  tagline text not null default '',
  description text not null default '',
  best_at text not null default '',
  category text not null,
  modalities text[] not null default '{}',
  skill_level text not null default 'Beginner',
  pricing text not null default 'Free',
  advertised_lessons integer not null default 0,
  logo_url text not null default ''
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  model_slug text not null references public.models (slug) on delete cascade,
  idx integer not null,
  number text not null,
  title text not null,
  level text not null,
  duration text not null,
  description text not null default '',
  callout_label text not null default '',
  callout_text text not null default '',
  prompt text not null default '',
  note text not null default '',
  video_url text,
  unique (model_slug, idx)
);

create index lessons_model_slug_idx on public.lessons (model_slug, idx);

-- ---------------------------------------------------------------------------
-- lesson progress & resume
-- ---------------------------------------------------------------------------
create table public.lesson_progress (
  user_id uuid not null references public.users (id) on delete cascade,
  model_slug text not null references public.models (slug) on delete cascade,
  lesson_idx integer not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, model_slug, lesson_idx)
);

create index lesson_progress_user_idx on public.lesson_progress (user_id);

create table public.resume_state (
  user_id uuid primary key references public.users (id) on delete cascade,
  model_slug text not null references public.models (slug) on delete cascade,
  lesson_idx integer not null default 0,
  updated_at timestamptz not null default now()
);

create trigger resume_state_updated_at
  before update on public.resume_state
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- showcase
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  author_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  description text not null default '',
  external_url text not null default '',
  model_mark text not null,
  tags text[] not null default '{}',
  cover_kind text not null default 'gradient' check (cover_kind in ('gradient', 'image')),
  cover_value text not null default '',
  monogram text not null default '',
  featured boolean not null default false,
  hidden boolean not null default false,
  views integer not null default 0,
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

create index projects_author_idx on public.projects (author_id);
create index projects_public_idx on public.projects (hidden, deleted_at) where deleted_at is null;

create table public.project_likes (
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

create index project_likes_project_idx on public.project_likes (project_id);

create table public.project_comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid not null references public.users (id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

create index project_comments_project_idx on public.project_comments (project_id);

-- ---------------------------------------------------------------------------
-- news & newsletter
-- ---------------------------------------------------------------------------
create table public.news_items (
  id uuid primary key default gen_random_uuid(),
  legacy_id text unique,
  company text not null,
  model_mark text,
  category text not null,
  title text not null,
  excerpt text not null default '',
  image_url text not null default '',
  read_minutes integer not null default 3,
  featured boolean not null default false,
  published_at timestamptz not null default now()
);

create index news_items_category_idx on public.news_items (category, published_at desc);

create table public.newsletter_subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);
