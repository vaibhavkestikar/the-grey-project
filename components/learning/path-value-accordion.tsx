type Variant = "light" | "muted" | "warm";

type Props = {
  who: string;
  why: string;
  outcomes: string;
  variant?: Variant;
  className?: string;
};

const variantStyles: Record<
  Variant,
  { wrap: string; summary: string; label: string; text: string }
> = {
  light: {
    wrap: "border-white/20 bg-white/10 backdrop-blur",
    summary: "text-violet-100",
    label: "text-[11px] font-bold uppercase tracking-wider text-violet-100/80",
    text: "text-sm leading-relaxed text-violet-50",
  },
  warm: {
    wrap: "border-white/20 bg-white/10 backdrop-blur",
    summary: "text-amber-100",
    label: "text-[11px] font-bold uppercase tracking-wider text-amber-100/90",
    text: "text-sm leading-relaxed text-orange-50",
  },
  muted: {
    wrap: "border-slate-200 bg-slate-50/80",
    summary: "text-violet-700",
    label: "text-[11px] font-bold uppercase tracking-wider text-violet-600",
    text: "text-sm leading-relaxed text-slate-700",
  },
};

export default function PathValueAccordion({
  who,
  why,
  outcomes,
  variant = "muted",
  className = "",
}: Props) {
  const styles = variantStyles[variant];
  const rows = [
    { label: "Who", value: who },
    { label: "Why", value: why },
    { label: "Outcomes", value: outcomes },
  ];

  return (
    <details
      className={`group mt-4 overflow-hidden rounded-xl border ${styles.wrap} ${className}`}
    >
      <summary
        className={`flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold marker:content-none ${styles.summary}`}
      >
        <span>Who, why & outcomes</span>
        <span
          aria-hidden
          className="text-xs transition group-open:rotate-180"
        >
          ▼
        </span>
      </summary>
      <div className="space-y-3 border-t border-inherit px-4 py-3">
        {rows.map((row) => (
          <div key={row.label}>
            <p className={styles.label}>{row.label}</p>
            <p className={`mt-1 ${styles.text}`}>{row.value}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
