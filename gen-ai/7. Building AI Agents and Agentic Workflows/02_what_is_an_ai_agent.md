# What Is an AI Agent?

## Objective

Understand when an LLM is just a model and when it becomes an **agent**.

---

## Traditional System (Before AI Agents)

A typical product architecture includes:

- users
- backend services (auth, orders, payment, shipping)
- databases (MongoDB/Postgres)

When support is needed, companies often use **human support agents** who:

- read user requests
- access internal services/data
- take actions (example: check order status, cancel order)

So the human agent is not only responding; they are **deciding + acting** on connected systems.

---

## Why Plain LLMs Are Not Agents

A raw LLM API (OpenAI/Gemini) does one core thing:

- takes text input tokens
- predicts output tokens

By default, it cannot:

- query your order service
- call internal APIs
- update real business systems

So by itself, an LLM is a text prediction engine, not a fully acting system.

---

## Agent = LLM + Action Capabilities

An LLM becomes an agent when you attach a runtime layer that gives it controlled capabilities such as:

- tool/API calls
- service integration
- data lookup
- action execution based on user intent

Then flow becomes:

1. user asks in natural language
2. model interprets intent
3. model chooses action/tool
4. system executes action
5. model returns final answer

That is agentic behavior.

---

## Brain and Body Analogy

- LLM = **brain** (reasoning/text generation)
- tools + integrations + execution layer = **body** (hands/legs to act)

A brain without body can think but cannot act in the world.
An LLM without tools can respond but cannot complete operational tasks.

---

## Key Takeaways

- Not every LLM app is an agent.
- Agent means: understand + decide + act through connected systems.
- Human support workflows are a practical analogy for AI agents.
- Core developer job: attach the “body” (tools/integrations) to the LLM “brain.”
