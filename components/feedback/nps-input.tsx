"use client";

type Props = {
  value: number | null;
  onChange: (value: number) => void;
  lowLabel?: string;
  highLabel?: string;
};

export default function NpsInput({
  value,
  onChange,
  lowLabel = "Not a chance",
  highLabel = "Absolutely",
}: Props) {
  return (
    <div>
      <div className="grid grid-cols-11 gap-1 sm:gap-2">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`rounded-xl py-2 text-sm font-bold transition sm:py-3 ${
              value === i
                ? "bg-violet-600 text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-700 hover:border-violet-300"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
    </div>
  );
}
