"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  initials: string | null;
  avatar_color: string;
  headline: string | null;
  location: string | null;
  linkedin: string | null;
  streak_days: number;
  slug: string | null;
};

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("id, email, name, initials, avatar_color, headline, location, linkedin, streak_days, slug")
        .eq("id", user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          ...data,
          email: data.email ?? user.email ?? "",
          avatar_color: data.avatar_color ?? "#7c3aed",
        });
        setLoading(false);
        return;
      }

      // Backfill profile if auth user exists but trigger did not create public.users row.
      await fetch("/api/auth/ensure-profile", { method: "POST" });

      const { data: created } = await supabase
        .from("users")
        .select("id, email, name, initials, avatar_color, headline, location, linkedin, streak_days, slug")
        .eq("id", user.id)
        .maybeSingle();

      if (created) {
        setProfile({
          ...created,
          email: created.email ?? user.email ?? "",
          avatar_color: created.avatar_color ?? "#7c3aed",
        });
      }
    } catch (error) {
      console.error("[useUserProfile] Failed to load profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const supabase = createClient();
    reload();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      setLoading(true);
      reload();
    });
    return () => subscription.unsubscribe();
  }, [reload]);

  const firstName = profile?.name?.split(/\s+/)[0] ?? "there";

  return {
    profile,
    loading,
    firstName,
    initials: profile?.initials ?? "??",
    streak: profile?.streak_days ?? 0,
    reload,
  };
}
