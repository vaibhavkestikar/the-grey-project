import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import SiteFooter from "@/components/marketing/site-footer";
import SiteNavbar from "@/components/marketing/site-navbar";
import { WORKSHOP_INQUIRY_HREF } from "@/data/workshops";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vaibhav Kestikar — Senior Data Scientist. The Grey Project runs live AI workshops for engineering colleges.",
};

const experiences = [
  {
    company: "ZScaler",
    role: "Senior Data Scientist",
    duration: "2025 to present",
    description:
      "Applied AI and analytics systems for enterprise impact, decision intelligence, and production machine learning workflows.",
  },
  {
    company: "Tesco Bengaluru",
    role: "Lead Decision Scientist",
    duration: "2022 to 2025",
    description:
      "Machine learning, recommendation systems, customer intelligence, pricing analytics, and large-scale data science for retail decisions.",
  },
  {
    company: "Mu Sigma",
    role: "Decision Scientist",
    duration: "2019 to 2022",
    description:
      "Analytical foundations: statistical systems, business intelligence, experimentation, and enterprise problem-solving.",
  },
];

export default function AboutPage() {
  return (
    <main className="site-page">
      <SiteNavbar />

      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 md:px-6 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="site-badge">AI Engineer · Data Scientist</div>
            <h1 className="mt-8 text-4xl font-black leading-tight text-slate-50 md:text-6xl">
              Uncovering the
              <span className="home-gradient-text home-gradient-text-shine"> grey </span>
              in AI — on campus.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
              I&apos;m Vaibhav Kestikar. I run The Grey Project as live AI workshops for
              engineering colleges: how the industry actually works, then a project students can
              stand behind.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={WORKSHOP_INQUIRY_HREF} className="btn-home-cta min-h-[48px] px-8 py-4 text-center">
                Book a workshop
              </Link>
              <a
                href="https://www.linkedin.com/in/vaibhavkestikar/"
                target="_blank"
                rel="noreferrer"
                className="btn-home-secondary min-h-[48px] px-8 py-4 text-center"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute h-[280px] w-[280px] rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-3xl md:h-[420px] md:w-[420px]" />
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-500/25 bg-slate-900/70 p-3 shadow-[0_0_40px_rgba(34,211,238,0.15)] md:rounded-[3rem] md:p-4">
              <Image
                src="/founder.png"
                alt="Vaibhav Kestikar"
                width={420}
                height={520}
                className="rounded-[1.5rem] object-cover md:rounded-[2rem]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Industry</p>
        <h2 className="mt-4 text-3xl font-black text-slate-50 md:text-5xl">
          Built through production work
        </h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-400">
          Workshops are taught from applied roles, not from a content farm. The grey is the
          engineering: messy data, trade-offs, and systems that have to hold up at work.
        </p>
        <div className="mt-12 space-y-6">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 md:p-8"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-50 md:text-2xl">{exp.role}</h3>
                  <p className="mt-1 font-semibold text-cyan-300">{exp.company}</p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {exp.duration}
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
