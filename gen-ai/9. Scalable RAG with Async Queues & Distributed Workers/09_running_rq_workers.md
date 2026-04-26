# Running RQ Workers: Processing the Queue

## Overview

So far:
- ✅ FastAPI server queues jobs
- ✅ Jobs stored in Valkey
- ❌ **Nothing processing the jobs**

Now we start the **worker process** that consumes and executes queued jobs.

---

## Step 1: Load Environment in Worker

Update `queues/worker.py` to load `.env` at the **very top**:

```python
from dotenv import load_dotenv
load_dotenv()  # MUST be first in worker process too

from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore

# ... rest of code
```

**Why?** Worker runs in a separate process. It needs OpenAI API key loaded independently.

---

## Step 2: macOS-Specific Fix

If running on macOS, you must set this environment variable before starting the worker:

```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
rq worker
```

**Why?** macOS has fork safety restrictions. This disables those checks for RQ.

**Linux/Windows**: Not needed, skip this.

---

## Step 3: Run the Worker

Open a **new terminal** (keep FastAPI running in first terminal):

```bash
cd rag_queue

# macOS only
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES

# All platforms
rq worker
```

Output:
```
09:45:20 Worker: Worker started successfully
09:45:20 Worker: job status: queued | queued
09:45:20 Worker: job status: queued | queued
09:45:20 Listening to queue default...
```

Worker is now listening to the queue.

---

## Step 4: Test Complete Flow

### Terminal 1: FastAPI Server
```bash
python main.py
```

Running on `http://localhost:8000`

### Terminal 2: Worker Process
```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES  # macOS only
rq worker
```

Listening to queue.

### Terminal 3: Test Client

Go to Swagger UI: `http://localhost:8000/docs`

#### Test 1: Enqueue Query

```
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

#### Test 2: Check Status Immediately

```
GET /result/abc123-def456-ghi789
```

Response:
```json
{
  "status": "queued",
  "result": null
}
```

(Still queued, worker hasn't picked it up yet)

#### Test 3: Wait & Poll

Keep calling the same GET endpoint. After a few seconds:

```json
{
  "status": "started",
  "result": null
}
```

Worker picked up the job, now processing.

After 5+ more seconds:

```json
{
  "status": "finished",
  "result": {
    "query": "Explain arrow functions in JavaScript",
    "answer": "Arrow functions provide a concise syntax for writing functions...",
    "sources": [
      {"page": 20, "source": "node_js.pdf"},
      {"page": 21, "source": "node_js.pdf"}
    ]
  }
}
```

**Result available!**

---

## Worker Output Example

In Terminal 2, you'll see:

```
09:45:20 Listening to queue default...
09:45:25 Job abc123-def456-ghi789: started
09:45:25 🔍 Searching chunks for: Explain arrow functions in JavaScript
09:45:27 ✅ Answer generated: Arrow functions provide a concise syntax...
09:45:27 Job abc123-def456-ghi789: finished successfully (2.5s)
```

This shows the job lifecycle in the worker.

---

## Multiple Queries (Sequential Processing)

Enqueue three queries quickly:

```
POST /chat: "Explain arrow functions" → job_id_1
POST /chat: "What are closures?"      → job_id_2
POST /chat: "Explain async/await"     → job_id_3
```

Valkey queue:
```
[job_id_1] [job_id_2] [job_id_3]
```

Worker processes **one at a time** (FIFO):

```
09:45:20 Job job_id_1: started
09:45:25 Job job_id_1: finished
09:45:25 Job job_id_2: started
09:45:30 Job job_id_2: finished
09:45:30 Job job_id_3: started
09:45:35 Job job_id_3: finished
```

Result availability timeline:

```
t=0s   POST /chat (3 queries)
       → All queued, results null

t=5s   GET /result/job_id_1
       → finished, result available ✓
       
       GET /result/job_id_2
       → queued or started, result null
       
       GET /result/job_id_3
       → queued, result null

t=10s  GET /result/job_id_2
       → finished, result available ✓

t=15s  GET /result/job_id_3
       → finished, result available ✓
