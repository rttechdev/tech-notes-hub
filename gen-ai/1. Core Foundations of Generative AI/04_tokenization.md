# Tokenization: Converting Text to Numbers

## What is a Token?

A **token** is a basic unit of text that has been mapped to a numerical value that the LLM can understand.

### Simple Definition:
**Token** = Text/Character mapped to a number

### Why Tokens?

Computers are excellent at math but don't understand human language directly. So we convert text into numbers (tokens) that the transformer can work with.

---

## Simple Token Example

### The Concept:

Let's say we define a simple tokenization scheme where:

| Character | Token Number |
|-----------|--------------|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |
| E | 5 |

### Using Tokens:

Instead of typing or working with "B, D, E", we use: **2, 4, 5**

The transformer understands numbers, so it can work with these token numbers just as easily.

---

## How Tokens Flow Through an LLM

### Step 1: Tokenization
```
Text Input: "Hi there"
         ↓
    Convert to tokens
         ↓
Tokens: [104, 105, 32, 116, 104, 101, 114, 101]
```

### Step 2: Transformer Processing
```
Input Tokens: [104, 105, 32, 116, ...]
         ↓
    [Transformer]
         ↓
Next Token Prediction: 101
```

### Step 3: Iteration
```
Current Tokens: [104, 105, 32, 116, ..., 101]
         ↓
    [Transformer]
         ↓
Next Token Prediction: 97
```

### Step 4: De-tokenization
```
Generated Tokens: [104, 105, 32, 116, ..., 101, 97]
         ↓
    Convert back to text
         ↓
Output Text: "Hi there a..."
```

---

## Real-World Tokenization

### Important: Different Models Use Different Tokenization

The token numbers are **unique to each model**:

| Model | Tokenization Scheme | Example |
|-------|-------------------|---------|
| GPT-4o | OpenAI's system | Different numbers than GPT-3.5 |
| GPT-3.5 | OpenAI's system | Different numbers than GPT-4o |
| Gemini | Google's system | Completely different numbers |
| Claude | Anthropic's system | Different numbers |

**This means the same text produces different token sequences for different models!**

---

## Real Example: GPT-4o Tokenization

Using the **tiktoken** visualization tool (built by OpenAI), let's see how actual tokenization works.

### Input Text:
```
"Hey there, my name is Roshank"
```

### GPT-4o Tokenization:

The text gets broken down into tokens with assigned numbers:

```
Token 1: "<|im_start|>" → 100264 (special start token)
Token 2: "user" → 1428
Token 3: "Hey" → 33626
Token 4: " there" → 3274
Token 5: "," → 11
Token 6: " my" → 486
Token 7: " name" → 1024
Token 8: " is" → 374
Token 9: " Roshan" → 47
Token 10: "k" → 581
```

### Key Observations:

1. **Not character-by-character**: Sometimes words are split (like "Roshan" + "k")
2. **Special tokens**: Start/end tokens are used (e.g., `<|im_start|>`, `<|im_end|>`)
3. **Spaces matter**: Spaces are sometimes included in tokens
4. **Numbers are used**: Each token has a unique integer ID
5. **Contiguous chunks**: Often relates to common word pieces or subwords

### Complete Token Sequence:
```
[100264, 1428, 33626, 3274, 11, 486, 1024, 374, 47, 581]
```

This is what the transformer actually receives!

---

## Real Example: Google Gemini Tokenization

### Same Input Text:
```
"Hey there, my name is Roshank"
```

### Gemini Tokenization:

Notice the tokens are completely different from GPT-4o:

```
Token 1: "Hey" → 8957
Token 2: " there" → 1829
Token 3: "," → 12
Token 4: " my" → 452
Token 5: " name" → 981
Token 6: " is" → 318
Token 7: " Roshan" → 64
Token 8: "k" → 437
```

**These are completely different numbers than GPT-4o!**

This is why you can't directly compare token counts between models - they tokenize differently.

---

---

## Tokenization Definition

> **Tokenization** is the process of converting user input text into a sequence of numerical tokens (integers) that the LLM can understand and process.

### Reverse Process - De-tokenization:

> **De-tokenization** is the process of converting numerical tokens back into human-readable text.

---

## Key Points About Tokenization

### 1. **Model-Specific**
- Every LLM has its own tokenization algorithm
- Same text = different token sequences for different models
- GPT-4o, GPT-3.5, Gemini, Claude all tokenize differently

### 2. **Not One-to-One with Characters**
- Tokens aren't individual characters
- Often include common word pieces or subwords
- Example: "Roshank" might be split as ["Roshan", "k"]

### 3. **Special Tokens**
- Models have special tokens for:
  - Start of conversation
  - End of conversation
  - Role changes (user/assistant)
  - Padding

### 4. **Subword Tokenization**
- Modern models use "subword tokenization"
- Breaks uncommon words into known pieces
- Helps handle new/rare words efficiently

### 5. **Token Limits**
- Different models have token limits
- GPT-4: Up to 8K or 128K tokens
- Gemini: Different token limits
- Exceeding limit causes errors

---

## Visualizing Tokenization: Tiktoken Tool

### Website: [tiktoken.dev](https://tiktoken.dev)

This interactive tool helps you see:
- How text is tokenized for different models
- Token numbers and boundaries
- Total token count
- Token efficiency

### How to Use:
1. Select a model (GPT-4o, GPT-3.5, Gemini, etc.)
2. Type text in the input box
3. See tokens displayed with their numbers
4. Understand how your specific model tokenizes

---

## Why Token Count Matters

### Token Counting:

```
Model: GPT-4o
Text: "Hello, how are you?"
Tokens: [33626, 11, 400, 527, 345, 30]
Token Count: 6 tokens
```

### Why It Matters:

1. **API Costs**: Many APIs charge per token used
2. **Context Window**: Models have limits on total tokens
3. **Performance**: More tokens = more computation time
4. **Efficiency**: Some models tokenize more/less efficiently

### Example:
```
Text: "Hi there, my name is Roshank"

GPT-4o: 8 tokens (more efficient)
Gemini: 9 tokens (less efficient)
Claude: 7 tokens (most efficient)
```

---

## Key Takeaways

- **Token** = text mapped to a number
- **Tokenization** = text → token numbers; **De-tokenization** = token numbers → text
- Each model uses its own tokenization scheme (same text → different tokens)
- One token ≠ one word; tokens are subwords/characters
- Token count matters: API costs, context window limits, compute time
