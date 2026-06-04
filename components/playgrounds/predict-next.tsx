"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Candidate = { label: string; prob: number };

type Scenario = {
  prompt: string;
  question: string;
  candidates: Candidate[];
  takeaway: string;
};

const SCENARIOS: Record<string, Scenario> = {
  sentence: {
    prompt: "“The cat sat on the ___”",
    question: "Which word comes next?",
    candidates: [
      { label: "mat", prob: 0.58 },
      { label: "floor", prob: 0.22 },
      { label: "sofa", prob: 0.14 },
      { label: "moon", prob: 0.06 },
    ],
    takeaway:
      "You did not look it up. You predicted from patterns. That is exactly what a language model does, just over billions of examples.",
  },
  movie: {
    prompt: "You just watched 3 science fiction films. The app suggests...",
    question: "What is it most likely to recommend?",
    candidates: [
      { label: "Interstellar", prob: 0.52 },
      { label: "Dune", prob: 0.3 },
      { label: "A cooking show", prob: 0.1 },
      { label: "A romance film", prob: 0.08 },
    ],
    takeaway:
      "Recommenders predict the next click from your history. Same prediction engine, different data.",
  },
};

export default function PredictNext({ variant }: { variant?: string }) {
  const scenario = SCENARIOS[variant ?? "sentence"] ?? SCENARIOS.sentence;
  const [picked, setPicked] = useState<string | null>(null);
  const top = [...scenario.candidates].sort((a, b) => b.prob - a.prob)[0];

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Predict the next token
      </p>
      <p className="mt-3 text-xl font-black text-slate-950">{scenario.prompt}</p>
      <p className="mt-1 text-sm text-slate-500">{scenario.question}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {scenario.candidates.map((c) => {
          const revealed = picked !== null;
          const isPick = picked === c.label;
          const isTop = c.label === top.label;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setPicked(c.label)}
              className={`overflow-hidden rounded-2xl border px-4 py-3 text-left transition ${
                isPick
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 hover:border-violet-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{c.label}</span>
                {revealed && (
                  <span
                    className={`text-sm font-bold ${
                      isTop ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    {Math.round(c.prob * 100)}%
                  </span>
                )}
              </div>
              {revealed && (
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.prob * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      isTop ? "bg-emerald-500" : "bg-violet-300"
                    }`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {picked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-200"
        >
          {picked === top.label
            ? "You picked the most likely option. The model would agree."
            : `The model's top guess was “${top.label}”. Yours was reasonable too. Prediction is about probability, not certainty.`}
          <p className="mt-2 text-slate-400">{scenario.takeaway}</p>
        </motion.div>
      )}
    </div>
  );
}
