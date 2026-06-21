"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchCompletedLessons,
  saveResumeState,
  setCompletedLessons,
} from "@/lib/store/progress";

export function useLessonProgress(modelSlug: string) {
  const slug = modelSlug.toLowerCase();
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const persistRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCompletedLessons(slug).then((indices) => {
      if (cancelled) return;
      setCompleted(new Set(indices));
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const updateCompleted = useCallback(
    (updater: (prev: Set<number>) => Set<number>) => {
      setCompleted((prev) => {
        const next = updater(prev);
        const id = ++persistRef.current;
        setCompletedLessons(slug, Array.from(next).sort((a, b) => a - b)).catch(() => {
          if (persistRef.current === id) {
            fetchCompletedLessons(slug).then((indices) => setCompleted(new Set(indices)));
          }
        });
        return next;
      });
    },
    [slug],
  );

  const saveResume = useCallback(
    (lessonIdx: number) => {
      saveResumeState(slug, lessonIdx).catch(() => {});
    },
    [slug],
  );

  return { completed, loading, updateCompleted, saveResume };
}
