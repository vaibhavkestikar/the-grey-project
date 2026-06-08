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
            Interactive AI learning. Free to start.
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Learn How AI
            <br />
            <span className="gradient-text">Actually Works.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">
            Practical lessons on{" "}
            <strong className="font-semibold text-slate-950">LLMs</strong>,{" "}
            <strong className="font-semibold text-slate-950">ML systems</strong>, and{" "}
            <strong className="font-semibold text-slate-950">production AI</strong>.
            Run Python in your browser. Earn Grey Points. No slide decks.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-slate-600 md:text-base">
            <li className="flex gap-2">
              <span className="text-violet-600">✓</span>
              <span>Visual sandboxes + checkpoints that stick</span>
            </li>
            <li className="flex gap-2">
              <span className="text-violet-600">✓</span>
              <span>Built by a Senior Data Scientist who ships AI in production</span>
            </li>
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/try/prediction"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-center text-lg font-semibold text-white shadow-xl shadow-violet-200 transition hover:bg-violet-700"
            >
              Start free lesson
            </Link>
            {!loading && !user && (
              <Link
                href="/login"
                className="hidden rounded-2xl border border-slate-200 bg-white px-8 py-4 text-center text-lg font-semibold text-slate-800 transition hover:border-violet-300 sm:inline-flex"
              >
                Sign in
              </Link>
            )}
            <Link
              href="/learning"
              className="rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 text-center text-lg font-semibold text-slate-700 transition hover:border-violet-300 sm:w-auto"
            >
              View learning paths
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
            See an LLM answer a question, step by step
          </h2>
          <p className="mb-4 text-center text-sm text-slate-500 lg:text-left">
            Tap a prompt. Watch tokens, attention, and output unfold.
          </p>
          <LlmPipelineDemo />
        </motion.div>
      </div>
    </section>
  );
}
