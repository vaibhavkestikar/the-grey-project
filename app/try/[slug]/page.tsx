"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import SiteNavbar from "@/components/marketing/site-navbar";
import LessonEngine from "@/components/learning/lesson-engine";
import { useAuth } from "@/components/providers/auth-provider";
import {
  getFreeLessons,
  getLessonBySlug,
  getNextLessonSlug,
  PATH_ID,
} from "@/data/curious-builders-path";

export default function TryLessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = getLessonBySlug(slug);
  const { user, loading: authLoading } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const isFree = lesson?.free === true;
  const isAuthenticated = !authLoading && Boolean(user);
  const nextSlug = slug ? getNextLessonSlug(slug) : null;

  if (!isFree || !lesson) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-semibold text-slate-800">Lesson not found</p>
        <Link href="/try" className="text-violet-600">
          Back to lessons
        </Link>
      </main>
    );
  }

  const freeLessons = getFreeLessons();
  const index = freeLessons.findIndex((l) => l.slug === slug);
  const nextFree = freeLessons[index + 1];

  const nextLessonHref = isAuthenticated
    ? nextSlug
      ? `/learning/${PATH_ID}/${nextSlug}`
      : `/learning/${PATH_ID}`
    : nextFree
      ? `/try/${nextFree.slug}`
      : "/register";

  const nextLessonLabel = isAuthenticated
    ? nextSlug
      ? "Next lesson →"
      : "Continue path →"
    : nextFree
      ? "Next lesson →"
      : "Continue learning →";

  return (
    <main className="site-page">
      <SiteNavbar />

      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href={isAuthenticated ? `/learning/${PATH_ID}` : "/try"}
          className="text-sm font-medium text-slate-500 hover:text-violet-600"
        >
          ← Curious Builders
        </Link>

        {completed && !reviewMode ? (
          <div className="premium-card mt-8 p-8 text-center md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-950">
              Lesson complete
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              You finished <strong>{lesson.title}</strong>.
              {isAuthenticated && (
                <>
                  {" "}
                  Progress saved to your account.
                </>
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href={nextLessonHref}
                className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
              >
                {nextLessonLabel}
              </Link>
              {isAuthenticated && (
                <Link
                  href="/account"
                  className="rounded-2xl border border-violet-200 bg-violet-50 px-8 py-4 font-semibold text-violet-800"
                >
                  View profile
                </Link>
              )}
              <button
                type="button"
                onClick={() => setReviewMode(true)}
                className="rounded-2xl border border-slate-200 px-8 py-4 font-semibold text-slate-800"
              >
                Review lesson
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <LessonEngine
              lesson={lesson}
              mode="try"
              reviewMode={reviewMode}
              onComplete={() => {
                if (!isAuthenticated) return;
                setReviewMode(false);
                setCompleted(true);
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}
