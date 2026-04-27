# LangGraph Edges – Connecting Nodes & Compiling the Graph

## Special Edge Markers

LangGraph has two special built-in markers you always need:

```python
from langgraph.graph import StateGraph, START, END
```

- `START` — entry point of the graph (where execution begins)
- `END` — exit point of the graph (where execution stops)

---

## Adding Edges

Use `graph_builder.add_edge(from_node, to_node)` to connect nodes:

```python
graph_builder.add_edge(START, "chatbot")       # start → chatbot
graph_builder.add_edge("chatbot", "sample_node")  # chatbot → sample_node
graph_builder.add_edge("sample_node", END)     # sample_node → end
```

### Resulting Flow

```
START → chatbot → sample_node → END
```

3 edges, 2 nodes — execution follows this exact sequence.

---

## Compiling the Graph

Once all nodes and edges are registered, compile the graph:

```python
graph = graph_builder.compile()
```

The compiled `graph` is ready to invoke.

---

## Full Example (So Far)

```python
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

# State
class State(TypedDict):
    messages: Annotated[list, add_messages]

# Nodes
def chatbot(state: State):
    print("Inside chatbot node. State:", state)
    return {"messages": ["Hi, this is a message from the chatbot node."]}

def sample_node(state: State):
    print("Inside sample_node. State:", state)
    return {"messages": ["Sample message appended."]}

# Graph
graph_builder = StateGraph(State)

graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("sample_node", sample_node)

graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", "sample_node")
graph_builder.add_edge("sample_node", END)

graph = graph_builder.compile()
```

---

## Key Points

- Every graph needs exactly one `START` edge and at least one `END` edge
- Edge order defines execution sequence
- `compile()` locks in the graph structure and makes it executable
- After compiling, call `graph.invoke(initial_state)` to run the workflow
