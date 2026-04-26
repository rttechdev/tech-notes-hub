# Vector Database Setup with QuadrantDB

## Objective

Set up the infrastructure foundation for RAG: a local vector database using QuadrantDB and Docker.

---

## Vector Database Options

Several vector databases exist in the market:

| Database | Type | Use Case |
|---|---|---|
| Pinecone | Managed cloud service | Hosted, fully managed |
| Weaviate | Open-source | Self-hosted flexibility |
| Chroma DB | Open-source | Lightweight, local |
| PGVector | PostgreSQL extension | SQL-integrated |
| QuadrantDB | Open-source | Fast, lightweight, easy setup |

---

## Why QuadrantDB?

Chosen for this course because:

- easy local setup via Docker
- lightweight and fast
- good balance of simplicity and performance
- knowledge is transferable to other vector DBs

All vector databases follow similar patterns, so learning one transfers well.

---

## Prerequisites

Docker must be installed and running:

- Docker Desktop (Windows/macOS)
- Docker Engine (Linux)
- Docker must be in running state before starting containers

---

## Docker Compose Configuration

Create `docker-compose.yml`:

```yaml
services:
  vector_database:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
```

Key details:

- service name: `vector_database`
- image: `qdrant/qdrant:latest` (official QuadrantDB image)
- exposes port `6333` (QuadrantDB default API port)

---

## Start QuadrantDB

```bash
cd rag
docker compose up
```

Initial run downloads the image, which takes time.

To run in background (detached mode):

```bash
docker compose up -d
```

Flag `-d` frees up terminal while container runs in background.

---

## Verify Setup

Check Docker Desktop UI:

- container should show as running
- port 6333 should be exposed
- logs show successful startup

Once running:

- QuadrantDB API is available at `http://localhost:6333`
- ready for Python client connection in next phase

---

## Key Takeaways

- Vector DB is essential infrastructure for RAG systems.
- QuadrantDB offers ease of setup without sacrificing performance.
- Docker provides platform-agnostic local deployment.
- Port 6333 is the standard QuadrantDB API endpoint.
