"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import SiteNavbar from "@/components/marketing/site-navbar";
import LessonEngine from "@/components/learning/lesson-engine";
import {
  FREE_LESSON_SLUGS,
  getFreeLessons,
  getLessonBySlug,
} from "@/data/curious-builders-path";

export default function TryLessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lesson = getLessonBySlug(slug);
  const [completed, setCompleted] = useState(false);

  const isFree =
    lesson &&
    FREE_LESSON_SLUGS.includes(slug as (typeof FREE_LESSON_SLUGS)[number]);

  if (!isFree || !lesson) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-lg font-semibold text-slate-800">Lesson not found</p>
        <Link href="/try" className="text-violet-600">
          View free lessons
        </Link>
      </main>
    );
  }

  const freeLessons = getFreeLessons();
  const index = freeLessons.findIndex((l) => l.slug === slug);
  const nextFree = freeLessons[index + 1];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <SiteNavbar />

      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link href="/try" className="text-sm font-medium text-slate-500 hover:text-violet-600">
          ← Free lessons
        </Link>

        {completed ? (
          <div className="premium-card mt-8 p-8 text-center md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-950">
              Lesson complete!
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              You finished <strong>{lesson.title}</strong>.{" "}
              {nextFree
                ? "Continue the free preview or sign up to unlock all lessons."
                : "Sign up to unlock the full Curious Builders path."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {nextFree ? (
                <Link
                  href={`/try/${nextFree.slug}`}
                  className="rounded-2xl bg-violet-600 px-8 py-4 font-semibold text-white"
                >
                  Next free lesson →
                </Link>
              ) : null}
              <Link
                href="/register"
                className="rounded-2xl border border-violet-200 bg-white px-8 py-4 font-semibold text-violet-700"
              >
                Sign up free
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <LessonEngine
              lesson={lesson}
              mode="try"
              onComplete={() => setCompleted(true)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
