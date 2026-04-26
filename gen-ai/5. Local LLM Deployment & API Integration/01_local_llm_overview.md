# Running LLMs Locally: Overview

## Why Run a Model Locally?

Cloud-hosted LLMs (GPT-4o, Gemini) are proprietary:

- owned by their respective companies
- source code and training data are not public
- usage is billed via API calls
- your data is sent to third-party servers

Some use cases require local execution instead:

- **Privacy constraints** — enterprise/company data cannot leave the environment
- **Offline access** — no internet dependency
- **Cost control** — no per-token API charges at scale (hardware cost replaces API cost)

---

## Open-Source vs Proprietary Models

| Type | Examples | Can run locally? |
|---|---|---|
| Proprietary | GPT-4o, Gemini, Claude | No |
| Open-source | DeepSeek, Qwen, Gemma 3, Llama | Yes |

Open-source models are freely downloadable and can run on your own hardware.

---

## Hardware Requirement

Running a model locally is resource-intensive.

- requires significant CPU/GPU capacity
- larger models need more memory
- the bigger the model, the better the hardware needed

This is a real tradeoff compared to using a hosted API.

---

## Tool Used in This Section: Ollama

**Ollama** is a local model runner that makes running open-source LLMs easier.

Setup approach:

- runs inside Docker (or directly as desktop app)
- Docker now also has a built-in model runner
- supports many open-source models (Llama, DeepSeek, Qwen, Gemma, etc.)

---

## What This Section Covers

- setting up Docker
- running Ollama in Docker
- loading and running open-source models locally
- calling locally running models from Python

---

## Key Takeaways

- Open-source models can be run offline on your own machine
- Main use case is privacy-sensitive environments where third-party APIs are not acceptable
- Hardware cost replaces API cost for local deployments
- Ollama is the primary tool for this section
