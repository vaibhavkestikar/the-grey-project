"use client";

import { useMemo, useState } from "react";

const PRESETS = [
  "Understanding AI is simpler than you think.",
  "The Grey Project teaches you to think like a model.",
  "antidisestablishmentarianism",
  "I love pizza 🍕 and machine learning.",
];

const COLORS = [
  "bg-violet-100 text-violet-800",
  "bg-blue-100 text-blue-800",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-pink-100 text-pink-800",
];

function tokenize(text: string): string[] {
  const pieces = text.match(/\s+|[^\s]+/g) ?? [];
  const tokens: string[] = [];
  for (const piece of pieces) {
    if (/^\s+$/.test(piece)) continue;
    if (piece.length <= 5) {
      tokens.push(piece);
    } else {
      for (let i = 0; i < piece.length; i += 4) {
        tokens.push(piece.slice(i, i + 4));
      }
    }
  }
  return tokens;
}

export default function Tokenizer() {
  const [text, setText] = useState(PRESETS[0]);
  const tokens = useMemo(() => tokenize(text), [text]);

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Tokenizer playground
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Models never see words. They see tokens. Type anything and watch your
        text break into the pieces a model actually reads.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-base outline-none transition focus:border-violet-500"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setText(p)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-violet-300 hover:text-violet-600"
          >
            {p.length > 22 ? `${p.slice(0, 22)}...` : p}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tokens.map((tok, i) => (
          <span
            key={`${tok}-${i}`}
            className={`rounded-lg px-2 py-1 font-mono text-sm ${COLORS[i % COLORS.length]}`}
          >
            {tok}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-2xl font-black text-violet-700">{tokens.length}</p>
          <p className="text-xs font-semibold text-slate-500">tokens</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-2xl font-black text-slate-900">{text.length}</p>
          <p className="text-xs font-semibold text-slate-500">characters</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-2xl font-black text-slate-900">
            {text.trim() ? text.trim().split(/\s+/).length : 0}
          </p>
          <p className="text-xs font-semibold text-slate-500">words</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-200">
        Notice how rare or long words split into several tokens, while common
        words stay whole. On average a token is about four characters of
        English. This is why pricing, context limits, and speed are all measured
        in tokens, not words.
      </div>
    </div>
  );
}
