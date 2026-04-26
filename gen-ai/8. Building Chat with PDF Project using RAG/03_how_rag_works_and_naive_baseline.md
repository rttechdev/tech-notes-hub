# How RAG Works and the Naive Baseline

## Objective

Understand the formal meaning of RAG and the simplest possible implementation, then analyze why that baseline does not scale.

---

## What Is RAG?

**RAG = Retrieval-Augmented Generation**

RAG combines:

- LLM reasoning/generation
- external knowledge sources (private docs, PDFs, DB records, etc.)

Key idea:

- retrieve relevant knowledge first
- then generate answer using that retrieved context

---

## Naive RAG Baseline (Works for Small Data)

### Flow

1. extract text from all files
2. build one big system prompt containing all extracted data
3. send user query with that prompt to LLM
4. return answer from LLM

Example prompt idea:

- "You are an AI assistant that helps users talk to their data"
- `available_data = <all extracted text>`

This can work when document volume is very small.

---

## Why This Baseline Breaks

| Problem | Why it hurts |
|---|---|
| Huge token payload | very high API cost per query |
| Context-window limit | cannot fit large corpora |
| Repeated full ingestion | every query becomes slow and expensive |
| Poor scalability | fails for enterprise-scale document counts |

Even large context windows (for example million-token class models) are still finite and insufficient for very large corpora.

---

## Practical Interpretation

Naive baseline is useful only as a starting pattern:

- okay for one/few short files
- not viable for 1000+ files, let alone tens of thousands

So the system needs selective retrieval instead of full-corpus prompting.

---

## Key Takeaways

- RAG means grounding generation with external knowledge retrieval.
- "Put all files in one prompt" is a valid toy baseline, not a production design.
- Cost and context-window constraints force a retrieval-first architecture.
- Next step is making this flow scalable for large file ingestion and query-time retrieval.
