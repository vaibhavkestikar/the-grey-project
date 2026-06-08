"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import DeepDiveAccordion from "@/components/learning/deep-dive-accordion";
import PlaygroundRenderer from "@/components/playgrounds/playground-renderer";
import { track } from "@/services/analytics/track";
import { awardGreyPoints } from "@/lib/grey/client";
import { GREY_POINT_VALUES } from "@/lib/grey/config";
import {
  isGreyPointsSoundEnabled,
  playGreyPointsSound,
  setGreyPointsSoundEnabled,
  subscribeToGreyPointsSound,
} from "@/lib/grey/sound";
import {
  fetchLessonProgress,
  saveLessonProgress,
} from "@/lib/learning/progress";
import { getNextLessonSlug, getLessonBySlug } from "@/data/curious-builders-path";
import type { LessonBlock, LessonVisual, StructuredLesson } from "@/types/lesson";

type Props = {
  lesson: StructuredLesson;
  mode?: "try" | "path";
  onComplete?: () => void;
  showSignupCta?: boolean;
  reviewMode?: boolean;
  onReviewStart?: () => void;
};

/* ─── Visual sub-component ─────────────────────────────────────────────── */

function LessonVisualBlock({ visual }: { visual: LessonVisual }) {
  if (visual.kind === "comparison") {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            {visual.leftLabel}
          </p>
          <ul className="space-y-2">
            {visual.leftPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-violet-500">
            {visual.rightLabel}
          </p>
          <ul className="space-y-2">
            {visual.rightPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-violet-800">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (visual.kind === "stats") {
    const cols =
      visual.items.length === 2
        ? "grid-cols-2"
        : visual.items.length === 4
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-3";
    return (
      <div className={`mt-6 grid gap-3 ${cols}`}>
        {visual.items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-center"
          >
            <p className="text-2xl font-black text-violet-700">{item.value}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (visual.kind === "flow") {
    return (
      <div className="mt-6 overflow-x-auto pb-1">
        <div className="flex min-w-max items-center gap-2">
          {visual.steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-center">
                <p className="text-sm font-bold text-blue-800">{step.label}</p>
                {step.detail && (
                  <p className="mt-0.5 text-xs text-blue-500">{step.detail}</p>
                )}
              </div>
              {i < visual.steps.length - 1 && (
                <span className="shrink-0 font-bold text-blue-300">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === "callout") {
    const colorClasses: Record<string, string> = {
      violet: "border-violet-200 bg-violet-50 text-violet-900",
      blue: "border-blue-200 bg-blue-50 text-blue-900",
      amber: "border-amber-200 bg-amber-50 text-amber-900",
      emerald: "border-emerald-200 bg-emerald-50 text-emerald-900",
      red: "border-red-200 bg-red-50 text-red-900",
      slate: "border-slate-200 bg-slate-50 text-slate-900",
    };
    const c = colorClasses[visual.color ?? "violet"];
    return (
      <div className={`mt-6 rounded-2xl border p-5 ${c}`}>
        <p className="text-base font-semibold leading-relaxed">{visual.text}</p>
      </div>
    );
  }

  return null;
}

/* ─── Per-type block renderers ─────────────────────────────────────────── */

function HookBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-blue-600 p-7 text-white shadow-lg shadow-violet-200 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/5" />
        <div className="relative">
          {block.icon && (
            <span className="mb-4 block text-5xl leading-none">{block.icon}</span>
          )}
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Foundation
          </span>
          {block.title && (
            <h2 className="mt-3 text-2xl font-black leading-tight text-white md:text-3xl">
              {block.title}
            </h2>
          )}
          {block.body && (
            <p className="mt-4 text-lg leading-relaxed text-violet-100">
              {block.body}
            </p>
          )}
        </div>
      </div>
      {block.visual && <LessonVisualBlock visual={block.visual} />}
    </div>
  );
}

function BuildBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      {block.icon ? (
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
            {block.icon}
          </div>
          <div className="min-w-0 flex-1">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Concept
            </span>
            {block.title && (
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                {block.title}
              </h2>
            )}
          </div>
        </div>
      ) : (
        <div>
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">
            Concept
          </span>
          {block.title && (
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              {block.title}
            </h2>
          )}
        </div>
      )}

      {block.body && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{block.body}</p>
      )}

      {block.highlights && block.highlights.length > 0 && (
        <div className="mt-6 space-y-3">
          {block.highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50 p-4"
            >
              <span className="mt-0.5 shrink-0 font-black text-violet-400">→</span>
              <p className="font-medium text-violet-900">{h}</p>
            </div>
          ))}
        </div>
      )}

      {block.visual && <LessonVisualBlock visual={block.visual} />}
    </div>
  );
}

function PlayBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700">
        <span aria-hidden="true">✦</span> Interactive
      </span>
      {block.title && (
        <h2 className="mt-3 text-2xl font-black text-slate-950">{block.title}</h2>
      )}
      {block.body && (
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{block.body}</p>
      )}
      {block.playgroundId && (
        <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:p-6">
          <PlaygroundRenderer
            id={block.playgroundId}
            variant={block.playgroundVariant}
          />
        </div>
      )}
    </div>
  );
}

