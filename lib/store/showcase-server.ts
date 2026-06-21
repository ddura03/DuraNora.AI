import { createClient } from "@/lib/supabase/server";
import { loadShowcaseProjects } from "@/lib/store/showcase";

/** Server-side showcase fetch for the /showcase page initial render. */
export async function fetchShowcaseDataServer() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return loadShowcaseProjects(supabase, user?.id);
}
