type Props = {
  steps: readonly string[];
  className?: string;
};

/**
 * Numbered steps with a fixed badge column so every row aligns cleanly.
 */
export default function NumberedStepList({ steps, className = "" }: Props) {
  return (
    <ol className={`space-y-3 ${className}`}>
      {steps.map((step, index) => (
        <li key={step} className="flex items-start gap-3">
          <span
            aria-hidden
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold tabular-nums text-violet-700"
          >
            {index + 1}
          </span>
          <span className="min-w-0 flex-1 pt-0.5 text-sm leading-relaxed text-slate-600">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}
