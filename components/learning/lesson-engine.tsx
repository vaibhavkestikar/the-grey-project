"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import PlaygroundRenderer from "@/components/playgrounds/playground-renderer";
import { track } from "@/services/analytics/track";
import { createClient } from "@/lib/supabase/client";
import {
  getNextLessonSlug,
  PATH_ID,
} from "@/data/curious-builders-path";
import type { LessonBlock, StructuredLesson } from "@/types/lesson";

type Props = {
  lesson: StructuredLesson;
  mode?: "try" | "path";
  onComplete?: () => void;
  showSignupCta?: boolean;
};

export default function LessonEngine({
  lesson,
  mode = "try",
  onComplete,
  showSignupCta = true,
}: Props) {
  const [step, setStep] = useState(0);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointDone, setCheckpointDone] = useState(false);

  const block = lesson.blocks[step];
  const isLast = step >= lesson.blocks.length - 1;
  const progressPct = Math.round(
    ((step + (checkpointDone ? 1 : 0.5)) / lesson.blocks.length) * 100
  );

  const saveProgress = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const row = {
      user_id: user.id,
      course_slug: PATH_ID,
      module_slug: PATH_ID,
      lesson_slug: lesson.slug,
      progress_percent: progressPct,
      completed: progressPct >= 90,
      updated_at: new Date().toISOString(),
    };

    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("user_id", user.id)
      .eq("lesson_slug", lesson.slug)
      .maybeSingle();

    if (!existing) {
      await supabase.from("lesson_progress").insert(row);
    } else {
      await supabase
        .from("lesson_progress")
        .update(row)
        .eq("user_id", user.id)
        .eq("lesson_slug", lesson.slug);
    }
  }, [lesson.slug, progressPct]);

  useEffect(() => {
    track(mode === "try" ? "sample_started" : "lesson_started", {
      lessonId: lesson.id,
    });
  }, [lesson.id, mode]);

  useEffect(() => {
    if (mode === "path") void saveProgress();
  }, [step, progressPct, mode, saveProgress]);

  const nextSlug = getNextLessonSlug(lesson.slug);
  const nextHref =
    mode === "try"
      ? nextSlug && lesson.free
        ? `/try/${nextSlug}`
        : "/register"
      : nextSlug
        ? `/learning/curious-builders/${nextSlug}`
        : "/learning/curious-builders";

  function next() {
    if (block?.type === "checkpoint" && !checkpointDone) return;
    if (isLast) {
      track(mode === "try" ? "sample_completed" : "lesson_completed", {
        lessonId: lesson.id,
      });
      void saveProgress();
      onComplete?.();
      return;
    }
    setCheckpointAnswer(null);
    setCheckpointDone(false);
    setStep((s) => s + 1);
  }

  function handleCheckpointSelect(index: number) {
    setCheckpointAnswer(index);
    if (index === block.correctIndex) {
      setCheckpointDone(true);
      track("checkpoint_passed", { lessonId: lesson.id });
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            {lesson.durationMinutes} min
            {mode === "try" ? " · Free lesson" : " · Curious Builders"}
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{lesson.hook}</p>
        </div>
        <span className="shrink-0 rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
          {step + 1}/{lesson.blocks.length}
        </span>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
          className="premium-card p-6 md:p-10"
        >
          <BlockLabel type={block.type} />
          {block.title && (
            <h2 className="mt-4 text-2xl font-black text-slate-950">{block.title}</h2>
          )}
          {block.body && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{block.body}</p>
          )}

          {block.playgroundId && (
            <div className="mt-8">
              <PlaygroundRenderer
                id={block.playgroundId}
                variant={block.playgroundVariant}
              />
            </div>
          )}

          {block.type === "checkpoint" && block.options && (
            <div className="mt-8 space-y-3">
              {block.question && (
                <p className="rounded-2xl bg-slate-950 p-5 text-lg font-bold text-white">
                  {block.question}
                </p>
              )}
              {block.options.map((opt, i) => {
                const selected = checkpointAnswer === i;
                const correct = i === block.correctIndex;
                let ring = "border-slate-200 hover:border-violet-300";
                if (selected && correct) ring = "border-emerald-500 bg-emerald-50";
                if (selected && !correct) ring = "border-red-300 bg-red-50";

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleCheckpointSelect(i)}
                    disabled={checkpointDone}
                    className={`w-full rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${ring}`}
                  >
                    {opt}
                  </button>
                );
              })}
              {checkpointDone && block.insight && (
                <p className="mt-4 rounded-2xl bg-violet-50 p-4 text-violet-900">
                  {block.insight}
                </p>
              )}
            </div>
          )}

          {block.type === "reflect" && showSignupCta && mode === "try" && (
            <div className="mt-8 rounded-2xl border border-violet-200 bg-violet-50 p-6">
              <p className="font-semibold text-violet-900">Save progress & unlock the full path</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="rounded-xl bg-violet-600 px-6 py-3 text-center font-semibold text-white"
                >
                  Create free account
                </Link>
                {nextSlug && (
                  <Link
                    href={`/try/${nextSlug}`}
                    className="rounded-xl border border-violet-200 bg-white px-6 py-3 text-center font-semibold text-violet-700"
                  >
                    Next free lesson →
                  </Link>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="safe-bottom sticky bottom-0 z-20 -mx-4 border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-md md:static md:mx-0 md:mt-8 md:border-0 md:bg-transparent md:p-0">
        <button
          type="button"
          onClick={next}
          disabled={block?.type === "checkpoint" && !checkpointDone}
          className="w-full rounded-2xl bg-slate-950 py-4 text-lg font-semibold text-white disabled:opacity-40"
        >
          {isLast ? "Complete lesson" : "Continue"}
        </button>
        {isLast && (
          <Link
            href={nextHref}
            className="mt-3 block text-center text-sm font-semibold text-violet-600"
          >
            {nextSlug ? "Continue to next lesson →" : "Back to learning path"}
          </Link>
        )}
      </div>
    </div>
  );
}

function BlockLabel({ type }: { type: LessonBlock["type"] }) {
  const labels: Record<LessonBlock["type"], string> = {
    hook: "Hook",
    visual: "Visual",
    play: "Play",
    checkpoint: "Checkpoint",
    build: "Build",
    reflect: "Reflect",
  };
  return (
    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600">
      {labels[type]}
    </span>
  );
}
