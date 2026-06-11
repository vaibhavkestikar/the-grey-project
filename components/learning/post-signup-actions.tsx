"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const CONTINUE_HREF_KEY = "tgf:continue-href";

type Props = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

function readCachedContinueHref(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CONTINUE_HREF_KEY);
}

export default function PostSignupActions({
  className = "mt-10 flex flex-col gap-4",
  primaryClassName = "btn-home-cta py-4 text-center",
  secondaryClassName = "btn-home-secondary py-4 text-center",
}: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [continueHref, setContinueHref] = useState(
    () => readCachedContinueHref() ?? `/learning/${PATH_ID}/prediction`
  );
  const [continueLabel, setContinueLabel] = useState("Continue learning");

  useEffect(() => {
    router.prefetch(continueHref);
  }, [continueHref, router]);

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

      const href = getPathContinueHref(
        PATH_ID,
        CURIOUS_BUILDERS_LESSONS,
        progressMap
      );
      const label =
        nextLesson && nextLesson.slug !== CURIOUS_BUILDERS_LESSONS[0]?.slug
          ? `Continue to ${nextLesson.title}`
          : "Continue learning";

      sessionStorage.setItem(CONTINUE_HREF_KEY, href);
      setContinueHref(href);
      setContinueLabel(label);
      router.prefetch(href);
    })();
  }, [user, router]);

  return (
    <div className={className}>
      <Link href={continueHref} className={primaryClassName} prefetch>
        {continueLabel}
      </Link>
      <Link href="/learning" className={secondaryClassName} prefetch>
        Explore learning paths
      </Link>
    </div>
  );
}
