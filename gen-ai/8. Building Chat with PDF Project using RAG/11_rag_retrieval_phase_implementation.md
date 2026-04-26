# RAG Retrieval Phase Implementation

## Objective

Implement the retrieval half of RAG: accept user queries, search vector DB for relevant context, and generate grounded answers with citations.

---

## Setup Files

Create `chat.py` in your RAG project for the retrieval logic.

---

## Step 1: Initialize Embedding Model and Vector Store Connection

```python
from dotenv import load_dotenv
from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore

load_dotenv()

# Same embedding model as indexing phase
embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")

# Connect to existing collection (read-only for retrieval)
vector_db = QdrantVectorStore.from_existing_collection(
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag",
)
```

Key point: use `from_existing_collection` (not `from_documents`) since data is already indexed.

---

## Step 2: Get User Query

```python
user_query = input("Ask something: ")
```

Example: "Can you help me understand arrow functions?"

---

## Step 3: Similarity Search

```python
search_results = vector_db.similarity_search(user_query)
```

What happens:

- user query is embedded using same model as indexing
- vector DB finds k nearest neighbors (default: 4)
- returns only relevant chunks + metadata
- filters out irrelevant chunks automatically

---

## Step 4: Format Context with Citations

```python
context = []
for result in search_results:
    page_content = result.page_content
    page_number = result.metadata.get("page", "unknown")
    source = result.metadata.get("source", "unknown")
    context.append(f"Page {page_number} ({source}):\n{page_content}\n")

context_str = "\n".join(context)
```

Output example:

```
Page 20 (node_js.pdf):
Arrow functions are a concise syntax...

Page 21 (node_js.pdf):
const add = (a, b) => a + b;
```

---

## Step 5: Create System Prompt

```python
system_prompt = """You are a helpful AI assistant who answers user questions
based on the available context retrieved from a PDF file.
You should only answer based on the following context and guide the user
to the right page number to know more.

Available context:
"""  + context_str
```

The system prompt now contains:

- instructions for the LLM
- only the relevant chunks (not entire 104-page PDF)
- page citations for source traceability

---

## Step 6: Call OpenAI with Context

```python
from openai import OpenAI

openai_client = OpenAI()

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query},
    ]
)

answer = response.choices[0].message.content
print(f"🤖: {answer}")
```

---

## Why This Is Scalable

| Approach | Context Size | Cost | Latency |
|---|---|---|---|
| Naive (all docs) | Full 104-page PDF | High | Slow |
| RAG (relevant only) | 2-4 relevant chunks | Low | Fast |

Even with 50,000 pages, only 2-4 chunks are sent to LLM.

---

## Output Example

User: "Can you help me understand arrow functions?"

LLM Response: "Arrow functions provide a concise syntax for writing functions... [answer]. You can see this explained on pages 20 and 21."

User can then open the exact pages mentioned.

---

## Extensibility

This pattern works for any data source:

- PDFs
- web pages
- databases
- documentation
- enterprise knowledge bases

As long as data is indexed once, retrieval is fast and scalable.

---

## Key Takeaways

- retrieval phase mirrors indexing: embed → search → retrieve
- similarity search filters documents automatically
- context assembly with citations enables traceability
- only passing relevant chunks makes RAG cost-effective and scalable
- complete RAG pipeline = index once, retrieve many times
