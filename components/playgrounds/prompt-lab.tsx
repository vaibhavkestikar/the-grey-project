"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Technique = {
  id: string;
  label: string;
  hint: string;
  points: number;
  adds: string;
};

const TECHNIQUES: Technique[] = [
  {
    id: "role",
    label: "Give it a role",
    hint: "“You are a senior data scientist…”",
    points: 15,
    adds: "Acts as an expert, not a generalist.",
  },
  {
    id: "context",
    label: "Add context",
    hint: "Audience, goal, constraints",
    points: 25,
    adds: "Tailors the answer to your real situation.",
  },
  {
    id: "example",
    label: "Show an example",
    hint: "One sample of what 'good' looks like",
    points: 25,
    adds: "Anchors format and quality, also called few shot.",
  },
  {
    id: "format",
    label: "Specify the format",
    hint: "“Reply as 3 bullet points”",
    points: 20,
    adds: "Output is usable without cleanup.",
  },
];

const BASE = "Explain machine learning.";

export default function PromptLab() {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const score = useMemo(() => {
    const sum = TECHNIQUES.reduce(
      (acc, t) => acc + (active[t.id] ? t.points : 0),
      15
    );
    return Math.min(100, sum);
  }, [active]);

  const prompt = useMemo(() => {
    let p = "";
    if (active.role) p += "You are a senior data scientist mentoring a junior. ";
    if (active.context)
      p += "I build web apps and have never trained a model. ";
    p += BASE;
    if (active.example)
      p += " Example of the depth I want: 'A spam filter learns from labeled emails.'";
    if (active.format) p += " Answer in 3 short bullet points.";
    return p;
  }, [active]);

  const quality =
    score >= 85
      ? { tone: "text-emerald-600", bar: "bg-emerald-500", label: "Excellent prompt" }
      : score >= 55
        ? { tone: "text-amber-600", bar: "bg-amber-500", label: "Decent prompt" }
        : { tone: "text-red-500", bar: "bg-red-400", label: "Vague prompt" };

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Prompt lab
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Toggle techniques and watch prompt quality climb.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {TECHNIQUES.map((t) => {
          const on = !!active[t.id];
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive((a) => ({ ...a, [t.id]: !a[t.id] }))}
              className={`rounded-2xl border p-4 text-left transition ${
                on
                  ? "border-violet-500 bg-violet-50"
                  : "border-slate-200 hover:border-violet-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{t.label}</span>
                <span
                  className={`flex h-5 w-9 items-center rounded-full px-0.5 transition ${
                    on ? "justify-end bg-violet-500" : "justify-start bg-slate-300"
                  }`}
                >
                  <span className="h-4 w-4 rounded-full bg-white" />
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{t.hint}</p>
              {on && <p className="mt-2 text-xs text-violet-700">{t.adds}</p>}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="mb-1 flex justify-between text-sm">
          <span className={quality.tone}>{quality.label}</span>
          <span className="font-mono font-bold">{score}/100</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className={`h-full rounded-full ${quality.bar}`}
            animate={{ width: `${score}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-950 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Your prompt
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-200">{prompt}</p>
      </div>
    </div>
  );
}
