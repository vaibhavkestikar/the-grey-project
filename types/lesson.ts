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
