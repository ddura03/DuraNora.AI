-- Backfill helper when handle_new_user trigger is missing or failed.
-- Run in Supabase SQL Editor if needed.

create or replace function public.ensure_user_profile()
returns public.users
language plpgsql
security definer
set search_path = public
as $$
declare
  auth_user auth.users%rowtype;
  base_name text;
  base_slug text;
  final_slug text;
  result public.users%rowtype;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select * into result from public.users where id = auth.uid();
  if found then
    return result;
  end if;

  select * into auth_user from auth.users where id = auth.uid();
  if not found then
    raise exception 'Auth user not found';
  end if;

  base_name := coalesce(auth_user.raw_user_meta_data->>'name', split_part(auth_user.email, '@', 1));
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
    auth_user.id,
    auth_user.email,
    base_name,
    final_slug,
    public.initials_from_name(base_name),
    '#7c3aed'
  )
  returning * into result;

  return result;
end;
$$;

grant execute on function public.ensure_user_profile() to authenticated;
