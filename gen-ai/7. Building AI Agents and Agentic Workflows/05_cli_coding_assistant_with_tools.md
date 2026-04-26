# CLI Coding Assistant with Tools

## Objective

Turn the weather-agent pattern into a CLI coding assistant that can create and modify projects by executing terminal commands.

---

## Core Idea

If an agent can call a generic command tool, it can perform file-system operations like:

- create folder
- create files
- write content
- update styles/scripts
- iterate from user feedback

This is the same base behavior used by coding assistants: plan -> execute -> observe -> refine.

---

## Minimal Command Tool

```python
import os

def run_command(cmd: str):
    result = os.system(cmd)
    return result
```

Tool registration pattern:

```python
available_tools = {
    "get_weather": get_weather,
    "run_command": run_command,
}
```

With this, the agent can execute CLI steps while keeping reasoning in the LLM loop.

---

## Demonstrated Workflow in Lecture

The agent was prompted to:

1. create a folder for a todo app
2. generate HTML/CSS/JavaScript files
3. build CRUD behavior
4. restyle UI (purple/modern)
5. debug issues from user feedback (example: theme toggle not working)

This shows end-to-end code generation + iteration through tool calls.

---

## Important Limitation Observed

A single unrestricted command tool is powerful but noisy/risky.

Better production approach:

- use structured tools: create_file, read_file, list_dir, update_file, delete_file
- keep explicit tool signatures and validated inputs
- keep observe steps after each tool call for control and traceability

This improves reliability and debuggability versus raw shell-only execution.

---

## Self-Improving Agent Concept

A notable pattern shown:

- ask the agent to edit its own agent file
- add more file-handling tools
- evolve from one broad tool to many precise tools

This is a practical path from a toy CLI agent to a stronger coding workflow.

---

## Key Takeaways

- Tool access turns an LLM into a practical coding assistant.
- The same PLAN -> TOOL -> OBSERVE -> OUTPUT loop scales from weather to coding tasks.
- Raw command execution works for demos but structured tools are safer and more reliable.
- This completes the section foundation before moving to RAG systems.
