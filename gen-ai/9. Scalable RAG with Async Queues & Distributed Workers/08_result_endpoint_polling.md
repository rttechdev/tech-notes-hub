# FastAPI Result Endpoint: Fetching Job Status & Results

## Step 1: Add /result Endpoint to server.py

Add to `server.py` after the `/chat` endpoint:

```python
@app.get("/result/{job_id}")
def get_result(job_id: str):
    """
    Fetch the result of a queued job.
    
    Returns the job status and result if complete.
    """
    # Fetch job from queue using job_id
    job = q.fetch_job(job_id)
    
    if job is None:
        return {
            "error": "Job not found",
            "job_id": job_id
        }
    
    # Get job status: queued, started, finished, failed
    status = job.get_status()
    
    return {
        "job_id": job_id,
        "status": status,
        "result": job.result if status == "finished" else None,
        "error": job.exc_info if status == "failed" else None
    }
```

---

## Complete server.py

```python
from dotenv import load_dotenv
load_dotenv()

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

@app.get("/result/{job_id}")
def get_result(job_id: str):
    """Fetch the result of a queued job."""
    job = q.fetch_job(job_id)
    
    if job is None:
        return {
            "error": "Job not found",
            "job_id": job_id
        }
    
    status = job.get_status()
    
    return {
        "job_id": job_id,
        "status": status,
        "result": job.result if status == "finished" else None,
        "error": job.exc_info if status == "failed" else None
    }
```

---

## Job Status States

RQ jobs have four states:

| Status | Meaning | Result Available? |
|---|---|---|
| **queued** | Waiting in queue | ❌ No |
| **started** | Worker is processing | ❌ No |
| **finished** | Complete, success | ✅ Yes |
| **failed** | Error occurred | ❌ No |

---

## Testing the Endpoint

### 1. Enqueue a Query

```bash
POST /chat
query="Explain arrow functions in JavaScript"
```

Response:
```json
{
  "status": "queued",
  "job_id": "abc123-def456-ghi789"
}
```

### 2. Check Job Status (Immediately)

```bash
GET /result/abc123-def456-ghi789
```

Response (while worker not running):
```json
{
  "job_id": "abc123-def456-ghi789",
  "status": "queued",
  "result": null,
  "error": null
}
```

Result is `null` because job hasn't been processed yet.

### 3. Multiple Jobs

Submit more queries:

```bash
POST /chat
query="What are closures?"
# Returns: job_id = def456-...

POST /chat
query="Explain async/await"
# Returns: job_id = ghi789-...
```

Queue now contains:
```
Valkey Queue (FIFO):
[abc123-...] [def456-...] [ghi789-...]
```

### 4. Check All Statuses

```bash
GET /result/abc123-...  → {"status": "queued", "result": null}
GET /result/def456-...  → {"status": "queued", "result": null}
GET /result/ghi789-...  → {"status": "queued", "result": null}
```

All queued because no worker is running.

---

## Why Results Are Null

### Without Worker

```
POST /chat → Job enqueued
            Valkey stores: [Job 1]
            
GET /result/job_id → status="queued", result=null
                     (nothing consuming queue)
```

Job sits indefinitely. No processing happens.

### With Worker (Next Step)

```
POST /chat → Job enqueued
            Valkey stores: [Job 1]

Worker picks up job
  → Executes process_query()
  → Gets results from RAG
  → Stores result in Valkey
  
GET /result/job_id → status="finished", result={...}
                     (answer available)
```

Job completes and result is populated.

---

## Job Properties

```python
job = q.fetch_job(job_id)

# Available properties
job.id                  # Job ID
job.get_status()        # "queued", "started", "finished", "failed"
job.result              # Return value from worker function
job.exc_info            # Error message if failed
job.created_at          # When job was created
job.started_at          # When worker picked it up
job.ended_at            # When job completed
job.timeout             # Job timeout setting
```

---

## Response States

### Job Queued (Waiting)

```json
{
  "job_id": "abc123",
  "status": "queued",
  "result": null,
  "error": null
}
```

User should poll again later.

### Job Processing (Started)

```json
{
  "job_id": "abc123",
  "status": "started",
  "result": null,
  "error": null
}
```

Worker is actively processing.

### Job Complete (Finished)

```json
{
  "job_id": "abc123",
  "status": "finished",
  "result": {
    "query": "What are arrow functions?",
    "answer": "Arrow functions provide concise syntax...",
    "sources": [
      {"page": 20, "source": "node_js.pdf"}
    ]
  },
  "error": null
}
```

Result available!

### Job Failed (Error)

```json
{
  "job_id": "abc123",
  "status": "failed",
  "result": null,
  "error": "Traceback: OpenAIError: API rate limit exceeded"
}
```

Error message shows what went wrong.

---

## Complete Workflow (Before Worker)

```
User                     FastAPI                  Valkey
 │                          │                        │
 ├─ POST /chat ──────────→ │                        │
 │                         ├─ enqueue ────────────→ │
 │                         │                    [Job 1]
 │                    ┌────┴─ return job_id ←──────┘
 ├─ {job_id: abc} ←──┘
 │
 │ (waits a bit)
 │
 ├─ GET /result/abc ────→ │                        │
 │                        ├─ fetch_job ──────────→ │
 │                        │                 search: abc
 │                    ┌───┴─ return status ←──────┤
 ├─ {status: queued, ←──┘                    [Job 1]
 │   result: null}
 │
 │ (job still waiting, no worker processing)
```

---

## Polling Strategy

Client should poll with backoff:

```python
# Client-side (not FastAPI)
import time
import requests

job_id = "abc123"
max_attempts = 60

for attempt in range(max_attempts):
    response = requests.get(f"http://localhost:8000/result/{job_id}")
    data = response.json()
    
    if data["status"] == "finished":
        print(f"Result: {data['result']}")
        break
    elif data["status"] == "failed":
        print(f"Error: {data['error']}")
        break
    else:
        print(f"Status: {data['status']}, waiting...")
        time.sleep(1)  # Wait 1 second before polling again
```

---

## Swagger UI Testing

### 1. Try POST /chat

Click "Try it out" → Enter query → Execute
Get: `{"job_id": "abc123"}`

### 2. Try GET /result/{job_id}

Click "Try it out" → Paste job_id → Execute
Get: `{"status": "queued", "result": null}`

### 3. Poll Multiple Times

Execute same GET endpoint repeatedly
Notice: status always "queued" (no worker)

---

## Key Insight

At this point, the system is:
- ✅ **Accepting requests** (POST /chat works)
- ✅ **Queuing jobs** (Valkey stores them)
- ✅ **Returning job IDs** (user can track)
- ✅ **Checking status** (GET /result works)
- ❌ **NOT processing** (no worker running)

This is normal! The endpoints are production-ready. The missing piece is the worker process that consumes the queue.

---

## What's Next

Start the worker process in a **separate terminal**:

```bash
# Terminal 1: FastAPI server
python main.py

# Terminal 2: Worker process (NEW)
python -m rq.worker
```

Once worker runs, it will:
1. Listen to Valkey queue
2. Pick up queued jobs
3. Execute `process_query()` function
4. Store results in Valkey
5. Update job status to "finished"

Then polling `/result/{job_id}` will show actual results.

---

## Key Takeaway

The `/result/{job_id}` endpoint:
- Fetches job from queue by ID
- Returns current status (queued, started, finished, failed)
- Returns result only when status is "finished"
- Allows polling without blocking
- Works with or without worker (shows null if not done)

This completes the async request/response pattern: POST to enqueue, GET to poll for result.
