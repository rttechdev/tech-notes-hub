# Graph Databases Overview

## What is a Graph Database?

A specialized database designed to store and query **nodes and relationships (edges)** efficiently — purpose-built for graph data structures.

---

## Options

| Database | Notes |
|----------|-------|
| **Neo4j** | Industry standard, very popular, highly scalable, self-hostable |
| **KuzuDB** | Newer, limited community support, not yet widely adopted in production |

---

## Neo4j — The Choice for This Course

- Most widely used graph database in the industry
- Supports self-hosting (used here via Docker)
- Stores entities as nodes and relationships as typed edges
- Example: `(Person)-[:ACTED_IN]->(Movie)`

---

## Key Takeaways

- Graph databases are purpose-built to store relational/connected data
- Neo4j is the industry standard; this course uses Neo4j
- KuzuDB exists but has limited support as of now
- Next: setting up Neo4j to store agent memory as a knowledge graph
