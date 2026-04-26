# Alpaca-Style Prompting

## What It Is

Alpaca prompting is an instruction format used by Alpaca-style models (from Meta/LLaMA ecosystem).

Instead of a `role` + `content` messages array, it uses plain-text delimiters to structure instructions and input.

---

## Format Structure

```text
### Instruction:
<system prompt / task description>

### Input:
<user query>

### Response:
```

The model predicts tokens starting from `### Response:`.

---

## Example: Simple Coding Task

```text
### Instruction:
You are an expert coding assistant. Only answer coding-related questions.

### Input:
Write a function to add N numbers in JavaScript.

### Response:
```

---

## Example: Chain-of-Thought Task

```text
### Instruction:
You are an AI expert assistant in resolving user queries using chain of thought.
Work on START, PLAN, OUTPUT steps. Strictly follow the JSON output format.

{ "step": "START" | "PLAN" | "OUTPUT", "content": "string" }

### Input:
Write a code to add N numbers in JavaScript.

### Response:
```

---

## Alpaca vs Messages-Style

| Aspect | Messages-style | Alpaca-style |
|---|---|---|
| Format | JSON array with role/content | Plain text with `### Instruction` delimiters |
| Used by | OpenAI, Gemini, Claude | Alpaca/LLaMA-based models |
| Flexibility | Multi-turn natively | Primarily single-turn instruction |

---

## Key Takeaways

- Alpaca format uses `### Instruction`, `### Input`, `### Response` headers
- It is a plain-text instruction format, not a structured JSON array
- Useful when working with models in the LLaMA/Alpaca family
- Good-to-know reference; modern hosted APIs mostly use role/content format
