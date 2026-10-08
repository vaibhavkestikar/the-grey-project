"use client";

import { useRef, useState } from "react";

type Props = {
  cta: string;
  content: string;
  onOpen?: () => void;
};

export default function DeepDiveAccordion({ cta, content, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const openedOnce = useRef(false);

  function toggleOpen() {
    setOpen((current) => {
      const next = !current;
      if (next && !openedOnce.current) {
        openedOnce.current = true;
        onOpen?.();
      }
      return next;
    });
  }

  return (
    <div className="mt-8 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-slate-900/80 via-violet-950/40 to-slate-900/80 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-200">
          Nerd section
        </span>
        <span className="text-[11px] text-slate-500">Optional deep dive</span>
      </div>

      <button
        type="button"
        onClick={toggleOpen}
        className="group flex w-full items-center gap-2 text-left"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-all duration-200 ${
            open
              ? "border-violet-400 bg-gradient-to-r from-cyan-500 to-violet-600 text-white"
              : "border-slate-600 bg-slate-800 text-violet-300 group-hover:border-violet-400/60 group-hover:text-violet-200"
          }`}
        >
          {open ? "−" : "+"}
        </span>
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${
            open
              ? "text-violet-200"
              : "text-slate-300 group-hover:text-violet-200"
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
        <div className="mt-4 rounded-xl border border-slate-700/60 bg-slate-950/60 p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-slate-300">{content}</p>
        </div>
      </div>
    </div>
  );
}
