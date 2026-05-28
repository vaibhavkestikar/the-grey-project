import Link from "next/link";
import ProtectedLink from "@/components/auth/protected-link";
export default function FeaturedPath() {
  return (
    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12">

          <div className="mb-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            FREE LEARNING PATH
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            Foundations of AI
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            The perfect starting point for anyone who wants to truly understand
            AI from the ground up.
          </p>

        </div>

        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

          {/* LEFT */}

          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-12 text-white">

            <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
              Beginner → Intermediate
            </div>

            <h3 className="mt-8 text-5xl font-black leading-tight">
              Understand How AI Actually Works
            </h3>

            <p className="mt-6 text-lg leading-relaxed text-violet-100">
              Learn neural networks, LLMs, tokens, probability, prompting,
              hallucinations, and AI reasoning in the simplest possible way.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-violet-100">
                  Modules
                </p>

                <h4 className="text-2xl font-bold">
                  6
                </h4>
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-violet-100">
                  Duration
                </p>

                <h4 className="text-2xl font-bold">
                  ~2 Hours
                </h4>
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <p className="text-sm text-violet-100">
                  Difficulty
                </p>

                <h4 className="text-2xl font-bold">
                  Beginner
                </h4>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex flex-col justify-between p-12">

            <div>

              <h3 className="text-3xl font-black text-slate-900">
                What You'll Learn
              </h3>

              <div className="mt-8 space-y-5">

                {[
                  "What AI really is",
                  "How neural networks think",
                  "Why LLMs predict tokens",
                  "How ChatGPT actually works",
                  "Why hallucinations happen",
                  "Prompt engineering fundamentals",
                  "AI under the hood visually",
                  "Probability thinking in AI",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="h-3 w-3 rounded-full bg-violet-600" />

                    <p className="text-lg text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            <div className="mt-12">

              <ProtectedLink
                href="/learning/foundations-of-ai"
                className="inline-flex rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-violet-700"
              >
                Start Learning →
              </ProtectedLink>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}