# LangGraph Checkpointing – Persistent State

## The Problem: State is Not Persistent

By default, when a LangGraph graph finishes execution, the state is **deleted from memory**.

### Example

```python
# Run 1: tell the agent your name
graph.invoke({"messages": ["Hi, my name is Roshan."]})
# → AI responds: "Hello Roshan, how can I assist you today?"

# Run 2: ask the agent your name (new invocation)
graph.invoke({"messages": ["What is my name?"]})
# → AI responds: "I don't know your name based on the current conversation."
```

Each `invoke()` starts with a **fresh state**. The agent has no memory of previous runs.

This is a problem for any real-world chatbot or agent that needs conversation continuity.

---

## The Solution: Checkpointing

**Checkpointing** is a mechanism that saves the graph state to a persistent store after each node execution. When you resume a conversation (using the same thread ID), LangGraph loads the saved state and continues from where it left off.

This will be covered in the next section.
