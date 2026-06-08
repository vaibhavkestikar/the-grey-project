"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useAuth } from "@/components/providers/auth-provider";
import LlmPipelineDemo from "@/components/playgrounds/llm-pipeline-demo";
import VantaNetBackground from "@/components/marketing/vanta-net-background";

export default function HomeHero() {
  const { user, loading } = useAuth();
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-6 md:pb-24 md:pt-16">
      <VantaNetBackground />
      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700">
            Your brain called. It wants the real story.
          </span>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-violet-200 bg-white/90 px-3 py-1 text-xs font-bold text-violet-700 shadow-sm">
              Earn Grey Points
            </span>
            <span className="rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
              Unlock practical assets
            </span>
            <span className="rounded-full border border-amber-200 bg-white/90 px-3 py-1 text-xs font-bold text-amber-700 shadow-sm">
              Skill badges, not fluff
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Understand AI
            <br />
            <span className="gradient-text">Like You Built It.</span>
          </h1>

          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-slate-50 p-5 shadow-sm md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                Not another AI learning site
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-800 md:text-lg">
                Interactive lessons on how{" "}
                <strong className="font-semibold text-slate-950">
                  language models
                </strong>
                ,{" "}
                <strong className="font-semibold text-slate-950">
                  recommenders
                </strong>
                , and{" "}
                <strong className="font-semibold text-slate-950">
                  fraud detectors
                </strong>{" "}
                actually work. Built for depth, not dopamine scroll content.
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-violet-100 pt-4 text-sm text-slate-700 md:text-base">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>
                    <strong className="font-semibold text-slate-900">
                      Visual sandboxes
                    </strong>{" "}
                    you poke, not slide decks you pretend to read
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>
                    <strong className="font-semibold text-slate-900">
                      Checkpoints
                    </strong>{" "}
                    that stick like good gossip
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  <span>
                    <strong className="font-semibold text-slate-900">
                      Grey Points
                    </strong>{" "}
                    and badges that prove progress without turning learning into a toy
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
                Built in production, taught in plain English
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-200 md:text-lg">
                I am{" "}
                <strong className="font-semibold text-white">
                  Vaibhav Kestikar
                </strong>
                , Senior Data Scientist. I ship AI systems for a living and built
                The Grey Project because most &ldquo;AI courses&rdquo; feel written by
                people who have never debugged a model at 2 a.m.
              </p>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              For curious people and developers who are done{" "}
              <strong className="font-semibold text-slate-800">
                nodding in meetings
              </strong>{" "}
              and{" "}
              <strong className="font-semibold text-slate-800">
                Googling on mute
              </strong>
              . Learn once. Actually remember it.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/try/prediction"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-700"
            >
              Start free
            </Link>
            {!loading && !user && (
              <Link
                href="/login"
                className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-center text-lg font-semibold text-slate-800 transition hover:border-violet-300"
              >
                Sign in
              </Link>
            )}
            <Link
              href="/learning"
              className="rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 text-center text-lg font-semibold text-slate-700 transition hover:border-violet-300 sm:w-auto"
            >
              Explore Paths
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="min-w-0"
        >
          <h2 className="mb-4 text-center text-lg font-black leading-snug text-slate-950 sm:text-xl lg:text-left">
            How Large Language Models turn a question into an answer
          </h2>
          <p className="mb-4 text-center text-sm text-slate-500 lg:text-left">
            Press a question. Watch the magic become math. (No wand required.)
          </p>
          <LlmPipelineDemo />
        </motion.div>
      </div>
    </section>
  );
}
