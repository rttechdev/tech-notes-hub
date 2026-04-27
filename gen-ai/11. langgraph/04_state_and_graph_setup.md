# Building a Basic Chatbot with LangGraph – State & Graph Setup

## Project Structure

Create a new folder `langgraph_learning/` with a `chat.py` file inside.

---

## Step 1: Define the State

The state is a `TypedDict` that holds data passed between all nodes.

For a chatbot, the state holds a **list of messages** that keeps growing as the conversation progresses.

```python
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages

class State(TypedDict):
    messages: Annotated[list, add_messages]
```

### Why `Annotated` with `add_messages`?

- `messages` is a list
- The `add_messages` annotation tells LangGraph: **always append** new messages to the list instead of replacing it
- So the conversation history accumulates: `[user_msg, agent_msg, user_msg, agent_msg, ...]`

Without the annotation, each node returning messages would overwrite the previous ones.

---

## Step 2: Create the Graph Builder

Use `StateGraph` from LangGraph and pass your state schema to it:

```python
from langgraph.graph import StateGraph

graph_builder = StateGraph(State)
```

`graph_builder` is now ready to accept nodes and edges.

---

## What's Next

In the following steps we will:
1. Define **node functions** (e.g. the chatbot LLM call)
2. Add those nodes to `graph_builder`
3. Connect them with **edges**
4. Compile and **run** the graph
