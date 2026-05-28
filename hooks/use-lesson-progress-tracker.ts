"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

type Props = {
  lessonSlug: string;
  enabled?: boolean;
};

export function useLessonProgressTracker({
  lessonSlug,
  enabled = false,
}: Props) {

  useEffect(() => {

    if (!enabled) return;

    let timeout: NodeJS.Timeout;

    async function updateProgress() {

      const scrollTop =
        window.scrollY;

      const windowHeight =
        window.innerHeight;

      const documentHeight =
        document.body.scrollHeight;

      const scrollableHeight =
        documentHeight - windowHeight;

      const rawProgress =
        (scrollTop / scrollableHeight) * 100;

      const progress =
        Math.min(
          100,
          Math.max(
            1,
            Math.round(rawProgress)
          )
        );

      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from("lesson_progress")
        .update({

          progress_percent:
            progress,

          completed:
            progress >= 90,

          updated_at:
            new Date().toISOString(),

        })
        .eq("user_id", user.id)
        .eq("lesson_slug", lessonSlug);

    }

    function handleScroll() {

      clearTimeout(timeout);

      timeout =
        setTimeout(() => {

          updateProgress();

        }, 150);

    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    updateProgress();

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      clearTimeout(timeout);

    };

  }, [
    lessonSlug,
    enabled,
  ]);

}