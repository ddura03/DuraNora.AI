import { isAuthPage, isProtectedPath, safeRedirectPath } from "@/lib/auth/routes";
import { getSupabasePublicEnv, SUPABASE_PUBLIC_ENV_ERROR } from "@/lib/supabase/env";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function configErrorResponse(request: NextRequest, response: NextResponse) {
  response.headers.set("X-DuraNoia-Config-Error", SUPABASE_PUBLIC_ENV_ERROR);
  return response;
}

function redirectUnauthenticated(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.searchParams.set("redirectTo", pathname);
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const env = getSupabasePublicEnv();

  if (!env) {
    console.error(`[middleware] ${SUPABASE_PUBLIC_ENV_ERROR}`);

    if (isProtectedPath(pathname)) {
      return configErrorResponse(request, redirectUnauthenticated(request, pathname));
    }

    return configErrorResponse(request, NextResponse.next({ request }));
  }

  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(env.url, env.anonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && isProtectedPath(pathname)) {
      return redirectUnauthenticated(request, pathname);
    }

    if (user && isAuthPage(pathname)) {
      const redirectTo = safeRedirectPath(request.nextUrl.searchParams.get("redirectTo"));
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return supabaseResponse;
  } catch (error) {
    console.error("[middleware] Supabase session update failed:", error);

    if (isProtectedPath(pathname)) {
      return redirectUnauthenticated(request, pathname);
    }

    return NextResponse.next({ request });
  }
}
