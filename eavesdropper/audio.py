"""
audio.py - Microphone capture for eavesdropper.
Streams 16kHz mono audio into a queue for transcription.
"""

import queue  # passes audio to the transcription loop
import sys  # for printing microphone errors

import numpy as np  # math library for handling audio numbers
import sounddevice as sd  # opens the microphone and captures audio data

SAMPLE_RATE = 16000  # whisper requires audio at 16000 samples per second
BLOCK_DURATION = 0.5  # every 0.5 seconds send a chunk of the audio to the queue
SILENCE_THRESHOLD = 0.01  # anything quieter than this is considered silence


def calculate_rms(audio_chunk: np.ndarray) -> float:
    """Calculate root-mean-square amplitude of an audio chunk."""
    # returns the volume level of an audio chunk
    return float(np.sqrt(np.mean(audio_chunk ** 2)))


def is_silent(audio_chunk: np.ndarray) -> bool:
    """Return True if the audio chunk is below the silence threshold."""
    return calculate_rms(audio_chunk) < SILENCE_THRESHOLD  # returns true if chunk is silent


# opens the microphone and starts pushing audio chunks into the queue
def start_stream(audio_queue: queue.Queue) -> sd.InputStream:
    """
    Open the default microphone and push audio blocks into audio_queue.
    Returns the stream so the caller can close it later.
    """
    # sounddevice calls this automatically every 0.5 seconds with fresh audio
    def _callback(indata: np.ndarray, frames: int, time_info, status):
        if status:
            # if the microphone has an issue, print the error to the terminal
            print(f"[audio] {status}", file=sys.stderr)
        # take mono channel from audio, copy it safely, and place it on the queue
        audio_queue.put(indata[:, 0].copy())

    # 16000 * 0.5 = 8000 samples per chunk sent to the queue
    block_size = int(SAMPLE_RATE * BLOCK_DURATION)

    # configure the microphone stream with settings whisper requires
    stream = sd.InputStream(
        samplerate=SAMPLE_RATE,
        channels=1,  # mono not stereo
        dtype="float32",  # store audio as decimal numbers (whisper requirement)
        blocksize=block_size,
        callback=_callback,
    )
    stream.start()  # turn the microphone on and start recording
    return stream
