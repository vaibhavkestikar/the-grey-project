"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Award, Lock } from "lucide-react";

import {
  fetchPathProgressSnapshot,
  isLessonProgressComplete,
  type LessonProgress,
} from "@/lib/learning/progress";
import { mergeGuestProgressOnSignIn } from "@/lib/learning/merge-guest-progress";
import { PATH_ID } from "@/data/curious-builders-path";
import { PATH_CERTIFICATE_SLUG } from "@/lib/learning/certificate";
import { useAuth } from "@/components/providers/auth-provider";
import type { StructuredLesson } from "@/types/lesson";

type Props = {
  lessons: StructuredLesson[];
  baseHref: string;
  pathId?: string;
  showCertificate?: boolean;
};

export default function PathLessonList({
  lessons,
  baseHref,
  pathId,
  showCertificate = false,
}: Props) {
  const { user, loading: authLoading } = useAuth();
  const [progressMap, setProgressMap] = useState<Map<string, LessonProgress>>(
    new Map()
  );
  const [pathComplete, setPathComplete] = useState(false);
  const [certificateIssued, setCertificateIssued] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [ready, setReady] = useState(false);

  const resolvedPathId = pathId ?? PATH_ID;

  const loadProgress = useCallback(async () => {
    if (authLoading) return;

    if (user) {
      await mergeGuestProgressOnSignIn();
    }

    if (showCertificate && pathId) {
      const snapshot = await fetchPathProgressSnapshot(pathId);
      setProgressMap(snapshot.progressMap);
      setPathComplete(snapshot.pathComplete);
      setCertificateIssued(snapshot.certificateIssued);
      setCompletedLessons(snapshot.completedLessons);
    } else {
      const snapshot = await fetchPathProgressSnapshot(resolvedPathId);
      setProgressMap(snapshot.progressMap);
    }

    setReady(true);
  }, [authLoading, user, showCertificate, pathId, resolvedPathId]);

  useEffect(() => {
    setReady(false);
    void loadProgress();
  }, [loadProgress]);

  useEffect(() => {
    function handleFocus() {
      void loadProgress();
    }

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [loadProgress]);

  const certificateHref = `${baseHref}/${PATH_CERTIFICATE_SLUG}`;
  const certificateLocked = !pathComplete;
  const certificateRequiresAccount = !authLoading && !user;

  if (!ready) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading progress...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const progress = progressMap.get(lesson.slug);
        const completed = isLessonProgressComplete(
          progress,
          lesson.blocks.length
        );
        const inProgress =
          progress &&
          !completed &&
          (progress.progress_percent > 0 || progress.last_position > 0);
        const requiresAccount = !lesson.free && !authLoading && !user;
        const href = requiresAccount
          ? `/register?next=${encodeURIComponent(`${baseHref}/${lesson.slug}`)}`
          : `${baseHref}/${lesson.slug}`;

        return (
          <Link
            key={lesson.slug}
            href={href}
            className={`group flex gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg md:p-6 ${
              completed
                ? "border-emerald-200 hover:border-emerald-300"
                : requiresAccount
                  ? "border-slate-200 hover:border-amber-300"
                  : "border-slate-200 hover:border-violet-300"
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
                completed
                  ? "bg-emerald-100 text-emerald-700"
                  : requiresAccount
                    ? "bg-amber-100 text-amber-800"
                    : "bg-violet-100 text-violet-700"
              }`}
            >
              {completed ? "✓" : requiresAccount ? <Lock className="h-5 w-5" /> : index + 1}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                  {lesson.title}
                </h3>
                {lesson.free && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    Free preview
                  </span>
                )}
                {requiresAccount && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                    Account required
                  </span>
                )}
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

      {showCertificate && (
        <Link
          href={
            certificateRequiresAccount
              ? `/register?next=${encodeURIComponent(certificateHref)}`
              : certificateHref
          }
          className={`group flex gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg md:p-6 ${
            certificateIssued
              ? "border-emerald-200 hover:border-emerald-300"
              : pathComplete
                ? "border-amber-200 hover:border-amber-300"
                : "border-slate-200 hover:border-violet-300"
          }`}
        >
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              certificateIssued
                ? "bg-emerald-100 text-emerald-700"
                : pathComplete
                  ? "bg-amber-100 text-amber-800"
                  : certificateRequiresAccount
                    ? "bg-amber-100 text-amber-800"
                    : "bg-violet-100 text-violet-700"
            }`}
          >
            {certificateIssued ? (
              "✓"
            ) : certificateLocked || certificateRequiresAccount ? (
              <Lock className="h-5 w-5" />
            ) : (
              <Award className="h-5 w-5" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700">
                Completion certificate
              </h3>
              {certificateIssued && (
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                  Completed
                </span>
              )}
              {!certificateIssued && pathComplete && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  Ready to claim
                </span>
              )}
              {!certificateIssued && certificateLocked && (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                  {completedLessons}/{lessons.length} lessons done
                </span>
              )}
              {certificateRequiresAccount && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
                  Account required
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-600">
              {certificateIssued
                ? "View and download your certificate of completion."
                : pathComplete
                  ? "Generate your certificate with your name on it."
                  : "Finish every lesson in this path to unlock your certificate."}
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              Certificate · PDF download
            </p>
          </div>
          <span className="hidden self-center text-violet-600 sm:inline">→</span>
        </Link>
      )}
    </div>
  );
}
