# Connecting Neo4j to Python Memory Config

## Goal

Add Neo4j as a graph-backed memory layer in Python, alongside your existing vector store setup.

---

## 1. Get Neo4j Connection Details

From Neo4j Aura, copy:

- connection URI
- username
- password

Typical URI format:

```text
neo4j+s://<instance-id>.databases.neo4j.io
```

---

## 2. Save Credentials in .env

Prefer environment variables over hardcoding:

```env
NEO4J_URI=neo4j+s://<instance-id>.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_password
```

---

## 3. Add Graph Store to Memory Configuration

If your app already has vector-store memory config, add graph-store config in the same setup.

```python
import os
from dotenv import load_dotenv

load_dotenv()

memory_config = {
    "vector_store": {
        # your existing vector store config
    },
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": os.getenv("NEO4J_URI"),
            "username": os.getenv("NEO4J_USERNAME", "neo4j"),
            "password": os.getenv("NEO4J_PASSWORD"),
        },
    },
}
```

This enables memory systems to store and query relationship-aware data in a graph database.

---

## 4. Quick Validation Checklist

- Neo4j Aura instance is running
- URI starts with `neo4j+s://`
- Credentials are loaded correctly from `.env`
- Graph provider is set to `neo4j`

---

## Why This Matters

Vector memory is great for semantic similarity.
Graph memory is great for connected facts and relationships.
Using both gives your AI agent stronger long-term memory behavior.

---

## Key Takeaways

- Copy Aura connection URI, username, password
- Keep secrets in `.env`
- Add `graph_store` with provider `neo4j` in memory config
- Keep vector + graph memory together for better agent memory performance
