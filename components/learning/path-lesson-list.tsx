import Link from "next/link";

import type { StructuredLesson } from "@/types/lesson";

type Props = {
  lessons: StructuredLesson[];
  baseHref: string;
  showFreeBadge?: boolean;
};

export default function PathLessonList({
  lessons,
  baseHref,
  showFreeBadge,
}: Props) {
  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => (
        <Link
          key={lesson.slug}
          href={`${baseHref}/${lesson.slug}`}
          className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-300 hover:shadow-lg md:p-6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-black text-violet-700">
            {index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                {lesson.title}
              </h3>
              {showFreeBadge && lesson.free && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  Free
                </span>
              )}
              {showFreeBadge && !lesson.free && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                  Account
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">{lesson.hook}</p>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              {lesson.durationMinutes} min · {lesson.blocks.length} steps
            </p>
          </div>
          <span className="hidden self-center text-violet-600 sm:inline">→</span>
        </Link>
      ))}
    </div>
  );
}
