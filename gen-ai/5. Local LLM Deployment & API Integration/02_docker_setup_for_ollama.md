# Docker Overview & Setup for Local LLM

## Why Docker Over Direct Installation?

Running Ollama (or any local model tool) directly has drawbacks:

- platform-specific installers (Windows/macOS/Linux versions differ)
- bloats the local machine
- harder to replicate on a server later

Docker advantages:

- platform-agnostic — same steps work on macOS, Linux, Windows
- keeps tools isolated from the host machine
- deploys the same way locally and on a server

---

## Install Docker Desktop

1. Go to [docker.com](https://docker.com)
2. Download Docker Desktop for your OS
3. Install and launch

Verify installation:

```bash
docker --version
```

Expected output example:

```text
Docker version 28.x.x, build ...
```

---

## Basic Docker Commands

Pull an image:

```bash
docker pull busybox
```

Run a container:

```bash
docker run busybox ls
```

List running containers:

```bash
docker container ps
```

Remove a container:

```bash
docker container rm <container-id>
```

These commands confirm Docker is working before installing Ollama.

---

## Docker Desktop UI

After launching Docker Desktop you will see:

- **Images** tab — downloaded images
- **Containers** tab — active/stopped containers
- **Volumes** tab — persistent data storage

For Ollama usage, you primarily manage containers here.

---

## Key Takeaways

- Docker Desktop is the recommended setup for running Ollama locally
- Same Docker approach works for local dev and server deployment
- Verify with `docker --version` before proceeding
- Next step: pull and run the Ollama Docker image
