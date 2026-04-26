# Why Graph Memory? The Problem with Vector Embeddings

## What Vector DBs Do Well

Vector embeddings can store facts like:
- "Your name is John"
- "You like pizza"
- "You work at company X"

These are retrieved via semantic similarity search.

---

## What Vector DBs Miss: Relationships

Vector embeddings store **isolated facts**. They cannot represent or traverse **relationships between entities**.

### Example

Imagine this data:

```
Company X  ──(employs)──>  John
Company X  ──(employs)──>  Jane
Alex       ──(owns)──>     Company X
```

With vectors, you store three separate facts. But you **cannot automatically infer**:
- John and Jane are co-workers
- Jane's owner/boss is Alex
- Alex is indirectly connected to John and Jane

---

## What a Knowledge Graph Adds

A knowledge graph stores the **same data as connected nodes with typed edges**:

```
[Alex] ──(owns)──> [Company X] ──(employs)──> [John]
                                 ──(employs)──> [Jane]
```

Now you can **traverse** the graph to answer relational questions:

| Question | Graph Traversal Answer |
|----------|----------------------|
| Who are John's co-workers? | Company X employs → find other employees → Jane |
| Who is Jane's boss? | Jane employed by Company X → owned by Alex |
| What do John and Jane have in common? | Both nodes connect through Company X |

---

## Indirect Relationships

Graph memory also captures **indirect relationships** that vectors miss entirely.

Example:
- If you like A, and A is related to B and C → you might also like B and C
- Vectors treat A, B, C as separate items; a graph exposes the chain

---

## Vector DB vs Knowledge Graph

| Feature | Vector DB | Knowledge Graph |
|---------|-----------|-----------------|
| Store facts | ✅ | ✅ |
| Semantic similarity search | ✅ | ✅ (via embeddings on nodes) |
| Store relationships | ❌ | ✅ |
| Traverse connections | ❌ | ✅ |
| Infer indirect relations | ❌ | ✅ |

---

## Key Takeaways

- Vector embeddings store isolated facts; graphs store facts **and** their relationships
- Knowledge graphs let you traverse connections to answer relational queries
- Indirect relationships (friends-of-friends, co-workers, ownership chains) are only discoverable via graphs
- Best practice: use **both** — vector memory for semantic recall, graph memory for relationship reasoning
