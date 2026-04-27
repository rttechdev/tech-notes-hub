# Integrating an LLM into a LangGraph Node

## Setup

Install and load environment variables:

```python
from dotenv import load_dotenv
load_dotenv()
```

Copy your `.env` file into your `langgraph_learning/` folder so the OpenAI API key is available.

---

## Creating the LLM

Use LangChain's `init_chat_model` utility:

```python
from langchain.chat_models import init_chat_model

llm = init_chat_model("gpt-4.1-mini", model_provider="openai")
```

You can also use the OpenAI SDK directly (`client.chat.completions.create`), but `init_chat_model` integrates cleanly with LangGraph's message format.

---

## Using the LLM Inside a Node

Replace the static message with an actual LLM call:

```python
def chatbot(state: State):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}
```

- `state["messages"]` passes the full conversation history to the LLM
- The LLM returns an `AIMessage` object
- Returning it inside a list lets `add_messages` append it to the state

---

## Full Example

```python
from typing import Annotated
from typing_extensions import TypedDict
from dotenv import load_dotenv
from langchain.chat_models import init_chat_model
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages

load_dotenv()

class State(TypedDict):
    messages: Annotated[list, add_messages]

llm = init_chat_model("gpt-4.1-mini", model_provider="openai")

def chatbot(state: State):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

def sample_node(state: State):
    return {"messages": ["Sample message appended."]}

graph_builder = StateGraph(State)
graph_builder.add_node("chatbot", chatbot)
graph_builder.add_node("sample_node", sample_node)
graph_builder.add_edge(START, "chatbot")
graph_builder.add_edge("chatbot", "sample_node")
graph_builder.add_edge("sample_node", END)

graph = graph_builder.compile()

updated_state = graph.invoke({"messages": ["Hi, my name is Roshan Tiwari."]})
print("\nUpdated state:", updated_state)
```

---

## Example Output

```
Updated state: {
    "messages": [
        HumanMessage(content="Hi, my name is Roshan Tiwari."),
        AIMessage(content="Hello Roshan Tiwari, how can I assist you today?", ...),
        "Sample message appended."
    ]
}
```

The `AIMessage` object includes:
- `content` — the actual text response
- Token usage metadata (prompt tokens, completion tokens, cost)

---

## Key Points

- `llm.invoke(messages)` takes the full message list — the LLM sees the whole conversation history
- The response is an `AIMessage` object, not a plain string
- All LangChain message types (`HumanMessage`, `AIMessage`) work seamlessly with `add_messages`
- Token usage and cost metadata are included in the response object as extra fields
