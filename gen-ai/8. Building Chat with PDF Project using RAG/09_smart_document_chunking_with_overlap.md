# Smart Document Chunking with Overlap

## Objective

Split loaded documents into optimally-sized chunks while preserving semantic context across chunk boundaries.

---

## The Chunking Problem

After loading a PDF, you have full-page documents. Sending whole pages to embeddings is problematic:

- pages may be too large for embedding models
- reduces search precision (too much unrelated content per vector)
- wastes tokens

Solution: split pages into smaller, meaningful chunks.

---

## The Overlap Strategy

Simply splitting by fixed size breaks semantic meaning:

```
[Chunk 1: para1, para2, para3] → [Chunk 2: para4, para5, para6]
```

Problem: context is lost at boundaries.

With overlap:

```
[Chunk 1: para1, para2, para3]
         [Chunk 2: para2, para3, para4, para5, para6]
                            [Chunk 3: para5, para6, para7, para8, para9]
```

Overlap helps the model see context from previous chunks, preserving semantic continuity.

---

## Install Text Splitter

```bash
pip install langchain-text-splitters
pip freeze > requirements.txt
```

---

## Implementation

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Create splitter instance
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=400,
)

# Split documents into chunks
chunks = text_splitter.split_documents(docs)
```

Configuration:

- `chunk_size=1000` — each chunk max 1000 characters
- `chunk_overlap=400` — 400-character overlap between adjacent chunks

---

## Why RecursiveCharacterTextSplitter?

Recursive splitting is smarter than naive fixed splitting:

- first tries to split by paragraph (smart)
- falls back to sentence level if needed
- falls back to character level if necessary

This avoids breaking sentences or paragraphs awkwardly.

---

## Output

After splitting:

- each chunk is still a document object
- metadata (page number, source) is preserved
- chunks are optimized size with context overlap
- ready for embedding step

---

## Key Takeaways

- chunking converts large pages into search-friendly units.
- overlap preserves semantic context at boundaries.
- `RecursiveCharacterTextSplitter` is the smart choice over naive splitting.
- LangChain makes chunking a two-liner operation.
