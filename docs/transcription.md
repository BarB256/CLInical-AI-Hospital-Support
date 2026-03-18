# Transcription Module

The transcription module (`eavesdropper/`) continuously listens to the
device microphone and appends all recognised speech to `transcript.txt`.
It runs fully locally — no audio is sent to any external API.

## How to run

Install dependencies (once):
```bash
pip install -r eavesdropper/requirements.txt
```

Start transcribing:
```bash
python eavesdropper/transcribe.py --model tiny
```

Press **Ctrl+C** to stop.

## CLI options

| Flag | Default | Description |
|---|---|---|
| `--model` | `base` | Whisper model size: `tiny`, `base`, `small`, `medium`, `large` |
| `--output` | `transcript.txt` | File to append transcripts to |

## Output format
```
[2026-03-18 14:05:32] Doctor, I have had a persistent cough for two weeks.
[2026-03-18 14:05:51] How long have you had the fever?
```

## Model RAM guide

| Model | RAM | Notes |
|---|---|---|
| `tiny` | ~1 GB | Use for development/testing |
| `base` | ~1 GB | Good default |
| `small` | ~2 GB | Better accuracy |
| `medium` | ~5 GB | High accuracy |
| `large` | ~10 GB | Best accuracy |

## Module structure

| File | Purpose |
|---|---|
| `transcribe.py` | Entrypoint — CLI and main loop |
| `audio.py` | Microphone capture |
| `writer.py` | Appends timestamped lines to transcript file |
| `requirements.txt` | Python dependencies |

## Note on transcript.txt

`transcript.txt` is intentionally not committed to the repository — it
is created automatically on first run. It must be listed in `.gitignore`
to prevent accidental commits of patient data.