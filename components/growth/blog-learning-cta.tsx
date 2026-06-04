import Link from "next/link";

type Props = {
  relatedLessonHref?: string;
  relatedLessonTitle?: string;
};

export default function BlogLearningCta({
  relatedLessonHref = "/try",
  relatedLessonTitle = "AI Is Prediction, free sample",
}: Props) {
  return (
    <div className="mt-16 rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-8 md:p-10">
      <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
        Continue learning
      </p>
      <h3 className="mt-3 text-2xl font-black text-slate-950">
        Turn this article into intuition
      </h3>
      <p className="mt-3 text-slate-600">
        Related lesson: {relatedLessonTitle}
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={relatedLessonHref}
          className="rounded-xl bg-violet-600 px-6 py-3 text-center font-semibold text-white"
        >
          Start interactive lesson
        </Link>
        <Link
          href="/learning"
          className="rounded-xl border border-violet-200 bg-white px-6 py-3 text-center font-semibold text-violet-700"
        >
          Explore all paths
        </Link>
      </div>
    </div>
  );
}
