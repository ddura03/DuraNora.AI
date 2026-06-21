"use client";

import { useEffect, useState } from "react";
import { AI_CATALOG } from "@/lib/ai-catalog";
import {
  defaultResume,
  fetchAllProgress,
  fetchResumeState,
  lessonTotal,
} from "@/lib/store/progress";
import type { ModelWithProgress, ResumeState } from "@/lib/types";

export function useLearningDashboard() {
  const [models, setModels] = useState<ModelWithProgress[]>([]);
  const [resume, setResume] = useState<ResumeState>(defaultResume());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [progress, resumeState] = await Promise.all([fetchAllProgress(), fetchResumeState()]);

        if (cancelled) return;

        const nextModels = AI_CATALOG.map((m) => {
          const slug = m.name.toLowerCase();
          const total = lessonTotal(slug);
          const done = Math.min((progress[slug] ?? []).length, total);
          return {
            ...m,
            slug,
            done,
            total,
            pct: total ? Math.round((done / total) * 100) : 0,
            started: done > 0,
            finished: total > 0 && done >= total,
          };
        });

        setModels(nextModels);
        setResume(resumeState ?? defaultResume());
      } catch (error) {
        console.error("[useLearningDashboard] Failed to load progress:", error);
        setModels(
          AI_CATALOG.map((m) => ({
            ...m,
            slug: m.name.toLowerCase(),
            done: 0,
            total: lessonTotal(m.name.toLowerCase()),
            pct: 0,
            started: false,
            finished: false,
          })),
        );
        setResume(defaultResume());
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { models, resume, loading };
}
