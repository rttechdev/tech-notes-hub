# Creating Embeddings and Storing in Vector Database

## Objective

Generate vector embeddings for document chunks and persist them in QuadrantDB for retrieval.

---

## Install Dependencies

```bash
pip install langchain-openai langchain-qdrant
pip freeze > requirements.txt
```

Packages:

- `langchain-openai` — OpenAI embedding models
- `langchain-qdrant` — Qdrant vector store integration

---

## Step 1: Create Embedding Model

```python
from langchain_openai import OpenAIEmbeddings

embedding_model = OpenAIEmbeddings(model="text-embedding-3-large")
```

Configuration:

- model: `text-embedding-3-large` (dimensions: 3072, latest OpenAI embedding)

This model will convert each chunk into a vector.

---

## Step 2: Set Up Environment

Create `.env` file in project root:

```env
OPENAI_API_KEY=sk-...your-key...
```

Load in your script:

```python
from dotenv import load_dotenv

load_dotenv()  # loads OPENAI_API_KEY from .env
```

---

## Step 3: Store Embeddings in Qdrant

```python
from langchain_qdrant import QdrantVectorStore

vector_store = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedding_model,
    url="http://localhost:6333",
    collection_name="learning_rag",
)

print("Indexing of documents done!")
```

Parameters:

- `documents=chunks` — the chunked documents to embed
- `embedding=embedding_model` — embedding model instance
- `url="http://localhost:6333"` — QuadrantDB running locally
- `collection_name="learning_rag"` — logical grouping/namespace in the DB

---

## What Happens Under the Hood

1. each chunk is sent to OpenAI API for embedding
2. receives 3072-dimensional vector per chunk
3. stores vector + chunk text + metadata in QuadrantDB
4. metadata includes page number, source document, author, etc.

---

## Verify in QuadrantDB UI

Open `http://localhost:6333/dashboard` in browser:

- navigate to Collections
- should see `learning_rag` collection
- click into it to inspect:
  - number of vectors stored
  - individual vector preview
  - metadata attached to each vector

Example metadata stored:

```json
{
  "page": 3,
  "source": "node_js.pdf",
  "author": "...",
  "creator": "...",
  "total_pages": 104,
  "page_label": "4"
}
```

---

## Current Progress

After this step:

- PDF loaded, chunked, and embedded
- all vectors stored in QuadrantDB with metadata
- indexing phase complete
- ready for retrieval phase (query-time vector search)

---

## Key Takeaways

- `OpenAIEmbeddings` converts chunks to semantic vectors automatically.
- LangChain's `QdrantVectorStore.from_documents()` handles embedding + storage in one call.
- metadata preservation is crucial for citations and traceability.
- QuadrantDB UI provides visibility into indexed data quality.
