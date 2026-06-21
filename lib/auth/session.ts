import { createClient } from "@/lib/supabase/server";

export type HeaderProfile = {
  id: string;
  email: string;
  name: string | null;
  initials: string | null;
  avatar_color: string;
  headline: string | null;
};

export type HeaderAuth = {
  loggedIn: boolean;
  profile: HeaderProfile | null;
};

export async function getHeaderAuth(): Promise<HeaderAuth> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { loggedIn: false, profile: null };
  }

  const { data } = await supabase
    .from("users")
    .select("id, email, name, initials, avatar_color, headline")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) {
    const fallbackInitials =
      user.email?.slice(0, 2).toUpperCase() ??
      user.user_metadata?.name
        ?.split(/\s+/)
        .map((part: string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() ??
      "??";

    return {
      loggedIn: true,
      profile: {
        id: user.id,
        email: user.email ?? "",
        name: (user.user_metadata?.name as string | undefined) ?? null,
        initials: fallbackInitials,
        avatar_color: "#7c3aed",
        headline: null,
      },
    };
  }

  return {
    loggedIn: true,
    profile: {
      id: data.id,
      email: data.email ?? user.email ?? "",
      name: data.name,
      initials: data.initials,
      avatar_color: data.avatar_color ?? "#7c3aed",
      headline: data.headline,
    },
  };
}
