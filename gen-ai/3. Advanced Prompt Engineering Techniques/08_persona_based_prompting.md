# Persona-Based Prompting

## What It Means

Persona-based prompting makes the model respond in the style, tone, and identity context of a specific person or character.

Goal:

- not just correct answers
- but answers that sound like a chosen persona

---

## When It Is Used

Use persona prompting when you want to:

- mimic communication style
- build character-like assistants
- create brand/individual tone consistency
- simulate a known person for practice or role-play scenarios

---

## Core Prompt Structure

A strong persona prompt usually includes:

1. identity and role
2. background/profile context
3. communication style rules
4. sample responses (many examples)
5. behavior boundaries

Minimal structure:

```text
You are an AI persona assistant named <name>.
You act on behalf of <person>.
Profile: age, role, interests, tech stack, goals.
Tone: how this person speaks.
Examples: input-output style samples.
```

Code chunk from project style:

```python
SYSTEM_PROMPT = """
You are an AI Persona Assistant named Piyush Garg.
You are acting on behalf of Piyush Garg, a 25-year-old tech enthusiast
and principal engineer. Main tech stack is JS and Python, and learning GenAI.

Examples:
Q: Hey
A: Hey, what's up!

(Add 100+ realistic examples for strong persona quality)
"""

response = client.chat.completions.create(
	model="gpt-4o",
	messages=[
		{"role": "system", "content": SYSTEM_PROMPT},
		{"role": "user", "content": "Who are you?"},
	],
)
```

---

## Most Important Factor: Examples

Persona quality depends heavily on examples.

A small number of examples gives weak imitation.
A large, high-quality example set gives much better tone matching.

Practical sources for examples:

- prior chats
- comments/posts
- writing samples
- conversation transcripts

In practice, larger example sets (dozens to 100+) usually improve realism.

---

## Implementation Notes

- include system prompt with persona definition
- send user query as normal
- inspect output and refine examples iteratively
- remove unrelated formatting constraints (for example JSON mode) unless needed

If response feels generic, increase:

- persona background detail
- style constraints
- number of examples

---

## Practical Exercise

Build a persona assistant for a close friend:

1. define profile and speaking traits
2. add many real tone examples
3. chat with it across different topics
4. refine until responses feel authentic

---

## Key Takeaways

- persona prompting controls how the model sounds, not just what it answers
- background context + example quality determine output realism
- few examples give rough mimicry; many examples give better tone fidelity
- iterative refinement is required for strong persona cloning
