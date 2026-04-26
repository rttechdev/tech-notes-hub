# RAG Retrieval Phase (Query-to-Answer)

## Objective

Understand the second phase of RAG: converting user queries into relevant documents and generating grounded answers.

---

## Retrieval Phase Overview

Retrieval phase is triggered when a user asks a question.

Goal:

- find only relevant chunks from the indexed collection
- generate an answer grounded in those chunks
- provide source citations

---

## Step 1: Embed User Query

Convert user question to vector using the same embedding model as indexing.

Input:

- user query (for example: "Tell me about case number 32")

Output:

- query vector with the same dimensionality as chunk vectors

This vector represents the semantic meaning of the question.

---

## Step 2: Vector Similarity Search

Query the vector database for chunks most similar to the query vector.

What happens:

- database finds k-nearest neighbors (configurable)
- returns only relevant chunks (for example 2-5 out of 50,000)
- discards irrelevant chunks

This is the key difference from naive RAG:

- naive approach: send all 50,000 chunks
- scalable approach: send only 2-5 relevant chunks

---

## Step 3: Assemble Context

Collect returned chunks and their metadata:

- chunk text
- source document
- page number
- any other stored metadata

This becomes the retrieval context.

---

## Step 4: Generate Answer with LLM

Create a system prompt with:

- the narrowed context (only relevant chunks)
- the user query

Call LLM (for example GPT-4, Gemini) with this context.

LLM generates answer informed by the specific retrieved chunks.

---

## Step 5: Return Answer with Citations

LLM output can include:

- direct answer to the question
- source references (document id, page number)
- confidence indicators

User sees both the answer and where it came from.

---

## Complete RAG Pipeline Flow

```
User Query
    ↓
Embed Query
    ↓
Vector Similarity Search
    ↓
Retrieve Relevant Chunks
    ↓
Assemble Context + Query
    ↓
Call LLM
    ↓
Generate Answer
    ↓
Return Answer + Citations
```

---

## Why This Is Scalable

- per-query cost is low (only relevant context)
- vector search is fast even with millions of chunks
- context window fits only needed data, not entire corpus
- works for large enterprises with 50,000+ documents

---

## Key Takeaways

- Retrieval phase = embed query → search → retrieve → generate.
- Vector similarity search is the core efficiency gain.
- Only relevant chunks are passed to LLM, not full document set.
- Citations/metadata traceability is built-in through vector DB storage.
- Combined indexing + retrieval gives production-ready RAG system.
