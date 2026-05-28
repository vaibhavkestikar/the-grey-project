import Link from "next/link";

import Navbar from "@/components/layout/navbar";

import { courseModules } from "@/data/course-config";
import NotifyButton from "@/components/learning/notify-button";
export default function FoundationsDashboard() {

  return (

    <main className="min-h-screen bg-[#f7f8fc]">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white py-28">

        <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

          <div className="inline-flex rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
            AI ENGINEERING LEARNING PATH
          </div>

          <h1 className="mt-8 text-6xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">

            Foundations Of AI

          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-2xl leading-relaxed text-slate-600">

            Learn artificial intelligence from first principles
            with engineering depth, intuitive mental models,
            production-grade thinking, and real-world system understanding.

          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

            <div className="rounded-2xl bg-white px-6 py-5 shadow-lg">

              <p className="text-sm text-slate-500">
                Modules
              </p>

              <h3 className="mt-2 text-3xl font-black text-slate-950">
                2
              </h3>

            </div>

            <div className="rounded-2xl bg-white px-6 py-5 shadow-lg">

              <p className="text-sm text-slate-500">
                Lessons
              </p>

              <h3 className="mt-2 text-3xl font-black text-slate-950">
                10+
              </h3>

            </div>

            <div className="rounded-2xl bg-white px-6 py-5 shadow-lg">

              <p className="text-sm text-slate-500">
                Duration
              </p>

              <h3 className="mt-2 text-3xl font-black text-slate-950">
                14+ Hours
              </h3>

            </div>

            <div className="rounded-2xl bg-white px-6 py-5 shadow-lg">

              <p className="text-sm text-slate-500">
                Level
              </p>

              <h3 className="mt-2 text-3xl font-black text-slate-950">
                Beginner →
                Intermediate
              </h3>

            </div>

          </div>

        </div>

      </section>

      {/* MODULES */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-14">

            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Learning Modules
            </h2>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-slate-600">

              This learning path is intentionally structured
              to move from core AI intuition into production-grade
              generative AI systems engineering.

            </p>

          </div>

          <div className="space-y-10">

            {courseModules.map((module, index) => {

              const available =
                module.slug === "module-1";

              return (

                <div
                  key={module.slug}
                  className={`grid overflow-hidden rounded-[2.5rem] border lg:grid-cols-[1.1fr_1fr] ${
                    available
                      ? "border-slate-200 bg-white shadow-2xl"
                      : "border-slate-200 bg-white shadow-xl"
                  }`}
                >

                  {/* LEFT */}

                  <div
                    className={`p-12 text-white ${
                      available
                        ? "bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600"
                        : "bg-slate-900"
                    }`}
                  >

                    <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                      Module {index + 1}
                    </div>

                    <h3 className="mt-8 text-5xl font-black leading-tight">
                      {module.title}
                    </h3>

                    <p className="mt-8 text-lg leading-relaxed text-white/80">

                      {available
                        ? "Build a deep mental model of how modern artificial intelligence systems actually work under the hood. Learn prediction systems, machine learning workflows, neural networks, deep learning intuition, and production AI engineering."
                        : "Move beyond AI fundamentals into large language models, transformers, embeddings, vector databases, retrieval systems, AI agents, orchestration pipelines, inference optimization, and production-scale GenAI architectures."
                      }

                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                      <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                        <p className="text-sm text-white/70">
                          Lessons
                        </p>

                        <h4 className="mt-2 text-2xl font-black">
                          {available ? "6" : "8"}
                        </h4>

                      </div>

                      <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                        <p className="text-sm text-white/70">
                          Duration
                        </p>

                        <h4 className="mt-2 text-2xl font-black">
                          {available ? "~2 Hours" : "~6 Hours"}
                        </h4>

                      </div>

                      <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                        <p className="text-sm text-white/70">
                          Difficulty
                        </p>

                        <h4 className="mt-2 text-2xl font-black">
                          {available
                            ? "Beginner"
                            : "Intermediate"}
                        </h4>

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="flex flex-col justify-between p-12">

                    <div>

                      <h3 className="text-3xl font-black text-slate-900">
                        Lessons Included
                      </h3>

                      <div className="mt-8 space-y-5">

                        {available ? (

                          module.lessons.map((lesson) => (

                            <div
                              key={lesson.slug}
                              className="flex items-center gap-4"
                            >

                              <div className="h-3 w-3 rounded-full bg-violet-600" />

                              <p className="text-lg text-slate-700">
                                {lesson.title}
                              </p>

                            </div>

                          ))

                        ) : (

                          [
                            "Transformers & Attention",
                            "Embeddings & Vector Search",
                            "Tokenization Deep Dive",
                            "RAG Architecture",
                            "LLM Inference Systems",
                            "AI Agents & Tool Calling",
                            "Multi-Agent Systems",
                            "Production GenAI Engineering",
                          ].map((item) => (

                            <div
                              key={item}
                              className="flex items-center gap-4"
                            >

                              <div className="h-3 w-3 rounded-full bg-violet-600" />

                              <p className="text-lg text-slate-700">
                                {item}
                              </p>

                            </div>

                          ))

                        )}

                      </div>

                    </div>

                    <div className="mt-12">

                      {available ? (

                        <Link
                          href={`/learning/foundations-of-ai/${module.slug}/lesson-1`}
                          className="inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
                        >
                          Open Module →
                        </Link>

                      ) : (

                        <div>

                        <div className="flex flex-wrap items-center gap-4">

                            <div className="inline-flex rounded-2xl bg-slate-950 px-8 py-4 text-lg font-semibold text-white">
                            Coming Soon
                            </div>

                            <NotifyButton moduleName="module-2" />

                        </div>

                        <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-500">

                            This module is currently being designed
                            with deep visual explainability,
                            production architecture breakdowns,
                            retrieval systems, AI agents,
                            orchestration pipelines,
                            and real-world generative AI workflows.

                        </p>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

      </section>

      {/* CAPSTONE */}

      <section className="pb-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="rounded-[2.5rem] border border-dashed border-slate-300 bg-white p-16 text-center shadow-xl">

            <div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">
              FINAL CAPSTONE PROJECT
            </div>

            <h2 className="mt-8 text-5xl font-black text-slate-950">

              Build An AI Chatbot From Scratch

            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-xl leading-relaxed text-slate-600">

              Build a real-world conversational AI system from the ground up
              using embeddings, retrieval systems, vector databases,
              orchestration pipelines, prompt engineering,
              streaming inference, evaluation systems,
              and production-grade deployment workflows.

            </p>

            <div className="mt-12 inline-flex rounded-2xl bg-slate-950 px-8 py-5 text-lg font-bold text-white">
              Coming Soon
            </div>

          </div>

        </div>

      </section>

    </main>

  );
}