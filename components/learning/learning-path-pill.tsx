type Props = {
  variant?: "default" | "light" | "muted";
  className?: string;
};

const variantClasses: Record<NonNullable<Props["variant"]>, string> = {
  default: "bg-violet-100 text-violet-700",
  light: "bg-white/20 text-white backdrop-blur",
  muted: "bg-slate-100 text-slate-600",
};

export default function LearningPathPill({
  variant = "default",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      Learning path
    </span>
  );
}
