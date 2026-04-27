# Cypher Query Basics in Neo4j

## What Is Cypher?

**Cypher** is Neo4j's query language. You use it to:

- create nodes
- create relationships
- match existing nodes
- return graph data
- delete incorrect nodes

You do not need to memorize all of it. LLMs are usually good at generating Cypher queries from plain English.

---

## 1. Create Nodes

Create a `User` node:

```cypher
CREATE (u:User {name: "Roshan"})
RETURN u
```

Create more users:

```cypher
CREATE (u:User {name: "Alex"}) RETURN u
CREATE (u:User {name: "John"}) RETURN u
CREATE (u:User {name: "Jane"}) RETURN u
```

Create a company:

```cypher
CREATE (c:Company {name: "Google"})
RETURN c
```

At this point, nodes exist but are not connected.

---

## 2. Return All Nodes

To fetch every node in the graph:

```cypher
MATCH (n)
RETURN n
```

This is useful for checking what currently exists in the database.

---

## 3. Match an Existing Node

Find a specific user:

```cypher
MATCH (u:User {name: "Roshan"})
RETURN u
```

This is an important pattern: first match the node you want, then create or merge relationships around it.

---

## 4. Create Relationships

Connect a user to a company with an `EMPLOYEE_OF` relationship:

```cypher
MATCH (u:User {name: "Roshan"})
MATCH (c:Company {name: "Google"})
MERGE (u)-[:EMPLOYEE_OF]->(c)
```

Do the same for other users:

```cypher
MATCH (u:User {name: "John"})
MATCH (c:Company {name: "Google"})
MERGE (u)-[:EMPLOYEE_OF]->(c)

MATCH (u:User {name: "Jane"})
MATCH (c:Company {name: "Google"})
MERGE (u)-[:EMPLOYEE_OF]->(c)

MATCH (u:User {name: "Alex"})
MATCH (c:Company {name: "Google"})
MERGE (u)-[:EMPLOYEE_OF]->(c)
```

Now all users point to the same company node.

---

## 5. Query Relationships

Return users and the companies they work for:

```cypher
MATCH (u:User)-[:EMPLOYEE_OF]->(c:Company)
RETURN u, c
```

This is where graph databases become useful: you are querying both entities and their relationships.

---

## Common Mistake: Duplicate Company Nodes

If you repeatedly use `CREATE` for the company, Neo4j will create multiple `Google` nodes.

Wrong pattern:

```cypher
CREATE (c:Company {name: "Google"})
```

If run multiple times, you get duplicate company nodes.

Better pattern:

```cypher
MATCH (u:User {name: "Roshan"})
MATCH (c:Company {name: "Google"})
MERGE (u)-[:EMPLOYEE_OF]->(c)
```

This ensures the relationship points to an existing company node instead of creating a new one each time.

---

## Deleting Incorrect Nodes

If duplicates were created, you can delete them using `elementId()`:

```cypher
MATCH (n)
WHERE elementId(n) = "<element-id>"
DELETE n
```

`id()` is deprecated in modern Neo4j usage. Prefer `elementId()`.

---

## Practical Point

In real AI-agent systems, you usually do not write all Cypher manually. Instead:

1. you describe the relationship in natural language
2. the LLM generates Cypher
3. Neo4j stores the graph
4. later queries fetch the connected data back

So the important part is understanding what Cypher is doing, not memorizing every syntax detail.

---

## Key Takeaways

- `CREATE` adds new nodes
- `MATCH` finds existing nodes
- `MERGE` is useful for creating relationships safely
- Graph value comes from relationships, not isolated nodes
- Repeated `CREATE` can introduce duplicate entities
- Use `elementId()` when deleting a specific node
