# Setting Up Neo4j Aura (Cloud Instance)

## Why Cloud Over Local?

Neo4j is resource-heavy. Running it locally is difficult. The recommended approach is to use the managed cloud version: **Neo4j Aura**.

---

## Setup Steps

1. Go to: https://neo4j.com/cloud/aura-login
2. Sign up / log in (Google account works)
3. Click **Create Instance** → choose **Free ($0)** tier
4. A password is auto-generated — **copy it immediately**, it won't be shown again
5. Click **Download & Continue** — saves a credentials file
6. Wait for the instance to spin up (takes ~1–2 minutes)
7. Click **Connect** to open the query console

---

## Credentials to Save

Store these in your `.env` file right away:

```env
NEO4J_URI=neo4j+s://<your-instance-id>.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_copied_password
```

> Username is always `neo4j` for Aura free tier.

---

## What You See After Connecting

- **Nodes**: 0 (empty database)
- **Relationships**: 0
- A query console ready to accept **Cypher queries**

---

## Key Takeaways

- Neo4j Aura cloud is free and easier than self-hosting
- Credentials (especially password) are shown only once — save them immediately
- Neo4j uses **Cypher query language** to interact with the graph (covered next)
- You don't need to be a Cypher expert — AI can help generate queries
