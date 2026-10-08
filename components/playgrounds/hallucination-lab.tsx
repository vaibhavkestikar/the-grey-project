"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HallucinationLab() {
  const [grounded, setGrounded] = useState(false);

  const answer = grounded
    ? {
        text: "I could not find a reliable source for the winner of a 2027 award that has not happened yet, so I will not guess.",
        confidence: 35,
        correct: true,
        tone: "honest",
      }
    : {
        text: "The 2027 prize was awarded to Dr. Elena Marquez for her work on quantum neural fields.",
        confidence: 92,
        correct: false,
        tone: "confident",
      };

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Hallucination lab
      </p>
      <p className="mt-2 text-sm text-slate-500">
        A model predicts the most likely next words. Likely is not the same as
        true. Watch what happens when we ask about something it cannot know.
      </p>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-500">The question</p>
        <p className="mt-1 text-base font-bold text-slate-900">
          Who won the 2027 Nobel Prize in Physics?
        </p>
      </div>

      <button
        type="button"
        onClick={() => setGrounded(!grounded)}
        className={`mt-4 w-full rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
          grounded
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : "border-slate-200 text-slate-600 hover:border-violet-300"
        }`}
      >
        {grounded
          ? "Grounding is ON: model can say I do not know"
          : "Grounding is OFF: model must answer from memory"}
      </button>

      <motion.div
        key={grounded ? "grounded" : "raw"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-4 rounded-2xl border p-4 ${
          answer.correct
            ? "border-emerald-200 bg-emerald-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        <p className="text-sm font-bold text-slate-900">The model replies:</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          {answer.text}
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Stated confidence</span>
            <span>{answer.confidence}%</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${answer.confidence}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${
                answer.correct ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
          </div>
        </div>

        <p
          className={`mt-3 text-sm font-bold ${
            answer.correct ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {answer.correct
            ? "Honest and useful. No source means no answer."
            : "Confidently wrong. This is a hallucination."}
        </p>
      </motion.div>

      <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-200">
        The raw model sounds most sure when it is making things up, because
        fluent text is its only goal. Giving it real sources and permission to
        say I do not know is how real products stop hallucinations.
      </div>
    </div>
  );
}
