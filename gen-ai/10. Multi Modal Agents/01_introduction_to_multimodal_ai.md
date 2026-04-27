# Introduction to Multimodal AI

## What is Multimodal AI?

**Multimodal** (with an "A") is different from **multi-model** (multiple models).

- **Multi-model** → using multiple models together
- **Multimodal** → a single model that can process multiple *types* of data

**Multimodal AI** refers to AI systems that process and integrate information from multiple data types such as:

- Text
- Images
- Audio
- Video

## How It Differs from Text-Only Models

Traditional LLMs only accept text as input and produce text as output. Multimodal models extend this by accepting other data modalities.

| Model | Input | Output |
|---|---|---|
| GPT-3.5 Turbo | Text only | Text only |
| GPT-4o mini | Text + Images | Text only |

## Passing Images via the OpenAI API

Instead of passing `content` as a plain string, you pass it as an **array** with typed parts:

```python
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": "What is in this image?"
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": "https://example.com/image.jpg"
                }
            }
        ]
    }
]
```

The model reads and analyzes the image, then responds in text.

## Key Takeaway

Multimodal AI unlocks the ability to reason over images, audio, and video — not just text. Models like **GPT-4o mini** support image input, making it possible to ask questions about visual content programmatically.
