# Chain-of-Thought Prompting

## What It Means

Chain-of-thought (CoT) prompting asks the model to reason in steps before finalizing an answer.

Instead of immediate output, the model follows a process like:

- start
- one or more plan steps
- final output

This often improves answer quality for complex tasks.

---

## Why It Is Powerful

Direct answering can skip important reasoning.

CoT encourages the model to:

- interpret intent first
- evaluate possible approaches
- choose a better solution path
- then return the final answer

This is the core idea behind many "thinking-style" model behaviors.

---

## Structured CoT with JSON Steps

A practical pattern is to enforce strict JSON output for each step.

Example step schema:

```json
{
  "step": "start | plan | output",
  "content": "string"
}
```

Rules:

1. return only JSON
2. run one step at a time
3. valid sequence: start -> plan (repeat) -> output

Code chunk from CoT setup:

```python
SYSTEM_PROMPT = """
You're an expert AI assistant in resolving user queries using chain of thought.
Work on START, PLAN, OUTPUT steps.

Rules:
- Strictly follow JSON output format.
- Only run one step at a time.
- Sequence: START -> PLAN (multiple) -> OUTPUT.

Output JSON Format:
{ "step": "START" | "PLAN" | "OUTPUT", "content": "string" }
"""
```

---

## Few-Shot Example for CoT

Provide a worked example that demonstrates:

- start message from user input
- multiple plan stages
- one final output stage

This teaches the model how to reason iteratively instead of jumping straight to the result.

---

## Implementation Pattern in Code

Typical loop behavior:

1. send user + system prompt
2. receive one JSON step
3. append assistant step to message history
4. call model again
5. repeat until `step = "output"`

The final `output.content` is shown to the user.

---

## Why History Must Be Appended

API calls are stateless.

So each new call must include prior messages (growing history), or the model loses reasoning context.

In early prototypes, this can be done manually; later it should be automated in a loop/controller.

---

## Response Format Note

Use JSON mode / structured output settings so the model reliably returns machine-readable steps.

This makes it easy to:

- parse steps
- route logic by step type
- stop only when output step arrives

---

## Key Takeaways

- CoT improves reliability by forcing intermediate planning
- JSON step protocols make reasoning auditable and automatable
- the sequence usually follows start -> plan* -> output
- maintaining full message history is required for multi-step reasoning
