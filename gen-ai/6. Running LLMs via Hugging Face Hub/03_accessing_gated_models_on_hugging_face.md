# Accessing Gated Models on Hugging Face

## Objective

Learn how to request and gain access to gated models (example: Google Gemma) before using them locally.

---

## Open vs Gated Models

Not all Hugging Face models have the same access policy.

| Model type | Access behavior |
|---|---|
| Open model | Can be used immediately |
| Gated model | Requires accepting license/usage terms first |

A common example is Google Gemma models, which often appear as gated.

---

## Steps to Access a Gated Model

1. Search model on Hugging Face (example: Gemma 3)
2. Open the model page
3. If access is gated, review license/terms section
4. Accept required terms and conditions
5. Wait for access grant confirmation

After approval, the model page becomes usable for integration.

---

## What Changes After Access Is Granted

Once access is granted:

- you can use the model artifacts from that repository
- usage instructions become actionable
- you can copy the provided code snippets for local inference

---

## Getting the Usage Code

On the model page, open the usage panel and choose the framework (for this course: Transformers).

You will get starter inference code directly from Hugging Face, which is the base for local model execution in Python.

---

## Key Takeaways

- Gated models need explicit license acceptance before use.
- Access approval is done once per account/model policy.
- After approval, use the model page's generated Transformers example as your starting point.
- Next step is running the model locally with the Transformers package.
