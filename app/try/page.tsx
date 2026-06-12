"use client";

import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";
import PathLessonList from "@/components/learning/path-lesson-list";
import LearningPathPill from "@/components/learning/learning-path-pill";
import PathMetaPills from "@/components/learning/path-meta-pills";
import PathValueGrid from "@/components/learning/path-value-grid";
import { useAuth } from "@/components/providers/auth-provider";
import {
  CURIOUS_BUILDERS_PATH,
  getFreeLessons,
} from "@/data/curious-builders-path";
import { CURIOUS_BUILDERS_PILLS, getPathById } from "@/types/paths";

export default function TryPage() {
  const { user, loading: authLoading } = useAuth();
  const isAuthenticated = !authLoading && Boolean(user);
  const freeLessons = getFreeLessons();
  const totalMinutes = freeLessons.reduce((s, l) => s + l.durationMinutes, 0);
  const pathMeta = getPathById("curious-builders");
  const lessonBaseHref = isAuthenticated
    ? "/learning/curious-builders"
    : "/try";

  return (
    <main className="site-page">
      <SiteNavbar />

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <Link href="/" className="text-sm font-medium text-slate-400 hover:text-cyan-400">
          ← Back home
        </Link>

        <LearningPathPill className="mt-6" />
        <h1 className="mt-3 text-4xl font-black text-slate-50 md:text-5xl">
          {CURIOUS_BUILDERS_PATH.title}
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          {isAuthenticated ? (
            <>
              Welcome back. Your progress is saved — continue the full path from
              where you left off.
            </>
          ) : (
            <>
              Two free lessons. About {totalMinutes} minutes. No account needed to
              start. The full path is completely free with an account for progress
              tracking and your completion certificate.
            </>
          )}
        </p>

        <PathMetaPills className="mt-4" labels={[...CURIOUS_BUILDERS_PILLS]} />

        {pathMeta && (
          <PathValueGrid
            who={pathMeta.who}
            why={pathMeta.why}
            outcomes={pathMeta.outcomes}
            className="mt-6"
          />
        )}

        <div className="mt-10">
          <PathLessonList
            lessons={freeLessons}
            baseHref={lessonBaseHref}
            pathId={CURIOUS_BUILDERS_PATH.id}
          />
        </div>

        <div className="premium-card mt-12 p-8 text-center">
          {isAuthenticated ? (
            <>
              <p className="font-semibold text-slate-100">
                You&apos;re signed in. Continue the full Curious Builders path.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Progress, Grey Points, badges, and your certificate are all tied
                to your account.
              </p>
              <Link
                href="/learning/curious-builders"
                className="btn-home-cta mt-4 inline-flex px-8 py-4"
              >
                Path details
              </Link>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-100">
                Liked what you saw? Create a free account to unlock the rest, save
                progress, and earn your completion certificate.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                The full path stays free. No credit card. No &ldquo;limited time
                offer&rdquo; nonsense.
              </p>
              <Link href="/register" className="btn-home-cta mt-4 inline-flex px-8 py-4">
                Create free account
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
