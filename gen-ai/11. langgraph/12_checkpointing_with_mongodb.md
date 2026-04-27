# LangGraph Checkpointing with MongoDB

## Installation

```bash
pip install pymongo langgraph-checkpoint-mongodb
```

---

## How Checkpointing Works

When a checkpointer is attached to a compiled graph:
- The graph state is **saved to MongoDB after each node** execution
- State is scoped to a **thread ID** — each user/session has its own isolated history
- On the next `invoke()` with the same thread ID, the graph **loads the previous state** and continues from it

---

## Connection String

```
mongodb://admin:admin@localhost:27017
```

(Username and password set in the Docker Compose `environment` block)

---

## Implementation

```python
from typing import Annotated
from typing_extensions import TypedDict
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.mongodb import MongoDBSaver

load_dotenv()

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm = init_chat_model("gpt-4.1-mini", model_provider="openai")

def chatbot(state: State):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", END)

def compile_graph(checkpointer):
    return graph_builder.compile(checkpointer=checkpointer)

# Thread-scoped config — use user ID as thread_id in production
config = {"configurable": {"thread_id": "piyush"}}

MONGO_URI = "mongodb://admin:admin@localhost:27017"

with MongoDBSaver.from_conn_string(MONGO_URI) as checkpointer:
    graph = compile_graph(checkpointer)

    # Stream the graph (cleaner output than invoke)
    for chunk in graph.stream(
        {"messages": ["What is my name?"]},
        config,
        stream_mode="values"
    ):
        chunk["messages"][-1].pretty_print()
```

> **Important:** Keep all `graph.invoke()` / `graph.stream()` calls **inside** the `with` block. Calling the graph after the `with` block closes the MongoDB connection and raises an error.

---

## Streaming vs Invoking

| Method | Returns | Use for |
|---|---|---|
| `graph.invoke(state, config)` | Full final state dict | Simple runs |
| `graph.stream(state, config, stream_mode="values")` | Chunks of state as they update | Readable output, real-time display |

### Streaming output pattern

```python
for chunk in graph.stream(input_state, config, stream_mode="values"):
    chunk["messages"][-1].pretty_print()
```

---

## Thread ID Scoping

State is **isolated per thread ID**. Different thread IDs = completely separate conversation histories.

```python
# Piyush's session
config = {"configurable": {"thread_id": "piyush"}}
# → remembers Piyush's conversation history

# John's session
config = {"configurable": {"thread_id": "john"}}
# → separate history, no access to Piyush's messages
```

In production, use the **user's ID** as the `thread_id` to prevent conversations from mixing.

---

## Key Points

- Without a checkpointer, state is lost after each `invoke()` call
- `MongoDBSaver` persists state snapshots to MongoDB after every node
- Always use a `with` block to manage the MongoDB connection lifecycle
- `thread_id` is the key to scoping state — treat it as a user session ID
- Switching `thread_id` gives a completely fresh conversation with no prior history
