# Setting Up MongoDB for LangGraph Checkpointing

## What is a Checkpoint?

A **checkpoint** is a snapshot of the graph state saved at each step. LangGraph can persist these snapshots to a database so state survives across separate `invoke()` calls and application restarts.

For this implementation, we use **MongoDB** as the checkpoint store.

---

## Docker Compose Setup

Create a `docker-compose.yml` file inside your `langgraph_learning/` folder:

```yaml
services:
  mongodb:
    image: mongo
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: admin
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

- MongoDB runs on port **27017**
- Username: `admin`, Password: `admin`
- Data is persisted via a named Docker volume (`mongodb_data`)

---

## Starting MongoDB

Make sure Docker Desktop (Docker daemon) is running, then:

```bash
docker compose up -d
```

### Verify it's running

```bash
docker ps
```

You should see a container using the `mongo` image running on port `27017`.

You can also confirm in Docker Desktop under the container list.

---

## What's Next

With MongoDB running, the next step is to configure LangGraph to use it as a **checkpointer** — so state is saved to MongoDB after each node and can be restored when resuming a conversation by thread ID.
