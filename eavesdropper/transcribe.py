"""
transcribe.py - Entrypoint for eavesdropper live transcription.

Continuously listens to the microphone, transcribes speech using Whisper,
and appends results to transcript.txt.

Usage:
    python transcribe.py [--model tiny|base|small|medium|large] [--output transcript.txt]

Press Ctrl+C to stop.
"""

import argparse #handles --model and --output arguments from the terminal
import queue #receives audio chunks from audio.py
import signal #lets us catch Ctrl+C and shut down cleanly
import time #used to measure silence duration between speech
from pathlib import Path

import numpy as np
import whisper #OpenAIs Whisper library - the actual speech recognition engine

import audio as audio_mod
from writer import append_to_transcript

MIN_SPEECH_DURATION = 1.0 #min sec of audio buffer before sending to whisper
MAX_BUFFER_DURATION = 30.0 #force transcribtion after 30s
PAUSE_THRESHOLD = 1.2 #seconds of silence that triggers transcription of the buffered audio

is_running = True #controls the main loop - Ctrl+C sets to false


def _handle_shutdown(sig, frame):
    """Handle Ctrl+C and set the stop flag."""
    global is_running
    print("\n[transcribe] Stopping...")
    is_running = False


signal.signal(signal.SIGINT, _handle_shutdown) #when Ctrl+C(SIGINT) is pressed, call _handle_shutdown instead of crashing


def transcribe_buffer(
    buffer: list,
    model,
    output_path: Path,
) -> None:
    """Take buffered audio, run Whisper, and write result."""
    audio_data = np.concatenate(buffer).astype(np.float32) #join all audio chunks into one array and ensure correct number format for Whisper

    if audio_mod.is_silent(audio_data):
        return

    result = model.transcribe(audio_data, language=None, fp16=False) #send audio to Whisper - language=None means auto-detect, fp16=False for compatibility
    text = result.get("text", "").strip()

    if text:
        append_to_transcript(text, output_path)


def should_transcribe(
    is_pause_detected: bool,
    is_buffer_full: bool,
    has_audio: bool,
) -> bool:
    """Return True if conditions are right to send buffer to Whisper."""
    return has_audio and (is_pause_detected or is_buffer_full)


def run_transcription_loop(model, output_path: Path) -> None: #main loop runs forever untill stopped
    """Main loop: capture audio, buffer it, transcribe on pause."""
    audio_queue: queue.Queue = queue.Queue() #create the shared queue that audio.py will push chunks into
    stream = audio_mod.start_stream(audio_queue) #open the microphone and start pushing audio chunks into the queue

    print(f"[transcribe] Listening... output -> {output_path}")
    print("[transcribe] Press Ctrl+C to stop.\n")

    buffer = [] #list that collects audio chunks until ready to send to whisper
    buffer_duration = 0.0 #tracks how many seconds of audio are currently in the buffer
    last_speech_time = time.monotonic() # timestamp of last detected speech (to measure silence duration)

    try:
        while is_running:
            last_speech_time = _drain_queue( #pick up all available audio chunks from the queue into the buffer
                audio_queue, buffer, last_speech_time
            )
            buffer_duration = sum( ## calculate total seconds of audio currently in the buffer, len(chunk) is the number of samples
                len(chunk) / audio_mod.SAMPLE_RATE for chunk in buffer
            )

            silence_duration = time.monotonic() - last_speech_time #how many seconds have passed since the last detected speech
            is_pause_detected = (
                silence_duration > PAUSE_THRESHOLD
                and buffer_duration >= MIN_SPEECH_DURATION
            )
            is_buffer_full = buffer_duration >= MAX_BUFFER_DURATION

            if should_transcribe(is_pause_detected, is_buffer_full, bool(buffer)):
                transcribe_buffer(buffer, model, output_path)
                buffer.clear() #if conditions are met, transcribe the buffer then clear it for next round

            time.sleep(0.05)
    finally: #always runs on exit - turn off mic and transcribe any remaining audio
        stream.stop()
        stream.close()
        if buffer:
            transcribe_buffer(buffer, model, output_path)


def _drain_queue( #helper function
    audio_queue: queue.Queue,
    buffer: list,
    last_speech_time: float,
) -> float:
    """Pull all available chunks from queue into buffer. Returns updated last_speech_time."""
    try:
        while True:
            chunk = audio_queue.get_nowait()
            buffer.append(chunk)
            if not audio_mod.is_silent(chunk):
                last_speech_time = time.monotonic()
    except queue.Empty:
        pass
    return last_speech_time


def main() -> None:
    """Parse CLI arguments, load Whisper model, and start transcription."""
    parser = argparse.ArgumentParser(
        description="eavesdropper - live microphone transcription via Whisper"
    )
    parser.add_argument(
        "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large"],
        help="Whisper model size. Use 'tiny' for low-RAM testing.",
    )
    parser.add_argument(
        "--output",
        default="transcript.txt",
        type=Path,
        help="File to append transcripts to (default: transcript.txt).",
    )
    args = parser.parse_args()

    print(f"[transcribe] Loading Whisper '{args.model}' model...")
    model = whisper.load_model(args.model) # load whisper model into memory, downloads automatically on first run
    print("[transcribe] Model ready.\n")

    run_transcription_loop(model, args.output)
    print("[transcribe] Done.")


if __name__ == "__main__": #only execute main() when this file is run directly
    main()
