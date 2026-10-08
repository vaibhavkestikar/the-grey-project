type Props = {
  number: number;
  label?: string;
};

const STYLES = [
  "from-violet-500 to-blue-500 shadow-violet-200",
  "from-amber-400 to-orange-500 shadow-amber-200",
  "from-sky-500 to-teal-500 shadow-sky-200",
  "from-fuchsia-500 to-purple-600 shadow-fuchsia-200",
  "from-rose-500 to-orange-500 shadow-rose-200",
];

export default function PathNumberRibbon({ number, label = "Path" }: Props) {
  const style = STYLES[(number - 1) % STYLES.length];

  return (
    <div className="absolute left-4 top-4 z-20">
      <span
        className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-lg ${style}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25 text-sm">
          {number}
        </span>
        {label}
      </span>
    </div>
  );
}
