"use client";

import { useRef, useState } from "react";

/* ─── Pyodide singleton ──────────────────────────────────────────────────── */

type PyodideInstance = {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: { set: (name: string, value: unknown) => void };
};

declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInstance>;
    __pyodide?: PyodideInstance;
    __pyodideLoading?: Promise<PyodideInstance>;
  }
}

function loadPyodideSingleton(): Promise<PyodideInstance> {
  if (typeof window === "undefined")
    return Promise.reject(new Error("SSR"));
  if (window.__pyodide) return Promise.resolve(window.__pyodide);
  if (window.__pyodideLoading) return window.__pyodideLoading;

  window.__pyodideLoading = (async () => {
    if (!document.querySelector('script[data-pyodide]')) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src =
          "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js";
        s.dataset.pyodide = "1";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("Failed to load Pyodide"));
        document.head.appendChild(s);
      });
    }

    let attempts = 0;
    while (!window.loadPyodide && attempts < 80) {
      await new Promise((r) => setTimeout(r, 100));
      attempts++;
    }
    if (!window.loadPyodide) throw new Error("Pyodide failed to initialize");

    const py = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
    });
    window.__pyodide = py;
    return py;
  })();

  return window.__pyodideLoading;
}

/* ─── Scenario definitions ───────────────────────────────────────────────── */

type Scenario = {
  title: string;
  description: string;
  code: string;
  challenge: string;
};

