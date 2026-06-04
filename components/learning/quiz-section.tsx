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

export default function QuizSection() {

  const [selectedAnswers, setSelectedAnswers] =
    useState<number[]>([]);

  const [submitted, setSubmitted] =
    useState(false);

  const score = questions.reduce(
    (acc, q, i) =>
      selectedAnswers[i] === q.answer
        ? acc + 1
        : acc,
    0
  );

  return (
    <section className="mt-16 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">

      <div className="mb-6 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
        FINAL ASSESSMENT
      </div>

      <h2 className="text-5xl font-black text-slate-900">
        Module 1 Assessment
      </h2>

      <p className="mt-4 text-xl text-slate-600">
        Evaluate your conceptual AI understanding deeply.
      </p>

      <div className="mt-12 space-y-12">

        {questions.map((question, qIndex) => (

          <div key={qIndex}>

            <h3 className="text-2xl font-bold text-slate-900">
              {qIndex + 1}. {question.question}
            </h3>

            <div className="mt-6 space-y-4">

              {question.options.map(
                (option, oIndex) => {

                  const isCorrect =
                    submitted &&
                    oIndex === question.answer;

                  const isWrong =
                    submitted &&
                    selectedAnswers[qIndex] ===
                      oIndex &&
                    oIndex !== question.answer;

                  return (
                    <button
                      key={oIndex}
                      disabled={submitted}
                      onClick={() => {

                        const updated = [
                          ...selectedAnswers,
                        ];

                        updated[qIndex] = oIndex;

                        setSelectedAnswers(
                          updated
                        );
                      }}
                      className={`block w-full rounded-2xl border p-5 text-left transition ${
                        isCorrect
                          ? "border-green-400 bg-green-50"
                          : isWrong
                          ? "border-red-400 bg-red-50"
                          : selectedAnswers[
                              qIndex
                            ] === oIndex
                          ? "border-violet-400 bg-violet-50"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >

                      {option}

                    </button>
                  );
                }
              )}

            </div>

          </div>

        ))}

      </div>

      {!submitted ? (

        <button
          onClick={() => setSubmitted(true)}
          className="mt-12 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
        >
          Submit Assessment
        </button>

      ) : (

        <div className="mt-12 rounded-[2rem] bg-green-100 p-10">

          <h3 className="text-4xl font-black text-green-800">
            Your Score: {score}/{questions.length}
          </h3>

          <p className="mt-4 text-lg text-green-700">
            Strong AI engineers understand systems deeply,
            not just tools and APIs.
          </p>

        </div>

      )}

    </section>
  );
}