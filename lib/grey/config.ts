import { CURIOUS_BUILDERS_LESSONS, PATH_ID } from "@/data/curious-builders-path";

export const GREY_POINT_VALUES = {
  stepCompleted: 5,
  checkpointCorrect: 10,
  checkpointFirstTryBonus: 5,
  deepDiveOpened: 3,
  lessonCompleted: 25,
  pathCompleted: 75,
} as const;

export type GreyAwardEvent =
  | "step_completed"
  | "checkpoint_correct"
  | "deep_dive_opened"
  | "lesson_completed"
  | "path_completed";

export type GreyBadge = {
  id: string;
  name: string;
  description: string;
  pathId: string;
  lessonSlug?: string;
  tone: "violet" | "blue" | "emerald" | "amber" | "red" | "slate";
};

export const GREY_BADGES: GreyBadge[] = [
  {
    id: "prediction-purist",
    name: "Prediction Purist",
    description: "Completed the prediction lesson and can name the engine without the fog machine.",
    pathId: PATH_ID,
    lessonSlug: "prediction",
    tone: "violet",
  },
  {
    id: "prompt-architect",
    name: "Prompt Architect",
    description: "Built prompts like specifications, not wishful thinking.",
    pathId: PATH_ID,
    lessonSlug: "prompting",
    tone: "blue",
  },
  {
    id: "hallucination-spotter",
    name: "Hallucination Spotter",
    description: "Knows why confident answers need evidence, not applause.",
    pathId: PATH_ID,
    lessonSlug: "hallucinations",
    tone: "red",
  },
  {
    id: "workflow-realist",
    name: "Workflow Realist",
    description: "Understands that the model is the small part. The system is the work.",
    pathId: PATH_ID,
    lessonSlug: "ml-workflow",
    tone: "emerald",
  },
  {
    id: "nerd-section-regular",
    name: "Nerd Section Regular",
    description: "Opened five deep dives. Curiosity detected. No treatment required.",
    pathId: PATH_ID,
    tone: "amber",
  },
  {
    id: "curious-builder",
    name: "Curious Builder",
    description: "Completed Curious Builders end to end with evidence of understanding.",
    pathId: PATH_ID,
    tone: "slate",
  },
];

export type GreyStoreItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
  pathId: string;
  filename: string;
  pages: Array<{
    title: string;
    task: string[];
    solution: string[];
  }>;
};