const SCENARIOS: Record<string, Scenario> = {
  /* ── Lesson 1: AI Is Prediction ─────────────────────────────────── */
  "sigmoid-explorer": {
    title: "The math inside every AI neuron",
    description:
      "Every neuron in every model you've ever used runs this function. It squashes any raw score into a probability between 0 and 1. Run it. Change x. This is not a diagram — this is the actual math.",
    code: `import math

# This sigmoid function lives inside every AI neuron.
# Change x and click Run — watch the probability shift.
x = 2.5  # raw score (weighted inputs combined)

prob = 1 / (1 + math.exp(-x))
print(f"Raw score   → {x}")
print(f"Probability → {round(prob * 100, 1)}%")
print()
print("Try these values for x:")
for test in [-5, -2, 0, 2, 5]:
    p = 1 / (1 + math.exp(-test))
    bar = "█" * round(p * 20)
    print(f"  x={test:>3}  →  {bar:<20}  {round(p*100,1)}%")`,
    challenge:
      "Set x = 0 and run. Why does every prediction land at exactly 50% when x is 0? What does that tell you about how a model handles zero evidence?",
  },
  "prediction-dict": {
    title: "A language model in 8 lines",
    description:
      "A real LLM has 50,000+ words with probabilities learned from trillions of tokens. This has 4. The mechanism is identical. Run it. Add a word. See what happens.",
    code: `# A tiny language model.
# Predicts the next word using a probability table.
# A real LLM is this — scaled to billions of examples.

next_word_probs = {
    "mat":   0.58,
    "floor": 0.22,
    "sofa":  0.14,
    "moon":  0.06,
}

prompt = "The cat sat on the"
prediction = max(next_word_probs, key=next_word_probs.get)

print(f'"{prompt} {prediction}"')
print()
print("All candidates (most likely first):")
for word, p in sorted(next_word_probs.items(), key=lambda x: -x[1]):
    bar = "█" * round(p * 30)
    print(f"  {word:<8} {bar} {round(p * 100)}%")`,
    challenge:
      'Add "roof": 0.09 to the dictionary and re-run. Does the model\'s prediction change? What happens to probabilities that don\'t sum to 1?',
  },

  /* ── Lesson 2: Rules vs ML ──────────────────────────────────────── */
  "rules-trap": {
    title: "Write the rules yourself. Watch them break.",
    description:
      "This is a hand-written spam filter — every rule typed by a human. Run it. See what it catches. Then look at what slips through and ask: how long before the spammer figures this out?",
    code: `# A hand-written spam filter.
# Rules a real engineer wrote at 11pm.

def is_spam(email: str) -> str:
    if "free money" in email.lower():
        return "SPAM"
    if "click here!!!" in email.lower():
        return "SPAM"
    if "winner" in email.lower() and "congratulations" in email.lower():
        return "SPAM"
    return "NOT SPAM"

emails = [
    ("Win FREE MONEY now! Click here!!!", True),        # obvious spam
    ("Win fr33 m0ney now! C1ick h3re!!!",  True),       # spammer adapted
    ("CONGRATULATIONS — you're a WINNER!", True),       # new variant
    ("Meeting tomorrow at 3pm",            False),      # real email
    ("Your invoice is attached",           False),      # real email
]

print("Rule-based filter results:")
print("─" * 55)
caught = 0
for text, actually_spam in emails:
    verdict = is_spam(text)
    caught  += (verdict == "SPAM" and actually_spam)
    flag    = "✓" if (verdict == "SPAM") == actually_spam else "✗ MISSED"
    print(f"{flag:<10} {verdict:<10} | {text[:40]}")

spam_count = sum(1 for _, s in emails if s)
print()
print(f"Caught {caught}/{spam_count} spam emails.")
print("The others slipped through. Spammers adapt faster than you rewrite.")`,
    challenge:
      "Add a rule to catch 'fr33 m0ney'. Then think: how would a spammer respond to your new rule? This loop of rules → bypass → more rules is exactly why ML exists.",
  },

  /* ── Lesson 3: Prompting ────────────────────────────────────────── */
  "prompt-builder": {
    title: "Build a prompt like a production engineer",
    description:
      "In real products, prompts are code: versioned, assembled from parts, tested. Run this. Remove a lever. See what happens to the structure — and imagine what happens to the model's output.",
    code: `# In production, prompts are built programmatically.
# Each variable is a lever you control.

role    = "You are a senior product manager at a B2B SaaS company."
context = "The audience is a non-technical CEO evaluating AI tools."
task    = "Explain what machine learning actually is."
fmt     = "Exactly 3 bullet points. Max 15 words each. Plain English."
example = """
• Machine learning finds patterns in data, then predicts from them.
• It improves as you add examples — no manual rule-writing needed.
• Every AI feature you use — search, recommendations, spam filters — runs on this.
"""

def build_prompt(role, context, task, fmt, example=""):
    parts = []
    if role:    parts.append(f"ROLE\\n{role}")
    if context: parts.append(f"CONTEXT\\n{context}")
    if task:    parts.append(f"TASK\\n{task}")
    if fmt:     parts.append(f"FORMAT\\n{fmt}")
    if example: parts.append(f"EXAMPLE{example}")
    return "\\n\\n".join(parts)

prompt = build_prompt(role, context, task, fmt, example)

# Rough token estimate (1 token ≈ 4 chars)
tokens = round(len(prompt) / 4)

print("─── Assembled prompt ───")
print(prompt)
print()
print(f"Estimated tokens: ~{tokens}")
print(f"Levers used: {sum([bool(role), bool(context), bool(fmt), bool(example)])}/4")`,
    challenge:
      "Set fmt = '' (empty string) and re-run. The prompt still looks reasonable — but without a format spec, the model can return a paragraph, a table, a poem, or JSON. Try to write a prompt that uses all 4 levers in under 80 tokens.",
  },

  /* ── Lesson 4: Tokens & Embeddings ─────────────────────────────── */
  "token-counter": {
    title: "Count tokens. Count cost.",
    description:
      "Tokens are the billing unit for every LLM API. This estimator approximates real tokenizer output. Run it, then adjust the scale numbers — you'll see why system prompt length is a budget decision.",
    code: `import re

def estimate_tokens(text: str):
    """Approximate BPE tokenization. Real tokenizers vary by model."""
    tokens = re.findall(r"\\w+|[^\\w\\s]", text)
    return len(tokens)

# Sample texts — see how different content tokenizes
texts = {
    "Short greeting":        "Hello, how are you?",
    "Normal sentence":       "The quick brown fox jumps over the lazy dog.",
    "Rare long word":        "Supercalifragilisticexpialidocious",
    "Code snippet":          'result = 1 / (1 + math.exp(-x))',
    "Your system prompt":    "You are a helpful assistant. Always answer in bullet points. Never mention competitor products. If you don't know, say so clearly.",
}

print("Token estimates (real tokenizers will differ slightly):")
print("─" * 55)
for label, text in texts.items():
    t = estimate_tokens(text)
    c = len(text)
    print(f"{label:<22} {t:>4} tokens  |  {c:>4} chars  |  {c/t:.1f} chars/tok")

# Scale to production costs
print()
TOKEN_PRICE = 0.000002   # $2 per million tokens (GPT-4o-mini approx)
DAILY_USERS = 10_000
AVG_TOKENS  = 500        # ← change this to see the impact

daily  = DAILY_USERS * AVG_TOKENS * TOKEN_PRICE
print(f"At {DAILY_USERS:,} users × {AVG_TOKENS} tokens/request:")
print(f"  \${daily:.2f}/day  →  \${daily * 30:,.0f}/month")
print()
print("Try changing AVG_TOKENS to 2000 (a verbose system prompt).")`,
    challenge:
      "Change AVG_TOKENS to 2000 and re-run. Now change DAILY_USERS to 100,000. That monthly number is why trimming a system prompt is a product decision, not an engineering detail.",
  },

  /* ── Lesson 5: Neurons & Deep Learning ─────────────────────────── */
  "network-forward-pass": {
    title: "Run a 2-layer neural network from scratch",
    description:
      "No libraries. Just the arithmetic. This is what 'running a model' actually means — multiply, add bias, squash — repeated across every layer until you get a prediction.",
    code: `import math

def sigmoid(x: float) -> float:
    return 1 / (1 + math.exp(-x))

# A tiny 2-layer network trained to detect spam.
# Weights below were learned via backpropagation — you just run them.

# Layer 1: 2 neurons, each taking 2 inputs
#   inputs = [suspicious_word_score, all_caps_ratio]
L1_weights = [[0.8, -0.3], [-0.2, 1.1]]
L1_bias    = [0.1, -0.4]

# Layer 2: 1 neuron combining Layer 1 outputs
L2_weights = [1.2, -0.9]
L2_bias    = 0.3

def forward(inputs: list) -> float:
    print(f"Inputs: suspicious={inputs[0]}, caps_ratio={inputs[1]}")
    print()

    # Layer 1
    l1_out = []
    for i, (w, b) in enumerate(zip(L1_weights, L1_bias)):
        raw = sum(wi * xi for wi, xi in zip(w, inputs)) + b
        out = sigmoid(raw)
        l1_out.append(out)
        print(f"  L1 neuron {i}: raw={raw:.3f}  →  sigmoid  →  {out:.3f}")

    # Layer 2
    raw2  = sum(w * x for w, x in zip(L2_weights, l1_out)) + L2_bias
    final = sigmoid(raw2)
    print(f"  L2 neuron 0: raw={raw2:.3f}  →  sigmoid  →  {final:.3f}")
    print()
    print(f"Spam probability: {round(final * 100, 1)}%")
    return final

# Likely spam: high suspicious words, high caps
print("=== Suspicious email ===")
forward([0.9, 0.8])
print()
# Likely real: low suspicious words, low caps
print("=== Normal email ===")
forward([0.1, 0.05])`,
    challenge:
      "Change the first call to forward([0.5, 0.5]) and run. Notice how both layers shift. This is a forward pass — every LLM response you've ever gotten ran billions of these in sequence.",
  },

  /* ── Lesson 6: Hallucinations ───────────────────────────────────── */
  "confidence-vs-truth": {
    title: "Simulate grounding vs raw generation",
    description:
      "This models the difference between a raw LLM answering from memory versus a grounded system that retrieves sources first. The confidence numbers are the key thing to watch.",
    code: `import random
random.seed(42)

# ── Knowledge base (retrieved documents) ────────────────────────────
knowledge_base = {
    "capital of france":     "Paris",
    "author of hamlet":      "William Shakespeare",
    "speed of light":        "299,792,458 metres per second",
}

def normalize(q: str) -> str:
    return q.lower().strip().rstrip("?")

def raw_model(question: str):
    """No grounding — answers from memory. High confidence regardless."""
    key = normalize(question)
    if key in knowledge_base:
        return knowledge_base[key], 0.96
    # Not in training data → invents a plausible answer
    return "[fabricated — sounds right, may be false]", round(random.uniform(0.78, 0.94), 2)

def grounded_model(question: str):
    """Retrieves sources first. Refuses when nothing is found."""
    key = normalize(question)
    if key in knowledge_base:
        return knowledge_base[key], 0.97
    return "I don't have a reliable source for this. Please verify.", 0.09

questions = [
    "What is the capital of France?",
    "Who wrote Hamlet?",
    "What did your CEO say in last Tuesday's all-hands?",
    "What are the exact terms in your refund policy?",
]

for label, fn in [("RAW MODEL", raw_model), ("GROUNDED MODEL", grounded_model)]:
    print(f"── {label} ──")
    for q in questions:
        ans, conf = fn(q)
        print(f"  Q: {q}")
        print(f"  A: {ans}  [{round(conf*100)}% confidence]")
        print()`,
    challenge:
      "Add a question to `knowledge_base` — try your company's return policy or a product spec. Re-run. The grounded model now answers it correctly. This is retrieval-augmented generation (RAG): the foundation of every serious AI product.",
  },

  /* ── Lesson 7: ML Workflow ──────────────────────────────────────── */
  "data-leakage": {
    title: "Simulate data leakage — the silent project killer",
    description:
      "Leakage is when a clue about the answer accidentally sneaks into your training features. Your offline scores look incredible. Then the live system collapses because that clue doesn't exist in production.",
    code: `import random
random.seed(0)

def make_dataset(n: int, include_leak: bool):
    data = []
    for _ in range(n):
        churned = random.random() > 0.7   # 30% churn rate
        row = {
            "sessions_per_week":    round(random.uniform(0.5, 10) if not churned else random.uniform(0.1, 3), 1),
            "support_tickets":      random.randint(0, 2) if not churned else random.randint(1, 5),
            "churned":              churned,
        }
        if include_leak:
            # ⚠ LEAKAGE: this field is only filled AFTER the customer churns.
            # It doesn't exist at prediction time — but it's in the training data.
            row["cancellation_initiated"] = 1 if churned else 0
        data.append(row)
    return data

def simple_accuracy(data: list, use_leak: bool) -> float:
    correct = 0
    for row in data:
        if use_leak and "cancellation_initiated" in row:
            pred = row["cancellation_initiated"] == 1
        else:
            pred = row["sessions_per_week"] < 3 and row["support_tickets"] > 1
        if pred == row["churned"]:
            correct += 1
    return correct / len(data)

clean  = make_dataset(500, include_leak=False)
leaked = make_dataset(500, include_leak=True)

print("WITHOUT leakage (honest accuracy):")
print(f"  Training accuracy: {simple_accuracy(clean, use_leak=False):.1%}")
print()
print("WITH leakage (looks amazing — is lying):")
print(f"  Training accuracy: {simple_accuracy(leaked, use_leak=True):.1%}")
print()
print("In production, 'cancellation_initiated' doesn't exist yet.")
print("The model has learned to cheat, not to predict.")
print("The team spent 3 weeks celebrating a lie.")`,
    challenge:
      "Comment out the `row['cancellation_initiated']` line in make_dataset. Re-run. Now both numbers are honest. This is why you audit every column in your dataset before training — one leaky feature destroys months of work.",
  },
};

