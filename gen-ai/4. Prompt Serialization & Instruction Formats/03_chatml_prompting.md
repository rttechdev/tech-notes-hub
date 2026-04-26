# ChatML-Style Prompting

## What It Is

ChatML (Chat Markup Language) is the instruction format used by OpenAI, Gemini, and Claude-compatible APIs.

It is the standard you have been using throughout this course.

---

## Format Structure

Messages are passed as a JSON array. Each message has two keys:

- `role` — who is speaking
- `content` — what they are saying

Valid roles:

| Role | Purpose |
|---|---|
| `system` | sets model behavior and context |
| `user` | user input / query |
| `assistant` | model response (used in multi-turn history) |

---

## Example

```python
messages = [
    {"role": "system", "content": "You are an expert coding assistant."},
    {"role": "user", "content": "Write a function to reverse a string in Python."},
]
```

Multi-turn example with assistant history:

```python
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "What is 2 + 2?"},
    {"role": "assistant", "content": "4"},
    {"role": "user", "content": "What about 4 + 4?"},
]
```

---

## Why ChatML Is the Default Choice

- used by OpenAI, Gemini, and Claude APIs
- supports multi-turn conversations natively via `assistant` role
- consistent across the main model providers
- well-documented and most tooling is built around it

---

## Key Takeaways

- every message you have written in this course uses ChatML format
- `role` + `content` is the core structure
- `system` for instructions, `user` for queries, `assistant` for prior responses
- this is the prompt style to default to in production agent work
