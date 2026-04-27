# LangGraph Core Concepts – Nodes, Edges & State

## Installation

```bash
pip install -U langgraph
```

Freeze dependencies:

```bash
pip freeze > requirements.txt
```

> It is assumed you already have `langchain` and related packages installed.

## Pre-built Agent (Quick Start)

LangGraph ships with pre-built agents you can use immediately:

```python
from langgraph.prebuilt import create_react_agent

agent = create_react_agent(model=model, tools=tools, prompt=prompt)
```

---

## Core Concepts

### 1. Nodes

Nodes are just **Python functions**. Each node represents one step in your workflow.

Examples:
- A function that reads user input
- A function that calls a tool
- A function that makes an OpenAI API call
- A function that saves something to a database

```python
def get_user_input(state):
    ...

def call_tool(state):
    ...

def call_llm(state):
    ...
```

### 2. Edges

Edges are the **connections between nodes**. They define the flow of execution — which node runs after which.

```
Node A → Node B → Node C → Node D
```

4 nodes, 3 edges (or 4 including the entry edge).

### 3. State

State is a **shared data object** passed through the entire graph. Every node receives the current state, can read it, modify it, and returns an updated state.

```python
from typing import TypedDict

class MyState(TypedDict):
    input: str
    output: str
```

---

## How Execution Works

1. You define a state with your initial data (e.g. user query)
2. The graph starts execution — state flows into the first node
3. Each node:
   - Receives the current state
   - Performs its task
   - Returns an updated state
4. The updated state is passed to the next node
5. When all nodes finish, you get the **final state** back

### Example State Flow

```
Initial State: { input: "1" }
    ↓ Node A  → State: { input: "2" }
    ↓ Node B  → State: { input: "3" }
    ↓ Node C  → State: { input: "4" }
    ↓ Node D  → State: { input: "4" }  ← final state returned
```

### Invoking a Graph

```python
final_state = graph.invoke(initial_state)
```

You pass in the initial state, and get the fully updated final state back once execution completes.

---

## Summary

| Concept | What it is |
|---|---|
| **Node** | A Python function — one step in the workflow |
| **Edge** | A connection between two nodes — defines flow |
| **State** | A shared data object passed through all nodes |
| **Graph** | The full assembled workflow of nodes + edges |
| **invoke()** | Runs the graph from start to finish, returns final state |
