type Props = {
  labels: readonly string[];
  variant?: "default" | "light" | "warm";
  className?: string;
};

const pillStyles: Record<NonNullable<Props["variant"]>, string> = {
  default:
    "border-violet-200 bg-violet-50 text-violet-800 ring-1 ring-violet-100",
  light: "border-white/30 bg-white/15 text-white backdrop-blur",
  warm: "border-white/30 bg-white/15 text-amber-50 backdrop-blur",
};

export default function PathMetaPills({
  labels,
  variant = "default",
  className = "",
}: Props) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {labels.map((label) => (
        <span
          key={label}
          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${pillStyles[variant]}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
