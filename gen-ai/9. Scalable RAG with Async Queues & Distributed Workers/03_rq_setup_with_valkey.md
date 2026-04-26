# Setting Up RQ (Redis Queue) with Valkey

## Overview

To implement async job queues, we use **RQ** (Redis Queue), a lightweight Python library that stores jobs in Redis/Valkey backend.

---

## RQ vs Redis: The License Issue

### Redis Problem
- Original Redis open-source license was revoked (April 2024)
- Unclear legal status for new projects
- Risk for production usage

### Valkey Solution
- Drop-in replacement for Redis
- Same API, same commands
- Open-source fork backed by Linux Foundation
- **No code changes needed** - Valkey is 100% compatible with Redis

### Decision
For this course, we use **Valkey** instead of Redis. Everything works identically.

---

## Architecture

Two services needed:

| Service | Port | Purpose |
|---|---|---|
| **Qdrant** | 6333 | Vector database (existing from RAG section) |
| **Valkey** | 6379 | Job queue backend (NEW) |

Both run in Docker. Both accessed locally.

---

## Installation: Docker Compose Setup

Create folder: `rag_queue`

### docker-compose.yml

```yaml
version: '3.8'

services:
  valkey:
    image: valkey/valkey:latest
    ports:
      - "6379:6379"
    volumes:
      - valkey_data:/data
    command: valkey-server

volumes:
  valkey_data:
```

Key points:
- `image: valkey/valkey:latest` - pulls Valkey Docker image
- `6379:6379` - standard Redis/Valkey port
- `valkey_data` volume - persists queue data

### Start Valkey

```bash
cd rag_queue
docker-compose up -d
```

Output:
```
Creating rag_queue_valkey_1 ... done
```

Verify:
```bash
docker ps
```

Should show `valkey` container running on port 6379.

---

## Full Stack (After Setup)

```
┌─────────────────────────────────┐
│   FastAPI Server                │
│   (localhost:8000)              │
└──────────┬──────────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ↓             ↓
┌──────────┐  ┌──────────┐
│ Qdrant   │  │  Valkey  │
│ (6333)   │  │ (6379)   │
└──────────┘  └──────────┘
 (Vector DB) (Job Queue)
```

### Port Mapping

```
FastAPI → Qdrant: http://localhost:6333 (embeddings, retrieval)
FastAPI → Valkey: localhost:6379 (queue operations)
```

---

## Python: Connecting to RQ

### Install RQ

```bash
pip install rq redis
```

Note: We install `redis` (the Python client library), not the Redis server itself.

### Basic Connection

```python
from redis import Redis
from rq import Queue

# Connect to Valkey
redis_conn = Redis(host='localhost', port=6379)

# Create queue
q = Queue(connection=redis_conn)
```

---

## Job Workflow Example

```python
def long_task(x):
    """Example function to run in queue"""
    import time
    time.sleep(5)  # Simulate slow operation
    return x * 2

# Enqueue job (returns immediately)
job = q.enqueue(long_task, 42)
print(f"Job ID: {job.id}")  # Job ID: 1234-5678-9012

# Check status
print(f"Status: {job.get_status()}")  # Status: queued
print(f"Status: {job.get_status()}")  # Status: started
print(f"Status: {job.get_status()}")  # Status: finished
print(f"Result: {job.result}")        # Result: 84
```

---

## Key Concepts

### Job
A task pushed to queue. Contains:
- Function to run
- Arguments
- Job ID
- Status (queued, started, finished, failed)
- Result (after completion)

### Queue
Stores jobs FIFO. Accessed by:
- Producers (FastAPI) - push jobs
- Workers - pop and execute jobs

### Worker
Separate process that:
- Connects to Valkey
- Listens to queue
- Pops one job at a time
- Executes job function
- Stores result
- Repeats

---

## Next Steps

1. Set up FastAPI endpoints that enqueue jobs
2. Create worker process to consume queue
3. Convert RAG indexing to async job
4. Convert RAG retrieval to async job
5. Add status checking endpoint

---

## Verification Checklist

- [ ] Valkey container running: `docker ps` shows `valkey`
- [ ] Valkey accessible: Can connect to `localhost:6379`
- [ ] Python client installed: `pip list | grep rq`
- [ ] Basic queue working: Can enqueue and dequeue jobs

Once verified, move to FastAPI + RQ integration.

---

## Key Takeaway

RQ with Valkey provides a simple, production-ready job queue system:
- **Lightweight**: No complex infrastructure
- **Reliable**: Persistent storage, automatic retries
- **Scalable**: Add workers to process faster
- **Flexible**: Works with any Python function

This is the backbone of our async RAG system.