/* ─── Component ──────────────────────────────────────────────────────────── */

type Status = "idle" | "loading" | "running" | "done" | "error";

export default function PythonSandbox({ variant }: { variant?: string }) {
  const key = variant ?? "sigmoid-explorer";
  const scenario = SCENARIOS[key] ?? SCENARIOS["sigmoid-explorer"];

  const [code, setCode] = useState(scenario.code);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const hasRun = useRef(false);

  async function run() {
    setStatus(hasRun.current ? "running" : "loading");
    setOutput(null);

    try {
      const py = await loadPyodideSingleton();
      hasRun.current = true;

      // Pass user code as a Python global to avoid quoting/escaping issues
      py.globals.set("_user_code", code);

      await py.runPythonAsync(`
import sys
from io import StringIO
_buf = StringIO()
sys.stdout = _buf
try:
    exec(_user_code)
except Exception as e:
    print(f"\\n⚠ {type(e).__name__}: {e}")
finally:
    _captured = _buf.getvalue()
    sys.stdout = sys.__stdout__
`);

      const captured = (await py.runPythonAsync("_captured")) as string;
      setOutput(captured.trim() || "(no output — add a print() statement)");
      setStatus("done");
    } catch (err) {
      setOutput(String(err));
      setStatus("error");
    }
  }

  const lineCount = code.split("\n").length;

  const buttonLabel =
    status === "loading"
      ? "Loading Python (~2 s)…"
      : status === "running"
        ? "Running…"
        : "▶  Run";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-5 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
            Python · Runs in your browser · No server
          </p>
          <p className="mt-0.5 text-sm font-bold text-slate-200">
            {scenario.title}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void run()}
          disabled={status === "loading" || status === "running"}
          className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
        >
          {buttonLabel}
        </button>
      </div>

      {/* Description */}
      <div className="border-b border-slate-800/60 px-5 py-3">
        <p className="text-xs leading-relaxed text-slate-400">
          {scenario.description}
        </p>
      </div>

      {/* Editor */}
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={Math.min(Math.max(lineCount, 10), 32)}
          spellCheck={false}
          aria-label="Python code editor"
          className="w-full resize-none rounded-xl border border-slate-800 bg-[#0d0d16] p-4 font-mono text-sm leading-relaxed text-slate-100 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40"
        />
      </div>

      {/* Output */}
      {output !== null && (
        <div className="border-t border-slate-800 p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Output
          </p>
          <pre
            className={`whitespace-pre-wrap rounded-xl border p-4 font-mono text-sm leading-relaxed ${
              status === "error"
                ? "border-red-800/60 bg-red-950/60 text-red-300"
                : "border-slate-800 bg-[#0d0d16] text-emerald-300"
            }`}
          >
            {output}
          </pre>
        </div>
      )}

      {/* Challenge */}
      <div className="border-t border-slate-800 bg-slate-900/50 px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
          Challenge
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
          {scenario.challenge}
        </p>
      </div>
    </div>
  );
}
