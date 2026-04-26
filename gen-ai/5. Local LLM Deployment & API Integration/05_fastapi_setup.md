# FastAPI Setup for Ollama REST API

## Goal

Build a REST API layer over Ollama using FastAPI, so users can interact with locally running models via HTTP.

---

## Install FastAPI

```bash
pip install "fastapi[standard]"
pip freeze > requirements.txt
```

---

## Minimal FastAPI Server

File: `server.py`

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hello():
    return {"hello": "world"}

@app.get("/contact-us")
def contact():
    return {"email": "piyushgarg.dev@gmail.com"}
```

---

## Run the Dev Server

```bash
fastapi dev server.py
```

Output:

```text
Uvicorn running on http://127.0.0.1:8000
```

Open `http://localhost:8000` to see the JSON response.

---

## Auto-Generated Docs

FastAPI automatically generates interactive API docs:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

No extra setup needed.

---

## What Comes Next

Connect this FastAPI server to the running Ollama Docker container so that:

- API requests come in via REST
- FastAPI forwards them to Ollama on port `11434`
- Model responses are returned to the user

---

## Key Takeaways

- FastAPI is the Python REST API framework used in this section
- `fastapi dev server.py` starts a hot-reload dev server on port `8000`
- Routes are defined with `@app.get("/path")` decorators
- Auto-generated docs are available at `/docs` with no configuration
