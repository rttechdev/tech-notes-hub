# Using OpenAI API in Python

## Project Setup

```bash
# Activate your virtual environment first
# Create project folder
mkdir hello_world
cd hello_world
```

Install OpenAI and save to requirements:
```bash
pip install openai
pip install python-dotenv
pip freeze > requirements.txt
```

---

## Project Structure

```
hello_world/
  main.py
  .env
```

---

## .env File

```
OPENAI_API_KEY=sk-proj-your-key-here
```

> **Important:** Never hardcode or share API keys. Revoke exposed keys immediately.

---

## main.py — Full Working Example

```python
from openai import OpenAI
from dotenv import load_dotenv

# Load .env file into environment
load_dotenv()

# Create OpenAI client (auto-reads OPENAI_API_KEY)
client = OpenAI()

# Make a chat completion request
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Hey, I am Piyush. Nice to meet you."}
    ]
)

# Print the AI response
print(response.choices[0].message.content)
```

**Output:**
```
Nice to meet you, Piyush. How can I assist you today?
```

---

## Common Error & Fix

**Error:**
```
OpenAIError: The api_key client option must be set either by passing api_key
to the client or by setting the OPENAI_API_KEY environment variable.
```

**Cause:** `.env` file exists but is not loaded.  
**Fix:** Call `load_dotenv()` before creating the client.

---

## Key Points

- `from openai import OpenAI` — import the client class
- `OpenAI()` — automatically reads `OPENAI_API_KEY` from environment
- `client.chat.completions.create(model=..., messages=[...])` — main API call
- `messages` format: list of `{"role": "user"/"assistant"/"system", "content": "..."}`
- `response.choices[0].message.content` — the AI's response text
- Available models: `gpt-4o`, `gpt-4o-mini`, `gpt-4`, `gpt-4.1`
