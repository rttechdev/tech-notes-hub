# Voice Agent Architecture Patterns

## Core Technical Constraint

Transformer-based LLMs operate on tokens (numeric representations), not raw audio waveforms.

They are optimized to:

- take tokenized input
- predict next tokens
- generate token sequences as output

So practical voice systems usually do not send raw speech directly into a text-only LLM pipeline.

---

## Why Raw Voice Is Hard for Text LLM Pipelines

Human speech has high variability:

- accent differences
- speaking speed differences
- pitch and tone changes
- pauses, emphasis, and emotion shifts

Audio is a continuous signal, while standard LLMs reason in discrete token space. This mismatch is why voice agents use additional layers.

---

## Two Common Patterns for Voice Agents

## 1) Speech-to-Speech (S2S)

Direct voice interaction pattern:

- user speaks
- system processes speech input
- agent responds back in speech

Goal: natural real-time conversation feel.

## 2) Chained Architecture (Most Practical Foundation)

Modular pipeline pattern:

1. speech-to-text (ASR)
2. LLM reasoning + tool use
3. text-to-speech (TTS)

This is the core architecture used in most production conversational agents.

---

## Important Practical Insight

Even advanced speech experiences often rely on chained components under the hood.

So if you understand chained architecture well, building robust voice agents becomes much easier, including systems that appear to be direct speech-to-speech.

---

## What Comes Next in This Section

- deep dive into S2S pattern
- deep dive into chained architecture
- coding a working voice agent using chained architecture
- understanding how S2S-style systems relate to that foundation

---

## Key Takeaways

- Standard transformer LLM workflows are token-centric
- Voice interfaces require additional speech processing layers
- Two practical patterns: S2S and chained architecture
- Chained architecture is the main engineering foundation for conversational voice agents
