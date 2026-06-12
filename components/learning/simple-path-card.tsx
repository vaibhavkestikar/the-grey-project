"use client";

import type { ReactNode } from "react";

import PathHookRibbon from "@/components/learning/path-hook-ribbon";
import PathNumberRibbon from "@/components/learning/path-number-ribbon";
import PathValueAccordion from "@/components/learning/path-value-accordion";

type AccordionVariant = "light" | "muted" | "warm";
export type PathCardTheme = "violet" | "amber" | "indigo" | "emerald" | "rose";

export type PathCardTag =
  | string
  | {
      label: string;
      className?: string;
    };

type Props = {
  pathNumber?: number;
  icon: string;
  title: string;
  description: ReactNode;
  tags: PathCardTag[];
  statusLabel?: string;
  statusTone?: "live" | "soon" | "neutral" | "urgent";
  hookRibbon?: string;
  secondaryHookRibbon?: string;
  theme?: PathCardTheme;
  who: string;
  why: string;
  outcomes: string;
  cta: ReactNode;
  accordionVariant?: AccordionVariant;
  footer?: ReactNode;
  highlight?: ReactNode;
  className?: string;
};

const THEMES: Record<
  PathCardTheme,
  {
    shell: string;
    header: string;
    desc: string;
    tag: string;
    body: string;
    footerBorder: string;
    expandable: string;
    accordion: AccordionVariant;
  }
> = {
  violet: {
    shell:
      "border-violet-500/30 shadow-xl shadow-violet-500/15",
    header:
      "bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 text-white",
    desc: "text-violet-100",
    tag: "border-white/25 bg-white/15 text-white backdrop-blur-sm",
    body: "bg-gradient-to-b from-slate-900/95 to-slate-950",
    footerBorder: "border-slate-700/60",
    expandable: "border-slate-700 bg-slate-900/80",
    accordion: "light",
  },
  amber: {
    shell:
      "border-2 border-amber-400/40 shadow-2xl shadow-amber-500/15",
    header:
      "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 text-white",
    desc: "text-orange-50",
    tag: "border-white/25 bg-white/15 text-white backdrop-blur-sm",
    body: "bg-gradient-to-b from-slate-900/95 to-slate-950",
    footerBorder: "border-slate-700/60",
    expandable: "border-slate-700 bg-slate-900/80",
    accordion: "warm",
  },
  indigo: {
    shell:
      "border-indigo-500/30 shadow-lg shadow-indigo-500/15",
    header:
      "bg-gradient-to-br from-indigo-600 via-brand-secondary to-brand-dark text-white",
    desc: "text-indigo-100",
    tag: "border-white/25 bg-white/15 text-white backdrop-blur-sm",
    body: "bg-gradient-to-b from-slate-900/95 to-slate-950",
    footerBorder: "border-slate-700/60",
    expandable: "border-slate-700 bg-slate-900/80",
    accordion: "light",
  },
  emerald: {
    shell:
      "border-emerald-500/30 shadow-lg shadow-emerald-500/15",
    header:
      "bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white",
    desc: "text-emerald-100",
    tag: "border-white/25 bg-white/15 text-white backdrop-blur-sm",
    body: "bg-gradient-to-b from-slate-900/95 to-slate-950",
    footerBorder: "border-slate-700/60",
    expandable: "border-slate-700 bg-slate-900/80",
    accordion: "light",
  },
  rose: {
    shell:
      "border-rose-500/30 shadow-lg shadow-rose-500/15",
    header:
      "bg-gradient-to-br from-rose-600 via-fuchsia-600 to-violet-700 text-white",
    desc: "text-rose-100",
    tag: "border-white/25 bg-white/15 text-white backdrop-blur-sm",
    body: "bg-gradient-to-b from-slate-900/95 to-slate-950",
    footerBorder: "border-slate-700/60",
    expandable: "border-slate-700 bg-slate-900/80",
    accordion: "light",
  },
};

