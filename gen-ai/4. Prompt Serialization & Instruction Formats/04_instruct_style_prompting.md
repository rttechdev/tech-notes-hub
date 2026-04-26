# Instruct-Style Prompting

## What It Is

Instruct-style prompting is used by Llama 2 and similar open-source instruction-tuned models.

It uses special token-like delimiters to wrap instructions instead of a JSON structure.

---

## Format Structure

```text
[INST] <user instruction or query here> [/INST]
```

For system prompt + user input:

```text
<s>[INST] <<SYS>>
<system prompt here>
<</SYS>>

<user query here> [/INST]
```

The model then generates its response from where `[/INST]` ends.

---

## Example

```text
<s>[INST] <<SYS>>
You are an expert coding assistant. Only answer coding-related questions.
<</SYS>>

Write a Python function to add N numbers. [/INST]
```

---

## Comparison with ChatML

| Aspect | ChatML | Instruct |
|---|---|---|
| Format | JSON array, role/content | Plain text delimiters `[INST]...[/INST]` |
| Used by | OpenAI, Gemini, Claude | Llama 2, open-source instruction models |
| Multi-turn | Native via `assistant` role | Requires chaining `[INST]...[/INST]` blocks |

---

## Practical Note

In day-to-day agentic AI work, you will almost exclusively use ChatML.

Instruct format is relevant when:

- fine-tuning or running local Llama 2 / similar open models
- working with frameworks that require raw model prompting

---

## Key Takeaways

- Instruct format wraps content in `[INST]` / `[/INST]` tokens
- System prompt goes inside `<<SYS>>` / `<</SYS>>` tags
- It is the Llama 2 native instruction format
- Treat this as reference knowledge; ChatML is the practical default
