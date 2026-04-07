"""
writer.py - Transcript file writer for eavesdropper.
Handles timestamped appending to transcript.txt.
"""

import datetime  # to generate timestamps for transcript entries
from pathlib import Path  # handles file paths correctly across Windows, Mac and Linux

DEFAULT_OUTPUT = Path("transcript.txt")


def append_to_transcript(text: str, output_path: Path = DEFAULT_OUTPUT) -> None:
    """
    Append a transcribed segment to the transcript file with a timestamp.
    Creates the file if it does not exist.

    Format: [YYYY-MM-DD HH:MM:SS] <text>
    """
    # remove accidental spaces or newlines from the start and end of the text
    text = text.strip()
    is_empty = not text  # true if text is empty after stripping
    if is_empty:
        return

    # get current date and format it
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{timestamp}] {text}\n"

    with open(output_path, "a", encoding="utf-8") as transcript_file:
        transcript_file.write(line)

    print(line, end="")
