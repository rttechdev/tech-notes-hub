# Structured Outputs for Reliable Agents

## Objective

Fix the major reliability bug in agent loops: depending on raw JSON-like strings from LLM output.

---

## The Bug in String-Based Parsing

If you only instruct the model to output JSON and then do `json.loads(...)`, you are still trusting free-form text.

Possible failure case:

- model returns extra text like: `Sure, here is your result ... { ... }`
- parser fails
- agent loop breaks

So prompt-only JSON discipline is not enough for robust agent execution.

---

## Structured Output Approach

Use:

- `pydantic` schema for output shape
- OpenAI parse API (`chat.completions.parse`)
- typed access via `.parsed` instead of manual dictionary/string parsing

Install requirement:

```bash
pip install pydantic
```

---

## Define Schema

```python
from pydantic import BaseModel, Field
from typing import Optional

class MyOutputFormat(BaseModel):
    step: str = Field(..., description="The ID of the step. Example: PLAN, OUTPUT, TOOL, etc")
    content: Optional[str] = Field(None, description="The optional string content for the step")
    tool: Optional[str] = Field(None, description="The ID of the tool to call.")
    input: Optional[str] = Field(None, description="The input params for the tool")
```

---

## Use Parse API Instead of Create API

```python
response = client.chat.completions.parse(
    model="gpt-4o",
    response_format=MyOutputFormat,
    messages=message_history,
)

parsed_result = response.choices[0].message.parsed
```

Now you can directly use:

- `parsed_result.step`
- `parsed_result.content`
- `parsed_result.tool`
- `parsed_result.input`

No `json.loads` needed for model output parsing.

---

## Tool Execution with Typed Fields

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

---

## Why This Is Better

- stronger format reliability
- typed field access
- fewer runtime parse failures
- clearer contract between prompt and execution loop

This makes the agent loop less error-prone and production-friendlier.

---

## Key Takeaways

- Prompting for JSON is useful but not fully safe alone.
- Structured outputs + schema validation improve stability.
- `parse` + `.parsed` is cleaner than manual JSON parsing.
- This is the preferred pattern for future agents in the course.
