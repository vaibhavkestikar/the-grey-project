import fs from "fs";

import path from "path";

import matter from "gray-matter";

import Link from "next/link";

import { redirect } from "next/navigation";

import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";

import { createClient } from "@/lib/supabase/server";

import { mdxComponents } from "@/components/mdx-components";

import LessonTracker from "@/components/learning/lesson-tracker";

import {
  courseModules,
} from "@/data/course-config";

type Props = {
  params: Promise<{
    module: string;
    lesson: string;
  }>;
};

export async function generateStaticParams() {

  const routes: {
    module: string;
    lesson: string;
  }[] = [];

  courseModules.forEach((module) => {

    module.lessons.forEach((lesson) => {

      routes.push({
        module: module.slug,
        lesson: lesson.slug,
      });

    });

  });

  return routes;
}

export default async function LessonPage({
  params,
}: Props) {

  const {
    module: moduleSlug,
    lesson,
  } = await params;

  const supabase =
    await createClient();

  const {
    data: { session },
  } =
    await supabase.auth.getSession();

  if (!session) {

    redirect("/register");

  }

  const module =
    courseModules.find(
      (m) => m.slug === moduleSlug
    );

  if (!module) {
    notFound();
  }

  const lessonMeta =
    module.lessons.find(
      (l) => l.slug === lesson
    );

  if (!lessonMeta) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    "courses",
    "foundations-of-ai",
    moduleSlug,
    `${lesson}.mdx`
  );

  const source = fs.readFileSync(
    filePath,
    "utf-8"
  );

  const { content } =
    matter(source);

  const currentIndex =
    module.lessons.findIndex(
      (l) => l.slug === lesson
    );

  const nextLesson =
    module.lessons[currentIndex + 1];

  const prevLesson =
    module.lessons[currentIndex - 1];

  const progress =
    ((currentIndex + 1) /
      module.lessons.length) *
    100;

  return (

    <main className="min-h-screen overflow-x-hidden bg-[#f7f8fc]">

      {/* TRACKER */}

      <LessonTracker
        courseSlug="foundations-of-ai"
        moduleSlug={moduleSlug}
        lessonSlug={lesson}
        progressPercent={Math.round(progress)}
      />

      {/* TOP NAV */}

      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 items-center justify-between px-4 md:px-6">

          {/* LEFT */}

          <Link
            href="/"
            className="min-w-0"
          >

            <h1 className="text-2xl font-black leading-none tracking-tight text-violet-600 md:text-3xl">
              The Grey Project
            </h1>

            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-slate-500 md:text-[11px]">
              UNCOVERING THE GREY IN AI
            </p>

          </Link>

          {/* RIGHT */}

          <div className="flex items-center gap-3 md:gap-5">

            <div className="hidden text-sm font-semibold text-slate-500 md:block">

              Progress:

              <span className="ml-2 font-black text-violet-700">
                {Math.round(progress)}%
              </span>

            </div>

            <Link
              href="/logout"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700 md:px-5 md:py-2.5"
            >
              Logout
            </Link>

          </div>

        </div>

      </header>

      {/* MAIN */}

      <div className="mx-auto flex max-w-[1600px]">

        {/* SIDEBAR */}

        <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-[280px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white xl:block">

          <div className="px-5 py-8">

            <div>

              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-violet-700">
                Foundations of AI
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
                {module.title}
              </h2>

            </div>

            {/* PROGRESS */}

            <div className="mt-10">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Progress
                </span>

                <span className="text-sm font-black text-violet-700">
                  {Math.round(progress)}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            {/* LESSONS */}

            <div className="mt-10 space-y-4">

              {module.lessons.map(
                (item, index) => {

                  const active =
                    item.slug === lesson;

                  return (

                    <Link
                      key={item.slug}
                      href={`/learning/foundations-of-ai/${module.slug}/${item.slug}`}
                      className={`group block rounded-3xl border p-5 transition-all duration-300 ${
                        active
                          ? "border-violet-200 bg-violet-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-lg"
                      }`}
                    >

                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-violet-700">
                        Lesson {index + 1}
                      </div>

                      <div className="mt-3 text-base font-bold leading-7 text-slate-900">
                        {item.title}
                      </div>

                      <div className="mt-4 text-sm font-medium text-slate-500">
                        {item.duration}
                      </div>

                    </Link>

                  );
                }
              )}

            </div>

          </div>

        </aside>

        {/* CONTENT */}

        <section className="min-w-0 flex-1 px-4 py-10 md:px-8 md:py-14 xl:px-20">

          <div className="mx-auto max-w-4xl">

            {/* MOBILE PROGRESS */}

            <div className="mb-8 xl:hidden">

              <div className="mb-3 flex items-center justify-between">

                <span className="text-sm font-semibold text-slate-500">
                  Lesson Progress
                </span>

                <span className="text-sm font-black text-violet-700">
                  {Math.round(progress)}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

            {/* HEADER */}

            <div className="mb-14 md:mb-20">

              <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 shadow-sm">
                {lessonMeta.duration}
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 md:mt-8 md:text-6xl xl:text-7xl">
                {lessonMeta.title}
              </h1>

            </div>

            {/* CONTENT */}

            <article className="mdx-content prose prose-slate max-w-none prose-headings:font-black prose-p:leading-8 prose-pre:rounded-3xl">

              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [
                      remarkGfm,
                    ],
                  },
                }}
              />

            </article>

            {/* NAVIGATION */}

            <div className="mt-20 flex flex-col gap-5 border-t border-slate-200 pt-10 md:mt-28 md:flex-row md:items-center md:justify-between">

              {prevLesson ? (

                <Link
                  href={`/learning/foundations-of-ai/${module.slug}/${prevLesson.slug}`}
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-center shadow-sm hover:border-violet-300 md:px-7 md:py-5"
                >
                  ← {prevLesson.title}
                </Link>

              ) : (
                <div />
              )}

              {nextLesson ? (

                <Link
                  href={`/learning/foundations-of-ai/${module.slug}/${nextLesson.slug}`}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-4 text-center font-bold text-white shadow-xl md:px-8 md:py-5"
                >
                  {nextLesson.title} →
                </Link>

              ) : (

                <Link
                  href={`/learning/foundations-of-ai/quiz/${moduleSlug}`}
                  className="rounded-2xl bg-slate-950 px-6 py-4 text-center font-bold text-white shadow-xl md:px-8 md:py-5"
                >
                  Take Final Quiz →
                </Link>

              )}

            </div>

          </div>

        </section>

      </div>

    </main>

  );
}