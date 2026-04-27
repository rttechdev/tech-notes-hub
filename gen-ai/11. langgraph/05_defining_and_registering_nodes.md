# LangGraph Nodes – Defining and Registering

## What is a Node?

A node is just a **Python function** that:
- Receives the current **state** as input
- Performs a task
- Returns an **updated (partial) state**

---

## Defining a Node

```python
def chatbot(state: State):
    return {
        "messages": ["Hi, this is a message from the chatbot node."]
    }
```

- The function receives the full current `state`
- It returns a **dict with the keys to update** — not the full state
- Because `messages` uses the `add_messages` annotation, the returned list gets **appended** to the existing messages list

### How State Updates Work

```
Initial state:   { "messages": ["Hey there"] }
                         ↓ chatbot node runs
Returned:        { "messages": ["Hi, this is a message from the chatbot node."] }
                         ↓ add_messages annotation appends
Final state:     { "messages": ["Hey there", "Hi, this is a message from the chatbot node."] }
```

---

## Registering Nodes with the Graph Builder

The graph builder doesn't know about your functions until you register them:

```python
graph_builder.add_node("chatbot", chatbot)
```

- First argument: the **name** of the node (used when adding edges)
- Second argument: the **function** to run

Best practice: name the node the same as the function.

### Registering Multiple Nodes

```python
def sample_node(state: State):
    return {
        "messages": ["Sample message appended."]
    }

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("sample_node", sample_node)
```

Your graph now has **two registered nodes**.

---

## Key Points

- Nodes do **not** need to return the full state — only the keys they want to update
- The `add_messages` annotation handles list merging automatically
- Nodes are just regular Python functions — you can call APIs, tools, databases, etc. inside them
- Always register nodes with `graph_builder.add_node()` before adding edges