const statusToneClasses = {
  live: "bg-emerald-400/95 text-emerald-950 animate-pulse shadow-lg shadow-emerald-400/60",
  soon: "bg-white/20 text-white backdrop-blur-sm",
  neutral: "bg-white/20 text-white backdrop-blur-sm",
  urgent: "bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/50",
};

function tagKey(tag: PathCardTag, index: number): string {
  return typeof tag === "string" ? tag : `${tag.label}-${index}`;
}

export default function SimplePathCard({
  pathNumber,
  icon,
  title,
  description,
  tags,
  statusLabel,
  statusTone = "neutral",
  hookRibbon,
  secondaryHookRibbon,
  theme = "violet",
  who,
  why,
  outcomes,
  cta,
  accordionVariant,
  footer,
  highlight,
  className = "",
}: Props) {
  const palette = THEMES[theme];
  const accordion = accordionVariant ?? palette.accordion;

  return (
    <article
      className={`relative overflow-hidden rounded-[1.75rem] border bg-slate-900/90 ${palette.shell} ${className}`}
    >
      {pathNumber ? <PathNumberRibbon number={pathNumber} /> : null}
      {hookRibbon ? <PathHookRibbon label={hookRibbon} /> : null}
      {secondaryHookRibbon ? (
        <PathHookRibbon
          label={secondaryHookRibbon}
          variant="secondary"
          className="hidden sm:block"
        />
      ) : null}

      <div className={`relative px-5 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-16 ${palette.header}`}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex items-start gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl backdrop-blur-sm"
            aria-hidden="true"
          >
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            {statusLabel ? (
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${statusToneClasses[statusTone]}`}
              >
                {statusLabel}
              </span>
            ) : null}
            {secondaryHookRibbon ? (
              <span className="mt-2 inline-flex max-w-full rounded-lg bg-fuchsia-400 px-2.5 py-1 text-[10px] font-black uppercase leading-snug tracking-wide text-fuchsia-950 ring-2 ring-white/30 sm:hidden">
                {secondaryHookRibbon}
              </span>
            ) : null}
            <h3 className="path-card-title mt-2 text-2xl font-black leading-tight sm:text-3xl">
              {title}
            </h3>
          </div>
        </div>

        {description ? (
          <div className={`relative mt-4 text-base leading-relaxed ${palette.desc}`}>
            {description}
          </div>
        ) : null}

        <div className="relative mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => {
            const label = typeof tag === "string" ? tag : tag.label;
            const extraClass =
              typeof tag === "string" ? palette.tag : `${palette.tag} ${tag.className ?? ""}`;

            return (
              <span
                key={tagKey(tag, index)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${extraClass}`}
              >
                {label}
              </span>
            );
          })}
        </div>

        {highlight ? (
          <div className="relative mt-4 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
            {highlight}
          </div>
        ) : null}

        <PathValueAccordion
          who={who}
          why={why}
          outcomes={outcomes}
          variant={accordion}
          className="relative mt-4"
        />
      </div>

      <div className={`px-5 py-5 sm:px-6 sm:py-6 ${palette.body}`}>
        <div className="mt-0">{cta}</div>

        {footer ? (
          <div className={`mt-5 border-t pt-5 ${palette.footerBorder}`}>
            {footer}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function PathCardExpandable({
  label,
  children,
  defaultOpen = false,
  theme = "violet",
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  theme?: PathCardTheme;
}) {
  const palette = THEMES[theme];

  return (
    <details
      className={`group overflow-hidden rounded-xl border ${palette.expandable}`}
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-200 marker:content-none">
        <span>{label}</span>
        <span aria-hidden className="text-xs text-ink-muted transition group-open:rotate-180">
          ▼
        </span>
      </summary>
      <div className={`border-t px-2 py-3 sm:px-3 ${palette.footerBorder}`}>
        {children}
      </div>
    </details>
  );
}
