"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import SiteNavbar from "@/components/marketing/site-navbar";
import LessonEngine from "@/components/learning/lesson-engine";
import {
  CURIOUS_BUILDERS_LESSONS,
  getLessonBySlug,
} from "@/data/curious-builders-path";
import { createClient } from "@/lib/supabase/client";

export default function PathLessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const lesson = getLessonBySlug(slug);
  const [authReady, setAuthReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!lesson) return;

      if (lesson.free) {
        setAllowed(true);
        setAuthReady(true);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace(`/login?next=/learning/curious-builders/${slug}`);
        return;
      }

      setAllowed(true);
      setAuthReady(true);
    })();
  }, [lesson, router, slug]);

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Lesson not found.</p>
      </main>
    );
  }

  if (!authReady) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading lesson...</p>
      </main>
    );
  }

  if (!allowed) return null;

  const lessonIndex = CURIOUS_BUILDERS_LESSONS.findIndex((l) => l.slug === slug);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
      <SiteNavbar />
      <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <Link
          href="/learning/curious-builders"
          className="text-sm font-medium text-slate-500 hover:text-violet-600"
        >
          ← Learning path
        </Link>

        {completed && !reviewMode ? (
          <div className="premium-card mt-8 p-8 text-center md:p-12">
            <p className="text-4xl">✓</p>
            <h1 className="mt-4 text-3xl font-black">Lesson complete</h1>
            <p className="mt-3 text-slate-600">{lesson.title}. Nice work.</p>
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
        ) : (
          <div className="mt-6">
            <LessonEngine
              lesson={lesson}
              mode="path"
              showSignupCta={false}
              reviewMode={reviewMode}
              onComplete={() => {
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
