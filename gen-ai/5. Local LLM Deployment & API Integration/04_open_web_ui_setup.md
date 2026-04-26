# Open Web UI Setup for Ollama

## What Is Open Web UI?

Open Web UI is a ChatGPT-style browser interface that connects to your local Ollama engine.

- Ollama runs the model on port `11434`
- Open Web UI runs the chat UI on port `3000`
- Both run as Docker containers

---

## Pull and Run Open Web UI

Pull the image:

```bash
docker pull ghcr.io/open-webui/open-webui:main
```

Run the container:

```bash
docker run -d \
  -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

Access it at: `http://localhost:3000`

---

## First-Time Setup

1. Open `http://localhost:3000`
2. Sign up and create an admin account
3. Open Admin Panel → Settings → Connections
4. Ollama should auto-connect to `http://localhost:11434`

---

## Pull a Model

Go to: Admin Panel → Settings → Models

Enter model name from [ollama.com/library](https://ollama.com/library), example:

```text
gemma:2b
```

Click the download button. The model downloads into the Ollama container.

Model size reference:

| Model | Parameters | Approx Size |
|---|---|---|
| gemma:2b | 2B | ~2 GB |
| gemma:7b | 7B | ~5 GB |

Choose smaller models if hardware is limited.

---

## Using the Model

After download:

1. Open a new chat in Open Web UI
2. Select the downloaded model from the dropdown
3. Send a message

The model runs locally. CPU usage spikes during generation and drops to 0% when idle.

---

## Key Takeaways

- Open Web UI is the chat frontend; Ollama is the model backend
- Both run as separate Docker containers
- Models are pulled through the Admin Panel UI or via Ollama CLI
- CPU usage is high during inference — larger models require better hardware
- Multiple models can be downloaded and switched between in the UI
