# FastAPI Chat Endpoint: Enqueuing Queries

## Step 1: Update server.py Imports

At the **very top** of `server.py`, load environment variables **before any other imports**:

```python
from dotenv import load_dotenv
load_dotenv()  # MUST be first

from fastapi import FastAPI, Query
from client.rq_client import q
from queues.worker import process_query

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Server is up and running!"}
```

**Why load_dotenv first?**
- OpenAI client needs `OPENAI_API_KEY` environment variable
- If not loaded, import errors occur
- Load before any imports that use environment variables

---

## Step 2: Create /chat Endpoint

Add to `server.py`:

```python
@app.post("/chat")
def chat(query: str = Query(..., description="The chat message from user")):
    """
    Enqueue a user query for processing.
    
    Returns immediately with job_id (does not wait for processing).
    """
    # Enqueue the query to be processed by worker
    job = q.enqueue(process_query, query)
    
    return {
        "status": "queued",
        "job_id": job.id,
        "message": "Your query has been queued. Use /result/{job_id} to fetch the answer."
    }
```

**What happens:**
1. User POSTs query
2. FastAPI calls `q.enqueue(process_query, query)`
3. RQ serializes the function and query
4. RQ stores job in Valkey queue
5. FastAPI returns job_id **immediately** (1ms)
6. User gets job_id, not the answer yet
7. Worker picks up job in background

---

## Step 3: Query Parameter Explanation

```python
query: str = Query(..., description="The chat message from user")
```

Breakdown:
- `query: str` - parameter type
- `Query(...)` - makes it a query parameter (in URL)
- `...` (Ellipsis) - required parameter
- `description="..."` - shown in Swagger UI docs

**Alternative (simpler):**
```python
@app.post("/chat")
def chat(query: str):
    job = q.enqueue(process_query, query)
    return {"status": "queued", "job_id": job.id}
```

Both work identically.

---

## Step 4: Test in Swagger UI

Start server:
```bash
python main.py
```

Navigate to:
```
http://localhost:8000/docs
```

### Test /chat Endpoint

1. Click on `POST /chat`
2. Click "Try it out"
3. Enter query: `"Explain arrow functions in JavaScript"`
4. Click "Execute"

### Response

```json
{
  "status": "queued",
  "job_id": "1234567890ab-cdef-1234-5678-90abcdef1234",
  "message": "Your query has been queued. Use /result/... to fetch the answer."
}
```

**Important**: Job is queued but not yet processed. Status is "queued", not "complete".

---

## Complete Flow at This Point

```
┌─────────────────────────────────────────────┐
│         User's Browser                      │
│  POST /chat                                 │
│  query="Explain arrow functions"            │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│         FastAPI Server (main.py)            │
│  @app.post("/chat")                         │
│  def chat(query):                           │
│    job = q.enqueue(process_query, query)    │
│    return job.id                            │
└────────────┬────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────┐
│         Valkey Queue (port 6379)            │
│  [Job waiting]                              │
│  id: 1234567890ab-cdef-1234-5678-90...     │
│  function: process_query                    │
│  args: ["Explain arrow functions"]          │
│  status: "queued"                           │
└─────────────────────────────────────────────┘

Worker not yet running ❌
Job sits in queue waiting
```

---

## Environment Variable Loading

### Common Issue: Missing OpenAI API Key

**Wrong** (loads after imports):
```python
from fastapi import FastAPI
from openai import OpenAI  # ERROR: API key not set yet

load_dotenv()  # Too late!
```

**Correct** (loads before any imports):
```python
from dotenv import load_dotenv
load_dotenv()  # Load FIRST

from fastapi import FastAPI
from openai import OpenAI  # Now API key is set ✓
```

### Complete server.py

```python
from dotenv import load_dotenv
load_dotenv()  # MUST be at top

from fastapi import FastAPI, Query
from client.rq_client import q
from queues.worker import process_query

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Server is up and running!"}

@app.post("/chat")
def chat(query: str = Query(..., description="The chat message from user")):
    """Enqueue a user query for processing."""
    job = q.enqueue(process_query, query)
    
    return {
        "status": "queued",
        "job_id": job.id,
        "message": "Your query has been queued. Use /result/{job_id} to fetch the answer."
    }
```

---

## What Happens Without Worker

Queue accumulates jobs but nothing processes them:

```
POST /chat → Job queued → job_id returned
POST /chat → Job queued → job_id returned
POST /chat → Job queued → job_id returned

Valkey Queue:
[Job 1] [Job 2] [Job 3] waiting... ⏳
(nothing consuming them)
```

This is **expected behavior**. The endpoint is doing its job (accepting requests). The worker (next step) will consume the queue.

---

## Testing Multiple Queries

Try posting multiple queries:

```
Query 1: "What are arrow functions?"     → job_id: abc123
Query 2: "Explain closures"               → job_id: def456
Query 3: "What is async/await?"           → job_id: ghi789
```

All three jobs are queued. Queue now has:

```
Valkey: [abc123] [def456] [ghi789]
```

When worker starts, it will process them one by one in order (FIFO).

---

## Status Codes

- **200 OK**: Job successfully queued, job_id returned
- **422 Unprocessable Entity**: Invalid query parameter (e.g., missing query)
- **500 Server Error**: Issue with queue connection

---

## Key Insight

This endpoint does **ONE thing only**: accept requests and queue them. It's **not responsible for processing**. That's the worker's job.

This separation is why async works:
- FastAPI: Fast (enqueue only)
- Worker: Slow (process in background)
- No blocking

---

## What's Next

Create `/result/{job_id}` endpoint to:
1. Fetch job from queue
2. Check status (queued, started, finished, failed)
3. Return result if complete
4. Allow user to poll for updates

Then start worker process to actually execute queued jobs.

---

## Key Takeaway

The `/chat` endpoint:
- Accepts user query
- Validates input
- Enqueues to Valkey
- Returns job_id immediately
- Never blocks, never processes

This is production-ready HTTP handler design: accept, validate, delegate, return.
