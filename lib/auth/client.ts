import { safeRedirectPath } from "./routes";

export function authCallbackUrl(next?: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const path = safeRedirectPath(next);
  return `${origin}/auth/callback?next=${encodeURIComponent(path)}`;
}
