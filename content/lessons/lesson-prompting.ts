import type { StructuredLesson } from "@/types/lesson";

export const lessonPrompting: StructuredLesson = {
  id: "prompting",
  slug: "prompting",
  title: "Talking to AI: Prompting",
  hook: "Same model, same question. A good prompt gets an answer ten times better.",
  concept: "prompting",
  durationMinutes: 16,
  pathId: "curious-builders",
  free: false,
  order: 3,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The prompt is the program",
      icon: "💬",
      body: "You cannot change the model's weights. What you can change is its input. A prompt is the set of instructions a predicting machine conditions on before it answers. Better input means a sharper, more useful prediction. Prompting is the closest thing to programming a model that everyone can do.",
      visual: {
        kind: "flow",
        steps: [
          { label: "Your prompt", detail: "The input" },
          { label: "Context", detail: "Who, what, why" },
          { label: "Prediction", detail: "Token by token" },
          { label: "Better answer", detail: "Better input = better output" },
        ],
      },
    },
    {
      type: "visual",
      title: "Why vague prompts fail",
      body: "Ask explain machine learning and the model has no idea who you are or what you need. It could mean a one line tweet or a textbook chapter, so it produces the safe average answer that satisfies no one. Specificity removes that guesswork and points the prediction where you actually want it.",
      highlights: [
        "A vague prompt leaves the model with too many valid interpretations.",
        "The model defaults to the safe average answer that satisfies no one.",
        "Specificity removes guesswork and points the prediction where you need it.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Vague prompt",
        leftPoints: [
          "Explain machine learning",
          "Write a summary",
          "Give me ideas",
        ],
        rightLabel: "Specific prompt",
        rightPoints: [
          "Explain ML to a 12 year old in 3 bullet points",
          "Summarise in 2 sentences for a nontechnical CEO",
          "Give 5 product names for a meditation app for teens",
        ],
      },
    },
    {
      type: "play",
      title: "Build a great prompt live",
      body: "Toggle techniques on and off and watch the quality score climb. Read how the rewritten prompt changes as you add each piece.",
      playgroundId: "prompt-lab",
    },
    {
      type: "checkpoint",
      title: "Find the biggest lever",
      question: "Which change usually improves an answer the most?",
      options: [
        "Typing in all capital letters",
        "Adding a role, context, an example, and a format",
        "Saying please several times",
        "Making the prompt as short as possible",
      ],
      correctIndex: 1,
      insight:
        "Role, context, example, and format are the four reliable levers. Politeness and capitals do almost nothing.",
    },
    {
      type: "build",
      title: "The four levers, explained",
      icon: "🔧",
      body: "Give it a role so it adopts the right voice. Add context such as your audience, goal, and constraints. Show one good example so it can copy the pattern, often called few shot learning. Specify the output format so you get a table or list instead of a wall of text. For hard problems, also ask it to think step by step.",
      highlights: [
        "Role: give the model a persona and it adopts the right voice.",
        "Context: add audience, goal, and constraints so it knows what you need.",
        "Example: show one strong output and it copies the quality bar.",
        "Format: specify table, list, or JSON and you get exactly that.",
      ],
      visual: {
        kind: "comparison",
        leftLabel: "Lever",
        leftPoints: ["Role", "Context", "Example", "Format"],
        rightLabel: "What it does",
        rightPoints: [
          "Sets the voice and expertise level",
          "Adds audience, goal, and constraints",
          "Shows the quality bar to copy",
          "Defines the output structure",
        ],
      },
    },
    {
      type: "play",
      title: "Reach excellent with fewer moves",
      body: "Now try to hit a high score using the smallest number of techniques. In real products, shorter prompts are cheaper and faster, so efficiency matters too.",
      playgroundId: "prompt-lab",
    },
    {
      type: "checkpoint",
      title: "Why examples work",
      question: "Showing the model one strong example mainly helps because it",
      options: [
        "permanently retrains the model",
        "anchors the format and quality bar for it to copy",
        "deletes its other knowledge",
        "makes the responses random",
      ],
      correctIndex: 1,
      insight:
        "An example sets the target pattern the model predicts toward. It is the fastest way to communicate a standard without long instructions.",
    },
    {
      type: "build",
      title: "Why step by step thinking helps",
      icon: "🧩",
      body: "A model predicts one token at a time, so a hard answer crammed into a single leap is easy to get wrong. Asking it to reason out loud lets each step build on the last, the same way you would solve a tricky sum on paper instead of in your head. More room to reason often means a more correct result.",
      highlights: [
        "Predicting token by token means hard answers need room to unfold.",
        "Asking it to reason out loud lets each step build on the last.",
        "More room to reason often means a more correct result.",
      ],
    },
    {
      type: "build",
      title: "Prompting is measurable, not magic",
      icon: "📊",
      body: "Professionals do not trust a prompt because it felt good once. They keep a small set of test inputs and compare outputs whenever they change the wording. Prompt engineering without evaluation is just hope wearing a lab coat.",
      highlights: [
        "Keep a test set of inputs. Compare outputs when you change wording.",
        "Prompt engineering without evaluation is just hope wearing a lab coat.",
        "Consistency matters as much as quality for anything built on top.",
      ],
    },
    {
      type: "checkpoint",
      title: "Apply it",
      question:
        "You want consistent JSON output from a model for an app. Best move?",
      options: [
        "Ask nicely and hope it stays consistent",
        "Specify the exact format and show one example of the JSON",
        "Use all capitals for the field names",
        "Make the prompt as vague as possible",
      ],
      correctIndex: 1,
      insight:
        "Stating the format and showing one example is how you get reliable, machine readable output you can build on.",
    },
    {
      type: "reflect",
      title: "You can now steer any model",
      body: "Role, context, example, format, and step by step reasoning. These five habits work on every model you will ever touch. Next we open the box and look at the neuron, the unit that makes all of this possible.",
      learned: [
        "Role, context, example, and format are the four reliable levers.",
        "Step by step reasoning helps the model unpack hard problems correctly.",
        "Test your prompts with consistent examples. Do not trust gut feel.",
        "Good prompts are concise and precise, not long and hopeful.",
      ],
    },
  ],
};
