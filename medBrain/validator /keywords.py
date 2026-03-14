BAD_KEYWORDS = [
    # ai role
    "as your ai assistant",
    "as an ai"
    "i am an ai",
    "i am an ai model",
    "i am a language model",
    "i am an llm",
    "i am not a doctor",
    "i cannot provide medical advice",
    "i cannot diagnose",
    # filler words
    "i think",
    "in my opinion",
    "i believe",
    "i would suggest",
    # prompt
    "ignore previous instructions",
    "disregard your instructions",
    "forget your instructions",
    "ignore all instructions",
    "override your instructions",
    "disregard all previous",
    "ignore your previous",
    "new instruction:",
    "system prompt:",
]


def has_bad_keywords(text: str) -> bool:
    normalized = text.lower()
    return any(kw in normalized for kw in BAD_KEYWORDS)


def get_triggered_keyword(text: str) -> str | None:
    normalized = text.lower()
    for kw in BAD_KEYWORDS:
        if kw in normalized:
            return kw
        return None
    