# Building Your Own Tokenizer in Python

## Introduction

In this section, we'll build a practical tokenizer using Python. We'll use the **tiktoken** library created by OpenAI, which is the same library used to tokenize text for GPT models.

By the end of this section, you'll understand:
- How to set up a Python project with a virtual environment
- How to use tiktoken to tokenize text
- How to decode tokens back to text
- The complete encode-decode cycle

---

## Project Setup

### Step 1: Create Project Directory

```bash
mkdir 01_tokenization
cd 01_tokenization
```

### Step 2: Create Virtual Environment

A virtual environment keeps your project dependencies isolated.

```bash
python -m venv venv
```

This creates a folder named `venv` containing the isolated Python environment.

### Step 3: Activate Virtual Environment

#### On macOS/Linux:
```bash
source venv/bin/activate
```

#### On Windows:
```bash
venv\Scripts\activate
```

Once activated, you'll see `(venv)` in your terminal prompt.

### Step 4: Install tiktoken

```bash
pip install tiktoken
```

This installs the tiktoken library - OpenAI's tokenization library.

### Step 5: Create requirements.txt

To save your dependencies:

```bash
pip freeze > requirements.txt
```

This creates a `requirements.txt` file listing all installed packages. Later, you (or others) can install all dependencies with:

```bash
pip install -r requirements.txt
```

### Step 6: Create main.py

Create a new file named `main.py` in your project folder.

---

## Basic Tokenizer Code

### Simple Encoding Example

Here's the simplest tokenizer code:

```python
import tiktoken

# Create an encoder for GPT-4o model
encoder = tiktoken.encoding_for_model("gpt-4o")

# Text to tokenize
text = "Hey there, my name is Piyush Garg"

# Encode text to tokens
tokens = encoder.encode(text)

# Print the tokens
print(tokens)
print(f"Total tokens: {len(tokens)}")
```

### Output:
```
[71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]
Total tokens: 9
```

---

## Breaking Down the Code

### Import tiktoken
```python
import tiktoken
```
Imports the tiktoken library.

### Create an Encoder
```python
encoder = tiktoken.encoding_for_model("gpt-4o")
```

This creates an **encoder** object specifically for the GPT-4o model.

**Why model-specific?** Each model tokenizes differently. Specifying the model ensures we get the correct token numbers.

**Available models:**
- `"gpt-4o"` - Latest GPT-4o model
- `"gpt-4"` - GPT-4
- `"gpt-3.5-turbo"` - GPT-3.5 Turbo
- `"text-davinci-003"` - Davinci model
- And many more...

### Define Text
```python
text = "Hey there, my name is Piyush Garg"
```

This is the text we want to tokenize.

### Encode to Tokens
```python
tokens = encoder.encode(text)
```

This converts the text to a list of token numbers.

### Print Results
```python
print(tokens)
```

Prints the token sequence: `[71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]`

---

## De-tokenization (Decoding)

### Decoding Tokens Back to Text

```python
import tiktoken

# Create encoder
encoder = tiktoken.encoding_for_model("gpt-4o")

# Token sequence
tokens = [71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]

# Decode tokens back to text
decoded_text = encoder.decode(tokens)

# Print result
print(decoded_text)
```

### Output:
```
Hey there, my name is Piyush Garg
```

---

## Complete Encode-Decode Example

Here's a complete example showing both encoding and decoding:

```python
import tiktoken

# Create encoder for GPT-4o
encoder = tiktoken.encoding_for_model("gpt-4o")

# Original text
original_text = "Hey there, my name is Piyush Garg"
print(f"Original Text: {original_text}")

# Encode to tokens
tokens = encoder.encode(original_text)
print(f"\nEncoded Tokens: {tokens}")
print(f"Number of Tokens: {len(tokens)}")

# Decode back to text
decoded_text = encoder.decode(tokens)
print(f"\nDecoded Text: {decoded_text}")

# Verify they match
print(f"\nMatch: {original_text == decoded_text}")
```

### Output:
```
Original Text: Hey there, my name is Piyush Garg

Encoded Tokens: [71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]
Number of Tokens: 9

Decoded Text: Hey there, my name is Piyush Garg

Match: True
```

---

## Practical Example: Token Counting

Here's a useful script to count tokens in any text:

```python
import tiktoken

def count_tokens(text, model="gpt-4o"):
    """Count tokens in text for a given model"""
    encoder = tiktoken.encoding_for_model(model)
    tokens = encoder.encode(text)
    return len(tokens)

# Test with different texts
text1 = "Hello"
text2 = "Hello, how are you doing today?"
text3 = "The quick brown fox jumps over the lazy dog"

print(f"'{text1}' = {count_tokens(text1)} tokens")
print(f"'{text2}' = {count_tokens(text2)} tokens")
print(f"'{text3}' = {count_tokens(text3)} tokens")
```

### Output:
```
'Hello' = 1 tokens
'Hello, how are you doing today?' = 8 tokens
'The quick brown fox jumps over the lazy dog' = 9 tokens
```

---

## Comparing Tokenization Across Models

Here's how to compare tokenization for different models:

```python
import tiktoken

text = "Hey there, my name is Piyush Garg"

# Try different models
models = ["gpt-4o", "gpt-4", "gpt-3.5-turbo"]

for model in models:
    encoder = tiktoken.encoding_for_model(model)
    tokens = encoder.encode(text)
    print(f"{model}: {len(tokens)} tokens")
    print(f"  Tokens: {tokens}\n")
```

### Output:
```
gpt-4o: 9 tokens
  Tokens: [71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]

gpt-4: 9 tokens
  Tokens: [71, 1456, 11, 856, 1024, 374, 11244, 384, 1035]

gpt-3.5-turbo: 10 tokens
  Tokens: [13, 3500, 11, 856, 1024, 374, 11244, 384, 85, 2971]
```

Notice how different models produce different token counts and sequences!

---

## Running Your Code

### Option 1: Using VS Code Play Button

Click the play button in VS Code's top-right corner.

### Option 2: Using Terminal

```bash
# Make sure you're in the project folder
cd 01_tokenization

# Make sure venv is activated
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Run the script
python main.py
```

---

## Key Takeaways

- **tiktoken** = OpenAI's tokenization library
- `encoding_for_model("gpt-4o")` = model-specific encoder
- `encoder.encode(text)` = text → token numbers
- `encoder.decode(tokens)` = token numbers → text
- Different models produce different tokens for the same input
- Token count matters for API costs and context window limits

---

## Next Steps

Now that you understand tokenization, we'll explore:
- **Vector Embeddings** - Converting tokens to high-dimensional vectors
- **Positional Encoding** - Adding position information to tokens
- **Attention Mechanism** - How transformers focus on relevant parts
- **The Math Behind Transformers** - Deep dive into the computations
