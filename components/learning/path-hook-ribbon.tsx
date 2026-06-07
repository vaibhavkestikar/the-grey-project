type Props = {
  label: string;
  className?: string;
};

export default function PathHookRibbon({ label, className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute -right-2 top-5 z-10 rotate-6 sm:right-4 ${className}`}
    >
      <span className="inline-flex rounded-lg bg-amber-400 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-950 shadow-lg shadow-amber-900/20 ring-2 ring-white/40">
        {label}
      </span>
    </div>
  );
}
