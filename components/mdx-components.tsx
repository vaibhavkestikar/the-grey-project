import type { MDXComponents } from "mdx/types";

import AIPredictionVisual from "@/components/education/ai-prediction-visual";
import NeuralNetworkVisual from "@/components/education/neural-network-visual";
import Insight from "@/components/education/insight";

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {

  return {

    /* =========================================
       HEADINGS
    ========================================= */

    h1: (props) => (
      <h1
        className="mt-20 text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl"
        {...props}
      />
    ),

    h2: (props) => (
      <h2
        className="mt-28 border-b border-slate-200 pb-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl"
        {...props}
      />
    ),

    h3: (props) => (
      <h3
        className="mt-20 text-3xl font-bold leading-tight text-slate-900"
        {...props}
      />
    ),

    /* =========================================
       PARAGRAPHS
    ========================================= */

    p: (props) => (
      <p
        className="mt-8 text-[1.15rem] leading-[2.2rem] tracking-[0.01em] text-slate-700"
        {...props}
      />
    ),

    strong: (props) => (
      <strong
        className="font-bold text-slate-950"
        {...props}
      />
    ),

    em: (props) => (
      <em
        className="font-semibold text-violet-700"
        {...props}
      />
    ),

    /* =========================================
       LISTS
    ========================================= */

    ul: (props) => (
      <ul
        className="mt-8 ml-6 list-disc space-y-4 text-[1.1rem] leading-9 text-slate-700"
        {...props}
      />
    ),

    ol: (props) => (
      <ol
        className="mt-8 ml-6 list-decimal space-y-4 text-[1.1rem] leading-9 text-slate-700"
        {...props}
      />
    ),

    li: (props) => (
      <li
        className="pl-2"
        {...props}
      />
    ),

    /* =========================================
       BLOCKQUOTE
    ========================================= */

    blockquote: (props) => (
      <blockquote
        className="my-14 rounded-r-[2rem] border-l-4 border-violet-600 bg-gradient-to-r from-violet-50 to-blue-50 px-10 py-8 text-2xl font-semibold italic leading-relaxed text-slate-900 shadow-sm"
        {...props}
      />
    ),

    /* =========================================
       INLINE CODE
    ========================================= */

    code: ({ className, ...props }) => {

      const isCodeBlock =
        className?.includes("language-");

      if (isCodeBlock) {
        return (
          <code
            className={className}
            {...props}
          />
        );
      }

      return (
        <code
          className="rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-violet-700"
          {...props}
        />
      );
    },

    /* =========================================
       CODE BLOCKS
    ========================================= */

    pre: (props) => (
      <pre
        className="my-12 overflow-x-auto rounded-[2rem] bg-slate-950 p-8 text-[15px] leading-8 text-slate-100 shadow-2xl"
        {...props}
      />
    ),

    /* =========================================
       HORIZONTAL RULE
    ========================================= */

    hr: () => (
      <div className="my-24 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    ),

    /* =========================================
       TABLES
    ========================================= */

    table: (props) => (
      <div className="my-14 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
        <table
          className="w-full border-collapse"
          {...props}
        />
      </div>
    ),

    thead: (props) => (
      <thead
        className="bg-slate-100"
        {...props}
      />
    ),

    tbody: (props) => (
      <tbody
        className="divide-y divide-slate-200"
        {...props}
      />
    ),

    tr: (props) => (
      <tr
        className="transition-colors hover:bg-slate-50"
        {...props}
      />
    ),

    th: (props) => (
      <th
        className="px-8 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-900"
        {...props}
      />
    ),

    td: (props) => (
      <td
        className="px-8 py-6 text-[1rem] leading-8 text-slate-700"
        {...props}
      />
    ),

    /* =========================================
       LINKS
    ========================================= */

    a: (props) => (
      <a
        className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 transition hover:text-violet-900"
        {...props}
      />
    ),

    /* =========================================
       CUSTOM COMPONENTS
    ========================================= */

    AIPredictionVisual,
    NeuralNetworkVisual,
    Insight,

    ...components,
  };
}

export const mdxComponents =
  useMDXComponents({});