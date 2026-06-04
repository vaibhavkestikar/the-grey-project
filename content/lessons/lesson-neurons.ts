import type { StructuredLesson } from "@/types/lesson";

export const lessonNeurons: StructuredLesson = {
  id: "neurons",
  slug: "neurons",
  title: "Neurons And Deep Learning",
  hook: "A neural network is stacked prediction units, not a digital brain.",
  concept: "neural networks",
  durationMinutes: 20,
  pathId: "curious-builders",
  free: false,
  order: 5,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "What is really inside",
      body: "The word neural makes people picture a glowing digital brain. The reality is simpler and more useful. A network is layers of tiny units. Each one multiplies its inputs by learned weights, adds a bias, squashes the result, and passes it on. That is the whole machine. The wonder is what happens when you stack enough of them.",
    },
    {
      type: "play",
      title: "Meet one neuron",
      body: "Switch between scenarios and play. Watch how the weight amplifies a signal and the bias shifts the starting point before any evidence arrives.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "movie",
    },
    {
      type: "checkpoint",
      title: "What does weight do?",
      question: "In the neuron, raising the weight on an input means",
      options: [
        "the model ignores that input",
        "that input has more influence on the final decision",
        "the input becomes random",
        "the bias is deleted",
      ],
      correctIndex: 1,
      insight:
        "Weight is how much the model listens to an input. Big weight, big influence. Training is the search for the right weights.",
    },
    {
      type: "build",
      title: "Why the squash matters",
      body: "Each neuron ends with a nonlinear squash, like a sigmoid that flattens any number into a value between zero and one. Without it, stacking a hundred layers would mathematically collapse into a single straight line and gain you nothing. That little bend is the reason deep networks can learn curves, corners, and complex shapes at all.",
    },
    {
      type: "build",
      title: "Depth builds understanding in layers",
      body: "Early layers learn the simplest pieces, like an edge in an image or a hint of tone in a sentence. The next layers combine those into shapes or phrases. Deeper layers combine those into faces or full ideas. Nobody programs this hierarchy. It emerges because each layer gets to build on the one below it.",
    },
    {
      type: "checkpoint",
      title: "Why depth is powerful",
      question: "Deep networks are powerful mainly because",
      options: [
        "they copy human neurons exactly",
        "stacked layers compose simple features into complex ones",
        "they remove the need for data",
        "they train in a single step",
      ],
      correctIndex: 1,
      insight:
        "Power comes from a hierarchy of representations, not biological realism. Simple parts combine into rich understanding.",
    },
    {
      type: "play",
      title: "Find the decision boundary",
      body: "Nudge the sliders until the output crosses 0.5. That flip is the model changing its mind. The same idea runs in GPT, just across billions of dimensions instead of three.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
    },
    {
      type: "build",
      title: "How a network learns, in plain words",
      body: "It makes a guess, measures how wrong it was, and then nudges every weight a tiny bit in the direction that would have reduced the error. Repeat across millions of examples and the weights settle into a setting that predicts well. That feedback nudge is called backpropagation. You need the picture, not the calculus.",
    },
    {
      type: "checkpoint",
      title: "Under the hood of ChatGPT",
      question: "While you chat, GPT is mostly",
      options: [
        "looking up exact answers in a database",
        "running forward passes to predict next token probabilities",
        "rewriting all of its weights after each token",
        "executing grammar rules a human wrote",
      ],
      correctIndex: 1,
      insight:
        "It runs the learned network forward to predict the next token, samples one, and repeats. Learning happened earlier. Chat is just prediction at scale.",
    },
    {
      type: "reflect",
      title: "You have seen the machine",
      body: "Prediction units, weights, bias, the nonlinear squash, depth, and a feedback nudge to learn. That is deep learning without the mystique. Next we face the most important limitation of all, the reason these confident systems sometimes make things up.",
    },
  ],
};
