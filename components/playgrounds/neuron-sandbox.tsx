"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Scenario = {
  id: string;
  emoji: string;
  title: string;
  story: string;
  inputLabel: string;
  weightLabel: string;
  biasLabel: string;
  outputLabel: string;
  defaultInput: number;
  defaultWeight: number;
  defaultBias: number;
};

const SCENARIOS: Scenario[] = [
  {
    id: "spam",
    emoji: "📧",
    title: "Spam filter",
    story: "How strongly should suspicious wording push this email toward 'spam'?",
    inputLabel: "Suspicious signals in email",
    weightLabel: "Importance of those signals",
    biasLabel: "Default skepticism (bias)",
    outputLabel: "Likelihood this is spam",
    defaultInput: 0.75,
    defaultWeight: 1.4,
    defaultBias: -0.5,
  },
  {
    id: "movie",
    emoji: "🎬",
    title: "Movie pick",
    story: "Will this user click a sci-fi recommendation tonight?",
    inputLabel: "Match with past watches",
    weightLabel: "How much taste history matters",
    biasLabel: "Baseline interest in genre",
    outputLabel: "Chance they'll click",
    defaultInput: 0.6,
    defaultWeight: 1.1,
    defaultBias: 0.1,
  },
  {
    id: "churn",
    emoji: "📉",
    title: "Churn risk",
    story: "Is this customer likely to cancel their subscription?",
    inputLabel: "Recent usage drop",
    weightLabel: "Sensitivity to usage",
    biasLabel: "Overall account health",
    outputLabel: "Risk of churn",
    defaultInput: 0.55,
    defaultWeight: 1.6,
    defaultBias: -0.2,
  },
];

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function verdict(output: number, label: string) {
  const pct = Math.round(output * 100);
  if (output >= 0.7) {
    return { pct, text: `Strong yes for ${label}`, tone: "text-emerald-300", bar: "bg-emerald-400" };
  }
  if (output >= 0.5) {
    return { pct, text: `Leaning yes for ${label}`, tone: "text-amber-200", bar: "bg-amber-400" };
  }
  if (output >= 0.3) {
    return { pct, text: `Uncertain, needs more signal`, tone: "text-slate-300", bar: "bg-slate-400" };
  }
  return { pct, text: `Likely no for ${label}`, tone: "text-violet-200", bar: "bg-violet-400" };
}

type Props = { compact?: boolean; variant?: string };

export default function NeuronSandbox({ compact, variant }: Props) {
  const initialId = SCENARIOS.find((s) => s.id === variant)?.id ?? SCENARIOS[0].id;
  const [scenarioId, setScenarioId] = useState(initialId);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0];

  const [input, setInput] = useState(scenario.defaultInput);
  const [weight, setWeight] = useState(scenario.defaultWeight);
  const [bias, setBias] = useState(scenario.defaultBias);

  useEffect(() => {
    setInput(scenario.defaultInput);
    setWeight(scenario.defaultWeight);
    setBias(scenario.defaultBias);
  }, [scenario]);

  const weighted = input * weight + bias;
  const output = sigmoid(weighted);
  const v = verdict(output, scenario.outputLabel);

  const sliders = useMemo(
    () => [
      {
        label: scenario.inputLabel,
        hint: "Strength of the signal",
        value: input,
        set: setInput,
        min: 0,
        max: 1,
        step: 0.02,
      },
      {
        label: scenario.weightLabel,
        hint: "How much the model listens",
        value: weight,
        set: setWeight,
        min: 0,
        max: 2.5,
        step: 0.05,
      },
      {
        label: scenario.biasLabel,
        hint: "Starting point before evidence",
        value: bias,
        set: setBias,
        min: -1,
        max: 1,
        step: 0.05,
      },
    ],
    [scenario, input, weight, bias]
  );

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-violet-300/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white shadow-2xl ${
        compact ? "p-4 md:p-6" : "p-6 md:p-10"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Interactive neuron
          </p>
          <p className="mt-1 text-lg font-bold">{scenario.title}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenarioId(s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                s.id === scenarioId
                  ? "bg-white text-slate-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {s.emoji} {s.title}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-300">{scenario.story}</p>

      {/* Visual flow */}
      <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <NodeCard
          label="Inputs"
          value={input}
          sub={scenario.inputLabel}
          active={input > 0.4}
        />
        <FlowArrow label={`× ${weight.toFixed(2)}`} />
        <NodeCard
          label="Combine + bias"
          value={weighted}
          sub={`${(input * weight).toFixed(2)} + ${bias.toFixed(2)}`}
          raw
        />
        <FlowArrow label="σ" />
        <NodeCard
          label="Decision"
          value={output}
          sub={v.text}
          highlight
          verdictClass={v.tone}
        />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs">
          <span className={v.tone}>{v.text}</span>
          <span className="font-mono font-bold">{v.pct}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className={`h-full rounded-full ${v.bar}`}
            animate={{ width: `${v.pct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="mb-1 flex justify-between gap-2 text-sm">
              <span className="font-medium text-slate-200">{s.label}</span>
              <span className="shrink-0 font-mono text-violet-200">{s.value.toFixed(2)}</span>
            </div>
            <p className="mb-2 text-xs text-slate-500">{s.hint}</p>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(parseFloat(e.target.value))}
              className="w-full accent-violet-400"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-relaxed text-slate-400">
        <strong className="text-slate-200">Formula:</strong> score = input × weight + bias, then
        squash with sigmoid into a readable probability. Deep networks stack thousands of these.
      </p>
    </div>
  );
}

function NodeCard({
  label,
  value,
  sub,
  active,
  raw,
  highlight,
  verdictClass,
}: {
  label: string;
  value: number;
  sub: string;
  active?: boolean;
  raw?: boolean;
  highlight?: boolean;
  verdictClass?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: active || highlight ? 1.02 : 1,
        boxShadow: highlight
          ? "0 0 24px rgba(167, 139, 250, 0.35)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      className={`rounded-2xl border p-4 text-center ${
        highlight ? "border-violet-400/50 bg-violet-500/20" : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-black ${verdictClass ?? "text-white"}`}>
        {raw ? value.toFixed(2) : `${Math.round(value * (raw ? 1 : 100))}${raw ? "" : "%"}`}
      </p>
      <p className="mt-2 text-xs leading-snug text-slate-400">{sub}</p>
    </motion.div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="hidden flex-col items-center justify-center text-violet-400 md:flex">
      <span className="text-2xl">→</span>
      <span className="text-[10px] font-mono">{label}</span>
    </div>
  );
}
