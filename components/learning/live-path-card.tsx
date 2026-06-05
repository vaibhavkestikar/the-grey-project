"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PathLessonList from "@/components/learning/path-lesson-list";
import LearningPathPill from "@/components/learning/learning-path-pill";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";

type Props = {
  collapsible?: boolean;
};

export default function LivePathCard({ collapsible = true }: Props) {
  const [open, setOpen] = useState(!collapsible);

  return (
    <article className="overflow-hidden rounded-[2rem] border border-violet-200 bg-white shadow-xl">
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-7 text-white md:p-9">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur">
            Live now. Go play
          </span>
        </div>
        <LearningPathPill variant="light" className="mt-5" />
        <h3 className="mt-3 text-3xl font-black md:text-4xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h3>
        <p className="mt-2 text-violet-100">{CURIOUS_BUILDERS_PATH.subtitle}</p>
        <p className="mt-4 max-w-xl text-sm text-violet-100/90">
          {CURIOUS_BUILDERS_PATH.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-xl bg-white/10 px-4 py-2 text-sm backdrop-blur">
            {CURIOUS_BUILDERS_PATH.lessonCount} lessons
          </span>
          <span className="rounded-xl bg-white/10 px-4 py-2 text-sm backdrop-blur">
            ~{CURIOUS_BUILDERS_PATH.totalMinutes} min
          </span>
          <span className="rounded-xl bg-white/10 px-4 py-2 text-sm backdrop-blur">
            Beginner to Intermediate
          </span>
        </div>

        <div className="mt-7">
          <Link
            href="/try/prediction"
            className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg"
          >
            Start Learning →
          </Link>
        </div>
      </div>

      <div className="p-5 md:p-7">
        {collapsible && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left font-bold text-slate-900"
          >
            <span>{open ? "Hide" : "Show"} chapters ({CURIOUS_BUILDERS_PATH.lessonCount})</span>
            <ChevronDown
              className={`h-5 w-5 transition ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
        {open && (
          <div className="mt-4">
            <PathLessonList
              lessons={CURIOUS_BUILDERS_LESSONS}
              baseHref="/learning/curious-builders"
            />
          </div>
        )}
      </div>
    </article>
  );
}
