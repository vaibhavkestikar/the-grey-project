"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getLessonBySlug } from "@/data/curious-builders-path";
import { createClient } from "@/lib/supabase/client";

type ResumeProgress = {
  lesson_slug: string;
  course_slug: string;
  progress_percent: number;
};

export default function ResumeLearning() {
  const [lesson, setLesson] = useState<ResumeProgress | null>(null);

  useEffect(() => {
    void (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("lesson_progress")
        .select("lesson_slug, course_slug, progress_percent")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error || !data) return;
      setLesson(data);
    })();
  }, []);

  if (!lesson) return null;

  const meta = getLessonBySlug(lesson.lesson_slug);
  const href = `/learning/curious-builders/${lesson.lesson_slug}`;

  return (
    <section className="px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[1.5rem] border border-violet-200 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-6 text-white shadow-2xl md:rounded-[2rem] md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">
                Continue learning
              </p>
              <h2 className="path-card-title mt-2 text-2xl font-black md:text-4xl">
                {meta?.title ?? lesson.lesson_slug.replace(/-/g, " ")}
              </h2>
              <p className="mt-2 text-violet-100">
                {lesson.progress_percent}% complete · Curious Builders
              </p>
            </div>
            <Link
              href={href}
              className="rounded-2xl bg-white px-8 py-4 text-center font-bold text-violet-700 shadow-xl"
            >
              Resume →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
