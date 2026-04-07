import json
import os
from datetime import datetime
from .validation_errors import ValidationResult


VALIDATOR_LOGS_FILE = "validator_logs.json"


def _load_existing_logs() -> list[dict]:
    """Load existing logs from the validator logs file."""
    if not os.path.exists(VALIDATOR_LOGS_FILE):
        return []
    try:
        with open(VALIDATOR_LOGS_FILE, "r") as file:
            return json.load(file)
    except (json.JSONDecodeError, IOError):
        return []


def _save_logs(logs: list[dict]) -> None:
    """Save logs to the validator logs file."""
    with open(VALIDATOR_LOGS_FILE, "w") as file:
        json.dump(logs, file, indent=2)


def log_validation_attempt(
    attempt: int,
    prompt: str,
    validation: ValidationResult,
) -> None:
    """
    Log a validation attempt to validator_logs.json.

    Args:
        attempt: The attempt number (1, 2, 3, etc.)
        prompt: The original question/prompt sent to the LLM
        validation: The ValidationResult from the validator
    """
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "attempt": attempt,
        "prompt": prompt,
        "isValid": validation.is_valid,
        "error_type": validation.error_type,
        "error_msg": validation.msg,
    }

    logs = _load_existing_logs()
    logs.append(log_entry)
    _save_logs(logs)
