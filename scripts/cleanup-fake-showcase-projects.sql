-- Remove all showcase projects except PromptForge (run in Supabase SQL editor).
-- Safe to re-run: only deletes rows whose external_url is not PromptForge.

DELETE FROM project_comments
WHERE project_id IN (
  SELECT id FROM projects
  WHERE external_url <> 'https://venerable-sorbet-c3ec05.netlify.app/'
);

DELETE FROM project_likes
WHERE project_id IN (
  SELECT id FROM projects
  WHERE external_url <> 'https://venerable-sorbet-c3ec05.netlify.app/'
);

DELETE FROM projects
WHERE external_url <> 'https://venerable-sorbet-c3ec05.netlify.app/';

-- Clear any seeded engagement on PromptForge itself (launch at zero).
DELETE FROM project_comments
WHERE project_id IN (
  SELECT id FROM projects
  WHERE external_url = 'https://venerable-sorbet-c3ec05.netlify.app/'
);

DELETE FROM project_likes
WHERE project_id IN (
  SELECT id FROM projects
  WHERE external_url = 'https://venerable-sorbet-c3ec05.netlify.app/'
);

UPDATE projects
SET views = 0
WHERE external_url = 'https://venerable-sorbet-c3ec05.netlify.app/';
