# Hugging Face CLI Setup and Login

## Objective

Install Hugging Face CLI and authenticate with an access token so model downloads and other CLI operations work from terminal/Python workflows.

---

## Install Hugging Face CLI

You can install it using either Python package manager or Homebrew.

### Option A: pip

```bash
pip install -U huggingface-cli
```

### Option B: Homebrew (macOS)

```bash
brew install huggingface-cli
```

---

## Login from Terminal

```bash
huggingface-cli login
```

This command asks for an access token.

---

## Generate Access Token (Hugging Face Website)

1. Open your Hugging Face account settings
2. Go to **Access Tokens**
3. Create a new token
4. Give token a name (for example: `test-token`)
5. Choose permission scope:
   - `read` for download-only usage
   - `write` if you also plan to push/upload
6. Copy token

Paste this token into terminal when `huggingface-cli login` prompts.

---

## Credential Prompt Behavior

During login, CLI may ask whether to store token as Git credentials.

- You can continue without Git credential storage
- Token is still usable for Hugging Face CLI auth session

If first paste fails, re-paste the token and submit again.

---

## Why This Step Is Important

After successful login:

- CLI can authenticate private/gated model requests
- local scripts can pull model files that require token access
- next setup steps (Transformers + local inference) work smoothly

---

## Key Takeaways

- Install CLI first, then authenticate with a token.
- Access token is created from Hugging Face account settings.
- `read` scope is enough for downloading models; `write` is broader.
- This is the prerequisite for pulling gated/open models from terminal workflows.
