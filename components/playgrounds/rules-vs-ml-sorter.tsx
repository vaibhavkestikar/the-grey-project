"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Task = {
  id: string;
  text: string;
  answer: "rules" | "ml";
  why: string;
};

const TASKS: Task[] = [
  {
    id: "tax",
    text: "Calculate sales tax from a fixed rate table",
    answer: "rules",
    why: "Deterministic and legally specified, so write explicit code.",
  },
  {
    id: "phish",
    text: "Detect fresh phishing wording the system has never seen",
    answer: "ml",
    why: "Messy, evolving language, so learn patterns from examples.",
  },
  {
    id: "feed",
    text: "Personalise a feed for millions of users",
    answer: "ml",
    why: "Taste is subtle and differs per person, so learning beats hand written rules.",
  },
  {
    id: "kyc",
    text: "Block payouts before an identity check passes",
    answer: "rules",
    why: "A hard compliance constraint, so it must be explicit code.",
  },
];

export default function RulesVsMlSorter() {
  const [answers, setAnswers] = useState<Record<string, "rules" | "ml">>({});

  const done = Object.keys(answers).length === TASKS.length;
  const correct = TASKS.filter((t) => answers[t.id] === t.answer).length;

  function choose(id: string, choice: "rules" | "ml") {
    setAnswers((a) => ({ ...a, [id]: choice }));
  }

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Sort each task
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Classical rules or machine learning? Tap your call.
      </p>

      <div className="mt-5 space-y-3">
        {TASKS.map((t) => {
          const choice = answers[t.id];
          const isCorrect = choice === t.answer;
          return (
            <div
              key={t.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <p className="font-medium text-slate-900">{t.text}</p>
              <div className="mt-3 flex gap-2">
                {(["rules", "ml"] as const).map((opt) => {
                  const selected = choice === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => choose(t.id, opt)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                        selected
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-red-300 bg-red-50 text-red-600"
                          : "border-slate-200 text-slate-600 hover:border-violet-300"
                      }`}
                    >
                      {opt === "rules" ? "Rules / code" : "Machine learning"}
                    </button>
                  );
                })}
              </div>
              {choice && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-sm text-slate-600"
                >
                  {isCorrect ? "✅ " : "🤔 Closer fit: "}
                  {t.why}
                </motion.p>
              )}
            </div>
          );
        })}
      </div>

      {done && (
        <p className="mt-5 rounded-2xl bg-violet-50 p-4 text-center font-bold text-violet-800">
          {correct} of {TASKS.length} correct. Real systems blend both. Rules
          for hard constraints, learning for the messy parts.
        </p>
      )}
    </div>
  );
}
