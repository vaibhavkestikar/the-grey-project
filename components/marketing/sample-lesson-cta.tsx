import Link from "next/link";

export default function SampleLessonCta() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 p-8 text-center text-white shadow-2xl md:p-14">
        <p className="text-sm font-bold uppercase tracking-widest text-violet-200">
          Interactive learning
        </p>
        <h2 className="mt-4 text-3xl font-black md:text-5xl">
          Build real AI intuition in minutes
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-violet-100">
          Hook, visual, play, checkpoint, reflect. Experience the learning engine
          firsthand.
        </p>
        <Link
          href="/try/prediction"
          className="mt-8 inline-flex rounded-2xl bg-white px-10 py-4 text-lg font-bold text-violet-700 shadow-xl"
        >
          Start Learning
        </Link>
      </div>
    </section>
  );
}
