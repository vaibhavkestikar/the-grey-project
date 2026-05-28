import Link from "next/link";

import { getResumeLesson } from "@/lib/get-resume-lesson";

export default async function ResumeLearning() {

  const lesson =
    await getResumeLesson();

  if (!lesson) return null;

  return (

    <section className="py-6 md:py-10">

      <div className="mx-auto max-w-7xl px-4 md:px-6">

        <div className="overflow-hidden rounded-[1.5rem] border border-violet-200 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-6 text-white shadow-2xl md:rounded-[2rem] md:p-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}

            <div className="max-w-3xl">

              <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold backdrop-blur md:text-sm">
                CONTINUE LEARNING
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight md:mt-6 md:text-5xl">
                Resume Your
                <br />
                AI Journey
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-violet-100 md:text-xl">

                Continue exactly where you left off.

              </p>

              {/* STATS */}

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Current Module
                  </p>

                  <h3 className="mt-2 text-lg font-black capitalize md:text-2xl">
                    {lesson.module_slug.replace("-", " ")}
                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Current Lesson
                  </p>

                  <h3 className="mt-2 text-lg font-black capitalize md:text-2xl">
                    {lesson.lesson_slug.replace("-", " ")}
                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Progress
                  </p>

                  <h3 className="mt-2 text-lg font-black md:text-2xl">
                    {lesson.progress_percent}%
                  </h3>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="w-full lg:w-auto">

              <Link
                href={`/learning/foundations-of-ai/${lesson.module_slug}/${lesson.lesson_slug}`}
                className="flex w-full items-center justify-center rounded-2xl bg-white px-8 py-5 text-center text-lg font-bold text-violet-700 shadow-xl transition hover:scale-[1.02] lg:w-auto"
              >
                Resume Learning →
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
}