# FastAPI Setup for Async RAG

## Installation

Install FastAPI and Uvicorn:

```bash
pip install fastapi uvicorn
pip freeze > requirements.txt
```

---

## Project Structure

```
rag_queue/
├── client/
│   ├── __init__.py
│   └── rq_client.py
├── queues/
│   ├── __init__.py
│   └── worker.py
├── server.py          # FastAPI app definition
├── main.py            # Entry point (runs server)
├── .env               # Environment variables
└── docker-compose.yml
```

---

## Step 1: Create .env File

Create `.env` in project root:

```env
OPENAI_API_KEY=sk-...your-key-here...
```

This file stores sensitive credentials (not committed to git).

---

## Step 2: Create server.py

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    """Health check endpoint"""
    return {"message": "Server is up and running!"}
```

This creates a simple FastAPI application with one GET endpoint.

---

## Step 3: Create main.py

```python
import uvicorn
from dotenv import load_dotenv
from server import app

# Load environment variables before starting
load_dotenv()

def main():
    """Run FastAPI server with Uvicorn"""
    uvicorn.run(
        app,
        host="0.0.0.0",      # Listen on all interfaces
        port=8000            # Port 8000
    )

if __name__ == "__main__":
    main()
```

**Why this structure?**
- `server.py` defines routes (testable, importable)
- `main.py` runs the server (executable entry point)
- Separates app definition from execution

---

## Step 4: Run the Server

```bash
cd rag_queue
python main.py
```

Output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

---

## Access Server

### Root Endpoint
```
http://localhost:8000/
```

Response:
```json
{"message": "Server is up and running!"}
```

### Auto-Generated Docs
```
http://localhost:8000/docs
```

Opens Swagger UI with all endpoints and their schemas. Test endpoints directly from browser.

### Alternative Docs
```
http://localhost:8000/redoc
```

ReDoc format documentation.

---

## Uvicorn Parameters

```python
uvicorn.run(
    app,
    host="0.0.0.0",      # Listen on all network interfaces
    port=8000,           # Port number
    reload=True          # Auto-reload on code changes (dev only)
)
```

For development:
```python
uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
```

Auto-restarts server when you change code.

---

## Full Project Layout So Far

```
rag_queue/
├── client/
│   ├── __init__.py
│   └── rq_client.py          # Queue connection
├── queues/
│   ├── __init__.py
│   └── worker.py             # Worker function
├── .env                       # OpenAI API key
├── .gitignore                 # Ignore .env
├── docker-compose.yml         # Valkey service
├── server.py                  # FastAPI app
├── main.py                    # Run server
└── requirements.txt           # Dependencies
```

---

## Next: Adding Endpoints

Once server is running, we'll add two endpoints:

```python
@app.post("/chat")
def chat(query: str):
    """Enqueue query job"""
    job = q.enqueue(process_query, query)
    return {"job_id": job.id}

@app.get("/result/{job_id}")
def get_result(job_id: str):
    """Fetch job result"""
    job = q.fetch_job(job_id)
    return {
        "job_id": job_id,
        "status": job.get_status(),
        "result": job.result
    }
```

---

## Important Notes

### Environment Variables
- Store sensitive keys in `.env`
- Load with `load_dotenv()` before app runs
- Never commit `.env` to git
- Add to `.gitignore`

### Host & Port
- `host="0.0.0.0"` = accessible from any machine
- `port=8000` = standard FastAPI port
- `localhost:8000` from same machine

### Reload Mode
```python
# Development
uvicorn.run(app, reload=True)

# Production
uvicorn.run(app, reload=False)
```

Reload mode causes minor overhead, disable in production.

---

## Verification Checklist

- [ ] FastAPI installed: `pip list | grep fastapi`
- [ ] Uvicorn installed: `pip list | grep uvicorn`
- [ ] .env file created with OpenAI key
- [ ] server.py has basic route
- [ ] main.py imports and runs server
- [ ] Server starts: `python main.py`
- [ ] Root endpoint works: `http://localhost:8000/`
- [ ] Docs available: `http://localhost:8000/docs`

---

## Key Takeaway

FastAPI + Uvicorn provides:
- **Fast**: Built on async, handles concurrent requests
- **Simple**: Minimal boilerplate
- **Auto-docs**: Swagger UI generated automatically
- **Production-ready**: Can handle millions of requests

This is the front-end that accepts user requests and queues them to workers.
