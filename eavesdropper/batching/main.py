from fastapi import FastAPI
import json
import os
import re
from config import BATCH_SIZE, BATCH_TYPE, TRANSCRIPT_FILE, STATE_FILE

app = FastAPI()


# ---------- STATE ----------
def load_state():
    if not os.path.exists(STATE_FILE):
        return {"last_index": 0}
    with open(STATE_FILE, "r") as f:
        return json.load(f)


def save_state(state):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f)


# ---------- READ ----------
def read_transcript():
    if not os.path.exists(TRANSCRIPT_FILE):
        return ""
    with open(TRANSCRIPT_FILE, "r") as f:
        return f.read()


# ---------- SPLITTERS ----------
def split_lines(text):
    return [line.strip() for line in text.splitlines() if line.strip()]


def split_words(text):
    return re.findall(r"\b\w+\b", text)


def split_characters(text):
    return list(text)


def split_sentences(text):
    # simple sentence splitter
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    return [s for s in sentences if s]


def get_units(text):
    if BATCH_TYPE == "lines":
        return split_lines(text)
    elif BATCH_TYPE == "words":
        return split_words(text)
    elif BATCH_TYPE == "characters":
        return split_characters(text)
    elif BATCH_TYPE == "sentences":
        return split_sentences(text)
    else:
        raise ValueError(f"Unsupported BATCH_TYPE: {BATCH_TYPE}")


# ---------- ENDPOINT ----------
@app.get("/next-batch")
def get_next_batch():
    state = load_state()
    text = read_transcript()
    units = get_units(text)

    start = state["last_index"]
    end = start + BATCH_SIZE

    batch_units = units[start:end]

    if batch_units:
        state["last_index"] = end
        save_state(state)

    if BATCH_TYPE == "characters":
        batch_text = "".join(batch_units)
    else:
        batch_text = " ".join(batch_units)

    return batch_text