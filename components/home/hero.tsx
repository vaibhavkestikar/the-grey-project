import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24">

      <div className="hero-glow left-1/2 top-0 -translate-x-1/2" />

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}

        <div className="relative z-10">

          <div className="mb-6 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
            Learn AI. Understand Everything.
          </div>

          <h1 className="text-6xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl">
            Understand AI
            <br />

            <span className="gradient-text">
              Under The Hood.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-relaxed text-slate-600">
            No fluff. No jargon. Just deep, visual, and intuitive
            explanations from an experienced Data Scientist and AI practitioner that make AI click forever.
          </p>

          <div className="mt-10 flex gap-5">

            <Link
              href="/learning"
              className="rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-violet-700"
            >
              Start Learning →
            </Link>

           

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-center">

          <div className="absolute left-0 top-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="font-bold">First Principles</h3>

            <p className="mt-2 text-sm text-slate-600">
              Build strong foundations
            </p>
          </div>

          <div className="absolute right-0 top-0 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="font-bold">Visual Learning</h3>

            <p className="mt-2 text-sm text-slate-600">
              Understand deeply
            </p>
          </div>

          <div className="absolute bottom-10 left-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="font-bold">Built For Developers</h3>

            <p className="mt-2 text-sm text-slate-600">
              Theory to real-world
            </p>
          </div>

          <div className="absolute bottom-0 right-10 rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="font-bold">Interactive Quizzes</h3>

            <p className="mt-2 text-sm text-slate-600">
              Track your progress
            </p>
          </div>

          <div className="flex h-[500px] w-[500px] items-center justify-center rounded-full bg-gradient-to-br from-violet-200 to-blue-100 shadow-2xl">

            <div className="flex h-[250px] w-[250px] items-center justify-center rounded-full bg-white text-8xl shadow-2xl">
              🧠
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}