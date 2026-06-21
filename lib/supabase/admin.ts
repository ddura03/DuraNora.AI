import { createClient } from "@supabase/supabase-js";

function nodeRealtimeTransport() {
  if (typeof WebSocket !== "undefined") return undefined;
  // Node < 22 has no global WebSocket; required for scripts (seed).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ws = require("ws") as typeof WebSocket;
  return { transport: ws };
}

/**
 * Service-role client for server-only scripts (seed, migrations helpers).
 * Never import this from client components or expose to the browser.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      realtime: nodeRealtimeTransport(),
    },
  );
}
