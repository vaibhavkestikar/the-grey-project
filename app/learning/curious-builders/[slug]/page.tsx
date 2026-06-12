"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import PathFeedbackForm from "@/components/feedback/path-feedback-form";
import SiteNavbar from "@/components/marketing/site-navbar";
import LessonEngine from "@/components/learning/lesson-engine";
import { useAuth } from "@/components/providers/auth-provider";
import {
  CURIOUS_BUILDERS_LESSONS,
  CURIOUS_BUILDERS_PATH,
  getLessonBySlug,
  getLessonBySlugAsync,
  isLastLessonInPath,
} from "@/data/curious-builders-path";
import type { StructuredLesson } from "@/types/lesson";
import { PATH_CERTIFICATE_SLUG } from "@/lib/learning/certificate";
import {
  fetchLessonProgress,
  isLessonProgressComplete,
} from "@/lib/learning/progress";


export default function PathLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const slug = params.slug as string;
  const lessonMeta = getLessonBySlug(slug);
  const [lesson, setLesson] = useState<StructuredLesson | null>(null);
  const [lessonLoading, setLessonLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [progressChecked, setProgressChecked] = useState(false);
  const [showPathFeedback, setShowPathFeedback] = useState(false);
  const [pathFeedbackDone, setPathFeedbackDone] = useState(false);
  const [completionBadges, setCompletionBadges] = useState<
    Array<{ id: string; name: string; description: string; lessonSlug?: string }>
  >([]);
  const [greySummary, setGreySummary] = useState<{
    totalPoints: number;
    availablePoints: number;
    currentStreak: number;
    badgeCount: number;
  } | null>(null);
  const certificateToastShown = useRef(false);

  const isLastLesson = lessonMeta ? isLastLessonInPath(slug) : false;

  const handleLessonComplete = useCallback(() => {
    setReviewMode(false);
    setCompleted(true);
  }, []);

  useEffect(() => {
    setCompleted(false);
    setReviewMode(false);
    setAuthReady(false);
    setAllowed(false);
    setProgressChecked(false);
  }, [slug]);

  useEffect(() => {
    if (!lessonMeta || authLoading) return;

    if (!lessonMeta.free && !user) {
      router.replace(`/login?next=/learning/curious-builders/${slug}`);
      return;
    }

    setAllowed(true);
    setAuthReady(true);
  }, [lessonMeta, authLoading, user, router, slug]);

  useEffect(() => {
    let cancelled = false;
    setLesson(null);
    setLessonLoading(true);

    if (!lessonMeta) {
      setLessonLoading(false);
      return;
    }

    void getLessonBySlugAsync(slug).then((loaded) => {
      if (cancelled) return;
      setLesson(loaded ?? null);
      setLessonLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug, lessonMeta]);

  useEffect(() => {
    if (!lesson || !lessonMeta || authLoading) return;

    void (async () => {
      const saved = await fetchLessonProgress(
        lesson.slug,
        CURIOUS_BUILDERS_PATH.id,
        user?.id
      );

      if (isLessonProgressComplete(saved, lesson.blocks.length)) {
        setCompleted(true);
        setReviewMode(false);
      }
      setProgressChecked(true);
    })();
  }, [lesson, lessonMeta, authLoading, user?.id, slug]);

  useEffect(() => {
    if (!completed || !isLastLesson) return;

    void (async () => {
      const feedbackRes = await fetch(
        `/api/feedback/path?path_id=${encodeURIComponent(CURIOUS_BUILDERS_PATH.id)}`
      );
      const feedbackData = await feedbackRes.json().catch(() => ({ submitted: false }));
      if (feedbackData.submitted) {
        setPathFeedbackDone(true);
        setShowPathFeedback(false);
      } else {
        setShowPathFeedback(true);
      }
    })();
  }, [completed, isLastLesson]);

  useEffect(() => {
    if (!completed || !lesson) return;

    void (async () => {
      const res = await fetch("/api/grey/summary");
      const data = await res.json().catch(() => ({ badges: [] }));
      const badges = (data.badges ?? []).filter(
        (badge: { id: string; lessonSlug?: string }) =>
          badge.lessonSlug === lesson.slug ||
          (isLastLesson && badge.id === "curious-builder")
      );
      setCompletionBadges(badges);
      setGreySummary({
        totalPoints: data.profile?.totalPoints ?? 0,
        availablePoints: data.profile?.availablePoints ?? 0,
        currentStreak: data.profile?.currentStreak ?? 0,
        badgeCount: data.badges?.length ?? 0,
      });

      if (!certificateToastShown.current) {
        certificateToastShown.current = true;
        toast.custom(
          () => (
            <div className="rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-4 shadow-xl">
              <p className="text-xs font-black uppercase tracking-widest text-violet-700">
                Certificate specimen
              </p>
              <p className="mt-1 font-black text-slate-950">
                Want a peek at the finish line?
              </p>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-600">
                Check the certificate area. Complete the full path to unlock the
                real one.
              </p>
              <Link
                href={`/learning/curious-builders/${PATH_CERTIFICATE_SLUG}`}
                className="mt-3 inline-flex rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
              >
                View specimen
              </Link>
            </div>
          ),
          { duration: 6500 }
        );
      }
    })();
  }, [completed, isLastLesson, lesson]);

  if (!lessonMeta) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Lesson not found.</p>
      </main>
    );
  }

  if (!authReady || !allowed || lessonLoading || !lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading lesson...</p>
      </main>
    );
  }

  const showCompletionScreen = progressChecked && completed && !reviewMode;

  if (!allowed) return null;

  const lessonIndex = CURIOUS_BUILDERS_LESSONS.findIndex((l) => l.slug === slug);

  return (
    <main className="site-page">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href="/learning"
          className="text-sm font-medium text-slate-400 hover:text-cyan-400"
        >
          ← All learning paths
        </Link>

        {showCompletionScreen && showPathFeedback && !pathFeedbackDone ? (
          <div className="mt-8">
            <PathFeedbackForm
              pathId={CURIOUS_BUILDERS_PATH.id}
              pathTitle={CURIOUS_BUILDERS_PATH.title}
              onSubmitted={() => {
                setPathFeedbackDone(true);
                setShowPathFeedback(false);
              }}
              onSkip={() => {
                setShowPathFeedback(false);
              }}
            />
          </div>
        ) : showCompletionScreen ? (
          <div className="mt-8 space-y-8">
            <div className="premium-card p-8 text-center md:p-12">
              <p className="text-4xl">{isLastLesson ? "🏁" : "✓"}</p>
              <h1 className="mt-4 text-3xl font-black">
                {isLastLesson ? "Learning path complete" : "Lesson complete"}
              </h1>
              <p className="mt-3 text-slate-600">
                {isLastLesson
                  ? `You finished ${CURIOUS_BUILDERS_PATH.title}. That is the whole path. Genuinely impressive.`
                  : `${lesson.title}. Nice work.`}
              </p>
              {greySummary && (
                <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-600">
                      Grey Points
                    </p>
                    <p className="mt-1 text-3xl font-black text-violet-800">
                      {greySummary.totalPoints}
                    </p>
                    <p className="mt-1 text-xs text-violet-700">earned so far</p>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Badges
                    </p>
                    <p className="mt-1 text-3xl font-black text-amber-800">
                      {greySummary.badgeCount}
                    </p>
                    <p className="mt-1 text-xs text-amber-700">evidence markers</p>
                  </div>
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Streak
                    </p>
                    <p className="mt-1 text-3xl font-black text-emerald-800">
                      {greySummary.currentStreak}d
                    </p>
                    <p className="mt-1 text-xs text-emerald-700">keep it warm</p>
                  </div>
                </div>
              )}
              {completionBadges.length > 0 && (
                <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-5 text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                    Badge evidence
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {completionBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-violet-100 bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-black text-white">
                            GP
                          </div>
                          <div>
                            <p className="font-black text-slate-950">{badge.name}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {badge.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mx-auto mt-6 max-w-xl rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
                <p className="font-black text-slate-950">
                  Your profile now has the full receipt.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Find your Grey Points, badge collection, streak, and Grey Store
                  assets in the profile section. Keep earning points to unlock the
                  practical PDF packs, then finish the full path to claim the
                  completion certificate.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/account"
                    className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                  >
                    View profile
                  </Link>
                  <Link
                    href="/account#grey-store"
                    className="rounded-xl border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700"
                  >
                    Unlock assets
                  </Link>
                  <Link
                    href={`/learning/curious-builders/${PATH_CERTIFICATE_SLUG}`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    Certificate specimen
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                {lessonIndex < CURIOUS_BUILDERS_LESSONS.length - 1 ? (
                  <Link
                    href={`/learning/curious-builders/${CURIOUS_BUILDERS_LESSONS[lessonIndex + 1].slug}`}
                    className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
                  >
                    Next lesson →
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
                  >
                    View profile
                  </Link>
                )}
                {isLastLesson && (
                  <Link
                    href={`/learning/curious-builders/${PATH_CERTIFICATE_SLUG}`}
                    className="rounded-2xl border border-violet-200 bg-violet-50 px-8 py-4 font-semibold text-violet-800"
                  >
                    Get certificate →
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => setReviewMode(true)}
                  className="rounded-2xl border border-slate-200 px-8 py-4 font-semibold text-slate-800"
                >
                  Review lesson
                </button>
                <Link
                  href="/learning"
                  className="rounded-2xl border px-8 py-4 font-semibold text-slate-800"
                >
                  Learning home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <LessonEngine
              lesson={lesson}
              mode="path"
              showSignupCta={false}
              reviewMode={reviewMode}
              onComplete={handleLessonComplete}
            />
          </div>
        )}
      </div>
    </main>
  );
}
