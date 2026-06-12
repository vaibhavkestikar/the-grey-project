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
  { card: string; label: string; text: string }
> = {
  light: {
    card: "rounded-xl bg-white/10 p-3 backdrop-blur",
    label: "text-[11px] font-bold uppercase tracking-wider text-violet-100/80",
    text: "mt-1 text-sm text-violet-50",
  },
  warm: {
    card: "rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur",
    label: "text-[11px] font-bold uppercase tracking-wider text-amber-100/90",
    text: "mt-1 text-sm text-orange-50",
  },
  muted: {
    card: "rounded-xl border border-slate-700/60 bg-slate-900/70 p-3",
    label: "text-[11px] font-bold uppercase tracking-wider text-cyan-400/90",
    text: "mt-1 text-sm leading-snug text-slate-300",
  },
};

export default function PathValueGrid({
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
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-3 ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className={styles.card}>
          <p className={styles.label}>{row.label}</p>
          <p className={styles.text}>{row.value}</p>
        </div>
      ))}
    </div>
  );
}
