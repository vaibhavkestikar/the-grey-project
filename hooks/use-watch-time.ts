"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

type Props = {
  lessonSlug: string;
};

export function useWatchTime({
  lessonSlug,
}: Props) {

  useEffect(() => {

    let seconds = 0;

    const interval =
      setInterval(async () => {

        seconds += 15;

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

            watch_time_seconds:
              seconds,

          })
          .eq("user_id", user.id)
          .eq("lesson_slug", lessonSlug);

      }, 15000);

    return () => {
      clearInterval(interval);
    };

  }, [lessonSlug]);

}