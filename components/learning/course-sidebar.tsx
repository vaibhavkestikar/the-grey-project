import Link from "next/link";

import { foundationsCourse } from "@/data/foundations-course";

export default function CourseSidebar() {

  return (

    <aside className="sticky top-24 h-fit overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="border-b border-slate-100 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-8 text-white">

        <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
          Foundations of AI
        </div>

        <h2 className="mt-6 text-4xl font-black leading-tight">
          {foundationsCourse.title}
        </h2>

        <p className="mt-5 leading-relaxed text-violet-100">
          {foundationsCourse.description}
        </p>

        {/* OVERALL PROGRESS */}

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-semibold text-violet-100">
              Overall Progress
            </span>

            <span className="text-sm font-black">
              18%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/20">

            <div
              className="h-full rounded-full bg-white"
              style={{
                width: "18%",
              }}
            />

          </div>

        </div>

      </div>

      {/* MODULES */}

      <div className="space-y-4 p-5">

        {foundationsCourse.modules.map(
          (module, index) => {

            const completed =
              index === 0;

            const active =
              index === 1;

            return (

              <Link
                key={module.id}
                href={
                  module.available
                    ? `/learning/foundations-of-ai/${module.slug}`
                    : "#"
                }
                className={`group block rounded-[1.5rem] border p-5 transition-all duration-300 ${
                  active
                    ? "border-violet-200 bg-violet-50 shadow-md"
                    : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-md"
                } ${
                  !module.available
                    ? "cursor-not-allowed opacity-70"
                    : ""
                }`}
              >

                <div className="flex items-start justify-between gap-4">

                  {/* LEFT */}

                  <div className="min-w-0">

                    <div className="flex items-center gap-3">

                      <div className="text-sm font-bold uppercase tracking-wide text-violet-600">
                        Module {module.id}
                      </div>

                      {completed && (

                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-black text-white">
                          ✓
                        </div>

                      )}

                    </div>

                    <h3 className="mt-3 text-lg font-black leading-snug text-slate-900">

                      {module.title}

                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500">

                      {module.description}

                    </p>

                  </div>

                  {/* RIGHT */}

                  <div className="shrink-0 rounded-2xl bg-slate-100 px-4 py-3 text-center">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-black text-slate-900">
                      {module.duration}
                    </p>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                  <div className="flex items-center gap-3">

                    <div
                      className={`h-3 w-3 rounded-full ${
                        module.available
                          ? "bg-green-500"
                          : "bg-amber-400"
                      }`}
                    />

                    <span className="text-sm font-semibold text-slate-600">

                      {module.available
                        ? "Available"
                        : "Coming Soon"}

                    </span>

                  </div>

                  <div className="text-sm font-bold text-violet-600 transition group-hover:translate-x-1">

                    {module.available
                      ? "Open →"
                      : "Notify Me"}

                  </div>

                </div>

              </Link>

            );
          }
        )}

      </div>

      {/* CAPSTONE */}

      <div className="border-t border-slate-200 bg-slate-50 p-6">

        <div className="rounded-[1.5rem] border border-dashed border-violet-300 bg-white p-6">

          <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-violet-700">
            Capstone Project
          </div>

          <h3 className="mt-5 text-2xl font-black leading-tight text-slate-900">

            Build An AI Chatbot
            From Scratch

          </h3>

          <p className="mt-4 leading-relaxed text-slate-600">

            Apply everything from neural networks,
            embeddings, prompting, retrieval systems,
            vector databases, and production AI workflows
            into a real-world deployable chatbot system.

          </p>

        </div>

      </div>

    </aside>

  );
}