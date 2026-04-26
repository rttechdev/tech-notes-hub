# Few-Shot Prompting

## What It Means

Few-shot prompting means giving the model:

- instructions
- plus a small set of example input-output pairs

Then the model follows those patterns for new queries.

---

## Why It Works Better Than Zero-Shot

Zero-shot gives only instructions.
Few-shot adds demonstrations, which improves consistency and output quality.

Examples help the model learn:

- scope boundaries
- response style
- output format
- refusal behavior

---

## Practical Pattern

1. define role and rules
2. add examples (both allowed and disallowed cases)
3. ask the new user query

Template idea:

```text
Instruction: You are a coding assistant. Only answer coding-related questions.

Example 1
Q: Can you explain (a+b)^2?
A: Sorry, I can only help with coding-related questions.

Example 2
Q: Write Python code to add two numbers.
A: def add(a, b):
       return a + b

Now answer:
Q: <new user query>
A:
```

Code chunk from project style:

```python
SYSTEM_PROMPT = """
You should only answer coding-related questions. If not coding, say sorry.

Rule:
- Strictly follow JSON output.

Output Format:
{
       "code": "string" or null,
       "isCodingQuestion": boolean
}

Examples:
Q: Can you explain (a + b)^2?
A: { "code": null, "isCodingQuestion": false }

Q: Write Python code to add two numbers.
A: { "code": "def add(a, b):\n    return a + b", "isCodingQuestion": true }
"""
```

---

## Behavior from the Lecture Example

With few-shot setup:

- math-expression question -> refused (as shown in example)
- coding question -> answered with code

This makes behavior more predictable than zero-shot-only prompting.

---

## Real-World Note

In production, teams often provide many examples, not just two.

As example coverage grows, model accuracy and consistency usually improve, especially for:

- edge cases
- policy compliance
- formatting requirements

---

## Key Takeaways

- few-shot = instructions + examples
- it is widely used in practical LLM systems
- examples strongly influence scope and answer quality
- better example sets generally lead to better reliability
