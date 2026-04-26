# LangChain: RAG Development Framework

## Objective

Understand LangChain and its role in simplifying RAG pipeline development.

---

## What Is LangChain?

LangChain is an open-source framework that provides reusable utility components for building AI applications.

Core idea:

- instead of writing RAG plumbing from scratch, use pre-built abstractions
- focus on logic rather than infrastructure details

---

## Why LangChain for RAG?

RAG pipelines require many common tasks:

| Task | Without LangChain | With LangChain |
|---|---|---|
| Load PDF files | custom parsing logic | `PyPDFLoader` |
| Chunk documents | manual string splitting | `RecursiveCharacterTextSplitter` |
| Create embeddings | API boilerplate | `OpenAIEmbeddings` (one line) |
| Store in vector DB | raw DB client code | `Qdrant` integration (built-in) |
| Retrieve + generate | orchestration code | `RetrievalQA` chain (pre-built) |

LangChain abstracts repetitive boilerplate away.

---

## Key LangChain Components for RAG

### Document Loaders

Load documents from various sources:

- PDF files
- web pages
- unstructured data
- sitemaps
- crawlers

Example: `PyPDFLoader`, `UnstructuredPDFLoader`

### Text Splitters

Split documents into chunks:

- `RecursiveCharacterTextSplitter` (smart paragraph-aware)
- configurable chunk size and overlap

### Embeddings

Generate vector embeddings:

- `OpenAIEmbeddings` (OpenAI)
- `HuggingFaceEmbeddings` (open-source models)

### Vector Store Integrations

Connect to vector databases:

- `Qdrant`
- `Pinecone`
- `Weaviate`
- `Chroma`

### Chains

Pre-built workflows:

- `RetrievalQA` (retrieve + generate)
- `ConversationalRetrievalChain` (multi-turn)

---

## Installation

```bash
pip install langchain langchain-community pypdf
```

Packages:

- `langchain` — core framework
- `langchain-community` — additional integrations
- `pypdf` — PDF document parsing

Run `pip freeze > requirements.txt` to lock versions.

---

## Why LangChain Matters

Without LangChain:

- each developer writes document loading + chunking + embedding code
- duplicated effort across projects

With LangChain:

- industry-standard abstractions
- battle-tested implementations
- faster iteration on actual RAG logic

---

## Key Takeaways

- LangChain accelerates RAG development with pre-built utilities.
- covers full pipeline: load → chunk → embed → retrieve → generate.
- reduces boilerplate so you focus on business logic.
- widely used in production RAG systems.
