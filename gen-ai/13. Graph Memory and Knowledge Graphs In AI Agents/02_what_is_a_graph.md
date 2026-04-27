# What is a Graph? (Data Structure Refresher)

## Core Definition

A **graph** is a data structure consisting of:
- **Nodes** — entities that carry data
- **Edges** — connections/relationships between nodes

```
[Node A] ── edge ── [Node B] ── edge ── [Node C]
```

A graph represents **relationships and flow** between data points.

---

## Nodes and Edges

| Term | Meaning | Example |
|------|---------|---------|
| Node | An entity holding data | A person, a concept, a place |
| Edge | A connection between two nodes | A relationship between two people |

Example:
```
Node A ──(relation X)──> Node B

"A is related to B via X"
```

---

## Two Types of Graphs

### 1. Directed Graph

Edges have a **direction** (arrow). The relationship is one-way.

```
[A] ──(parent of)──> [B]
```

- A is parent of B
- B is **not** parent of A
- The relationship only goes one way

### 2. Undirected Graph

Edges have **no direction**. The relationship is mutual.

```
[A] ──(friends)── [B]
```

- A is friends with B
- B is also friends with A
- Like a Facebook friend request — both become friends equally

---

## Key Takeaways

- Graph = nodes + edges
- Nodes hold data; edges define relationships
- **Directed graph**: one-way relationship (e.g., parent-child)
- **Undirected graph**: mutual relationship (e.g., friendship)
- Graphs are ideal for representing **connected, relational data**
- Next: applying graph structure to AI agent memory (knowledge graphs)
