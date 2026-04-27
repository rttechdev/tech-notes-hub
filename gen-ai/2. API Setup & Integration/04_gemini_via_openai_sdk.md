# Gemini via OpenAI SDK (OpenAI-Compatible API)

## Why This Matters

- Course code uses the OpenAI SDK throughout
- Gemini has different native SDK usage
- OpenAI-compatible Gemini endpoint lets you follow the same code style

---

## Core Idea

Use the OpenAI client, but redirect requests to Google by setting:
- Gemini API key
- Gemini OpenAI-compatible base URL
- Gemini model name (not GPT model names)

---

## Python Example

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

response = client.chat.completions.create(
    model="gemini-2.0-flash",
    messages=[
        {"role": "user", "content": "Hey, I am Roshan. Nice to meet you."}
    ]
)

print(response.choices[0].message.content)
```

---

## Required Environment Variable

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Common Error and Fix

### Error

```text
404 Not Found
```

### Cause

Using a GPT model name while requests are routed to Gemini endpoint.

### Fix

Change model to a valid Gemini model, for example:
- gemini-2.0-flash
- gemini-2.0-flash-lite

---

## Quick Verification Prompt

Prompt:

```text
Who are you?
```

Typical response should indicate it is a Google model, confirming routing is working.

---

## Practical Notes

- This approach helps Gemini users follow OpenAI-SDK-based tutorials
- In most scenarios, code works with minimal change
- Small incompatibilities can still appear in some edge cases
- Gemini pricing/free tier can change over time; always re-check official docs

---

## Key Takeaways

- OpenAI SDK can call Gemini using OpenAI-compatible endpoint
- Must set both api_key and base_url for Gemini routing
- Must use Gemini model names, not GPT model names
- If you get 404, check model name first
