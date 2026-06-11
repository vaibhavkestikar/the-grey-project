"use client";

import SectionReveal from "@/components/marketing/home/section-reveal";

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
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            The human behind the grey
          </p>
          <h2 className="mt-4 text-3xl font-black text-slate-50 md:text-5xl">
            Vaibhav Kestikar
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Senior Data Scientist. I got tired of explaining AI to smart people
            who&apos;d been lied to by LinkedIn posts. So I built The Grey Project:
            depth, visuals, and zero hype. The way I wish someone had taught me.
          </p>
          <p className="mt-4 text-base text-slate-400">
            If you&apos;ve ever nodded along in a meeting while secretly Googling
            &ldquo;what is a transformer model&rdquo;? This is for you.
          </p>
          <a
            href="https://www.linkedin.com/in/vaibhavkestikar/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-2xl border border-cyan-500/30 bg-slate-900/70 px-8 py-4 font-semibold text-slate-100 shadow-[0_0_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-400/60 hover:text-cyan-200 hover:shadow-[0_0_32px_rgba(34,211,238,0.2)]"
          >
            Connect on LinkedIn
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
