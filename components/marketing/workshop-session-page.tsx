import Link from "next/link";

import type { WorkshopSession } from "@/data/workshops";
import { WORKSHOP_INQUIRY_HREF } from "@/data/workshops";

type Props = {
  session: WorkshopSession;
};

export default function WorkshopSessionPage({ session }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
        {session.eyebrow} · {session.orderLabel}
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-50 md:text-5xl">{session.title}</h1>
      <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">{session.summary}</p>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-50">Who it&apos;s for</h2>
        <ul className="mt-4 space-y-3">
          {session.who.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 text-sm leading-relaxed text-slate-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-black text-slate-50">What you&apos;ll learn</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-300 md:text-base">
          {session.covered.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 md:p-6">
        <h2 className="text-xl font-black text-slate-50">Outcome</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">{session.outcome}</p>
      </section>

      <Link
        href={WORKSHOP_INQUIRY_HREF}
        className="btn-home-cta mt-10 inline-flex min-h-[48px] w-full items-center justify-center sm:w-auto"
      >
        Book this for your college
      </Link>
    </div>
  );
}
