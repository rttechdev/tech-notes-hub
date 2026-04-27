# MCP – Official Definition and Architecture

## Origin

MCP was introduced by **Anthropic** (the company behind Claude) on **November 25, 2024** as an open-source standard.

> *"A new standard for connecting AI assistants to where data lives — including content repositories, business tools, and development environments."*

---

## Why MCP Exists

Even the most advanced LLMs are constrained by their **isolation from live data**:
- Models are trained on static datasets
- New data sources appear every day — you can't retrain continuously
- Every new data source previously required its own custom integration

MCP addresses this by providing a **universal open standard** for connecting AI systems to any data source:

- Postgres database
- MongoDB
- Google Search
- Snowflake
- Kafka
- Any external service or API

Once an MCP server exists for a data source, **any LLM** can connect to it and query it — no custom integration needed.

---

## Official Definition

> *"MCP is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications — just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools."*

---

## Core Architecture – Three Components

### 1. MCP Host
Your **AI application** — the environment running the agent.

Examples:
- Your IDE (e.g. VS Code with Copilot)
- A custom AI app you build
- Claude Desktop

### 2. MCP Client
A component that lives **inside the host** and maintains a connection to an MCP server. One host can have multiple MCP clients, each connected to a different server.

### 3. MCP Server
A remote (or local) server that **exposes tools and data** via the MCP protocol. Companies and developers publish these servers.

Examples of available MCP servers:
- GitHub
- Hugging Face
- Figma
- Playwright
- Notion
- Linear
- DeepWiki

---

## Architecture Diagram

```
MCP Host (AI Application)
├── MCP Client 1 ──► MCP Server (GitHub)
├── MCP Client 2 ──► MCP Server (File System)
└── MCP Client 3 ──► MCP Server (Database / Postgres)
```

Each client maintains a **one-to-one connection** with its MCP server. The host can have as many clients as needed.

---

## Key Takeaway

MCP is to AI tools what REST APIs are to web services — a **shared protocol** that decouples tool providers from AI consumers, so any model can use any tool without custom glue code.