```

---

## Scaling with Multiple Workers

Run multiple workers in parallel to process jobs faster.

### Terminal 2a: Worker 1
```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
rq worker
```

### Terminal 2b: Worker 2
```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
rq worker
```

### Terminal 2c: Worker 3
```bash
export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES
rq worker
```

Now 3 workers listening to same queue.

---

## Parallel Processing

With 3 workers, enqueue 3 queries:

```
POST /chat: "Explain arrow functions"  → job_id_1
POST /chat: "What are closures?"       → job_id_2
POST /chat: "Explain async/await"      → job_id_3
```

Valkey:
```
[job_id_1] [job_id_2] [job_id_3]
```

Worker 1 picks job_id_1, Worker 2 picks job_id_2, Worker 3 picks job_id_3.

**All three run simultaneously** (not sequentially):

```
Worker 1: 09:45:20 Job job_id_1: started
Worker 2: 09:45:20 Job job_id_2: started
Worker 3: 09:45:20 Job job_id_3: started

Worker 1: 09:45:25 Job job_id_1: finished
Worker 2: 09:45:25 Job job_id_2: finished
Worker 3: 09:45:25 Job job_id_3: finished
```

All three results ready in ~5 seconds (not 15 seconds with one worker).

---

## Scalability Progression

| Workers | Queries | Processing Time |
|---|---|---|
| 1 | 10 queries | 50 seconds (sequential) |
| 2 | 10 queries | 25 seconds (parallel) |
| 5 | 10 queries | 10 seconds (parallel) |
| 10 | 10 queries | 5 seconds (parallel) |

Add workers to process faster without changing code.

---

## Worker Lifecycle

```
$ rq worker
↓
Connect to Valkey on localhost:6379
↓
Listen to "default" queue
↓
Loop:
  - Check queue for jobs
  - If job found:
    → Fetch job
    → Deserialize function & args
    → Execute process_query(query)
    → Serialize result
    → Store in Valkey
    → Mark job as finished
  - If no job, sleep 100ms
  - Repeat
```

Worker runs indefinitely until interrupted (Ctrl+C).

---

## Monitoring Workers

### See Running Workers

```bash
rq info
```

Output:
```
Name              | Workers | Idle | Working
default           | 3       | 0    | 3
```

3 workers, all 3 processing jobs.

### See Queue Status

```bash
rq info --watch
```

Refreshes every second, shows live queue depth.

---

## Complete System Now

```
┌─────────────────────────────────────────────────┐
│  User Browser                                   │
│  POST /chat {"query": "..."}                    │
│  GET /result/{job_id}                           │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│  FastAPI Server (main.py)                       │
│  - /chat: enqueue jobs                          │
│  - /result: return status & results             │
│  - Never blocks ✓                               │
└────────────┬────────────────────────────────────┘
             │
             ↓
┌─────────────────────────────────────────────────┐
│  Valkey Queue (port 6379)                       │
│  [Job 1] [Job 2] [Job 3] [Job 4]               │
└────┬──────────────────────────────┬─────────────┘
     │                              │
     ↓                              ↓
┌──────────────┐            ┌──────────────┐
│ Worker 1     │            │ Worker 2     │
│ Processing   │            │ Processing   │
│ Job 1        │            │ Job 2        │
└──────────────┘            └──────────────┘
     ↓                              ↓
  Results stored in Valkey
  Job 1: finished ✓
  Job 2: finished ✓
```

---

## Error Handling

If a job fails, worker logs the error and marks job as failed:

```json
{
  "status": "failed",
  "result": null,
  "error": "Traceback: ...error details..."
}
```

Worker continues processing next job (doesn't crash).

---

## Stopping Workers

Gracefully:
```bash
# In worker terminal
Ctrl+C
```

Output:
```
Stopping RQ worker gracefully...
Worker stopped.
```

Worker finishes current job, then shuts down.

---

## Key Insight

With this setup:

1. **User experience**: Submit query, get job_id in 1ms (never waits)
2. **Processing**: Happens in background (1-10 seconds)
3. **Scalability**: Add more workers to process faster
4. **Reliability**: Jobs persist in Valkey, survive server restart

This is production-grade async processing.

---

## What's Next

1. Create a dashboard to visualize queue
2. Add job timeout handling
3. Implement job retries on failure
4. Deploy workers to multiple machines
5. Add caching for common queries

---

## Key Takeaway

Workers transform the async system from **idle queue** to **active processing**:

- Without worker: Jobs queue up indefinitely (null results)
- With worker: Jobs processed, results available
- With N workers: N jobs processed in parallel

This is how production RAG systems handle scale: users submit requests instantly, workers process in background, results served when ready.
