# Gemini Setup and First Python API Call

## Why Gemini Here?

- OpenAI API calls are paid (token-based pricing)
- Gemini is presented here as a free alternative (at the time of recording)
- This can change later, so always verify current pricing on Google's official docs

---

## Step 1: Create Gemini API Key

1. Open Gemini Studio: https://aistudio.google.com
2. Click **Get API key**
3. Create a new key (no billing step shown in this workflow)
4. Copy the generated API key

---

## Step 2: Install Python Package

```bash
pip install google-genai
pip freeze > requirements.txt
```

---

## Step 3: Create Python File

Create `gemini_hello.py` and add:

```python
from google import genai

# Option A: Pass API key directly (quick start)
client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explain how AI works in a few words"
)

print(response.text)
```

---

## Output Example

```text
AI learns patterns from data to make intelligent decisions.
```

---

## Better Practice (Recommended)

Prefer environment variables instead of hardcoding keys.

`.env`

```env
GEMINI_API_KEY=your_key_here
```

`gemini_hello.py`

```python
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="Explain how AI works in a few words"
)

print(response.text)
```

If using `.env`, install:

```bash
pip install python-dotenv
```

---

## Key Takeaways

- Gemini Studio is used to generate API keys
- `google-genai` is the Python SDK
- Core call pattern: `client.models.generate_content(...)`
- Print output from `response.text`
- Prefer `.env` over hardcoded keys for safety
