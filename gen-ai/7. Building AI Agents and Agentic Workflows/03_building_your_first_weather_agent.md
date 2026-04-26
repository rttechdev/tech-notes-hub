# Building Your First Weather Agent

## Objective

Build a weather assistant that can answer real-time weather questions by calling an external API through tools.

---

## Step 1: Baseline LLM Call (Not an Agent Yet)

Start with a basic OpenAI chat completion:

```python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

user_query = input("> ")

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": user_query}
    ]
)

print(f"🤖: {response.choices[0].message.content}")
```

Limitation:

- model can give generic weather info
- model cannot fetch live weather by itself

---

## Step 2: Add a Real Weather Tool

Create a function that calls a live weather endpoint:

```python
import requests

def get_weather(city: str):
    url = f"https://wttr.in/{city.lower()}?format=%C+%t"
    response = requests.get(url)

    if response.status_code == 200:
        return f"The weather in {city} is {response.text}"

    return "Something went wrong"
```

This provides real-time data from outside model training data.

---

## Step 3: Convert It to an Agent Loop

Use structured step outputs (`START`, `PLAN`, `TOOL`, `OBSERVE`, `OUTPUT`) and allow tool execution.

### Core tool wiring

```python
available_tools = {
    "get_weather": get_weather,
    "run_command": run_command,
}
```

### Tool execution block

```python
if parsed_result.step == "TOOL":
    tool_to_call = parsed_result.tool
    tool_input = parsed_result.input
    tool_response = available_tools[tool_to_call](tool_input)

    message_history.append({
        "role": "developer",
        "content": json.dumps({
            "step": "OBSERVE",
            "tool": tool_to_call,
            "input": tool_input,
            "output": tool_response,
        })
    })
    continue
```

This is the key bridge from reasoning to action.

---

## Why This Is an Agent

The system now does more than text generation:

1. understands user intent
2. plans intermediate steps
3. decides to call a tool
4. executes real API call
5. observes tool output
6. returns final answer

This is exactly: **LLM + tools = agent behavior**.

---

## Multi-City Behavior

With iterative planning/tool-calling, the agent can handle complex prompts like:

- weather of Delhi and Bangalore
- weather for multiple cities in one query

It can call the same tool multiple times before final output.

---

## Key Takeaways

- Plain chat completion is not enough for real-time tasks.
- Adding callable tools gives the model action capability.
- Structured loop (`PLAN`/`TOOL`/`OBSERVE`/`OUTPUT`) makes behavior transparent.
- Your first weather agent is the template for more advanced agents with more tools.
