# Structured Output with Few-Shot Prompting

## Why This Matters

Free-flow text responses are hard to consume programmatically.

For example, markdown-style code blocks are good for humans, but not ideal when your app needs predictable machine-readable output.

---

## Goal

Use few-shot prompting to enforce a strict response schema.

In this case, force output as JSON with fields like:

- code
- is_coding_question

This makes downstream parsing reliable.

---

## Rule-Based Prompt Design

Add explicit constraints in the prompt:

1. strictly return JSON
2. follow exact output format
3. no extra markdown or commentary

Example schema intent:

```json
{
  "code": "string or null",
  "is_coding_question": true
}
```

---

## Few-Shot Examples to Lock Behavior

Provide examples that match your schema.

Non-coding example:

```text
Q: Can you explain (a+b)^2?
A: {"code": null, "is_coding_question": false}
```

Coding example:

```text
Q: Write JavaScript code to add numbers.
A: {"code": "function add(a,b){ return a+b }", "is_coding_question": true}
```

These examples teach both classification and format.

---

## Observed Behavior

With this setup:

- non-coding query -> code is null, flag is false
- coding query -> code string present, flag is true

So few-shot prompting controls both:

- response meaning
- response structure

---

## Why Structured JSON Is Powerful

Once output is strict JSON, your app can parse and use fields directly.

Example usage:

- parse JSON
- read response.code
- run routing logic from response.is_coding_question

This is critical for agent pipelines where LLM output feeds automation.

Code chunk for parsing:

```python
import json

raw_text = response.choices[0].message.content
parsed = json.loads(raw_text)

if parsed.get("isCodingQuestion"):
  print(parsed.get("code"))
else:
  print("Out of scope")
```

---

## Key Takeaways

- few-shot prompting can enforce schema-level output quality
- explicit format rules + aligned examples improve reliability
- structured JSON is easier to validate, parse, and automate
- this pattern is essential in production agent workflows
