type Props = {
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
};

const VARIANTS = {
  primary: {
    position: "-right-2 top-5 rotate-6 sm:right-4",
    chip: "bg-amber-400 text-amber-950 shadow-amber-900/20",
  },
  secondary: {
    position: "-right-1 top-[4.5rem] -rotate-3 sm:right-3 sm:top-[4.75rem]",
    chip: "bg-fuchsia-400 text-fuchsia-950 shadow-fuchsia-900/20",
  },
} as const;

export default function PathHookRibbon({
  label,
  className = "",
  variant = "primary",
}: Props) {
  const styles = VARIANTS[variant];

  return (
    <div
      className={`pointer-events-none absolute z-10 ${styles.position} ${className}`}
    >
      <span
        className={`inline-flex rounded-lg px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg ring-2 ring-white/40 ${styles.chip}`}
      >
        {label}
      </span>
    </div>
  );
}
