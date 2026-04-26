# Automating Chain-of-Thought Prompting

## Problem in Manual CoT Flow

In manual CoT, you repeatedly copy assistant step outputs back into message history.
That is slow and error-prone.

Goal: automate the loop.

---

## Automation Strategy

Use a `message_history` array and run a loop until final output is reached.

High-level flow:

1. initialize `message_history` with system prompt
2. take user input
3. append user message
4. call model in loop
5. parse JSON step response
6. append assistant response to history
7. continue until `step == "output"`

---

## Core Structure

```python
import json

message_history = [
    {"role": "system", "content": system_prompt}
]

user_query = input("Type something: ")
message_history.append({"role": "user", "content": user_query})

while True:
    response = client.chat.completions.create(
        model=model_name,
        response_format={"type": "json_object"},
        messages=message_history,
    )

    raw_result = response.choices[0].message.content
    message_history.append({"role": "assistant", "content": raw_result})

    try:
        parsed_result = json.loads(raw_result)
    except json.JSONDecodeError:
        print("[ERROR] Model returned non-JSON output")
        break

    step = parsed_result.get("step")
    content = parsed_result.get("content")

    if step == "start":
        print("[START]", content)
        continue

    if step == "plan":
        print("[PLAN]", content)
        continue

    if step == "output":
        print("[OUTPUT]", content)
        break
```

---

## Why This Works

- CoT remains multi-step (`start -> plan* -> output`)
- history grows automatically
- no manual copy/paste between turns
- final result is emitted only when output step arrives

---

## Debugging Notes from the Run

Observed issue:

- JSON decode error in one run (provider/response inconsistency)

Practical fixes used:

1. enforce JSON output mode
2. verify model name and API key
3. rerun with a model/provider giving stable JSON responses

In the demo flow, switching to a stable OpenAI setup resolved the loop.

---

## Practical Benefit

Automated CoT improves output quality because the model is forced to think in steps before final answer generation.

This is useful for:

- math reasoning
- coding task planning
- multi-step problem solving

---

## Key Takeaways

- manual CoT is useful for learning, but automation is required in real apps
- `message_history` + loop is the core pattern
- parse stepwise JSON and break only on `output`
- robust provider/model config is important for stable structured responses
