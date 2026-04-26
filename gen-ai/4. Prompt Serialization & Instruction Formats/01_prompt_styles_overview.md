# Prompt Styles: Overview

## Why This Section Exists

In the previous section, we learned **prompting techniques**:

- zero-shot prompting
- few-shot prompting
- chain-of-thought prompting
- persona-based prompting

This section is different.

Here, the focus is **prompt style/format**: how instructions are serialized and sent to an LLM.

---

## What Is a Prompt Style?

Prompt style means the structure used to pass instructions to a model.

Example (widely used today):

- send an array of messages
- each message has a `role`
- each message has `content`

Typical roles:

- `system`
- `user`
- `assistant` (in multi-turn history)

---

## Common Message Format (Current Standard)

```python
messages = [
    {"role": "system", "content": "You are a helpful coding assistant."},
    {"role": "user", "content": "Write Python code to reverse a string."}
]
```

This format is common in OpenAI-compatible APIs and is also used by major providers in similar chat interfaces.

---

## Prompting Technique vs Prompt Style

- **Technique** = what reasoning/control strategy you use (zero-shot, few-shot, CoT, persona)
- **Style** = how you serialize instructions before sending to model

You need both for robust agent behavior.

---

## Styles Covered in This Section

- **ChatML-style prompting**
- **Alpaca-style prompting**
- **Instruct-style prompting**

These are common historical and practical instruction formats used across different model ecosystems.

---

## Practical Note

The `messages` style is the most widely used in modern APIs.

Treat this section as a bonus plus systems-level understanding: there are multiple valid ways to package instructions for LLMs.

---

## Key Takeaways

- Prompt techniques and prompt styles are different concepts
- Prompt style defines instruction serialization format
- The `role` + `content` messages format is the current practical default
- Learning other formats (ChatML, Alpaca, Instruct) helps when working across model families
