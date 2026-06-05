"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STEP_PAUSE_MS = 1000;

const QUESTIONS = [
  {
    id: "ml",
    text: "What is machine learning?",
    tokens: ["What", "is", "machine", "learning", "?"],
    predictWord: "Machine",
    confidence: "87%",
    reply:
      "Machine learning is when a computer finds patterns in examples, then uses those patterns to make predictions on new data.",
  },
  {
    id: "sky",
    text: "Why is the sky blue?",
    tokens: ["Why", "is", "the", "sky", "blue", "?"],
    predictWord: "Sunlight",
    confidence: "82%",
    reply:
      "Sunlight reaches Earth and blue light scatters more in the atmosphere, so the sky looks blue to our eyes.",
  },
] as const;

const STEPS = [
  {
    id: "type",
    title: "Your question goes in",
    detail: "Large Language Models (LLMs) receive plain text, not a web search.",
  },
  {
    id: "tokens",
    title: "Text becomes tokens",
    detail: "The LLM splits your message into small pieces it can process.",
  },
  {
    id: "model",
    title: "The LLM reads the full context",
    detail: "Patterns learned from billions of examples shape what comes next.",
  },
  {
    id: "predict",
    title: "It predicts the next word",
    detail: "Not lookup. The model chooses the most likely next token.",
  },
  {
    id: "output",
    title: "The answer is built word by word",
    detail: "Each predicted word is fed back in until the reply is complete.",
  },
] as const;

type Question = (typeof QUESTIONS)[number];

export default function LlmPipelineDemo() {
  const [selected, setSelected] = useState<Question | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [running, setRunning] = useState(false);
  const [outputText, setOutputText] = useState("");
  const [modelDone, setModelDone] = useState(false);
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearStream = useCallback(() => {
    if (streamRef.current) {
      clearInterval(streamRef.current);
      streamRef.current = null;
    }
  }, []);

  const pickQuestion = useCallback(
    (q: Question) => {
      if (running) return;
      clearStream();
      setSelected(q);
      setOutputText("");
      setModelDone(false);
      setRunning(true);
      setActiveStep(0);
    },
    [running, clearStream]
  );

  useEffect(() => {
    if (activeStep !== 2) return;
    setModelDone(false);
    const t = setTimeout(() => setModelDone(true), 700);
    return () => clearTimeout(t);
  }, [activeStep]);

  useEffect(() => {
    if (!running || !selected || activeStep < 0) return;

    if (activeStep === 4) {
      const words = selected.reply.split(" ");
      let i = 0;
      setOutputText("");
      streamRef.current = setInterval(() => {
        i += 1;
        setOutputText(words.slice(0, i).join(" "));
        if (i >= words.length) {
          clearStream();
          setRunning(false);
        }
      }, 65);
      return () => clearStream();
    }

    const t = setTimeout(() => setActiveStep((s) => s + 1), STEP_PAUSE_MS);
    return () => clearTimeout(t);
  }, [activeStep, running, selected, clearStream]);

  const revealed = (index: number) => activeStep >= index;

  return (
    <div className="overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-5 text-white shadow-2xl md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
        Interactive demo
      </p>
      <p className="mt-2 text-base font-semibold leading-snug text-slate-200 md:text-lg">
        Pick a question and watch how a Large Language Model (LLM) builds an
        answer, step by step.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {QUESTIONS.map((q) => {
          const isSelected = selected?.id === q.id;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => pickQuestion(q)}
              disabled={running}
              className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                isSelected
                  ? "border-violet-400 bg-violet-500/25 text-white"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/60 hover:bg-white/10"
              } disabled:opacity-60`}
            >
              {q.text}
            </button>
          );
        })}
      </div>

      {!selected && (
        <p className="mt-4 text-center text-xs text-slate-500">
          Choose a question to start the walkthrough.
        </p>
      )}

      {selected && (
        <div className="mt-6 space-y-2">
          {STEPS.map((step, index) => {
            const isActive = activeStep === index;
            const isDone = activeStep > index;
            const show = revealed(index);

            return (
              <motion.div
                key={step.id}
                layout
                className={`rounded-2xl border px-4 py-3 transition ${
                  isActive
                    ? "border-violet-400 bg-violet-500/20"
                    : isDone
                      ? "border-emerald-500/40 bg-emerald-500/10"
                      : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-violet-500 text-white"
                          : "bg-white/10 text-slate-500"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-bold ${
                        show ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    {show && (
                      <p className="mt-0.5 text-xs text-slate-400">{step.detail}</p>
                    )}

                    {show && step.id === "type" && (
                      <p className="mt-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-violet-100">
                        {selected.text}
                      </p>
                    )}

                    {show && step.id === "tokens" && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {selected.tokens.map((tok, i) => (
                          <span
                            key={`${tok}-${i}`}
                            className="rounded-md bg-violet-400/30 px-2 py-0.5 font-mono text-xs text-violet-100"
                          >
                            {tok}
                          </span>
                        ))}
                      </div>
                    )}

                    {show && step.id === "model" && (
                      <div className="mt-2">
                        {isActive && !modelDone ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                              <motion.div
                                className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet-400 to-blue-400"
                                animate={{ x: ["-100%", "300%"] }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 1.4,
                                  ease: "linear",
                                }}
                              />
                            </div>
                            <span className="text-xs text-violet-300">
                              Reading context...
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs font-semibold text-emerald-300">
                            Context processed across the full token sequence.
                          </p>
                        )}
                      </div>
                    )}

                    {show && step.id === "predict" && (
                      <div className="mt-2">
                        <p className="text-xs text-slate-400">
                          Most likely next word
                        </p>
                        <p className="mt-1 font-mono text-lg font-bold text-emerald-300">
                          {selected.predictWord}
                          <span className="ml-2 text-sm font-normal text-emerald-400/80">
                            {selected.confidence} confidence
                          </span>
                        </p>
                      </div>
                    )}

                    {show && step.id === "output" && outputText && (
                      <p className="mt-2 text-sm leading-relaxed text-slate-200">
                        {outputText}
                        {running && isActive && (
                          <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-violet-400" />
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {selected && !running && activeStep >= 4 && outputText === selected.reply && (
        <p className="mt-4 text-center text-xs text-emerald-400/90">
          Walkthrough complete. Tap the other question to compare the same LLM
          path.
        </p>
      )}
    </div>
  );
}
