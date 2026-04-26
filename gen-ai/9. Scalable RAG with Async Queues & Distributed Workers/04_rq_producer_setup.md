# Setting Up RQ: Producer & Consumer Pattern

## Installation

Install RQ and update requirements:

```bash
pip install rq
pip freeze > requirements.txt
```

---

## Folder Structure

Organize async code into two folders:

```
rag_queue/
├── client/
│   ├── __init__.py
│   └── rq_client.py          # Connection setup (producer)
├── queues/
│   ├── __init__.py
│   └── worker.py             # Worker logic (consumer)
├── docker-compose.yml        # Valkey service
├── server.py                 # FastAPI server
└── main.py                   # Example usage
```

**client/** = Producer (enqueue jobs)
**queues/** = Consumer (process jobs)

---

## Step 1: Create Producer Connection

Create `client/rq_client.py`:

```python
from redis import Redis
from rq import Queue

# Connect to Valkey (same as Redis)
redis_conn = Redis(host='localhost', port=6379)

# Create queue instance
q = Queue(connection=redis_conn)
```

This single module is imported by FastAPI to enqueue jobs.

---

## Step 2: Queue Operations

Once connected, the queue object supports:

```python
# Enqueue a job
job = q.enqueue(function_name, arg1, arg2)

# Get job ID
print(job.id)  # e.g., "1234-5678-9012"

# Check job status
print(job.get_status())  # "queued", "started", "finished", "failed"

# Get result (blocks if not ready)
print(job.result)

# Delete job
job.delete()
```

---

## Step 3: Example Function to Queue

Create a function anywhere in your project:

```python
# in tasks.py or any module
def index_pdf(pdf_path):
    """Function that will run in queue"""
    from langchain_community.document_loaders import PyPDFLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_openai import OpenAIEmbeddings
    from langchain_qdrant import QdrantVectorStore
    
    # Same indexing logic as before
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, 
        chunk_overlap=400
    )
    chunks = text_splitter.split_documents(docs)
    
    embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")
    
    vector_store = QdrantVectorStore.from_documents(
        documents=chunks,
        embedding=embedding_model,
        url="http://localhost:6333",
        collection_name="learning_rag"
    )
    
    return {"status": "success", "chunks_count": len(chunks)}
```

---

## Step 4: Enqueue from FastAPI

```python
from fastapi import FastAPI
from client.rq_client import q

app = FastAPI()

@app.post("/index")
def start_indexing(pdf_path: str):
    """Accept PDF, queue indexing job"""
    job = q.enqueue(index_pdf, pdf_path)
    
    return {
        "message": "Indexing started",
        "job_id": job.id,
        "status": "queued"
    }

@app.get("/status/{job_id}")
def get_job_status(job_id: str):
    """Check status of indexing job"""
    job = q.fetch_job(job_id)
    
    if job is None:
        return {"error": "Job not found"}
    
    return {
        "job_id": job_id,
        "status": job.get_status(),
        "result": job.result if job.is_finished else None
    }
```

---

## How It Works

### Timeline

```
t=0s
User: POST /index
      pdf_path: "document.pdf"
         ↓
FastAPI: q.enqueue(index_pdf, "document.pdf")
         ↓
Response: {"job_id": "abc123", "status": "queued"}
User gets job_id immediately

[Meanwhile, in background...]

t=0-10s
Worker picks up job from queue
Worker runs: index_pdf("document.pdf")
Worker stores result in Valkey

t=10s
User: GET /status/abc123
         ↓
Response: {"status": "finished", "result": {...}}
User gets final result
```

---

## Producer vs Consumer

### Producer (FastAPI)
- Accepts HTTP requests
- Validates input
- Enqueues jobs to Valkey
- Returns immediately with job_id
- **Never does heavy computation**

```python
@app.post("/index")
def start_indexing(pdf_path):
    job = q.enqueue(index_pdf, pdf_path)  # 1ms
    return {"job_id": job.id}              # Return immediately
```

### Consumer (Worker)
- Listens to Valkey queue
- Picks up one job at a time
- Executes job function (slow operation)
- Saves result back to Valkey
- **Runs in separate process**

```python
# In separate terminal/process
worker = Worker([q], connection=redis_conn)
worker.work()
```

---

## Key Insight: Decoupling

Before (Synchronous):
```
User → FastAPI → [5 second indexing] → Response
       ^ System blocked for 5 seconds
```

After (Async with Queue):
```
User → FastAPI → Valkey queue → Return (1ms)
                      ↓
                   Worker [5 second indexing]
       ^ System never blocks
```

FastAPI and Worker are **decoupled**. They don't wait for each other.

---

## What's Next

1. Implement Worker that listens to queue
2. Convert index_pdf to queue-compatible format
3. Convert retrieval (chat) to queue-compatible format
4. Run worker in separate process
5. Test full async flow

---

## Code Location Pattern

| File | Purpose |
|---|---|
| `client/rq_client.py` | Queue initialization (producer) |
| `queues/worker.py` | Worker loop (consumer) |
| `server.py` | FastAPI endpoints (use client to enqueue) |
| `tasks.py` | Functions to run in queue |

Producers import from `client/rq_client.py`
Workers import from `queues/` and `tasks.py`

---

## Key Takeaway

RQ setup is minimal:
1. Connect to Valkey with Redis client
2. Create Queue instance
3. Enqueue functions with `q.enqueue()`
4. Get job_id immediately
5. Worker process runs jobs in background

This enables **non-blocking, scalable async processing**.
