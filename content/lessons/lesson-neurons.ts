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
      icon: "🧠",
      body: "The word neural makes people picture a glowing digital brain. The reality is simpler and more useful. A network is layers of tiny units. Each one multiplies its inputs by learned weights, adds a bias, squashes the result, and passes it on. That is the whole machine. The wonder is what happens when you stack enough of them.",
      visual: {
        kind: "stats",
        items: [
          { value: "×", label: "multiply inputs by weights" },
          { value: "+", label: "add bias" },
          { value: "∿", label: "squash and pass on" },
        ],
      },
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
      icon: "〰️",
      body: "Each neuron ends with a nonlinear squash, like a sigmoid that flattens any number into a value between zero and one. Without it, stacking a hundred layers would mathematically collapse into a single straight line and gain you nothing. That little bend is the reason deep networks can learn curves, corners, and complex shapes at all.",
      highlights: [
        "Without a nonlinear squash, stacking 100 layers collapses to one straight line.",
        "The squash is what lets a network learn curves and complex decision boundaries.",
        "The sigmoid maps any number to a value between 0 and 1.",
      ],
    },
    {
      type: "build",
      title: "Depth builds understanding in layers",
      icon: "📚",
      body: "Early layers learn the simplest pieces, like an edge in an image or a hint of tone in a sentence. The next layers combine those into shapes or phrases. Deeper layers combine those into faces or full ideas. Nobody programs this hierarchy. It emerges because each layer gets to build on the one below it.",
      highlights: [
        "Early layers: simple features like edges, tones, and single words.",
        "Middle layers: shapes, phrases, and combinations of features.",
        "Deep layers: faces, concepts, and full ideas, built from the layers below.",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "Input", detail: "Raw data" },
          { label: "Layer 1", detail: "Simple features" },
          { label: "Layer 2", detail: "Combinations" },
          { label: "Layer N", detail: "Complex ideas" },
          { label: "Output", detail: "Prediction" },
        ],
      },
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
      body: "Nudge the sliders until the output crosses 0.5. That flip is the model changing its mind. The same idea runs in a large language model, just across billions of dimensions instead of three.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "spam",
    },
    {
      type: "build",
      title: "How a network learns, in plain words",
      icon: "🔄",
      body: "It makes a guess, measures how wrong it was, and then nudges every weight a tiny bit in the direction that would have reduced the error. Repeat across millions of examples and the weights settle into a setting that predicts well. That feedback nudge is called backpropagation. You need the picture, not the calculus.",
      highlights: [
        "Make a guess → measure error → nudge weights to reduce it.",
        "Repeat across millions of examples and weights settle into the right values.",
        "That nudge is called backpropagation. You need the picture, not the calculus.",
      ],
    },
    {
      type: "checkpoint",
      title: "Under the hood of a language model",
      question: "While you chat, a language model is mostly",
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
      type: "apply",
      title: "What this means when choosing models",
      body: "You do not need to understand backpropagation to make better decisions about AI. But knowing what depth actually buys you changes how you evaluate model claims and pick tools.",
      roles: [
        {
          role: "Product Manager",
          action: "When an engineer says 'we need a bigger model', ask: is our task actually complex enough to need more layers, or do we have a data or prompting problem? Bigger models cost more and run slower — make sure the complexity is justified.",
        },
        {
          role: "Founder",
          action: "Small, focused models often outperform large general ones on specific tasks. Before paying for the biggest model, test a smaller one fine-tuned on your domain. The depth hierarchy means a model trained on your data may beat a general giant.",
        },
        {
          role: "Builder",
          action: "When a model underperforms on a task, run a simple experiment: keep the model the same but improve your prompt and input quality first. Most underperformance is a data or framing problem, not a model size problem.",
        },
      ],
      microAction:
        "Ask Claude to explain a hard decision step by step, out loud. Watch it build the answer in layers — simple observations first, then combinations, then conclusions. That layered reasoning is the hierarchy of representations you just learned, happening in real time.",
    },
    {
      type: "reflect",
      title: "You have seen the machine",
      body: "Prediction units, weights, bias, the nonlinear squash, depth, and a feedback nudge to learn. That is deep learning without the mystique. Next we face the most important limitation of all, the reason these confident systems sometimes make things up.",
      learned: [
        "A neuron multiplies inputs by weights, adds bias, and squashes the result.",
        "The nonlinear squash is what lets stacked layers learn complex patterns.",
        "Depth = a hierarchy of representations, each layer building on the last.",
        "Learning = make guesses, measure error, nudge weights. Repeat millions of times.",
      ],
    },
  ],
};
