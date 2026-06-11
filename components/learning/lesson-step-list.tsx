/** Shared numbered / bulleted lesson rows with consistent alignment and typography. */

function normalizeStepText(text: string): string {
  return text.replace(/\s→\s/g, " to ").replace(/\s—\s/g, ", ");
}

function FormattedStepBody({ text }: { text: string }) {
  const normalized = normalizeStepText(text);
  const parts = normalized.split(/('[^']+'|"[^"]+")/g);

  return (
    <>
      {parts.map((part, index) => {
        if (
          (part.startsWith("'") && part.endsWith("'")) ||
          (part.startsWith('"') && part.endsWith('"'))
        ) {
          const inner = part.slice(1, -1);
          return (
            <strong key={index} className="font-semibold text-cyan-200">
              {inner}
            </strong>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function splitStepLabel(text: string): { label: string | null; body: string } {
  const match = text.match(
    /^(Rule \d+|Step \d+|Edge case|\d+\.)[:\s]+(.*)$/i
  );
  if (!match) {
    return { label: null, body: text };
  }
  return { label: match[1], body: match[2] };
}

type ListProps = {
  items: string[];
  variant?: "violet" | "blue" | "emerald";
};

const variantStyles = {
  violet: {
    row: "border-violet-500/25 bg-violet-500/10",
    label: "text-violet-200",
    badge: "bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/30",
  },
  blue: {
    row: "border-cyan-500/25 bg-cyan-500/10",
    label: "text-cyan-200",
    badge: "bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/30",
  },
  emerald: {
    row: "border-violet-500/25 bg-violet-500/10",
    label: "text-violet-200",
    badge: "bg-violet-500/20 text-violet-200 ring-1 ring-violet-400/30",
  },
};

export function LessonStepList({ items, variant = "violet" }: ListProps) {
  const styles = variantStyles[variant];

  return (
    <ol className="mt-6 space-y-3">
      {items.map((item, index) => {
        const { label, body } = splitStepLabel(item);

        return (
          <li
            key={item}
            className={`flex items-start gap-3 rounded-2xl border p-4 ${styles.row}`}
          >
            {label ? (
              <span
                className={`w-[5.5rem] shrink-0 text-sm font-bold leading-snug sm:w-24 ${styles.label}`}
              >
                {label}
              </span>
            ) : (
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${styles.badge}`}
              >
                {index + 1}
              </span>
            )}
            <p className="min-w-0 flex-1 text-base leading-relaxed text-slate-300">
              <FormattedStepBody text={body} />
            </p>
          </li>
        );
      })}
    </ol>
  );
}

type FlowStep = { label: string; detail?: string };

export function LessonFlowSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => (
        <div
          key={`${step.label}-${index}`}
          className="rounded-xl border border-cyan-500/20 bg-slate-900/70 p-4 shadow-[0_0_16px_rgba(34,211,238,0.06)]"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-400">
            Step {index + 1}
          </p>
          <p className="mt-1 text-base font-semibold text-slate-100">{step.label}</p>
          {step.detail && (
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {normalizeStepText(step.detail)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
