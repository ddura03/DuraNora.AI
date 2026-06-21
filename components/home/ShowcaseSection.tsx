"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShowcaseProjectCard } from "@/components/showcase/ShowcaseProjectCard";
import { fetchFeaturedProjects } from "@/lib/store/showcase";
import type { ShowcaseProject } from "@/lib/types";

export function ShowcaseSection() {
  const router = useRouter();
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProjects(3)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sec home-showcase" style={{ padding: "30px 22px 24px" }}>
      <div className="home-showcase-head">
        <div>
          <h2 className="home-showcase-title">
            Built by the community, <em>powered by AI.</em>
          </h2>
          <p className="home-showcase-sub">
            See what people are building with the models you&apos;re learning — then ship your own and get it in front of everyone.
          </p>
        </div>
        <Link href="/showcase" className="home-showcase-explore">
          Explore the showcase →
        </Link>
      </div>
      {loading ? (
        <div style={{ color: "var(--muted)", fontFamily: "var(--mono)", fontSize: 13, padding: "12px 0 4px" }}>Loading projects…</div>
      ) : (
        <div className="home-showcase-grid">
          {projects.map((p) => (
            <ShowcaseProjectCard key={p.dbId ?? p.id} project={p} metaEnd="model" onClick={() => router.push("/showcase")} />
          ))}
        </div>
      )}
    </div>
  );
}
