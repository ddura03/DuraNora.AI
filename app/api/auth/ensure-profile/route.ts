import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function initialsFromName(input: string): string {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const admin = createAdminClient();

  const { data: existing } = await admin.from("users").select("id").eq("id", user.id).maybeSingle();
  if (existing) {
    return NextResponse.json({ ok: true, created: false });
  }

  const name =
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    user.email.split("@")[0];

  let baseSlug = slugify(name) || "user";
  let finalSlug = baseSlug;

  for (let i = 0; i < 10; i++) {
    const { data: taken } = await admin.from("users").select("id").eq("slug", finalSlug).maybeSingle();
    if (!taken) break;
    finalSlug = `${baseSlug}-${Math.random().toString(36).slice(2, 8)}`;
  }

  const { error } = await admin.from("users").insert({
    id: user.id,
    email: user.email,
    name,
    slug: finalSlug,
    initials: initialsFromName(name),
    avatar_color: "#7c3aed",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, created: true });
}
