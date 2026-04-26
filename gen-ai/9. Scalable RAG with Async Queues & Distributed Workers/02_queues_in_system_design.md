# Queues in System Design: FIFO & Async Architecture

## What Is a Queue?

A **queue** is a data structure that follows **FIFO** (First In, First Out):

```
Push → [Task 1] [Task 2] [Task 3] → Pop
       (oldest)                    (newest)
```

Tasks are added to the back, processed from the front. First task in = first task out.

---

## The Blocking Problem (Synchronous)

### Current Architecture
```
User 1: "Explain Node JS"
         ↓
    FastAPI Server
         ↓
    [Retrieval: 5 seconds]
         ↓
    Return answer
    
User 2: "What are arrow functions?"
         ↓
    ❌ BLOCKED (waiting for User 1)
```

**Issue**: While User 1's query runs, the server is **completely busy**. User 2 must wait even though no processing has started.

### Impact
- One slow query blocks ALL other users
- Server appears frozen
- Poor user experience
- Unscalable

---

## The Async Solution (Queue-Based)

### New Architecture
```
User 1: "Explain Node JS"
         ↓
    FastAPI Server
         ↓
    Push to Queue → Return immediately
    "Job ID: abc123, check status later"
    
    ┌─────────────────┐
    │ QUEUE           │
    │ [Task 1] [Task 2]
    └─────────────────┘
         ↓
    Consumer/Worker
         ↓
    [Process Task 1: 5 seconds]
         ↓
    Store result in Database
    
User 2: "What are arrow functions?"
         ↓
    FastAPI Server (NOT busy)
         ↓
    Push to Queue → Return immediately
    "Job ID: def456, check status later"
```

**Benefit**: Server accepts all requests instantly, never blocks. Workers process in background.

---

## How It Works Step-by-Step

### Step 1: User Submits Request
```python
POST /index
{
  "pdf_path": "document.pdf"
}
```

### Step 2: FastAPI Accepts & Queues
```python
@app.post("/index")
async def queue_indexing(request):
    job_id = queue.enqueue(index_pdf, request.pdf_path)
    return {"status": "queued", "job_id": job_id}
    # Returns IMMEDIATELY ✓
```

### Step 3: Response Sent to User
```
Response: {
  "status": "queued",
  "job_id": "abc123"
}
Time: 10 milliseconds ✓
```

### Step 4: Consumer Picks Up Task
```python
while True:
    job = queue.dequeue()  # Get oldest task
    result = index_pdf(job.pdf_path)
    db.save_result(job.job_id, result)
```

Runs in **separate process/thread**, doesn't block FastAPI.

### Step 5: User Checks Status
```python
GET /status/abc123
```

Response:
```json
{
  "job_id": "abc123",
  "status": "processing",
  "progress": "75%"
}
```

Or:
```json
{
  "job_id": "abc123",
  "status": "complete",
  "result": {...}
}
```

---

## System Design Diagram

```
┌─────────────┐
│   User 1    │
│   User 2    │
│   User 3    │
└──────┬──────┘
       │ (submit requests)
       ↓
┌──────────────────────┐
│   FastAPI Server     │
│  (never blocks)      │
│  Accepts all requests│
│  Pushes to queue     │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│    QUEUE (FIFO)      │
│  [Job 1]             │  First in
│  [Job 2]             │  
│  [Job 3]             │  Last in
└──────┬───────────────┘
       │ (dequeue one at a time)
       ↓
┌──────────────────────┐
│  Consumer/Worker 1   │
│  (processes Job 1)   │
└──────┬───────────────┘
       │
       ↓
┌──────────────────────┐
│   Result Database    │
│  Job 1: complete ✓   │
│  Job 2: processing   │
│  Job 3: queued       │
└──────────────────────┘
       │
       ↑ (user polls for status)
       │
   User checks status
```

---

## Key Advantages

| Aspect | Sync | Async with Queue |
|---|---|---|
| Server blocks? | Yes | No |
| User waits? | Yes (blocking) | No (gets job ID) |
| Multiple users? | Sequential (slow) | Parallel (fast) |
| Scalability | Limited | Unlimited (add workers) |
| Indexing 1000 PDFs | System frozen for hours | Background, user free |

---

## Producer vs Consumer

| Role | Responsibility | Runs Where |
|---|---|---|
| **Producer** (FastAPI) | Accept requests, validate, push to queue | HTTP thread |
| **Consumer** (Worker) | Pop from queue, process, save results | Separate process/thread |

They run independently. Producer never waits for consumer.

---

## Why This Matters for RAG

- **Indexing phase**: Push PDF to queue, worker indexes in background
- **Retrieval phase**: Push query to queue, worker retrieves + generates in background
- **Multiple users**: All queries go to queue, workers process FIFO
- **Scalability**: Add more workers to process queue faster

---

## What's Next

Implement this queue architecture using:

1. **FastAPI** - HTTP server for accepting requests
2. **Redis Queue (RQ)** - Lightweight queue implementation
3. **Workers** - Background processes that consume queue

Same RAG logic (index.py, chat.py), but wrapped in async infrastructure.

---

## Key Takeaway

Queues decouple **request acceptance** (fast) from **request processing** (slow). Server stays responsive while work happens in background. This is how production systems handle scale.
