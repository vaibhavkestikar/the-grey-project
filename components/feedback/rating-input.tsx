"use client";

type Props = {
  value: number | null;
  onChange: (value: number) => void;
  labels?: string[];
};

const DEFAULT_LABELS = ["Poor", "Meh", "Okay", "Good", "Love it"];

export default function RatingInput({
  value,
  onChange,
  labels = DEFAULT_LABELS,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`min-w-[3.5rem] flex-1 rounded-xl px-3 py-3 text-sm font-bold transition sm:flex-none ${
            value === n
              ? "bg-violet-600 text-white shadow-md"
              : "border border-slate-200 bg-white text-slate-700 hover:border-violet-300"
          }`}
        >
          {n}
          <span className="mt-0.5 block text-[10px] font-semibold uppercase opacity-80">
            {labels[n - 1]}
          </span>
        </button>
      ))}
    </div>
  );
}
