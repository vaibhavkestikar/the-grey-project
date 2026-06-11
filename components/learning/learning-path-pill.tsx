type Props = {
  variant?: "default" | "light" | "muted";
  className?: string;
};

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  default: "border border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
  light: "bg-white/20 text-white backdrop-blur",
  muted: "border border-slate-600 bg-slate-800/60 text-slate-300",
};

export default function LearningPathPill({
  variant = "default",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      Learning path
    </span>
  );
}
