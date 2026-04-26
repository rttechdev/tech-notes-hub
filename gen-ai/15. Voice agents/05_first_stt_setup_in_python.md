# First STT Setup in Python (Chained Voice Agent)

## Goal

Build the first step of a chained voice agent: convert user speech (audio) into text using Python.

---

## What We Are Building First

In chained architecture, stage one is STT:

1. capture microphone audio
2. reduce ambient noise
3. transcribe speech to text
4. print recognized text

---

## Required Package

Install SpeechRecognition:

```bash
pip install SpeechRecognition
```

Then update dependencies if needed:

```bash
pip freeze > requirements.txt
```

---

## Minimal Working STT Script

```python
import speech_recognition as sr


def main() -> None:
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Speak something...")

        # Reduce background noise impact before listening.
        recognizer.adjust_for_ambient_noise(source)

        # If the speaker pauses, recognition proceeds.
        recognizer.pause_threshold = 2

        audio = recognizer.listen(source)
        print("Processing audio...")

        text = recognizer.recognize_google(audio)
        print(f"User said: {text}")


if __name__ == "__main__":
    main()
```

---

## Run

```bash
python main.py
```

Expected behavior:

- terminal shows "Speak something..."
- you speak into microphone
- script prints transcribed text

---

## Common Error: PyAudio Missing

A frequent error is:

- could not find pyaudio
- microphone backend not available

Fix by installing audio dependencies for your OS.

For macOS (as shown in the lecture flow):

```bash
brew install portaudio
pip install pyaudio
```

Then rerun:

```bash
python main.py
```

---

## Why This Step Matters

This completes the first block of the chained pipeline:

- STT complete
- next steps are LLM text processing, then TTS output

---

## Key Takeaways

- SpeechRecognition can quickly enable microphone-to-text transcription
- Ambient-noise adjustment improves real-world capture quality
- PyAudio/PortAudio setup is the most common blocker
- Once STT works, you can plug it into the rest of the voice-agent chain
