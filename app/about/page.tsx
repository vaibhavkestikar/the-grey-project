import Image from "next/image";
import Link from "next/link";

import SiteNavbar from "@/components/marketing/site-navbar";

const experiences = [

  {
    company: "ZScaler",
    role: "Senior Data Scientist",
    duration: "2025 to Present",
    description:
      "Building applied AI and advanced analytics systems focused on scalable enterprise impact, decision intelligence, and production grade machine learning workflows.",
  },

  {
    company: "Tesco Bengaluru",
    role: "Lead Decision Scientist",
    duration: "2022 to 2025",
    description:
      "Worked across machine learning, recommendation systems, customer intelligence, pricing analytics, and large scale data science systems powering retail decisions.",
  },

  {
    company: "Mu Sigma",
    role: "Decision Scientist",
    duration: "2019 to 2022",
    description:
      "Built foundations in analytical thinking, statistical systems, business intelligence, experimentation, and enterprise problem solving at scale.",
  },

];

export default function AboutPage() {

  return (

    <main className="min-h-screen bg-[#f8f8fc]">

      {/* NAVBAR */}

      <SiteNavbar />

      {/* HERO */}

      <section className="border-b border-slate-200">

        <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
              AI Engineer • Data Scientist
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-slate-950 md:text-7xl">

              Uncovering The
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Grey{" "}
              </span>

              Behind AI.

            </h1>

            <p className="mt-10 max-w-2xl text-xl leading-relaxed text-slate-600">

              I’m Vaibhav Kestikar.

              I built The Grey Project because most AI education today
              either oversimplifies reality or overwhelms learners with abstraction.

            </p>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">

              My goal is simple:

              explain Artificial Intelligence, Machine Learning, and Data Science
              in a way people never forget.

            </p>

            <div className="mt-12 flex flex-wrap gap-4">

              <Link
                href="/learning"
                className="rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
              >
                Start Learning
              </Link>

              <a
                href="https://www.linkedin.com/in/vaibhavkestikar/"
                target="_blank"
                className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-700"
              >
                LinkedIn
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center">

            <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-r from-violet-300 to-blue-300 blur-3xl opacity-30" />

            <div className="relative overflow-hidden rounded-[3rem] border border-white/50 bg-white/70 p-4 shadow-2xl backdrop-blur">

              <Image
                src="/founder.png"
                alt="Vaibhav Kestikar"
                width={420}
                height={520}
                className="rounded-[2rem] object-cover"
                priority
              />

            </div>

          </div>

        </div>

      </section>

      {/* STORY */}

      <section className="mx-auto max-w-5xl px-6 py-28">

        <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          Why The Grey Project Exists
        </div>

        <h2 className="mt-8 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
          AI Education Is Broken.
        </h2>

        <div className="mt-14 space-y-8 text-xl leading-relaxed text-slate-700">

          <p>
            Most AI content online falls into two extremes.
          </p>

          <p>

            One side turns AI into marketing hype:
            motivational posts, exaggerated promises, and shallow tutorials
            that create excitement without understanding.

          </p>

          <p>

            The other side immediately throws beginners into dense mathematics,
            research papers, and abstraction without helping them build intuition first.

          </p>

          <p>
            Both approaches fail learners.
          </p>

          <p>
            The Grey Project exists between those extremes.
          </p>

          <p>

            “Grey” represents depth.

            Nuance.

            Systems thinking.

            The understanding that real world AI engineering is neither magic nor fear,
            but careful engineering, probabilistic systems, infrastructure, and learning.

          </p>

          <p>

            My mission is to help developers and aspiring data scientists
            understand AI deeply enough that they can think independently,
            build confidently,
            and never feel intimidated by the field again.

          </p>

        </div>

      </section>

      {/* EXPERIENCE */}

      <section className="border-y border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-6 py-28">

          <div className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Experience
          </div>

          <h2 className="mt-8 text-4xl font-black text-slate-950 md:text-6xl">
            Built Through Real Industry Experience.
          </h2>

          <div className="mt-20 space-y-10">

            {experiences.map((exp) => (

              <div
                key={exp.company}
                className="rounded-[2rem] border border-slate-200 bg-[#fafafe] p-10 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-3xl font-black text-slate-900">
                      {exp.role}
                    </h3>

                    <div className="mt-2 text-lg font-semibold text-violet-700">
                      {exp.company}
                    </div>

                  </div>

                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {exp.duration}
                  </div>

                </div>

                <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-600">
                  {exp.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* PHILOSOPHY */}

      <section className="mx-auto max-w-5xl px-6 py-28">

        <div className="rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-14 text-white shadow-2xl">

          <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            Philosophy
          </div>

          <h2 className="mt-8 text-4xl font-black leading-tight md:text-6xl">
            No Hype.
            <br />
            No Fear.
            <br />
            Just Deep Understanding.
          </h2>

          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-slate-300">

            The future belongs to engineers and thinkers who understand systems deeply.

            Not people chasing trends.

          </p>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-300">

            The Grey Project is designed to help learners build:
            durable intuition,
            engineering clarity,
            and lasting understanding of AI systems.

          </p>

        </div>

      </section>

    </main>

  );
}