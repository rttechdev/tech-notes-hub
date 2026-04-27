# Chained Architecture for Voice Agents

## What Is the Chained Method?

Chained architecture converts voice into text, uses a text LLM for reasoning, then converts response text back to voice.

Flow:

1. user audio input
2. speech-to-text (STT)
3. text LLM processing
4. text-to-speech (TTS)
5. spoken output to user

So the system is voice at the edges, text in the middle.

---

## Core Pipeline

## 1) Speech to Text (STT)

User speech is transcribed into text (like subtitles/captions).

## 2) LLM Completion (Text to Text)

The transcribed text is sent to any text model (GPT, Gemini, Claude, etc.).
The model returns text output.

## 3) Text to Speech (TTS)

The output text is synthesized into audio and played to the user.

---

## Why Chained Is Widely Used

Main advantage: flexibility.

- works with almost any text LLM
- easy integration with LangChain / LangGraph orchestration
- supports tool calling and complex agent workflows
- not locked to one speech-native model family

This is why it is practical for production agent systems.

---

## Tradeoff vs S2S

Main downside: more latency.

Because there are multiple stages (STT -> LLM -> TTS), response time is generally higher than direct speech-to-speech systems.

---

## S2S vs Chained (Practical View)

S2S:

- low-latency voice-native interaction
- typically more expensive
- fewer model choices
- may have lower reasoning quality depending on speech model

Chained:

- slightly higher latency
- lower lock-in
- broader model choice (high-intelligence models available)
- easier orchestration for advanced agent logic

---

## Engineering Insight

Even when systems look speech-native, some internal designs still resemble a chained process (audio understanding -> reasoning -> audio generation).

So learning chained architecture gives a strong base for both styles.

---

## What Comes Next

The next implementation step is to code a voice agent using chained architecture first (most practical and flexible), then explore S2S implementation patterns.

---

## Key Takeaways

- Chained architecture = STT + text LLM + TTS
- It is the most flexible way to build conversational agents
- It supports stronger reasoning models and richer orchestration
- Main cost is added latency compared to direct S2S
