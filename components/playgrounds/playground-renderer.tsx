"use client";

import NeuronSandbox from "@/components/playgrounds/neuron-sandbox";
import PredictNext from "@/components/playgrounds/predict-next";
import RulesVsMlSorter from "@/components/playgrounds/rules-vs-ml-sorter";
import PromptLab from "@/components/playgrounds/prompt-lab";
import PipelineStepper from "@/components/playgrounds/pipeline-stepper";
import Tokenizer from "@/components/playgrounds/tokenizer";
import EmbeddingExplorer from "@/components/playgrounds/embedding-explorer";
import HallucinationLab from "@/components/playgrounds/hallucination-lab";
import type { PlaygroundId } from "@/types/lesson";

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
    default:
      return null;
  }
}
