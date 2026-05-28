import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";

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

  const { content } = matter(source);

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

    <main className="min-h-screen bg-[#f7f8fc]">

      {/* LESSON TRACKER */}

      <LessonTracker
      courseSlug="foundations-of-ai"
      moduleSlug={moduleSlug}
      lessonSlug={lesson}
      progressPercent={Math.round(progress)}
       />

      {/* TOP NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6">

          <div className="flex items-center gap-12">

            <Link
              href="/"
              className="flex flex-col transition hover:opacity-90"
            >

              <h1 className="text-3xl font-black tracking-tight text-violet-600">
                The Grey Project
              </h1>

              <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-slate-500">
                UNCOVERING THE GREY IN AI
              </p>

            </Link>

            <nav className="hidden items-center gap-8 lg:flex">

              <Link
                href="/"
                className="text-sm font-semibold text-slate-600 hover:text-violet-700"
              >
                Home
              </Link>

              <Link
                href="/learning"
                className="text-sm font-semibold text-violet-700"
              >
                Learning
              </Link>

              <Link
                href="/about"
                className="text-sm font-semibold text-slate-600 hover:text-violet-700"
              >
                About
              </Link>

              <Link
                href="/blog"
                className="text-sm font-semibold text-slate-600 hover:text-violet-700"
              >
                Blog
              </Link>

            </nav>

          </div>

          <div className="flex items-center gap-5">

            <div className="hidden text-sm font-semibold text-slate-500 md:block">

              Progress:

              <span className="ml-2 font-black text-violet-700">
                {Math.round(progress)}%
              </span>

            </div>

            <Link
              href="/logout"
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:text-violet-700"
            >
              Logout
            </Link>

          </div>

        </div>

      </header>

      <div className="mx-auto flex max-w-[1600px]">

        {/* SIDEBAR */}

        <aside className="sticky top-20 hidden h-[calc(100vh-80px)] w-[260px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white xl:block">

          <div className="px-5 py-8">

            <div>

              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-violet-700">
                Foundations of AI
              </div>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950">
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

                      <div className="mt-3 text-[1rem] font-bold leading-8 text-slate-900">
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

        <section className="min-w-0 flex-1 px-6 py-14 md:px-10 xl:px-20">

          <div className="mx-auto max-w-5xl">

            <div className="mb-20">

              <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-bold text-violet-700 shadow-sm">
                {lessonMeta.duration}
              </div>

              <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
                {lessonMeta.title}
              </h1>

            </div>

            <article className="mdx-content">

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

            <div className="mt-28 flex flex-col gap-5 border-t border-slate-200 pt-10 md:flex-row md:items-center md:justify-between">

              {prevLesson ? (

                <Link
                  href={`/learning/foundations-of-ai/${module.slug}/${prevLesson.slug}`}
                  className="rounded-2xl border border-slate-300 bg-white px-7 py-5 shadow-sm hover:border-violet-300"
                >
                  ← {prevLesson.title}
                </Link>

              ) : (
                <div />
              )}

              {nextLesson ? (

                <Link
                  href={`/learning/foundations-of-ai/${module.slug}/${nextLesson.slug}`}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-5 font-bold text-white shadow-xl"
                >
                  {nextLesson.title} →
                </Link>

              ) : (

                <Link
                  href={`/learning/foundations-of-ai/quiz/${moduleSlug}`}
                  className="rounded-2xl bg-slate-950 px-8 py-5 font-bold text-white shadow-xl"
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