"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Stage = {
  emoji: string;
  title: string;
  desc: string;
  risk: string;
};

const STAGES: Stage[] = [
  {
    emoji: "🎯",
    title: "Frame",
    desc: "Turn a business goal into a prediction task: what's the input, what's the label?",
    risk: "Bad framing wastes months.",
  },
  {
    emoji: "🗂️",
    title: "Data",
    desc: "Collect and label examples that reflect the real world at deployment time.",
    risk: "Leakage inflates scores, kills live performance.",
  },
  {
    emoji: "🏋️",
    title: "Train",
    desc: "Fit weights on training data, then validate on held out data that mimics production.",
    risk: "Beating a simple baseline is the real bar.",
  },
  {
    emoji: "📏",
    title: "Evaluate",
    desc: "Measure on fresh data and against business metrics, not just accuracy.",
    risk: "Offline ≠ online. A/B test impact.",
  },
  {
    emoji: "🚀",
    title: "Deploy",
    desc: "Serve predictions within latency + cost budgets, with safe fallbacks.",
    risk: "No fallback = outage when the model errors.",
  },
  {
    emoji: "📡",
    title: "Monitor",
    desc: "Watch drift and errors by segment; retrain when performance decays.",
    risk: "Silent decay is the #1 production failure.",
  },
];

export default function PipelineStepper() {
  const [i, setI] = useState(0);
  const stage = STAGES[i];

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        The real ML loop
      </p>

      <div className="mt-5 flex items-center justify-between gap-1">
        {STAGES.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setI(idx)}
            className="flex flex-1 flex-col items-center"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition ${
                idx === i
                  ? "bg-violet-600 text-white shadow-lg"
                  : idx < i
                    ? "bg-violet-100 text-violet-600"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {s.emoji}
            </span>
            <span
              className={`mt-1 hidden text-[10px] font-bold sm:block ${
                idx === i ? "text-violet-700" : "text-slate-400"
              }`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
          animate={{ width: `${((i + 1) / STAGES.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <motion.div
        key={i}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 rounded-2xl bg-slate-50 p-5"
      >
        <h4 className="text-xl font-black text-slate-950">
          {stage.emoji} {stage.title}
        </h4>
        <p className="mt-2 text-slate-600">{stage.desc}</p>
        <p className="mt-3 text-sm font-semibold text-red-500">⚠ {stage.risk}</p>
      </motion.div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => setI((v) => Math.max(0, v - 1))}
          disabled={i === 0}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => setI((v) => Math.min(STAGES.length - 1, v + 1))}
          disabled={i === STAGES.length - 1}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          Next stage →
        </button>
      </div>
    </div>
  );
}
