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
      body: "You cannot change the model's weights. What you can change is its input. A prompt is the set of instructions a predicting machine conditions on before it answers. Better input means a sharper, more useful prediction. Prompting is the closest thing to programming a model that everyone can do.",
    },
    {
      type: "visual",
      title: "Why vague prompts fail",
      body: "Ask explain machine learning and the model has no idea who you are or what you need. It could mean a one line tweet or a textbook chapter, so it produces the safe average answer that satisfies no one. Specificity removes that guesswork and points the prediction where you actually want it.",
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
      body: "Give it a role so it adopts the right voice. Add context such as your audience, goal, and constraints. Show one good example so it can copy the pattern, often called few shot. Specify the output format so you get a table or list instead of a wall of text. For hard problems, also ask it to think step by step.",
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
      body: "A model predicts one token at a time, so a hard answer crammed into a single leap is easy to get wrong. Asking it to reason out loud lets each step build on the last, the same way you would solve a tricky sum on paper instead of in your head. More room to reason often means a more correct result.",
    },
    {
      type: "build",
      title: "Prompting is measurable, not magic",
      body: "Professionals do not trust a prompt because it felt good once. They keep a small set of test inputs and compare outputs whenever they change the wording. Prompt engineering without evaluation is just hope wearing a lab coat.",
    },
    {
      type: "checkpoint",
      title: "Apply it",
      question: "You want consistent JSON output from a model for an app. Best move?",
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
    },
  ],
};
