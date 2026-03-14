import re 
from dataclasses import dataclass 

ALLOWED_TAGS = ("Note", "Suggestion")
TAG_PATTERN = re.compile(r"<(Note|Suggestion)>(.*?)</\1>", re.DOTALL)

@dataclass
class ParsedResponse:
    is_parsed; bool 
    type: str | None = None
    msg: str | None = None
    parse_error: str | None = None

    def to_dict(self) -> dict:
        return {"type": self.type, "msg": self.msg}
    


def parse_llm_output(raw_output: str) -> ParsedResponse:
    cleaned = raw_output.strip()
    match = TAG_PATTERN.search(cleaned)

    if not match:
        return ParsedResponse(
            is_parsed=False,
            parse_error="No valid <Note> or <Suggestion> tag found"
        )

    return _build_parsed_response(match, cleaned)

def _build_parsed_response(match: re.Match, full_text: str) -> ParsedResponse:
    tag = match.group(1)
    content = match.group(2).strip()

    if _has_multiple_tags(full_text):
        return ParsedResponse(
            is_parsed=False,
            parse_error="Response must contain exactly one tag"
        )

    return ParsedResponse(is_parsed=True, type=tag, msg=content)


def _has_multiple_tags(text: str) -> bool:
    return len(TAG_PATTERN.findall(text)) > 1

    