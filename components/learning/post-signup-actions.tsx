"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  CURIOUS_BUILDERS_LESSONS,
  PATH_ID,
} from "@/data/curious-builders-path";
import {
  isGuestProgressMerged,
  mergeGuestProgressOnSignIn,
} from "@/lib/learning/merge-guest-progress";
import {
  fetchLessonProgressMap,
  isLessonProgressComplete,
} from "@/lib/learning/progress";
import { getPathContinueHref } from "@/lib/learning/resume-path";
import { useAuth } from "@/components/providers/auth-provider";

type Props = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export default function PostSignupActions({
  className = "mt-10 flex flex-col gap-4",
  primaryClassName = "rounded-2xl bg-violet-600 py-4 font-semibold text-white text-center",
  secondaryClassName = "rounded-2xl border py-4 font-semibold text-slate-800 text-center",
}: Props) {
  const { user } = useAuth();
  const [continueHref, setContinueHref] = useState(
    `/learning/${PATH_ID}/prediction`
  );
  const [continueLabel, setContinueLabel] = useState("Continue learning");

  useEffect(() => {
    if (!user) return;

    void (async () => {
      if (!isGuestProgressMerged(user.id)) {
        await mergeGuestProgressOnSignIn();
      }

      const progressMap = await fetchLessonProgressMap(PATH_ID);
      const nextLesson = CURIOUS_BUILDERS_LESSONS.find(
        (lesson) =>
          !isLessonProgressComplete(
            progressMap.get(lesson.slug),
            lesson.blocks.length
          )
      );

      setContinueHref(
        getPathContinueHref(PATH_ID, CURIOUS_BUILDERS_LESSONS, progressMap)
      );
      setContinueLabel(
        nextLesson && nextLesson.slug !== CURIOUS_BUILDERS_LESSONS[0]?.slug
          ? `Continue to ${nextLesson.title}`
          : "Continue learning"
      );
    })();
  }, [user]);

  return (
    <div className={className}>
      <Link href={continueHref} className={primaryClassName}>
        {continueLabel}
      </Link>
      <Link href="/learning" className={secondaryClassName}>
        Explore learning paths
      </Link>
    </div>
  );
}
