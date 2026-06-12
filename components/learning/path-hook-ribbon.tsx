type Props = {
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
};

const VARIANTS = {
  primary: {
    position: "-right-2 top-5 rotate-6 sm:right-4",
    chip: "bg-amber-400 text-amber-950 shadow-amber-900/20",
    chipExtra: "",
  },
  secondary: {
    position: "right-2 top-14 rotate-3 sm:right-4 sm:top-[3.75rem]",
    chip: "bg-fuchsia-400 text-fuchsia-950 shadow-fuchsia-900/20",
    chipExtra:
      "max-w-[9.5rem] text-center text-[10px] leading-tight tracking-wide sm:max-w-[11rem] sm:text-xs sm:leading-snug",
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
        className={`inline-flex rounded-lg px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg ring-2 ring-white/40 ${styles.chip} ${styles.chipExtra}`}
      >
        {label}
      </span>
    </div>
  );
}
