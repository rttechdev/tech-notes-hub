# Running Ollama in Docker

## Docker Image

Official Ollama Docker image is available on Docker Hub:

```text
ollama/ollama
```

Image size: ~2 GB — pull time depends on your connection speed.

---

## Run Command

```bash
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama
```

Flags explained:

| Flag | Purpose |
|---|---|
| `-d` | detached mode (runs in background) |
| `-v ollama:/root/.ollama` | mounts a Docker volume for model storage |
| `-p 11434:11434` | exposes Ollama API on port 11434 |
| `--name ollama` | names the container `ollama` |

---

## What Happens

1. Docker pulls the Ollama image (~2 GB) on first run
2. Container starts in the background
3. Ollama engine runs on port `11434`

Verify the container is running:

```bash
docker container ps
```

You should see the `ollama` container listed as running.

---

## Docker Desktop

After running the command, check Docker Desktop → Containers tab.

The `ollama` container should appear with status: **running**.

---

## Hardware Note

Running a model locally is CPU/GPU intensive.

- more powerful hardware enables larger models
- running on low-spec hardware is slow or may fail for larger models

---

## Next Step: Open Web UI

The Ollama engine is running but has no chat interface yet.

**Open Web UI** is a UI layer installed separately that connects to the Ollama backend on port `11434`.

This is covered in the next note.

---

## Key Takeaways

- `ollama/ollama` is the official Docker image
- expose port `11434` and mount a volume for model persistence
- the `-d` flag keeps it running in the background
- the Ollama engine alone has no UI — Open Web UI is needed for chat interaction
