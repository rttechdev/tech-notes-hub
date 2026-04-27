# LangGraph Conditional Edges

## What are Conditional Edges?

A **conditional edge** is a branching point in the graph — instead of always going to one fixed next node, the graph decides **at runtime** which node to go to next, based on some condition.

```
chatbot → [evaluate_response] → end_node
                              ↘ chatbot_gemini → end_node
```

---

## The Workflow We're Building

1. Take user query
2. Call GPT-4.1-mini (`chatbot` node)
3. Evaluate the output (`evaluate_response` — conditional edge function)
   - If output is **good** → go to `end_node`
   - If output is **not good** → go to `chatbot_gemini` node, then `end_node`

---

## State Definition

```python
from typing import Optional
from typing_extensions import TypedDict

class State(TypedDict):
    user_query: str
    llm_output: Optional[str]
    is_good: Optional[bool]
```

---

## Nodes

### chatbot node (OpenAI)

```python
from openai import OpenAI

def chatbot(state: State):
    print("Chatbot node. State:", state)
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": state.get("user_query")}]
    )
    return {"llm_output": response.choices[0].message.content}
```

### chatbot_gemini node (fallback)

```python
def chatbot_gemini(state: State):
    print("Chatbot Gemini node. State:", state)
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-4.1",  # bigger/different model as fallback
        messages=[{"role": "user", "content": state.get("user_query")}]
    )
    return {"llm_output": response.choices[0].message.content}
```

### end_node

```python
def end_node(state: State):
    print("End node. State:", state)
    return state
```

---

## Conditional Edge Function

This is **not** a node — it's a routing function that returns the **name of the next node** as a string.

```python
from typing import Literal

def evaluate_response(state: State) -> Literal["end_node", "chatbot_gemini"]:
    print("Evaluate node. State:", state)
    is_good = True  # hardcoded for now — replace with actual LLM evaluation

    if is_good:
        return "end_node"
    else:
        return "chatbot_gemini"
```

> **Key:** The return type must be `Literal[...]` listing all possible node names it can route to.

---

## Building the Graph

```python
from langgraph.graph import StateGraph, START, END

graph_builder = StateGraph(State)

# Register nodes
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("chatbot_gemini", chatbot_gemini)
graph_builder.add_node("end_node", end_node)

# Regular edges
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", "evaluate_response")   # goes to the conditional
graph_builder.add_edge("chatbot_gemini", "end_node")
graph_builder.add_edge("end_node", END)

# Conditional edge — from chatbot, use evaluate_response to decide next node
graph_builder.add_conditional_edges("chatbot", evaluate_response)

graph = graph_builder.compile()
```

> **Note:** `add_conditional_edges(source_node, routing_function)` — the routing function receives the state and returns the name of the next node.

---

## Invoking

```python
updated_state = graph.invoke({"user_query": "What is 2 + 2?"})
print("Updated state:", updated_state)
```

### Flow when `is_good = True`:
```
chatbot → evaluate_response → end_node → END
```

### Flow when `is_good = False`:
```
chatbot → evaluate_response → chatbot_gemini → end_node → END
```

---

## Homework

Replace the hardcoded `is_good = True` in `evaluate_response` with an actual LLM call that evaluates whether `state["llm_output"]` is a good response or not.

---

## Key Points

| Concept | Description |
|---|---|
| `add_conditional_edges` | Adds a branching edge driven by a routing function |
| Routing function | Receives state, returns the name of the next node as a string |
| `Literal[...]` return type | Documents all possible routing destinations |
| Regular nodes | Do work and return updated state |
| Routing function | Does **not** update state — only decides where to go next |
