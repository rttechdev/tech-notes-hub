# Zero-Shot Prompting

## What It Means

Zero-shot prompting means giving a model a direct task or instruction without providing prior examples.

Definition:

- the model receives the task directly
- no sample input-output pairs are included

---

## Core Idea

You tell the model exactly what to do in one clear system prompt.

Example intent:

- answer only coding-related questions
- do not answer non-coding questions
- use a fixed assistant name
- return a strict fallback response for out-of-scope asks

This is a direct instruction style, which is why it is called zero-shot.

---

## Example System Prompt

```text
You should only answer coding-related questions.
Do not answer anything else.
Your name is Alexa.
If the user asks something other than coding, just say: Sorry.
```

---

## Typical Behavior

With the above prompt:

- user asks for a joke -> Sorry
- user asks for translation -> Sorry
- user asks for Python code -> model responds with code

So scope control works even without demonstrations.

---

## Minimal Pattern in Code

```python
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(base_url="https://generativelanguage.googleapis.com/v1beta/")

system_prompt = """
You should only answer coding-related questions.
Do not answer anything else.
Your name is Alexa.
If the user asks something other than coding, just say: Sorry.
"""

response = client.chat.completions.create(
    model="gemini-2.5-flash",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Can you write Python code to translate text?"},
    ],
)

print(response.choices[0].message.content)
```

---

## When to Use Zero-Shot

Use zero-shot prompting when:

- task is simple and clearly expressible
- you need quick setup
- behavior constraints are straightforward

If behavior is inconsistent, move to few-shot prompting with examples.

---

## Key Takeaways

- zero-shot = direct instruction, no examples
- strong system prompts can enforce role and boundaries
- strict fallback text improves predictable behavior
- it is the fastest prompt style to start with in production prototypes
