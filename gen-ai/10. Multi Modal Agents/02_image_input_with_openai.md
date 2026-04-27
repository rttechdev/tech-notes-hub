# Image Input with OpenAI (Multimodal in Code)

## Goal

Pass a public image URL to a multimodal model and ask it to generate a caption.

## Setup

```python
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI()  # API key auto-read from OPENAI_API_KEY env variable
```

## Sending an Image via URL

When passing an image, `content` becomes an **array** instead of a plain string. Each element has a `type` field.

```python
response = client.chat.completions.create(
    model="gpt-4o-mini",  # must be a multimodal model that supports image input
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Generate a caption for this image in about 50 words."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/your-public-image.jpg"
                    }
                }
            ]
        }
    ]
)

print(response.choices[0].message.content)
```

> **Note:** The image must be publicly accessible via URL for this approach to work.

## Passing a Local Image (Base64)

If the image is stored locally, convert it to a Base64 string and pass it as a data URL:

```python
import base64

with open("image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Generate a caption for this image in about 50 words."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{image_data}"
                    }
                }
            ]
        }
    ]
)
```

## Key Points

- Use a model that supports image input (e.g. `gpt-4o`, `gpt-4o-mini`) — not `gpt-3.5-turbo`
- `content` must be an **array** when mixing text and image parts
- Public URL is the simplest approach; Base64 works for local files
- The model outputs **text only** — it reads and describes the image but cannot generate images
