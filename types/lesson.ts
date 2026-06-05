export type LessonBlockType =
  | "hook"
  | "visual"
  | "play"
  | "checkpoint"
  | "build"
  | "reflect";

export type PlaygroundId =
  | "neuron-sandbox"
  | "predict-next"
  | "rules-vs-ml-sorter"
  | "prompt-lab"
  | "pipeline-stepper"
  | "tokenizer"
  | "embedding-explorer"
  | "hallucination-lab";

export type LessonVisual =
  | {
      kind: "comparison";
      leftLabel: string;
      leftPoints: string[];
      rightLabel: string;
      rightPoints: string[];
    }
  | {
      kind: "stats";
      items: Array<{ value: string; label: string }>;
    }
  | {
      kind: "flow";
      steps: Array<{ label: string; detail?: string }>;
    }
  | {
      kind: "callout";
      text: string;
      color?: "violet" | "blue" | "amber" | "emerald" | "red";
    };

export type LessonBlock = {
  type: LessonBlockType;
  title?: string;
  body?: string;
  /** Interactive widget to render on this step */
  playgroundId?: PlaygroundId;
  /** Optional scenario/variant for the widget */
  playgroundVariant?: string;
  /** Checkpoint options */
  question?: string;
  options?: string[];
  correctIndex?: number;
  insight?: string;
  /** Emoji icon shown in the block header */
  icon?: string;
  /** Key takeaways shown as callout cards below body text */
  highlights?: string[];
  /** Learned checklist for reflect blocks */
  learned?: string[];
  /** Inline visual component */
  visual?: LessonVisual;
};

export type StructuredLesson = {
  id: string;
  slug: string;
  title: string;
  hook: string;
  concept: string;
  durationMinutes: number;
  pathId: string;
  order: number;
  /** Available without account on /try */
  free?: boolean;
  blocks: LessonBlock[];
  relatedBlogSlugs?: string[];
};
