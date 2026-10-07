"use client";

import Link from "next/link";

import SectionReveal from "@/components/marketing/home/section-reveal";
import { WORKSHOP_INQUIRY_HREF } from "@/data/workshops";

export default function FounderSection() {
  return (
    <section className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(167,139,250,0.08),transparent_45%)]" />
      <SectionReveal className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-violet-500/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/25 shadow-[0_0_40px_rgba(34,211,238,0.15)]">
            <video
              src="/Video/founder.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="relative aspect-[5/6] w-full bg-slate-900 object-cover"
              aria-label="Vaibhav Kestikar introduction video"
            >
              Your browser does not support the video tag.
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-cyan-500/10" />
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Facilitator</p>
          <h2 className="mt-4 text-3xl font-black text-slate-50 md:text-5xl">Vaibhav Kestikar</h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Senior Data Scientist (Zscaler; previously Tesco Bengaluru and Mu Sigma). The Grey
            Project runs live AI workshops for engineering colleges — industry context first, then a
            project students can defend.
          </p>
          <p className="mt-4 text-base text-slate-400">
            Full bio and roles on the{" "}
            <Link href="/about" className="font-semibold text-cyan-200 hover:text-cyan-100">
              about page
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={WORKSHOP_INQUIRY_HREF} className="btn-home-cta min-h-[48px] text-center">
              Book a workshop
            </Link>
            <a
              href="https://www.linkedin.com/in/vaibhavkestikar/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-home-secondary min-h-[48px] text-center"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
