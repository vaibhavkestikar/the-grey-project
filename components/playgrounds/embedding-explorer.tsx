"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Word = { label: string; x: number; y: number; group: string };

// Positions are hand placed so related meanings sit close together.
const WORDS: Word[] = [
  { label: "king", x: 20, y: 22, group: "royalty" },
  { label: "queen", x: 30, y: 14, group: "royalty" },
  { label: "prince", x: 14, y: 32, group: "royalty" },
  { label: "apple", x: 76, y: 20, group: "fruit" },
  { label: "banana", x: 86, y: 30, group: "fruit" },
  { label: "mango", x: 70, y: 12, group: "fruit" },
  { label: "dog", x: 24, y: 78, group: "animal" },
  { label: "cat", x: 34, y: 86, group: "animal" },
  { label: "tiger", x: 16, y: 70, group: "animal" },
  { label: "Paris", x: 78, y: 76, group: "city" },
  { label: "Tokyo", x: 88, y: 84, group: "city" },
  { label: "London", x: 70, y: 88, group: "city" },
];

function distance(a: Word, b: Word): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export default function EmbeddingExplorer() {
  const [selected, setSelected] = useState<Word | null>(null);

  const neighbors = selected
    ? WORDS.filter((w) => w.label !== selected.label)
        .map((w) => ({ w, d: distance(selected, w) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
    : [];
  const neighborLabels = new Set(neighbors.map((n) => n.w.label));
  const maxD = Math.hypot(100, 100);

  return (
    <div className="rounded-3xl border border-violet-200 bg-white p-5 shadow-sm md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
        Embedding explorer
      </p>
      <p className="mt-2 text-sm text-slate-500">
        AI turns every word into a point in space. Words with similar meaning
        sit close together. Tap a word to see its nearest neighbours.
      </p>

      <div className="relative mt-5 h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {WORDS.map((w) => {
          const isSelected = selected?.label === w.label;
          const isNeighbor = neighborLabels.has(w.label);
          return (
            <button
              key={w.label}
              type="button"
              onClick={() => setSelected(w)}
              style={{ left: `${w.x}%`, top: `${w.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-xs font-bold transition ${
                isSelected
                  ? "z-20 scale-110 bg-violet-600 text-white shadow-lg"
                  : isNeighbor
                    ? "z-10 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300"
                    : "bg-white text-slate-600 shadow-sm hover:bg-violet-50"
              }`}
            >
              {w.label}
            </button>
          );
        })}
      </div>

      {selected ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <p className="text-sm font-semibold text-slate-700">
            Closest in meaning to{" "}
            <span className="text-violet-700">{selected.label}</span>:
          </p>
          <div className="mt-3 space-y-2">
            {neighbors.map((n) => {
              const similarity = Math.round((1 - n.d / maxD) * 100);
              return (
                <div key={n.w.label} className="flex items-center gap-3">
                  <span className="w-16 text-sm font-bold text-slate-900">
                    {n.w.label}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${similarity}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-semibold text-emerald-600">
                    {similarity}%
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm leading-relaxed text-slate-200">
            The model was never told these words are related. It learned the map
            by reading how words are used together. That is how it knows a king
            is closer to a queen than to a banana.
          </p>
        </motion.div>
      ) : (
        <p className="mt-4 text-center text-sm text-slate-400">
          Tap any word to begin.
        </p>
      )}
    </div>
  );
}
