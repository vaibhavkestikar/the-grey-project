import Link from "next/link";

import { getResumeLesson } from "@/lib/get-resume-lesson";

export default async function ResumeLearning() {

  const lesson =
    await getResumeLesson();

  if (!lesson) return null;

  return (

    <section className="py-10">

      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-10 text-white shadow-2xl">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* LEFT */}

            <div>

              <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                CONTINUE LEARNING
              </div>

              <h2 className="mt-6 text-4xl font-black">
                Resume Your AI Journey
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-violet-100">

                Continue exactly where you left off.

              </p>

              {/* STATS */}

              <div className="mt-8 flex flex-wrap gap-4">

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Current Module
                  </p>

                  <h3 className="mt-2 text-xl font-black capitalize">
                    {lesson.module_slug.replace("-", " ")}
                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Current Lesson
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {lesson.lesson_slug.replace("-", " ")}
                  </h3>

                </div>

                <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                  <p className="text-sm text-violet-100">
                    Progress
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {lesson.progress_percent}%
                  </h3>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              <Link
                href={`/learning/foundations-of-ai/${lesson.module_slug}/${lesson.lesson_slug}`}
                className="inline-flex rounded-2xl bg-white px-8 py-5 text-lg font-bold text-violet-700 shadow-xl transition hover:scale-[1.02]"
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