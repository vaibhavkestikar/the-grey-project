"use client";

import { useState } from "react";

const questions = [
  {
    question:
      "Why did AI capability suddenly accelerate in recent years?",

    options: [
      "AI became conscious",
      "GPUs, data, transformers, and cloud infrastructure matured together",
      "Developers wrote better if-statements",
      "The internet became smaller",
    ],

    answer: 1,
  },

  {
    question:
      "What is the core difference between traditional software and machine learning?",

    options: [
      "ML uses electricity",
      "Traditional programming uses explicit rules while ML learns patterns from data",
      "Traditional programming cannot scale",
      "ML removes the need for logic",
    ],

    answer: 1,
  },

  {
    question:
      "Why are production AI systems difficult to maintain?",

    options: [
      "AI systems behave probabilistically and degrade unpredictably",
      "Python is slow",
      "Neural networks use too many files",
      "Frontend systems cannot connect to AI",
    ],

    answer: 0,
  },

  {
    question:
      "What fundamentally drives learning in machine learning systems?",

    options: [
      "Random guessing forever",
      "Reducing prediction error through optimization",
      "Internet downloads",
      "Prompt engineering",
    ],

    answer: 1,
  },

  {
    question:
      "Why do LLMs appear intelligent despite not being conscious?",

    options: [
      "Because they memorize every website",
      "Because language contains enormous structure and statistical patterns",
      "Because GPUs simulate brains",
      "Because transformers create emotions",
    ],

    answer: 1,
  },

  {
    question:
      "What is a major misconception beginners make about AI?",

    options: [
      "Assuming AI learns exactly like humans",
      "Thinking APIs exist",
      "Using Python",
      "Learning statistics",
    ],

    answer: 0,
  },

  {
    question:
      "What role do neural network layers play?",

    options: [
      "Increasing internet bandwidth",
      "Detecting increasingly abstract representations",
      "Removing data requirements",
      "Compressing prompts",
    ],

    answer: 1,
  },

  {
    question:
      "Why are pretrained foundation models widely used in industry?",

    options: [
      "Training frontier models is extremely expensive",
      "Neural networks stopped working",
      "APIs are illegal",
      "GPUs became obsolete",
    ],

    answer: 0,
  },

  {
    question:
      "Why do hallucinations occur in LLMs?",

    options: [
      "Models optimize plausibility instead of truth",
      "Transformers overheat",
      "Cloud providers corrupt outputs",
      "Databases fail randomly",
    ],

    answer: 0,
  },

  {
    question:
      "What best describes modern AI engineering?",

    options: [
      "Pure mathematics research only",
      "Prompt writing only",
      "Systems engineering around probabilistic models",
      "Frontend design",
    ],

    answer: 2,
  },
];

function optionClass(
  submitted: boolean,
  selected: number | undefined,
  oIndex: number,
  correctIndex: number
) {
  const isSelected = selected === oIndex;
  const isCorrect = submitted && oIndex === correctIndex;
  const isWrong = submitted && isSelected && oIndex !== correctIndex;

  if (isCorrect) {
    return "border-cyan-400/70 bg-cyan-500/15 text-slate-100";
  }
  if (isWrong) {
    return "border-red-400/60 bg-red-500/10 text-slate-100";
  }
  if (isSelected) {
    return "border-violet-400/70 bg-violet-500/15 text-slate-100";
  }
  return "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-cyan-500/40 hover:bg-slate-800/80";
}

export default function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce(
    (acc, q, i) =>
      selectedAnswers[i] === q.answer ? acc + 1 : acc,
    0
  );

  return (
    <section className="premium-card mt-16 p-10">

      <div className="site-badge mb-6">
        FINAL ASSESSMENT
      </div>

      <h2 className="text-5xl font-black text-slate-50">
        Module 1 Assessment
      </h2>

      <p className="mt-4 text-xl text-slate-400">
        Evaluate your conceptual AI understanding deeply.
      </p>

      <div className="mt-12 space-y-12">
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h3 className="text-2xl font-bold text-slate-50">
              {qIndex + 1}. {question.question}
            </h3>

            <div className="mt-6 space-y-4">
              {question.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  disabled={submitted}
                  onClick={() => {
                    const updated = [...selectedAnswers];
                    updated[qIndex] = oIndex;
                    setSelectedAnswers(updated);
                  }}
                  className={`block w-full rounded-2xl border p-5 text-left transition ${optionClass(
                    submitted,
                    selectedAnswers[qIndex],
                    oIndex,
                    question.answer
                  )}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          className="btn-home-cta mt-12 px-8 py-4 text-lg"
        >
          Submit Assessment
        </button>
      ) : (
        <div className="mt-12 rounded-[2rem] border border-cyan-500/30 bg-cyan-500/10 p-10">
          <h3 className="text-4xl font-black text-cyan-200">
            Your Score: {score}/{questions.length}
          </h3>

          <p className="mt-4 text-lg text-slate-300">
            Strong AI engineers understand systems deeply,
            not just tools and APIs.
          </p>
        </div>
      )}
    </section>
  );
}
