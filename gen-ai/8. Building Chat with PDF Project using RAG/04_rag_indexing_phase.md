# RAG Indexing Phase (Scalable Foundation)

## Objective

Understand the first scalable half of RAG: converting large document collections into searchable vector representations.

---

## Two-Phase RAG Architecture

RAG is usually split into two separate workflows:

1. Indexing phase: users upload/provide data
2. Retrieval phase: users chat with data

These phases have different responsibilities and different code paths.

---

## What Happens in Indexing Phase

Indexing is an offline/ingestion workflow that prepares data before chat queries arrive.

### Step 1: Data Ingestion

User provides source documents:

- PDF files
- text documents
- other enterprise files

### Step 2: Chunking

Large text is split into smaller pieces (chunks).

Common chunking strategies:

- page-level chunking
- paragraph-level chunking
- fixed-size chunking (for example character/token windows)

Chunking strategy is design-dependent and affects retrieval quality.

### Step 3: Embedding Generation

Each chunk is passed to an embedding model.

Output:

- vector embedding per chunk

### Step 4: Vector Database Storage

Store records in a vector database (example systems: Pinecone, Weaviate, etc.).

Each stored record typically includes:

- embedding vector
- original chunk text
- metadata (document id, page number, source info)

---

## Why Metadata Matters

Metadata enables:

- source citations
- page-level traceability
- filtering/ranking controls later in retrieval

So indexing is not only vector creation, it is structured knowledge packaging.

---

## Output of Indexing Phase

After indexing completes:

- raw documents are transformed into searchable vector entries
- each entry is linked to original content + metadata
- system is ready for query-time retrieval

This is the scalable replacement for sending all files in every prompt.

---

## Key Takeaways

- Indexing and retrieval are separate phases in production RAG.
- Indexing pipeline = ingest -> chunk -> embed -> store.
- Vector DB stores vectors plus source text and metadata.
- Good indexing quality directly improves downstream answer quality.
