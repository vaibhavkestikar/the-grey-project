"use client";

import { useState } from "react";

import Navbar from "@/components/layout/navbar";

const questions = [

  {
    question:
      "What fundamentally changed software engineering with machine learning?",
    options: [
      "Software became cheaper",
      "Rules started being learned from data",
      "Programming languages evolved",
      "Computers became conscious",
    ],
    answer: 1,
  },

  {
    question:
      "Why are LLMs probabilistic systems?",
    options: [
      "They memorize databases",
      "They retrieve exact truths",
      "They predict token probabilities",
      "They think symbolically",
    ],
    answer: 2,
  },

  {
    question:
      "What is the biggest misconception beginners have about AI?",
    options: [
      "AI uses GPUs",
      "AI models truly understand concepts",
      "Python is required",
      "Neural networks use tensors",
    ],
    answer: 1,
  },

  {
    question:
      "Why do hallucinations happen in LLMs?",
    options: [
      "Models optimize plausibility, not truth",
      "Databases fail",
      "Internet disconnects",
      "GPU memory overflows",
    ],
    answer: 0,
  },

  {
    question:
      "What made deep learning practical at scale?",
    options: [
      "Cloud gaming",
      "SQL databases",
      "GPUs and transformers",
      "JavaScript frameworks",
    ],
    answer: 2,
  },

  {
    question:
      "What is the true role of AI engineering?",
    options: [
      "Only training models",
      "Only prompt engineering",
      "Building reliable systems around models",
      "Replacing software engineering",
    ],
    answer: 2,
  },

  {
    question:
      "Why is production AI difficult?",
    options: [
      "Models are deterministic",
      "AI systems are probabilistic",
      "Python is slow",
      "GPUs are expensive",
    ],
    answer: 1,
  },

  {
    question:
      "What do neural networks fundamentally learn?",
    options: [
      "Conscious reasoning",
      "Hardcoded symbolic logic",
      "Hierarchical representations",
      "Database joins",
    ],
    answer: 2,
  },

  {
    question:
      "What is the core objective of LLM training?",
    options: [
      "Truth optimization",
      "Next-token prediction",
      "Database retrieval",
      "Human imitation",
    ],
    answer: 1,
  },

  {
    question:
      "What separates serious AI engineers from beginners?",
    options: [
      "Prompt engineering",
      "Understanding systems engineering deeply",
      "Using ChatGPT frequently",
      "Knowing many libraries",
    ],
    answer: 1,
  },

];

export default function Module1QuizPage() {

  const [current, setCurrent] = useState(0);

  const [score, setScore] = useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [finished, setFinished] = useState(false);

  function handleNext() {

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    if (current + 1 < questions.length) {

      setCurrent(current + 1);

      setSelected(null);

    } else {

      setFinished(true);

    }
  }

  return (

    <main className="min-h-screen bg-[#f7f8fc]">

      <Navbar />

      <section className="py-24">

        <div className="mx-auto max-w-4xl px-6">

          {!finished ? (

            <div className="rounded-[2rem] bg-white p-12 shadow-xl">

              <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
                MODULE 1 FINAL QUIZ
              </div>

              <h1 className="mt-8 text-5xl font-black text-slate-950">
                Question {current + 1}
              </h1>

              <p className="mt-8 text-2xl leading-relaxed text-slate-700">
                {questions[current].question}
              </p>

              <div className="mt-10 space-y-4">

                {questions[current].options.map(
                  (option, index) => (

                    <button
                      key={option}
                      onClick={() =>
                        setSelected(index)
                      }
                      className={`block w-full rounded-2xl border p-5 text-left text-lg font-semibold transition ${
                        selected === index
                          ? "border-violet-600 bg-violet-50"
                          : "border-slate-200 bg-white hover:border-violet-300"
                      }`}
                    >
                      {option}
                    </button>

                  )
                )}

              </div>

              <button
                onClick={handleNext}
                disabled={selected === null}
                className="mt-10 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                Next →
              </button>

            </div>

          ) : (

            <div className="rounded-[2rem] bg-white p-16 text-center shadow-xl">

              <div className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                QUIZ COMPLETED
              </div>

              <h1 className="mt-8 text-6xl font-black text-slate-950">
                {score}/10
              </h1>

              <p className="mt-6 text-2xl text-slate-600">
                You completed Module 1 Assessment.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>

  );
}