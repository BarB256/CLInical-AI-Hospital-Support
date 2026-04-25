import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_BATCH_LOG_FILE = Path(__file__).resolve().parents[1] / "sent_batches.jsonl"
BATCH_LOG_FILE = Path(os.getenv("TRAD_LLM_BATCH_LOG_FILE", DEFAULT_BATCH_LOG_FILE))


def _ensure_log_dir() -> None:
    BATCH_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)


def log_sent_batch(batch: str, question: str, source: str) -> dict[str, Any]:
    record = {
        "created_at": datetime.now(timezone.utc).isoformat(),
        "source": source,
        "batch": batch,
        "question": question,
    }

    _ensure_log_dir()
    with BATCH_LOG_FILE.open("a", encoding="utf-8") as log_file:
        log_file.write(json.dumps(record, ensure_ascii=True) + "\n")

    return record


def read_sent_batches(limit: int = 50) -> list[dict[str, Any]]:
    if not BATCH_LOG_FILE.exists():
        return []

    with BATCH_LOG_FILE.open("r", encoding="utf-8") as log_file:
        records = [
            json.loads(line)
            for line in log_file
            if line.strip()
        ]

    return records[-limit:]
