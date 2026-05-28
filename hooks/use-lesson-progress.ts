"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

type Props = {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
  progressPercent: number;
};

export function useLessonProgress({
  courseSlug,
  moduleSlug,
  lessonSlug,
  progressPercent,
}: Props) {

  useEffect(() => {

    async function saveProgress() {

      const supabase =
        createClient();

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const {
        data: existing,
      } =
        await supabase
          .from("lesson_progress")
          .select("id")
          .eq("user_id", user.id)
          .eq("lesson_slug", lessonSlug)
          .maybeSingle();

      if (!existing) {

        await supabase
          .from("lesson_progress")
          .insert({

            user_id:
              user.id,

            course_slug:
              courseSlug,

            module_slug:
              moduleSlug,

            lesson_slug:
              lessonSlug,

            progress_percent:
              progressPercent,

            completed:
              progressPercent >= 90,

          });

      } else {

        await supabase
          .from("lesson_progress")
          .update({

            progress_percent:
              progressPercent,

            completed:
              progressPercent >= 90,

            updated_at:
              new Date().toISOString(),

          })
          .eq("user_id", user.id)
          .eq("lesson_slug", lessonSlug);

      }

    }

    saveProgress();

  }, [
    courseSlug,
    moduleSlug,
    lessonSlug,
    progressPercent,
  ]);

}