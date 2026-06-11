"use client";

import dynamic from "next/dynamic";
import type { PlaygroundId } from "@/types/lesson";

const playgroundFallback = (
  <div className="min-h-[12rem] animate-pulse rounded-2xl bg-slate-800/40" />
);

const NeuronSandbox = dynamic(
  () => import("@/components/playgrounds/neuron-sandbox"),
  { ssr: false, loading: () => playgroundFallback }
);
const PredictNext = dynamic(
  () => import("@/components/playgrounds/predict-next"),
  { ssr: false, loading: () => playgroundFallback }
);
const PythonSandbox = dynamic(
  () => import("@/components/playgrounds/python-sandbox"),
  { ssr: false, loading: () => playgroundFallback }
);
const RulesVsMlSorter = dynamic(
  () => import("@/components/playgrounds/rules-vs-ml-sorter"),
  { ssr: false, loading: () => playgroundFallback }
);
const PromptLab = dynamic(
  () => import("@/components/playgrounds/prompt-lab"),
  { ssr: false, loading: () => playgroundFallback }
);
const PipelineStepper = dynamic(
  () => import("@/components/playgrounds/pipeline-stepper"),
  { ssr: false, loading: () => playgroundFallback }
);
const Tokenizer = dynamic(
  () => import("@/components/playgrounds/tokenizer"),
  { ssr: false, loading: () => playgroundFallback }
);
const EmbeddingExplorer = dynamic(
  () => import("@/components/playgrounds/embedding-explorer"),
  { ssr: false, loading: () => playgroundFallback }
);
const HallucinationLab = dynamic(
  () => import("@/components/playgrounds/hallucination-lab"),
  { ssr: false, loading: () => playgroundFallback }
);

type Props = {
  id?: PlaygroundId;
  variant?: string;
};

export default function PlaygroundRenderer({ id, variant }: Props) {
  switch (id) {
    case "neuron-sandbox":
      return <NeuronSandbox compact variant={variant} />;
    case "predict-next":
      return <PredictNext variant={variant} />;
    case "rules-vs-ml-sorter":
      return <RulesVsMlSorter />;
    case "prompt-lab":
      return <PromptLab />;
    case "pipeline-stepper":
      return <PipelineStepper />;
    case "tokenizer":
      return <Tokenizer />;
    case "embedding-explorer":
      return <EmbeddingExplorer />;
    case "hallucination-lab":
      return <HallucinationLab />;
    case "python-sandbox":
      return <PythonSandbox variant={variant} />;
    default:
      return null;
  }
}