function CheckpointBlock({
  block,
  checkpointAnswer,
  checkpointDone,
  onSelect,
}: {
  block: LessonBlock;
  checkpointAnswer: number | null;
  checkpointDone: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div>
      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
        ✓ Quick Check
      </span>
      {block.title && (
        <h2 className="mt-3 text-2xl font-black text-slate-950">{block.title}</h2>
      )}
      {block.question && (
        <div className="mt-6 rounded-2xl bg-slate-950 p-5">
          <p className="text-lg font-bold text-white">{block.question}</p>
        </div>
      )}
      {block.options && (
        <div className="mt-4 space-y-3">
          {block.options.map((opt, i) => {
            const selected = checkpointAnswer === i;
            const correct = i === block.correctIndex;
            let ringClasses =
              "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/50";
            if (selected && correct) ringClasses = "border-emerald-500 bg-emerald-50";
            if (selected && !correct) ringClasses = "border-red-300 bg-red-50";

            const letterBg = selected && correct
              ? "bg-emerald-200 text-emerald-800"
              : selected && !correct
                ? "bg-red-200 text-red-800"
                : "bg-slate-100 text-slate-600";

            return (
              <button
                key={opt}
                type="button"
                onClick={() => onSelect(i)}
                disabled={checkpointDone}
                className={`flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left text-base font-medium transition ${ringClasses}`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${letterBg}`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}
      {checkpointDone && block.insight && (
        <div className="mt-5 flex gap-3 rounded-2xl border border-violet-100 bg-violet-50 p-5">
          <span className="shrink-0 text-xl" aria-hidden="true">💡</span>
          <p className="font-medium text-violet-900">{block.insight}</p>
        </div>
      )}
    </div>
  );
}

function ReflectBlock({
  block,
  showSignupCta,
  mode,
  nextSlug,
  hasFreeNextLesson,
}: {
  block: LessonBlock;
  showSignupCta: boolean;
  mode: string;
  nextSlug: string | null;
  hasFreeNextLesson: boolean;
}) {
  return (
    <div>
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-7 md:p-10">
        <div className="mb-4 text-5xl leading-none" aria-hidden="true">🎯</div>
        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
          Lesson Complete
        </span>
        {block.title && (
          <h2 className="mt-3 text-2xl font-black text-slate-950">{block.title}</h2>
        )}
        {block.body && (
          <p className="mt-4 text-lg leading-relaxed text-slate-700">{block.body}</p>
        )}
        {block.learned && block.learned.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
              What you now know
            </p>
            <div className="space-y-2">
              {block.learned.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-3"
                >
                  <span className="mt-0.5 shrink-0 font-black text-emerald-500">✓</span>
                  <p className="font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSignupCta && mode === "try" && (
        <div className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-6">
          <p className="font-semibold text-violet-900">
            Save progress and unlock the full path
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-violet-600 px-6 py-3 text-center font-semibold text-white"
            >
              Create free account
            </Link>
            {nextSlug && hasFreeNextLesson ? (
              <Link
                href={`/try/${nextSlug}`}
                className="rounded-xl border border-violet-200 bg-white px-6 py-3 text-center font-semibold text-violet-700"
              >
                Next lesson →
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

function VisualBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
        Visual
      </span>
      {block.title && (
        <h2 className="mt-3 text-2xl font-black text-slate-950">{block.title}</h2>
      )}
      {block.body && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{block.body}</p>
      )}
      {block.items && block.items.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                {item.label}
              </p>
              <p className="mt-3 rounded-xl border border-blue-100 bg-white p-4 text-sm leading-relaxed text-slate-800">
                {item.content}
              </p>
              {item.note && (
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.note}</p>
              )}
            </div>
          ))}
        </div>
      )}
      {block.visual && (
        <div className="mt-6">
          <LessonVisualBlock visual={block.visual} />
        </div>
      )}
      {block.highlights && block.highlights.length > 0 && (
        <div className="mt-6 space-y-3">
          {block.highlights.map((h) => (
            <div
              key={h}
              className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4"
            >
              <span className="mt-0.5 shrink-0 font-black text-blue-400">→</span>
              <p className="font-medium text-blue-900">{h}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Apply block ──────────────────────────────────────────────────────── */

const ROLE_ICONS: Record<string, string> = {
  "Product Manager": "📋",
  "Founder": "🚀",
  "Builder": "🛠️",
  "Analyst": "📊",
};

function ApplyBlock({ block }: { block: LessonBlock }) {
  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-7 md:p-10">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-200/30" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            ⚡ Apply it to your work
          </span>
          {block.title && (
            <h2 className="mt-3 text-2xl font-black text-slate-950">{block.title}</h2>
          )}
          {block.body && (
            <p className="mt-3 text-lg leading-relaxed text-slate-600">{block.body}</p>
          )}
        </div>
      </div>

      {block.roles && block.roles.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {block.roles.map(({ role, action }) => (
            <div
              key={role}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg" aria-hidden="true">
                  {ROLE_ICONS[role] ?? "👤"}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {role}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{action}</p>
            </div>
          ))}
        </div>
      )}

      {block.microAction && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-5">
          <span className="shrink-0 text-xl" aria-hidden="true">🎯</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
              Try this now
            </p>
            <p className="mt-1 font-medium leading-relaxed text-violet-900">
              {block.microAction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Block dispatcher ─────────────────────────────────────────────────── */

function BlockContent({
  block,
  checkpointAnswer,
  checkpointDone,
  onCheckpointSelect,
  onDeepDiveOpen,
  showSignupCta,
  mode,
  nextSlug,
  hasFreeNextLesson,
}: {
  block: LessonBlock;
  checkpointAnswer: number | null;
  checkpointDone: boolean;
  onCheckpointSelect: (i: number) => void;
  onDeepDiveOpen: () => void;
  showSignupCta: boolean;
  mode: string;
  nextSlug: string | null;
  hasFreeNextLesson: boolean;
}) {
  let inner: React.ReactNode;

  switch (block.type) {
    case "hook":
      inner = <HookBlock block={block} />;
      break;
    case "build":
      inner = <BuildBlock block={block} />;
      break;
    case "play":
      inner = <PlayBlock block={block} />;
      break;
    case "checkpoint":
      inner = (
        <CheckpointBlock
          block={block}
          checkpointAnswer={checkpointAnswer}
          checkpointDone={checkpointDone}
          onSelect={onCheckpointSelect}
        />
      );
      break;
    case "reflect":
      inner = (
        <ReflectBlock
          block={block}
          showSignupCta={showSignupCta}
          mode={mode}
          nextSlug={nextSlug}
          hasFreeNextLesson={hasFreeNextLesson}
        />
      );
      break;
    case "visual":
      inner = <VisualBlock block={block} />;
      break;
    case "apply":
      inner = <ApplyBlock block={block} />;
      break;
    default:
      inner = null;
  }

  return (
    <>
      {inner}
      {block.deepDive && (
        <DeepDiveAccordion
          cta={block.deepDive.cta}
          content={block.deepDive.content}
          onOpen={onDeepDiveOpen}
        />
      )}
    </>
  );
}

/* ─── Main engine ──────────────────────────────────────────────────────── */

export default function LessonEngine({
  lesson,
  mode = "try",
  onComplete,
  showSignupCta = true,
  reviewMode = false,
  onReviewStart,
}: Props) {
  const [step, setStep] = useState(0);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [checkpointDone, setCheckpointDone] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const completionReported = useRef(false);
  const maxStepReached = useRef(0);
  const checkpointAttempts = useRef<Record<number, number>>({});
  const localFeedbackShown = useRef<Set<string>>(new Set());

  const block = lesson.blocks[step];
  const isLast = step >= lesson.blocks.length - 1;
  const progressPct = Math.round(((step + 1) / lesson.blocks.length) * 100);

  useEffect(() => {
    void (async () => {
      const saved = await fetchLessonProgress(lesson.slug);
      if (saved?.completed && !reviewMode) {
        setAlreadyCompleted(true);
        if (!completionReported.current) {
          completionReported.current = true;
          onComplete?.();
        }
      } else if (saved?.last_position && !saved.completed && !reviewMode) {
        setStep(Math.min(saved.last_position, lesson.blocks.length - 1));
      }
      setProgressLoaded(true);
    })();
  }, [lesson.slug, lesson.blocks.length, onComplete, reviewMode]);

  const persistProgress = useCallback(
    async (markComplete?: boolean) => {
      await saveLessonProgress({
        lessonSlug: lesson.slug,
        step,
        totalSteps: lesson.blocks.length,
        markComplete,
      });
    },
    [lesson.slug, lesson.blocks.length, step]
  );

  useEffect(() => {
    track(mode === "try" ? "sample_started" : "lesson_started", {
      lessonId: lesson.id,
    });
  }, [lesson.id, mode]);

  useEffect(() => {
    setSoundOn(isGreyPointsSoundEnabled());
    return subscribeToGreyPointsSound(setSoundOn);
  }, []);

  // Only save progress when moving forward — going back should not rewind saved position
  useEffect(() => {
    if (!progressLoaded || alreadyCompleted || reviewMode) return;
    if (step >= maxStepReached.current) {
      maxStepReached.current = step;
      void persistProgress(false);
    }
  }, [step, progressLoaded, alreadyCompleted, persistProgress, reviewMode]);

  const nextSlug = getNextLessonSlug(lesson.slug);
  const nextLesson = nextSlug ? getLessonBySlug(nextSlug) : null;
  const hasFreeNextLesson = Boolean(nextLesson?.free);
  const nextHref =
    mode === "try"
      ? nextSlug && hasFreeNextLesson
        ? `/try/${nextSlug}`
        : "/register"
      : nextSlug
        ? `/learning/curious-builders/${nextSlug}`
        : "/learning/curious-builders";

  function prev() {
    if (step === 0) return;
    setCheckpointAnswer(null);
    setCheckpointDone(false);
    setStep((s) => s - 1);
  }

  function toggleSound() {
    const next = !isGreyPointsSoundEnabled();
    setGreyPointsSoundEnabled(next);
    setSoundOn(next);
    toast.success(next ? "Grey Points sound on." : "Grey Points sound off.");
  }

  function showLocalPointsFeedback(points: number, feedbackKey: string) {
    if (points <= 0 || localFeedbackShown.current.has(feedbackKey)) return;

    localFeedbackShown.current.add(feedbackKey);
    playGreyPointsSound();

    toast.custom(
      () => (
        <div className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-blue-600 p-4 text-white shadow-2xl shadow-violet-500/30">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20" />
          <div className="pointer-events-none absolute -bottom-10 left-8 h-24 w-24 rounded-full bg-yellow-300/20" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl font-black">
              +{points}
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-violet-100">
                Grey Points scored
              </p>
              <p className="mt-1 text-lg font-black">
                Clean move. Evidence logged.
              </p>
              <p className="mt-1 text-xs text-violet-100">
                Open profile for totals, badges, and store unlocks.
              </p>
            </div>
          </div>
        </div>
      ),
      { duration: 2600 }
    );
  }

  function showGreyFeedback(result: Awaited<ReturnType<typeof awardGreyPoints>> | null) {
    if (!result) return;

    for (const badge of result.badgesAwarded ?? []) {
      toast.custom(
        () => (
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-violet-50 p-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-br from-amber-200 to-violet-200 text-2xl font-black text-slate-950 shadow-inner">
                GP
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-700">
                  Badge earned
                </p>
                <p className="mt-1 text-lg font-black text-slate-950">{badge.name}</p>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">
                  {badge.description}
                </p>
              </div>
            </div>
          </div>
        ),
        { duration: 4200 }
      );
    }
  }

  async function awardEvent(opts: {
    eventType: "step_completed" | "checkpoint_correct" | "deep_dive_opened" | "lesson_completed";
    stepIndex?: number;
    firstTry?: boolean;
    metadata?: Record<string, unknown>;
  }) {
    if (reviewMode) return null;

    const points =
      opts.eventType === "step_completed"
        ? GREY_POINT_VALUES.stepCompleted
        : opts.eventType === "deep_dive_opened"
          ? GREY_POINT_VALUES.deepDiveOpened
          : opts.eventType === "lesson_completed"
            ? GREY_POINT_VALUES.lessonCompleted
            : GREY_POINT_VALUES.checkpointCorrect +
              (opts.firstTry ? GREY_POINT_VALUES.checkpointFirstTryBonus : 0);

    const feedbackKey = [
      opts.eventType,
      lesson.slug,
      opts.stepIndex ?? "lesson",
      opts.firstTry ? "first" : "base",
    ].join(":");

    showLocalPointsFeedback(points, feedbackKey);

    if (mode !== "path") return null;
    const result = await awardGreyPoints({
      eventType: opts.eventType,
      pathId: lesson.pathId,
      lessonSlug: lesson.slug,
      stepIndex: opts.stepIndex,
      firstTry: opts.firstTry,
      metadata: opts.metadata,
    });
    showGreyFeedback(result);
    return result;
  }

  async function next() {
    if (block?.type === "checkpoint" && !checkpointDone) return;
    if (isLast) {
      track(mode === "try" ? "sample_completed" : "lesson_completed", {
        lessonId: lesson.id,
      });
      await awardEvent({
        eventType: "step_completed",
        stepIndex: step,
        metadata: { blockType: block?.type },
      });
      await awardEvent({ eventType: "lesson_completed" });
      if (!reviewMode) {
        await persistProgress(true);
      }
      onComplete?.();
      return;
    }
    void awardEvent({
      eventType: "step_completed",
      stepIndex: step,
      metadata: { blockType: block?.type },
    });
    setCheckpointAnswer(null);
    setCheckpointDone(false);
    setStep((s) => s + 1);
  }

  function handleCheckpointSelect(index: number) {
    const attempts = checkpointAttempts.current[step] ?? 0;
    checkpointAttempts.current[step] = attempts + 1;
    setCheckpointAnswer(index);
    if (index === block.correctIndex) {
      setCheckpointDone(true);
      track("checkpoint_passed", { lessonId: lesson.id });
      void awardEvent({
        eventType: "checkpoint_correct",
        stepIndex: step,
        firstTry: attempts === 0,
      });
    }
  }

  if (!progressLoaded) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-slate-500">Loading lesson...</p>
      </div>
    );
  }

  if (alreadyCompleted && !reviewMode) {
    return null;
  }

  const needsCard =
    block.type === "build" ||
    block.type === "play" ||
    block.type === "checkpoint" ||
    block.type === "visual" ||
    block.type === "apply";

  return (
    <div className="mx-auto w-full max-w-3xl">
      {reviewMode && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
          <span className="font-semibold text-emerald-800">
            Reviewing a completed lesson
          </span>
          <button
            type="button"
            onClick={() => onComplete?.()}
            className="font-semibold text-emerald-700 underline"
          >
            Back to completion
          </button>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
            {lesson.durationMinutes} min · Curious Builders
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{lesson.hook}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
            {step + 1}/{lesson.blocks.length}
          </span>
          <button
            type="button"
            onClick={toggleSound}
            className={`rounded-full border px-3 py-1 text-xs font-bold shadow-sm transition ${
              soundOn
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            }`}
            aria-label={soundOn ? "Turn Grey Points sound off" : "Turn Grey Points sound on"}
          >
            {soundOn ? "Sound on" : "Sound off"}
          </button>
        </div>
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
        >
          {needsCard ? (
            <div className="premium-card p-6 md:p-10">
              <BlockContent
                block={block}
                checkpointAnswer={checkpointAnswer}
                checkpointDone={checkpointDone}
                onCheckpointSelect={handleCheckpointSelect}
                onDeepDiveOpen={() =>
                  void awardEvent({
                    eventType: "deep_dive_opened",
                    stepIndex: step,
                    metadata: { blockType: block?.type },
                  })
                }
                showSignupCta={showSignupCta}
                mode={mode}
                nextSlug={nextSlug}
                hasFreeNextLesson={hasFreeNextLesson}
              />
            </div>
          ) : (
            <BlockContent
              block={block}
              checkpointAnswer={checkpointAnswer}
              checkpointDone={checkpointDone}
              onCheckpointSelect={handleCheckpointSelect}
              onDeepDiveOpen={() =>
                void awardEvent({
                  eventType: "deep_dive_opened",
                  stepIndex: step,
                  metadata: { blockType: block?.type },
                })
              }
              showSignupCta={showSignupCta}
              mode={mode}
              nextSlug={nextSlug}
              hasFreeNextLesson={hasFreeNextLesson}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="safe-bottom sticky bottom-0 z-20 -mx-4 border-t border-slate-200/80 bg-white/95 px-4 py-4 backdrop-blur-md md:static md:mx-0 md:mt-8 md:border-0 md:bg-transparent md:p-0">
        <div className="flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={prev}
              className="rounded-2xl border border-slate-200 px-5 py-4 text-base font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={block?.type === "checkpoint" && !checkpointDone}
            className="flex-1 rounded-2xl bg-slate-950 py-4 text-lg font-semibold text-white disabled:opacity-40"
          >
            {isLast ? "Complete lesson" : "Continue →"}
          </button>
        </div>
        {isLast && (
          <Link
            href={nextHref}
            className="mt-3 block text-center text-sm font-semibold text-violet-600"
          >
            {nextSlug ? (hasFreeNextLesson ? "Continue to next lesson →" : "Create account to continue →") : "Back to learning path"}
          </Link>
        )}
      </div>
    </div>
  );
}

export type { Props as LessonEngineProps };
