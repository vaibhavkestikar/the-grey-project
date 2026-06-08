import type { StructuredLesson } from "@/types/lesson";

export const lessonHallucinations: StructuredLesson = {
  id: "hallucinations",
  slug: "hallucinations",
  title: "Why AI Makes Things Up",
  hook: "It is not a bug. It is not going to be patched. Here is what it actually is, and how to design around it.",
  concept: "hallucinations",
  durationMinutes: 15,
  pathId: "curious-builders",
  free: false,
  order: 6,
  relatedBlogSlugs: [],
  blocks: [
    {
      type: "hook",
      title: "The confident lie that broke someone's product",
      icon: "👻",
      body: "I have watched a startup nearly lose a client because their AI assistant cited a regulation that does not exist: with a real-sounding regulation number and everything. The client almost acted on it. Hallucination is not a bug that will get patched in the next version. It is a structural property of how these models work. Understanding it is not optional if you are shipping AI into any context where accuracy matters. This lesson gives you the mental model and the mitigation toolkit.",
      visual: {
        kind: "stats",
        items: [
          { value: "~20%", label: "hallucination rate without grounding" },
          { value: "~3%", label: "with RAG and strict prompting" },
          { value: "100%", label: "of teams surprised by this in prod" },
        ],
      },
      deepDive: {
        cta: "The technical name for this, and why it matters",
        content: "The academic term for hallucination is confabulation: a psychology term for filling memory gaps with plausible but invented material. This is diagnostic, the model is not lying (lying requires intent and knowledge of the truth), it is confabulating: generating the most statistically plausible continuation of a prompt about facts it does not have. The implication is that hallucination is not a bug to be fixed; it is an inherent property of models trained to generate plausible text. It can be mitigated by grounding and careful system design, but it cannot be eliminated from base generation.",
      },
    },
    {
      type: "play",
      title: "Find the hallucination: before the model tells you",
      body: "Here are three responses. One of them contains a confident hallucination. Find it. Notice what makes it believable, and what makes it false. You are training your hallucination detector.",
      playgroundId: "neuron-sandbox",
      playgroundVariant: "hallucination-lab",
      deepDive: {
        cta: "How confidence scores are actually generated",
        content: "When a model sounds confident, that confidence is not a separate reliability score: it is expressed through the generation itself. The model does not have a truth checker running in parallel. A statement like 'the paper was published in 2019' sounds confident because '2019' was the most probable token following that context in training data, not because the model verified it. Systems that output explicit confidence scores are typically fine-tuned or prompted to produce those numbers, which means those numbers reflect calibration on training data, not real-time fact verification.",
      },
    },
    {
      type: "checkpoint",
      title: "What kind of failure is this?",
      question: "A language model states a specific statistic confidently. You cannot find any source for it. This is most likely:",
      options: [
        "The model has a private database of facts the public cannot access",
        "The model generated the most statistically plausible-sounding completion, which happened to be a fabricated fact",
        "The model was deliberately programmed to invent statistics",
        "The model found a paywalled source you don't have access to",
      ],
      correctIndex: 1,
      insight:
        "It generated the most plausible-sounding continuation. Statistics follow specific linguistic patterns: round numbers, confident phrasing, attribution to studies or reports. The model has seen thousands of these in training data and can generate one that matches the pattern perfectly without there being any actual source.",
      deepDive: {
        cta: "Why more capable models hallucinate in subtler ways",
        content: "Larger, more capable models do not necessarily hallucinate less, they hallucinate better. A smaller model might produce an obviously wrong answer that is easy to catch. A larger model produces a subtly wrong answer with exactly the right level of hedging, the right citation format, and enough correct surrounding context to make the error very hard to detect. As models become better at mimicking authoritative writing, their hallucinations look more authoritative too. Capability improvements make the surface harder to read, which is why systematic evaluation, not trust, should always be the foundation.",
      },
    },
    {
      type: "build",
      title: "Why this happens, not just that it happens",
      icon: "🔬",
      body: "The model does not have a fact-checking module. It has a probability distribution over tokens. It picks the most likely next token at each step. When the question involves a specific fact the model did not learn reliably during training, the most likely-sounding token may simply be wrong.",
      highlights: [
        "No truth oracle, the model cannot look up whether a claim is true",
        "Probability maximisation: it picks the most plausible next token, not the most accurate",
        "Training distribution, if similar-sounding confident claims appeared in training data, the pattern is learned",
        "No self-correction, the model cannot catch its own factual errors mid-generation",
      ],
      visual: {
        kind: "callout",
        text: "A language model is not a database. It is a very sophisticated pattern completion engine. Treating it like a database is where most hallucination-related failures begin.",
        color: "red",
      },
      deepDive: {
        cta: "The RLHF contribution to hallucination",
        content: "RLHF, the training stage that makes models helpful and conversational: may actually increase hallucination. Human raters prefer confident, fluent responses. RLHF optimises for human preference, which correlates with confident fluency. If raters do not know the correct answer, they cannot detect hallucination, so RLHF may inadvertently reward hallucinated responses that are well-written. This is a known tension in LLM training, and one reason why some researchers argue that RLHF creates models that are impressive to interact with but less epistemically honest than models before RLHF training.",
      },
    },
    {
      type: "play",
      title: "Grounded vs. ungrounded: run the comparison",
      body: "The same question. Two setups. One where the model uses only provided context. One where it speaks from memory. Watch the outputs diverge. This is not a demo. This is the RAG architecture you will implement.",
      playgroundId: "python-sandbox",
      playgroundVariant: "confidence-vs-truth",
      deepDive: {
        cta: "The RAG architecture that makes this production-ready",
        content: "The retrieval-augmented generation pattern you simulated is implemented in production using a vector database. At query time: embed the query, search the vector database for similar documents, prepend retrieved documents to the prompt, then instruct the model to answer only from them. Common vector databases: Pinecone, Weaviate, Chroma, pgvector. The quality of a RAG system depends equally on retrieval quality and generation quality: both need independent evaluation. Most RAG failures are retrieval failures (the right document was not retrieved), not generation failures (the model ignored the document).",
      },
    },
    {
      type: "build",
      title: "Fix one: grounding",
      icon: "⚓",
      body: "Grounding means giving the model the facts it needs in the prompt, then instructing it to use only those facts. Instead of relying on the model's uncertain memory, you provide the source. The model's job changes from 'remember this fact' to 'extract and phrase this fact from the provided context'. That task, it does well.",
      highlights: [
        "Retrieval-augmented generation (RAG): find the relevant documents, put them in context, cite the answer",
        "System prompt instruction: 'Answer only using the information provided. If the answer is not in the documents, say so.'",
        "Citation requirement: 'End every answer with the source document you used'",
        "Chunk carefully: retrieved chunks should be short enough to be read fully, long enough to contain complete facts",
      ],
      visual: {
        kind: "flow",
        steps: [
          { label: "User question", detail: "input" },
          { label: "Retrieve relevant docs", detail: "vector search" },
          { label: "Ground the prompt", detail: "inject context" },
          { label: "Generate from context", detail: "no memory needed" },
        ],
      },
      deepDive: {
        cta: "Why grounding is not a complete solution",
        content: "Grounding reduces hallucination but does not eliminate it. Three remaining risks: retrieval failure (the relevant document is not in your corpus and the model defaults to memory); extraction failure (the document contains the answer but the model misreads or over-extrapolates from it); instruction failure (the model is told to use only retrieved sources but occasionally ignores this when it has a strong internal prior). Production systems mitigate these with retrieval quality metrics, mandatory answer-source citation, and regular sampling of outputs for human review.",
      },
    },
    {
      type: "checkpoint",
      title: "Which approach prevents hallucination?",
      question: "You are building a customer support bot that must answer questions about your product accurately. Which setup minimises hallucination risk?",
      options: [
        "Use the largest model available: more parameters means better memory",
        "Give the model your full product documentation as context, instruct it to only use that context, and require it to cite the source for each answer",
        "Set the temperature to zero, this makes the model deterministic and therefore correct",
        "Use a simpler model that is less likely to confabulate",
      ],
      correctIndex: 1,
      insight:
        "Grounding plus instruction plus citation. Larger models still hallucinate on facts they don't have. Temperature zero makes generation deterministic but does not add factual grounding, the model will just deterministically hallucinate the same wrong answer every time. Citation creates an audit trail that exposes failures fast.",
      deepDive: {
        cta: "The liability angle that product teams consistently miss",
        content: "In regulated industries, 'where did this answer come from?' is not philosophical: it is a legal requirement. Financial advice, medical information, and legal content have specific regulatory frameworks about the provenance of information. An AI feature that generates a confident answer from model memory, with no citation, may be non-compliant even if the answer is correct. This is why every serious enterprise AI deployment in regulated sectors uses grounding with citation, not just for accuracy, but to produce an auditable answer trail. Building grounding from day one is significantly cheaper than retrofitting it after a compliance review.",
      },
    },
    {
      type: "build",
      title: "Fix two: let it say 'I don't know'",
      icon: "🙅",
      body: "A model that says 'I don't know' is more valuable than one that always answers. The second model sounds better, and occasionally destroys trust with a confident wrong answer at the worst possible moment. Designing for refusal is a product decision, not a limitation.",
      highlights: [
        "System prompt: 'If the answer is not clearly in the documents, say: I don't have reliable information on that.'",
        "Test for it: create 10 questions your system cannot answer and verify it refuses, not fabricates",
        "Calibrate the threshold: high-stakes contexts need more conservative refusal than low-stakes ones",
        "Treat refusal rate as a metric: track it alongside answer quality",
      ],
      visual: {
        kind: "callout",
        text: "Confident wrong answer at 2am: -10 NPS. 'I'm not sure: here is what I do know': +2 NPS. The maths are not complicated.",
        color: "slate",
      },
      deepDive: {
        cta: "The production pattern for honest refusal",
        content: "Building reliable refusal requires both prompt engineering and evaluation. The system prompt instruction is necessary but not sufficient. You need a test set of questions whose answers are not in your corpus, and you need to verify the model refuses rather than hallucinating for each one. A model that refuses 80% of unknowable questions has a 20% hallucination rate on out-of-scope queries, which at scale is significant. Refusal evaluation is as important as answer quality evaluation, and teams that skip it deploy systems that look good on standard benchmarks but fail on edge cases users actually encounter.",
      },
    },
    {
      type: "checkpoint",
      title: "Which output is better?",
      question: "A user asks your AI assistant about a competitor's product. The model has no information about it in its context. Which response is better?",
      options: [
        "A detailed answer synthesised from the model's training data about similar products",
        "An honest statement that it doesn't have reliable information about that product, with a suggestion to check the competitor's website",
        "A refusal to discuss any competitor products for legal reasons",
        "A comparison based purely on the model's general knowledge with no caveats",
      ],
      correctIndex: 1,
      insight:
        "Honest refusal with a redirect. Option A sounds helpful but fabricates details that may be wrong. Option C is too blunt and unhelpful. Option D has no caveats and puts fabricated content in front of the user. Option B preserves trust while being genuinely useful. Trust is a long-term asset; a single confident hallucination about a competitor can trigger a chargeback.",
      deepDive: {
        cta: "The specific hallucination categories most likely to harm users",
        content: "Not all hallucinations are equal. Research distinguishes: factual fabrication (inventing general facts), entity fabrication (inventing names, companies, papers), numerical fabrication (inventing statistics), and temporal fabrication (inventing dates). For most products, numerical and entity fabrications cause the most harm: a model that invents a regulation number, a court case name, or a medication dosage can have real-world consequences. Your verification habit should be highest for these specific categories: proper nouns, numbers, dates, and citations are the highest-risk outputs from any language model.",
      },
    },
    {
      type: "apply",
      title: "Audit your own AI features",
      body: "Every AI feature that makes factual claims is a hallucination risk. The question is not whether it will hallucinate: it will. The question is whether you have designed for that outcome.",
      roles: [
        {
          role: "Product Manager",
          action:
            "List every AI feature in your product that outputs factual claims. For each: does it use grounding? Does it have a refusal design? Has it been tested with questions it cannot answer? If any answer is no, you have a known risk sitting in production.",
        },
        {
          role: "Founder",
          action:
            "Your investors and customers will judge your AI quality by the worst hallucination they see, not the average quality. One confident wrong answer about a patient, a client, or a law will define your product's reputation. Spend one sprint building proper grounding before scaling.",
        },
        {
          role: "Builder",
          action:
            "Build a 'hallucination canary' into your logging: a set of 10 known-answer questions you run against every model update. If the hallucination rate on canary questions goes up after a prompt change or model upgrade, you catch it before users do.",
        },
        {
          role: "Analyst",
          action:
            "If you are using AI to generate data summaries, always include a verification step, the model should cite the specific data point it used for each claim. This makes it trivial to spot fabrication and creates an audit trail when a stakeholder questions a number.",
        },
      ],
      microAction:
        "Find one AI feature you own or use regularly. Ask it a question that requires a specific fact that you can verify independently. Verify the answer. If it was wrong with confidence, you have just personally experienced the problem. Now design the grounding fix.",
      deepDive: {
        cta: "The systematic audit process, not just the intuition",
        content: "A practical hallucination audit has three parts: inventory (list every AI feature that generates factual claims), classification (rate each as low, medium, or high risk based on consequence of error), and testing (for each high-risk feature, create 20 edge-case questions and measure the hallucination rate). This should take a day for most products. The output is a risk-prioritised backlog of grounding improvements. This is the difference between hallucination awareness and hallucination management, and only one of them keeps your product safe at scale.",
      },
    },
    {
      type: "reflect",
      title: "You now design for this, not around it",
      body: "Hallucination is structural. It will not be patched. But it is predictable, measurable, and mitigable with grounding and honest refusal design. That is enough. Next lesson: the full ML workflow: from framing the problem all the way to monitoring in production.",
      learned: [
        "Hallucination is structural, the model generates statistically plausible text, not verified facts.",
        "Larger models hallucinate more convincingly, they are harder to catch, not less likely to occur.",
        "Grounding: give the model the facts in the prompt, instruct it to use only those facts, require citation.",
        "Refusal design: explicitly instruct and test for 'I don't know' on questions your system cannot answer.",
        "Entity, numerical, and citation fabrications are the highest-risk hallucination types for most products.",
      ],
      deepDive: {
        cta: "Where hallucination research is going",
        content: "Current hallucination mitigation is reactive: grounding and refusal after the fact. The frontier of research is proactive: can we train models that are epistemically calibrated from the start? Approaches include: training with uncertainty estimation (predicting confidence alongside answers), constrained decoding (refusing to generate tokens constituting factual claims without retrieval), and process reward models (rewarding correct reasoning steps, not just correct final answers). No approach eliminates hallucination yet, but the field is moving from 'acknowledge the problem' to 'design against it architecturally'.",
      },
    },
  ],
};
