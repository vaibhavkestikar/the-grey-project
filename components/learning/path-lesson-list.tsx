"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  fetchLessonProgressMap,
  type LessonProgress,
} from "@/lib/learning/progress";
import type { StructuredLesson } from "@/types/lesson";

type Props = {
  lessons: StructuredLesson[];
  baseHref: string;
};

export default function PathLessonList({ lessons, baseHref }: Props) {
  const [progressMap, setProgressMap] = useState<Map<string, LessonProgress>>(
    new Map()
  );

  useEffect(() => {
    void fetchLessonProgressMap().then(setProgressMap);
  }, []);

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const progress = progressMap.get(lesson.slug);
        const completed = progress?.completed;
        const inProgress =
          progress && !progress.completed && progress.progress_percent > 0;

        return (
          <Link
            key={lesson.slug}
            href={`${baseHref}/${lesson.slug}`}
            className={`group flex gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg md:p-6 ${
              completed
                ? "border-emerald-200 hover:border-emerald-300"
                : "border-slate-200 hover:border-violet-300"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
                completed
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-violet-100 text-violet-700"
              }`}
            >
              {completed ? "✓" : index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                  {lesson.title}
                </h3>
                {completed && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    Completed
                  </span>
                )}
                {inProgress && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    In progress
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-600">{lesson.hook}</p>
              <p className="mt-2 text-xs font-semibold text-slate-400">
                {lesson.durationMinutes} min · {lesson.blocks.length} steps
                {inProgress && ` · ${progress.progress_percent}% done`}
              </p>
            </div>
            <span className="hidden self-center text-violet-600 sm:inline">→</span>
          </Link>
        );
      })}
    </div>
  );
}
