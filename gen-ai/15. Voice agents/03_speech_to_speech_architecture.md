# Speech-to-Speech (S2S) Architecture

## What Is S2S?

Speech-to-Speech (S2S) is a voice-native architecture where:

- input = user audio
- output = model audio

No explicit text interface is required in the interaction loop.

---

## Native Audio Handling

In S2S systems, the model handles audio directly:

1. user speaks
2. audio is sent to the model API
3. model processes intent, tools, and context
4. model returns spoken response audio

This is why it is called native speech-to-speech.

---

## Typical Capabilities in S2S Agent

Even with voice-in/voice-out flow, the agent can still perform:

- tool calling
- search/retrieval
- handoffs
- task execution via connected tools

So S2S is not just “talking”; it can still be agentic.

---

## Why Use S2S?

Main benefit:

- low-latency, real-time conversational feel

It is good when natural speech interaction is more important than strict structured workflows.

---

## Practical Tradeoffs

Common limitations:

- often scoped to narrow use cases
- less suitable for highly structured multi-step orchestration
- typically higher cost than text-centric chained pipelines

Examples where it fits well:

- customer support voice assistant
- sales/call conversational assistant
- real-time spoken helpdesk interaction

---

## Cost Note

S2S is usually expensive because you are continuously processing and generating audio through model APIs in real time.

---

## Architectural Insight

Even when products look like direct S2S, internal systems may still use chained components behind the scenes.

So understanding chained architecture remains important for building robust voice agents.

---

## Key Takeaways

- S2S = audio input directly to model, audio response back
- It enables low-latency real-time conversation
- It supports tools/handoffs, not just plain chat
- It is often costlier and more use-case scoped
- Chained architecture knowledge is still foundational