export const GREY_STORE_ITEMS: GreyStoreItem[] = [
  {
    id: "ai-product-scenarios-pack",
    title: "AI Product Scenarios Pack",
    description:
      "Five realistic product situations with tasks, suggested solutions, and decision notes for AI product work.",
    cost: 220,
    pathId: PATH_ID,
    filename: "ai-product-scenarios-pack.pdf",
    pages: [
      {
        title: "Scenario 1: The Polite Hallucination",
        task: [
          "A support assistant gives a beautifully written answer about a feature that does not exist.",
          "Identify where grounding failed, decide what source should have been retrieved, and write the refusal rule.",
          "Define one metric that would reveal this failure before customers report it.",
        ],
        solution: [
          "The failure is not tone. The assistant answered from model memory instead of retrieved product documentation.",
          "The fix is a retrieval gate: if no source document contains the feature, the answer must say that reliable product information is unavailable.",
          "Track unsupported answer rate and citation coverage. If an answer has no citation, treat it as suspect by default.",
        ],
      },
      {
        title: "Scenario 2: The Churn Model Everyone Loves",
        task: [
          "A churn model reaches 91 percent offline accuracy, but retention does not improve after launch.",
          "Separate model quality from business impact and define the live metric that should decide success.",
          "Name the threshold decision the product team must own.",
        ],
        solution: [
          "Offline accuracy only says the labels were predicted on a test set. It does not prove that acting on predictions changes retention.",
          "Run a user level experiment where the treatment group receives model guided interventions and the control group receives the old workflow.",
          "The product team owns the action threshold because false positives cost outreach time and false negatives cost retained revenue.",
        ],
      },
      {
        title: "Scenario 3: The Prompt That Got Promoted Too Early",
        task: [
          "A prompt works on three internal demos and fails on real customer tickets.",
          "Create a ten case evaluation set and rewrite the prompt using role, context, examples, and format.",
          "Define what would block this prompt from shipping.",
        ],
        solution: [
          "The prompt was validated on happy path examples, not representative inputs.",
          "The rewritten prompt should specify the role, customer context, two good examples, one bad example, and a strict output format.",
          "Block shipping if the prompt fails high risk cases: angry customers, missing context, unclear product names, or requests for unsupported claims.",
        ],
      },
      {
        title: "Scenario 4: The Token Bill Nobody Budgeted",
        task: [
          "A system prompt grew from 300 tokens to 1,800 tokens after three teams added instructions.",
          "Estimate why the monthly bill jumped and decide what to remove first.",
        ],
        solution: [
          "Every request now carries the larger system prompt, so cost rises even when user messages stay the same.",
          "Remove repeated explanations, consolidate policy rules, and move rarely needed reference material into retrieval.",
          "Keep only instructions that change model behavior. If a sentence explains why a rule exists, it probably belongs in internal docs, not the prompt.",
        ],
      },
      {
        title: "Scenario 5: The Rules Trap Returns",
        task: [
          "A moderation system has 400 hand written rules and still misses obvious abuse.",
          "Decide which parts stay rules and which parts should move to learned classification.",
        ],
        solution: [
          "Keep rules for deterministic policy boundaries such as banned terms, legal constraints, and exact blocked entities.",
          "Use ML for context dependent judgments where phrasing changes faster than humans can maintain rules.",
          "Route uncertain cases to human review and use those decisions as future labels. That turns moderation from rule sprawl into a learning loop.",
        ],
      },
    ],
  },
  {
    id: "reflection-prompts-pack",
    title: "Practitioner Reflection Prompts",
    description:
      "A guided reflection PDF that turns each Curious Builders lesson into a concrete product decision.",
    cost: 200,
    pathId: PATH_ID,
    filename: "practitioner-reflection-prompts.pdf",
    pages: [
      {
        title: "Prediction",
        task: [
          "Write one sentence for a product feature: this system predicts X from Y.",
          "If X is vague, the product is vague. Tighten it before writing a ticket.",
          "List the user action that will happen when the prediction crosses the action threshold.",
        ],
        solution: [
          "A good framing looks like: this system predicts probability of account cancellation in the next 30 days from the past 14 days of product activity.",
          "The user action might be a customer success review, a targeted education email, or a discount offer. The action matters because prediction without action is trivia.",
        ],
      },
      {
        title: "Prompting",
        task: [
          "Find one production prompt. Mark the role, context, example, and format.",
          "If any are missing, add them and test against three ugly edge cases.",
          "Write one acceptance rule that decides whether the prompt is shippable.",
        ],
        solution: [
          "A shippable prompt makes the model's job narrow: who it is, what it knows, what good output looks like, and how the answer must be shaped.",
          "An acceptance rule could be: the prompt must correctly refuse two unsupported requests and produce the required format on eight out of ten representative cases.",
        ],
      },
      {
        title: "Workflow",
        task: [
          "Pick one model or AI feature. Name the data source, evaluation metric, monitoring signal, and retraining trigger.",
          "If you cannot name all four, you have a demo, not a production system.",
          "Decide who owns the weekly health check.",
        ],
        solution: [
          "A useful answer names an actual table or document source, an offline metric, a live metric, and a drift signal.",
          "Ownership should sit with the team that can change the feature, not only the team that built the first model.",
        ],
      },
    ],
  },
  {
    id: "prompt-evaluation-kit",
    title: "Prompt Evaluation Kit",
    description:
      "A practical rubric for testing prompts against messy inputs before they reach real users.",
    cost: 260,
    pathId: PATH_ID,
    filename: "prompt-evaluation-kit.pdf",
    pages: [
      {
        title: "Build The Evaluation Set",
        task: [
          "Create ten inputs: four common cases, three edge cases, two refusal cases, and one deliberately ambiguous case.",
          "Write the expected behavior for each input before testing the prompt.",
        ],
        solution: [
          "The expected behavior is more important than the input list. It prevents grading the model based on whether the answer feels impressive.",
          "A strong prompt should handle common cases cleanly, edge cases conservatively, refusal cases honestly, and ambiguous cases by asking a clarifying question.",
        ],
      },
      {
        title: "Score Without Vibes",
        task: [
          "Score each output on accuracy, format adherence, tone, refusal quality, and actionability.",
          "Decide the minimum score needed before release.",
        ],
        solution: [
          "Use a five point scale for each dimension and require zero failures on refusal quality for high risk products.",
          "The prompt should not ship if it produces one excellent demo and three quiet failures. Reliable average behavior beats one spectacular answer.",
        ],
      },
    ],
  },
  {
    id: "rag-grounding-playbook",
    title: "RAG Grounding Playbook",
    description:
      "A field guide for reducing hallucinations with retrieval, citations, refusal rules, and review loops.",
    cost: 320,
    pathId: PATH_ID,
    filename: "rag-grounding-playbook.pdf",
    pages: [
      {
        title: "Design The Grounding Contract",
        task: [
          "Write the rule your assistant must follow when retrieved context is missing, weak, or contradictory.",
          "Define what counts as a valid citation.",
        ],
        solution: [
          "A strong rule says: answer only from provided sources, cite the source, and say when the source does not contain the answer.",
          "A valid citation should point to a real document, page, section, or record that a human can inspect. A vague source label is not enough.",
        ],
      },
      {
        title: "Test The Failure Modes",
        task: [
          "Create five questions where the answer is absent from the knowledge base.",
          "Create five questions where two documents appear to disagree.",
        ],
        solution: [
          "The expected answer for missing information is refusal with a useful next step, not a guess.",
          "For conflicting sources, the assistant should state the conflict, cite both sources, and avoid inventing a tie breaker.",
        ],
      },
    ],
  },
  {
    id: "ml-workflow-audit-pack",
    title: "ML Workflow Audit Pack",
    description:
      "A production readiness checklist with tasks and suggested fixes for data leakage, drift, and weak evaluation.",
    cost: 360,
    pathId: PATH_ID,
    filename: "ml-workflow-audit-pack.pdf",
    pages: [
      {
        title: "Leakage Audit",
        task: [
          "List the top ten features used by the model.",
          "For each feature, answer: would this value be known at the exact moment of prediction?",
        ],
        solution: [
          "Any feature created after the decision point is leakage. Remove it, rebuild the dataset, and remeasure performance.",
          "If performance collapses after removing a feature, that is not bad news. It means you found the lie before production did.",
        ],
      },
      {
        title: "Drift Plan",
        task: [
          "Name the live metric that would reveal the model getting stale.",
          "Set a retraining trigger that does not depend on someone remembering to check manually.",
        ],
        solution: [
          "Good drift signals include calibration change, feature distribution shift, rising manual override rate, and worsening downstream business outcomes.",
          "A credible retraining trigger is specific: retrain when calibration error exceeds a threshold for seven days or when a key input distribution shifts beyond an agreed band.",
        ],
      },
    ],
  },
  {
    id: "ai-strategy-briefing-template",
    title: "AI Strategy Briefing Template",
    description:
      "A boardroom ready template for explaining an AI feature without hiding the hard parts.",
    cost: 420,
    pathId: PATH_ID,
    filename: "ai-strategy-briefing-template.pdf",
    pages: [
      {
        title: "One Page Executive Brief",
        task: [
          "Summarise the feature in five lines: prediction task, user value, data source, risk, and success metric.",
          "Write it for a skeptical operator, not an AI enthusiast.",
        ],
        solution: [
          "A strong brief says what the system predicts from what evidence, who acts on it, and how the business will know it helped.",
          "Avoid claims like transformative or autonomous unless the system truly changes the workflow without human intervention.",
        ],
      },
      {
        title: "Risk And Controls",
        task: [
          "Name the most expensive false positive and false negative.",
          "Name the human review path and the rollback trigger.",
        ],
        solution: [
          "Every serious AI feature needs a control story. If the model is wrong, who catches it, how fast, and what happens next?",
          "The rollback trigger should be numerical and visible: for example, citation coverage below 95 percent or user correction rate above 8 percent.",
        ],
      },
    ],
  },
];

export function getBadgeById(id: string) {
  return GREY_BADGES.find((badge) => badge.id === id);
}

export function getStoreItemById(id: string) {
  return GREY_STORE_ITEMS.find((item) => item.id === id);
}

export function getPathLessonSlugs(pathId: string) {
  if (pathId !== PATH_ID) return [];
  return CURIOUS_BUILDERS_LESSONS.map((lesson) => lesson.slug);
}
