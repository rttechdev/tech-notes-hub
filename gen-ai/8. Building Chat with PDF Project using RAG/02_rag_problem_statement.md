# RAG Problem Statement

## Objective

Understand the real enterprise problem that RAG solves when users need answers from large private document collections.

---

## Real-World Scenario

A business (legal, finance, healthcare, enterprise ops, etc.) has large internal data:

- PDFs
- documents
- database records
- internal files

Users/employees want a chat-like interface to ask questions such as:

- "Tell me about case number 32"
- "What is the current status of this case?"

They expect a direct answer plus source traceability (for example page/file reference).

---

## Why a Plain LLM Fails

A general LLM (OpenAI/Gemini/etc.) has no built-in awareness of private company documents.

| Limitation | Impact |
|---|---|
| No private-data context by default | LLM cannot answer business-specific queries reliably |
| Trained on public internet data | Internal cases/contracts/policies are missing |
| No automatic file lookup | Cannot find which document/page contains the answer |

---

## Why “Pass All Files to Prompt” Fails

Naive idea: send all documents every time as context.

Problems:

- context window is limited
- large corpora (for example 1000 files) do not fit reliably
- per-query cost becomes very high
- repeated full-document prompting is slow and inefficient

So brute-force prompting is not scalable.

---

## Core Requirement

For each user query, system should:

1. find only relevant chunks from large document pool
2. pass selected context to LLM
3. generate accurate answer grounded in retrieved data
4. optionally return citation/page/source

This is the exact motivation for Retrieval-Augmented Generation.

---

## Key Takeaways

- Enterprise AI needs answers from private data, not only public pretraining knowledge.
- Plain LLM calls are insufficient for large internal document sets.
- Context limits and cost make full-corpus prompting impractical.
- RAG solves this by retrieving relevant context first, then generating an answer.
