# FastAPI + Ollama Integration

## Goal

Build a `/chat` POST route in FastAPI that proxies requests to the Ollama container running locally — creating a REST API wrapper around any locally running model.

---

## Install Ollama Python SDK

```bash
pip install ollama
pip freeze > requirements.txt
```

---

## Create the Ollama Client

```python
from ollama import Client

client = Client(
    host="http://localhost:11434",   # Ollama container port
)
```

- `Client` from the `ollama` package talks to the Ollama HTTP API.
- The host must match the port you exposed when starting the Ollama container (`-p 11434:11434`).

---

## Full `server.py`

```python
from fastapi import FastAPI, Body
from ollama import Client

app = FastAPI()

client = Client(
    host="http://localhost:11434",
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/chat")
def chat(
    message: str = Body(..., description="The Message")
):
    response = client.chat(model="gemma:2b", messages=[
        {"role": "user", "content": message}
    ])
    return {"response": response.message.content}
```

### Key points

| Detail | Value |
|---|---|
| Model used | `gemma:2b` (must already be pulled in Ollama) |
| Message format | ChatML — `role` + `content` |
| Response field | `response.message.content` |

---

## Run & Test

```bash
cd ollama_fastapi
fastapi dev server.py
```

Open `http://localhost:8000/docs` → try `/chat` → enter a question → **Execute**.

FastAPI sends the message → Ollama runs the model → response returns in JSON.

---

## Key Takeaways

- The Ollama container must be running **before** starting FastAPI.
- Model name in code must match the model ID shown in Open Web UI (e.g., `gemma:2b`).
- This pattern is interchangeable — swap `client.chat(model=...)` to point at Gemini or OpenAI with minimal changes.
- You now have a self-hosted REST API over a free, local model.
