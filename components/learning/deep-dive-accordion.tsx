"use client";

import { useState } from "react";

type Props = {
  cta: string;
  content: string;
};

export default function DeepDiveAccordion({ cta, content }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 rounded-2xl border border-violet-100/80 bg-gradient-to-br from-violet-50/40 via-white to-slate-50/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-700">
          Nerd section
        </span>
        <span className="text-[11px] text-slate-400">Optional deep dive</span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-center gap-2 text-left"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-all duration-200 ${
            open
              ? "border-violet-500 bg-violet-500 text-white"
              : "border-violet-200 bg-white text-violet-400 group-hover:border-violet-400 group-hover:text-violet-600"
          }`}
        >
          {open ? "−" : "+"}
        </span>
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${
            open
              ? "text-violet-700"
              : "text-slate-600 group-hover:text-violet-700"
          }`}
        >
          {open ? "Collapse" : cta}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-4 rounded-xl border border-violet-100 bg-white/90 p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-slate-700">{content}</p>
        </div>
      </div>
    </div>
  );
}
