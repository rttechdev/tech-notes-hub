# RQ Worker: Processing Queries in Background

## Folder Setup

Create `__init__.py` files to make folders Python modules:

```bash
touch client/__init__.py
touch queues/__init__.py
```

Structure:
```
rag_queue/
├── client/
│   ├── __init__.py
│   └── rq_client.py
├── queues/
│   ├── __init__.py
│   └── worker.py
└── server.py
```

---

## Worker Function: process_query

Create `queues/worker.py`:

```python
from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore

load_dotenv()

# Initialize clients
openai_client = OpenAI()
embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")

def process_query(query: str) -> dict:
    """
    Worker function: Retrieves relevant chunks and generates answer.
    Runs in background via RQ.
    """
    
    print(f"🔍 Searching chunks for: {query}")
    
    # Connect to existing vector store
    vector_db = QdrantVectorStore.from_existing_collection(
        embedding=embedding_model,
        url="http://localhost:6333",
        collection_name="learning_rag"
    )
    
    # Step 1: Similarity search
    search_results = vector_db.similarity_search(query, k=4)
    
    # Step 2: Format context with citations
    context = []
    for result in search_results:
        page_number = result.metadata.get("page", "unknown")
        source = result.metadata.get("source", "unknown")
        content = result.page_content
        context.append(f"Page {page_number} ({source}):\n{content}\n")
    
    context_str = "\n".join(context)
    
    # Step 3: Create system prompt
    system_prompt = """You are a helpful AI assistant who answers user questions
based on the available context retrieved from a PDF file.
Provide accurate answers and guide users to the right page numbers for more details.

Available context:
""" + context_str
    
    # Step 4: Generate answer via OpenAI
    response = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query}
        ]
    )
    
    answer = response.choices[0].message.content
    print(f"✅ Answer generated: {answer[:100]}...")
    
    return {
        "query": query,
        "answer": answer,
        "sources": [
            {
                "page": result.metadata.get("page", "unknown"),
                "source": result.metadata.get("source", "unknown")
            }
            for result in search_results
        ]
    }
```

---

## How It Works

### Synchronous (Old)
```python
# chat.py
@app.post("/chat")
def chat(query):
    results = vector_db.similarity_search(query)      # Blocks
    answer = openai_client.chat.completions.create()  # Blocks
    return answer                                       # 5+ seconds
    # User waits entire time
```

### Asynchronous (New)
```python
# server.py
@app.post("/chat")
def chat(query):
    job = q.enqueue(process_query, query)  # Returns instantly
    return {"job_id": job.id}              # 1ms response
    # User gets job_id immediately
    
# Background (worker process)
worker.work()
# Worker picks up job from queue
# Worker runs: process_query(query)
# Takes 5+ seconds but doesn't block FastAPI
# Result stored in Redis via RQ
```

---

## Key Differences from sync chat.py

| Aspect | Synchronous | Asynchronous |
|---|---|---|
| Execution | FastAPI blocks | Background worker |
| Response time | 5+ seconds | 1 millisecond |
| Return value | Final answer | Job ID |
| User experience | Wait for answer | Get job ID, check status |
| Scalability | One user at a time | Infinite users |

---

## Function Signature

```python
def process_query(query: str) -> dict
```

**Input**:
- `query` (str): User's question

**Output** (dict):
```json
{
  "query": "What are arrow functions?",
  "answer": "Arrow functions provide a concise syntax...",
  "sources": [
    {"page": 20, "source": "node_js.pdf"},
    {"page": 21, "source": "node_js.pdf"}
  ]
}
```

---

## Why This Function Works in Queue

RQ Requirements:
1. ✅ Takes serializable arguments (str)
2. ✅ Returns serializable result (dict)
3. ✅ No external state needed
4. ✅ Can be imported by worker process
5. ✅ No FastAPI/HTTP specific code

---

## Job Lifecycle

```
t=0ms:  POST /chat {"query": "..."}
         ↓
       FastAPI: job = q.enqueue(process_query, query)
         ↓
       return {"job_id": "abc123"}
         ↓
       Response sent to user (1ms total)

[Meanwhile, in separate worker process...]

t=0-5000ms:
         ↓
       Worker picks up job from queue
         ↓
       Prints: "🔍 Searching chunks for: ..."
         ↓
       Runs: vector_db.similarity_search()
         ↓
       Runs: openai_client.chat.completions.create()
         ↓
       Prints: "✅ Answer generated: ..."
         ↓
       Result stored in Redis

t=5000ms+:
       User polls: GET /result/abc123
         ↓
       Response: {"status": "finished", "result": {...}}
```

---

## Enqueuing the Function

From FastAPI (server.py):

```python
from client.rq_client import q
from queues.worker import process_query

@app.post("/chat")
def chat_endpoint(message: str):
    # Enqueue worker function
    job = q.enqueue(process_query, message)
    
    return {
        "job_id": job.id,
        "status": "queued"
    }
```

RQ automatically:
- Serializes the function and arguments
- Stores in Redis/Valkey
- Waits for worker to pick up
- Stores result back in Redis

---

## Worker Process

Separate from FastAPI (runs in different terminal):

```python
from redis import Redis
from rq import Worker
from queues.worker import process_query
from client.rq_client import q

if __name__ == "__main__":
    # Connect to same Valkey as FastAPI
    redis_conn = Redis(host='localhost', port=6379)
    
    # Create worker listening to queue
    worker = Worker([q], connection=redis_conn)
    
    # Start processing jobs
    print("👷 Worker started, listening to queue...")
    worker.work()
```

This runs in infinite loop:
1. Check queue for jobs
2. If job found, execute it
3. Store result in Redis
4. Repeat

---

## Complete Flow

```
User Client                FastAPI Server              Worker Process
     │                           │                            │
     ├─ POST /chat ─────────────>│                            │
     │  {"query": "..."}         │                            │
     │                           ├─ enqueue(process_query) ─>│
     │                           │     to Valkey             │
     │<─ {"job_id": abc} ────────┤                            │
     │    (1ms)                  │                            │
     │                           │                     ┌──────┴─────┐
     │                           │                     │ Pick job   │
     │                           │                     │ from queue │
     │                           │                     │ (5 sec)    │
     │                           │                     │ Run:       │
     │                           │                     │ similarity │
     │                           │                     │ search +   │
     │                           │                     │ LLM call   │
     │                           │                     │ Store      │
     │                           │                     │ result     │
     │                           │                     └────────────┘
     │                           │
     ├─ GET /result/abc ────────>│
     │                           ├─ fetch_job(abc)
     │<─ {"status": "finished",──┤  from Valkey
         "result": {...}}        │
```

---

## Key Insight

The worker function (`process_query`) contains the **same RAG logic** from the synchronous chat.py. We haven't changed the algorithm—we've just wrapped it so:

- It runs in background
- FastAPI stays responsive
- Multiple queries can be queued simultaneously
- Results persist in Valkey

---

## What's Next

1. Create FastAPI server (server.py) with endpoints:
   - `POST /chat` - enqueue query
   - `GET /result/{job_id}` - fetch result
   - `GET /status/{job_id}` - check progress
2. Run worker in separate process
3. Test full async flow

---

## Key Takeaway

Worker functions are normal Python functions that:
- Take simple arguments
- Return simple results
- Get executed by RQ in background
- Never block the FastAPI server

RAG logic unchanged, just moved into a queueable function.
