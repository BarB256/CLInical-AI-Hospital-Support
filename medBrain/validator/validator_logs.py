from datetime import datetime


def log_validation_attempt(attempt_number: int, parsed_result):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    error = parsed_result.error_type if parsed_result.error_type else "None"
    msg = parsed_result.msg if parsed_result.msg else "None"
    log_line = (
        f"{timestamp} | Attempt: {attempt_number} | Valid: "
        f"{parsed_result.is_valid} | Error: {error} | Msg: {msg}\n"
    )
    with open("llm_validation_logs.txt", "a", encoding="utf-8") as file:
        file.write(log_line)
