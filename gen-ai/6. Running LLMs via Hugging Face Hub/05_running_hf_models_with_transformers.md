# Running Hugging Face Models with Transformers

## Objective

Use the Hugging Face `transformers` package to run an approved model locally from Python.

---

## Install Required Packages

Make sure your virtual environment is active, then install:

```bash
pip install transformers
pip install torch
pip freeze > requirements.txt
```

Why `torch` is needed:

- many Transformers pipelines use PyTorch backend by default
- without it, pipeline execution fails

---

## Minimal Project Setup

Create a folder (example: `hf_basic`) and add a `main.py`.

### `main.py` (project code pattern)

```python
from transformers import pipeline

pipe = pipeline("image-text-to-text", model="google/gemma-3-4b-it")

messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "image",
                "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG",
            },
            {"type": "text", "text": "What animal is on the candy?"},
        ],
    },
]

pipe(text=messages)
```

---

## Message Format

The request still follows ChatML-style structure:

- `role` (example: `user`)
- `content` as multimodal items (`image`, `text`)

This allows vision-capable models to reason over both image and prompt text.

---

## First Run Behavior

On first execution:

- model files are downloaded from Hugging Face to local cache
- large models may be several GB
- CPU/GPU load and heat can spike during initial setup

On later runs:

- cached model is reused
- startup is faster (no full re-download)

---

## Key Takeaways

- Install both `transformers` and `torch` before running pipelines.
- Use the exact model ID you already have access to.
- First run downloads model weights locally; subsequent runs are faster.
- This is the core pattern for running Hugging Face models on your own machine.
