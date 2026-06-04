import type { StructuredLesson } from "@/types/lesson";

export const lessonClassicalVsMl: StructuredLesson = {
  id: "classical-vs-ml",
  slug: "classical-vs-ml",
  title: "Rules Versus Learning",
  hook: "When should a human write the rules, and when should the data write them?",
  concept: "machine learning",
  durationMinutes: 15,
  pathId: "curious-builders",
  free: true,
  order: 2,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "Two ways to make a computer decide",
      body: "For decades software worked one way. A human thought hard, wrote down every rule, and the computer followed them. Machine learning flips this. Instead of writing rules, you show examples and let the machine find the rules itself. Knowing which approach fits a problem is one of the most useful instincts you can build.",
    },
    {
      type: "build",
      title: "The rules approach, in plain terms",
      body: "Imagine writing a spam filter by hand. Block anything that says free money. Block anything with too many capital letters. It works for a week. Then spammers write free m0ney, then they change again. You are now trapped writing rules forever, always one step behind. This is the wall classical programming hits with messy real world data.",
    },
    {
      type: "play",
      title: "Decide it yourself",
      body: "Here are real tasks. For each one, choose whether a human writing rules would win, or whether learning from examples would win. Trust your gut, then check.",
      playgroundId: "rules-vs-ml-sorter",
    },
    {
      type: "checkpoint",
      title: "Spot the pattern",
      question: "Which kind of problem is a poor fit for hand written rules?",
      options: [
        "Calculating sales tax at a fixed percentage",
        "Recognising a cat in any photo, in any lighting",
        "Converting kilometres to miles",
        "Sorting a list of numbers",
      ],
      correctIndex: 1,
      insight:
        "Recognising a cat has no clean rulebook. Fur, angle, and lighting vary endlessly. Examples beat rules whenever the pattern is fuzzy and huge.",
    },
    {
      type: "build",
      title: "The learning approach, in plain terms",
      body: "With machine learning you collect thousands of labelled examples. This is spam, this is not. The model adjusts itself until its predictions match the labels. Now when spammers change their tricks, you do not rewrite rules. You just add fresh examples and let it adapt. The work shifts from writing logic to collecting good data.",
    },
    {
      type: "play",
      title: "Watch a learned decision form",
      body: "This neuron has learned a churn pattern from data. Move the sliders to see how a learned model weighs evidence, instead of following a rule a person typed.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "churn",
    },
    {
      type: "checkpoint",
      title: "Where did the logic come from?",
      question: "In machine learning, who decides how much each input matters?",
      options: [
        "A developer types the exact weights by hand",
        "The model learns the weights from labelled examples",
        "The weights are always random",
        "The user sets them every time",
      ],
      correctIndex: 1,
      insight:
        "Training tunes the weights automatically so predictions match reality. You curate the examples. The model finds the rule hidden inside them.",
    },
    {
      type: "build",
      title: "The honest trade off",
      body: "Rules are predictable, easy to explain, and need no data. Learning handles messiness and scale but needs many examples and can fail in surprising ways. Great engineers do not pick a side. They match the tool to the problem, and often combine both.",
    },
    {
      type: "checkpoint",
      title: "Make the call",
      question: "Your team must flag toxic comments across millions of posts daily. Best first choice?",
      options: [
        "Hand write a banned word list and stop there",
        "Learn from labelled examples, since language is endlessly varied",
        "Ask a human to read every post",
        "Ignore it, rules are enough",
      ],
      correctIndex: 1,
      insight:
        "Banned word lists are brittle and easy to dodge. Learning from examples scales to the messy, ever changing way people actually write.",
    },
    {
      type: "reflect",
      title: "A new lens on every product",
      body: "You now have a question you can ask about any feature you use. Is this rules or is this learned? Most modern products quietly use both. Next you will learn to talk to a learned system on purpose, through prompting.",
    },
  ],
};
