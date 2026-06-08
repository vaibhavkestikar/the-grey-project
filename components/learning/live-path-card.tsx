"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PathLessonList from "@/components/learning/path-lesson-list";
import LearningPathPill from "@/components/learning/learning-path-pill";
import PathHookRibbon from "@/components/learning/path-hook-ribbon";
import PathMetaPills from "@/components/learning/path-meta-pills";
import PathNumberRibbon from "@/components/learning/path-number-ribbon";
import PathValueGrid from "@/components/learning/path-value-grid";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
} from "@/data/curious-builders-path";
import { getPathById } from "@/types/paths";

type Props = {
  collapsible?: boolean;
  compact?: boolean;
};

export default function LivePathCard({ collapsible = true, compact = false }: Props) {
  const [open, setOpen] = useState(!collapsible);
  const pathMeta = getPathById("curious-builders");

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-white shadow-xl">
      <PathNumberRibbon number={1} />
      <PathHookRibbon label="Completely Free" />
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-7 pt-16 text-white md:p-9 md:pt-16">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-400/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-950">
            Live now. Go play
          </span>
          <LearningPathPill variant="light" />
        </div>
        <h3 className="mt-5 text-3xl font-black md:text-4xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h3>
        <p className="mt-2 text-violet-100">{CURIOUS_BUILDERS_PATH.subtitle}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-violet-100/90">
          {compact
            ? CURIOUS_BUILDERS_PATH.cardSummary
            : CURIOUS_BUILDERS_PATH.description}
        </p>

        {pathMeta && !compact && (
          <PathValueGrid
            who={pathMeta.who}
            why={pathMeta.why}
            outcomes={pathMeta.outcomes}
            variant="light"
            className="mt-5"
          />
        )}

        <PathMetaPills
          variant="light"
          className="mt-5"
          labels={[
            "Completion certificate",
            `${CURIOUS_BUILDERS_PATH.lessonCount} lessons`,
            `~${CURIOUS_BUILDERS_PATH.totalMinutes} min`,
            "Beginner to Intermediate",
          ]}
        />

        <div className="mt-7">
          <Link
            href="/try/prediction"
            className="inline-flex rounded-2xl bg-white px-6 py-3 font-semibold text-violet-700 shadow-lg transition hover:scale-[1.02]"
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
            <span>{open ? "Hide" : "Show"} path ({CURIOUS_BUILDERS_PATH.lessonCount} lessons + certificate)</span>
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
              pathId={CURIOUS_BUILDERS_PATH.id}
              showCertificate
            />
          </div>
        )}
      </div>
    </article>
  );
}
