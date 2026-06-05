import type { StructuredLesson } from "@/types/lesson";

export const lessonMlWorkflow: StructuredLesson = {
  id: "ml-workflow",
  slug: "ml-workflow",
  title: "The Real ML Workflow",
  hook: "The model is twenty percent of the job. The loop around it is the other eighty.",
  concept: "ml operations intuition",
  durationMinutes: 18,
  pathId: "curious-builders",
  free: false,
  order: 7,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Notebooks tell a comforting lie",
      icon: "🔄",
      body: "Tutorials end the moment a model hits high accuracy on a clean spreadsheet. Real products begin there. They need framing, data, training, evaluation, deployment, and monitoring. Skip any of these and the project does not fail loudly. It dies quietly in production while everyone wonders what went wrong.",
      visual: {
        kind: "flow",
        steps: [
          { label: "Frame" },
          { label: "Data" },
          { label: "Train" },
          { label: "Evaluate" },
          { label: "Deploy" },
          { label: "Monitor" },
        ],
      },
    },
    {
      type: "play",
      title: "Walk the full loop",
      body: "Step through every stage of a real machine learning project. Pay attention to the specific risk that quietly kills teams at each step.",
      playgroundId: "pipeline-stepper",
    },
    {
      type: "checkpoint",
      title: "Spot the silent killer",
      question: "After launch, the highest risk failure is usually",
      options: [
        "a small font in the dashboard",
        "silent decay as live data drifts away from training data",
        "too many software packages",
        "users reading the documentation",
      ],
      correctIndex: 1,
      insight:
        "The world changes after you ship. Without monitoring and retraining, a model slowly rots while still looking healthy on old metrics.",
    },
    {
      type: "build",
      title: "Framing is where projects are won or lost",
      icon: "🎯",
      body: "Before any code, you turn a fuzzy business wish into a precise prediction task. What exactly is the input, and what is the label you are trying to predict? A reduce churn goal is useless to a model. Predict whether this customer cancels in the next thirty days is something it can actually learn. Bad framing wastes months that no clever model can recover.",
      highlights: [
        "Turn 'reduce churn' into 'predict whether this customer cancels in 30 days'.",
        "A precise prediction task is something a model can actually learn.",
        "Bad framing wastes months that no amount of clever modelling can recover.",
      ],
    },
    {
      type: "build",
      title: "Data discipline beats model hype",
      icon: "🗂️",
      body: "The fastest way to fool yourself is data leakage, where a clue about the answer secretly slips into the inputs. Your offline scores look amazing, then the live system collapses because that clue is not there in the real world. Clean, representative, leak free data beats a fancier model almost every single time.",
      highlights: [
        "Data leakage: a clue about the answer secretly slips into the inputs.",
        "Your offline scores look amazing, then the live system collapses.",
        "Clean, representative, leak free data beats a fancier model almost every time.",
      ],
    },
    {
      type: "play",
      title: "Feel how fragile a single unit is",
      body: "Shift one input a little and watch the verdict swing. Now imagine thousands of these stacked in production. This is why guardrails and monitoring exist.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
    },
    {
      type: "checkpoint",
      title: "Offline is not online",
      question: "Why is a great offline score not enough to declare victory?",
      options: [
        "Offline numbers always match live results exactly",
        "Real traffic differs from test data, so you must measure live impact",
        "Accuracy is the only metric that ever matters",
        "Users behave exactly like the training set",
      ],
      correctIndex: 1,
      insight:
        "Offline tests are a rehearsal, not the show. Real users and a live test on business outcomes are the only true verdict.",
    },
    {
      type: "checkpoint",
      title: "Same loop for language models",
      question:
        "For a product built on a language model, the equivalent of monitoring is",
      options: [
        "never checking the outputs after launch",
        "running ongoing evaluations and human review on real prompts",
        "only counting tokens",
        "picking a bigger model and hoping",
      ],
      correctIndex: 1,
      insight:
        "Evaluations plus a human in the loop are what production grade language model engineering actually looks like. The loop never really ends.",
    },
    {
      type: "reflect",
      title: "You think like a builder now",
      body: "You see AI as living systems, not slides. Framing, data, training, evaluation, deployment, and monitoring, with prediction at the centre of all of it. That is the whole point of Curious Builders. Come back to revisit any lesson, and keep this question close: where does the answer come from, and how would I know if it broke?",
      learned: [
        "AI products are living systems: frame, collect data, train, evaluate, deploy, monitor.",
        "Data quality beats model size. Always clean before you scale.",
        "Offline scores are a rehearsal. Live metrics are the only true verdict.",
        "The loop never ends: monitor, evaluate, and retrain as the world changes.",
      ],
    },
  ],
};
