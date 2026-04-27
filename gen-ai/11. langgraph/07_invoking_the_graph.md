# Invoking a LangGraph Graph

## Running the Graph

Call `graph.invoke()` and pass the **initial state**:

```python
updated_state = graph.invoke({
    "messages": ["Hi, my name is Roshan Tiwari."]
})

print("Updated state:", updated_state)
```

- Pass the initial state as a dict matching your `State` schema
- The return value is the **final updated state** after all nodes have run

---

## What Happens During Execution

Given this graph: `START → chatbot → sample_node → END`

### Initial state (passed to `invoke`):
```
messages: ["Hi, my name is Roshan Tiwari."]
```

### After `chatbot` node runs:
```
messages: [
    "Hi, my name is Roshan Tiwari.",
    "Hi, this is a message from the chatbot node."
]
```

### After `sample_node` runs:
```
messages: [
    "Hi, my name is Roshan Tiwari.",
    "Hi, this is a message from the chatbot node.",
    "Sample message appended."
]
```

### Final returned state:
```python
{
    "messages": [
        "Hi, my name is Roshan Tiwari.",
        "Hi, this is a message from the chatbot node.",
        "Sample message appended."
    ]
}
```

Each node **appended** its message to the list (thanks to `add_messages`), so the full history is preserved.

---

## Full Runnable Example

```python
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

class State(TypedDict):
    messages: Annotated[list, add_messages]

def chatbot(state: State):
    print("\nInside chatbot node. State:", state)
    return {"messages": ["Hi, this is a message from the chatbot node."]}

def sample_node(state: State):
    print("\nInside sample_node. State:", state)
    return {"messages": ["Sample message appended."]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("sample_node", sample_node)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", "sample_node")
graph_builder.add_edge("sample_node", END)

graph = graph_builder.compile()

updated_state = graph.invoke({"messages": ["Hi, my name is Roshan Tiwari."]})
print("\nFinal updated state:", updated_state)
```

---

## Key Points

- `invoke()` is synchronous — it runs the full graph and returns the final state
- Each node only sees the state **as it is at that point** in the graph
- The final returned state reflects all changes made by every node in sequence
- `add_messages` ensures messages accumulate — no data is lost between nodes
