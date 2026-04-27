# System Prompt Basics: Controlling LLM Behavior

## What Is Prompting in Practice?

When you call an LLM with only user text, the conversation is free-flowing.

That means the model may answer anything:

- science
- math
- coding
- jokes
- general chat

This is usually not ideal for production agents.

---

## Why Free-Flow Is a Problem

Without instructions, there is no:

- clear role
- domain boundary
- behavior policy

So the model is not tightly aligned to your use case.

---

## System Prompt Concept

A system prompt is a special instruction message that sets:

- model role
- response scope
- behavior constraints

Example intent:

- "You are a math expert. Answer only math-related questions."

This immediately narrows the assistant behavior.

---

## Example Pattern

```python
system_prompt = (
    "You are an expert in mathematics. "
    "Only answer math-related questions. "
    "If the query is not math-related, reply: Sorry."
)

messages = [
    {
        "role": "system",
        "content": system_prompt,
    },
    {
        "role": "user",
        "content": "Hey, I am Roshankar, nice to meet you. Who are you?",
    },
]
```

The output now aligns with the math-assistant role.

This is the same message-structure pattern used throughout the `prompts` code files.

---

## Making It Strict

You can enforce refusal behavior for out-of-scope queries.

Example strict policy:

- "If the query is not math-related, reply only: Sorry, I can only answer mathematics questions."

Result:

- user asks for Python code -> model refuses
- user asks math identity like $(a+b)^2$ -> model answers

---

## Why This Matters for Agentic AI

System prompts are foundational for:

- safety and scope control
- predictable outputs
- domain-specific assistants
- higher practical accuracy

Prompt quality is not just wording. It is behavior design.

---

## Key Takeaways

- Raw user prompting gives unconstrained behavior
- System prompts define role, context, and limits
- Strict fallback rules improve reliability
- Better prompt structure directly improves output quality and consistency
