# Validator

Checks if a response from an LLM fits the proper format and contains no blocked content.

Blocks keywords like **"as your AI assistant"** or **"ignore previous instructions"**, and rejects any tag other than `<Note>` or `<Suggestion>`.



## Module Structure

| File | Responsibility |
|---|---|
| `validation_errors.py` | Holds the `ValidationResult` dataclass and error type constants |
| `keywords.py` | Bad keyword list to block prompt injections and AI identity reveals |
| `parser.py` | Parses raw LLM XML output into a structured `ParsedResponse` object |
| `response_validator.py` | Orchestrates the full validation chain |



## Usage

```python
from validator import validate_llm_response

result = validate_llm_response(raw_output)

if not result.is_valid:
    print(result.to_error_dict())
```



## Sample Input / Output

###  Valid response

**Input:**
```xml
<Suggestion>Consider reviewing the patient's blood pressure history.</Suggestion>
```

**Output:**
```python
ValidationResult(is_valid=True, error_type=None, msg=None)
```



### Invalid tag

**Input:**
```xml
<Answer>Consider reviewing the patient's blood pressure history.</Answer>
```

**Output:**
```python
ValidationResult(
    is_valid=False,
    error_type="parse_error",
    msg="No valid <Note> or <Suggestion> tag found"
)
```



### Multiple tags

**Input:**
```xml
<Note>Check vitals.</Note><Suggestion>Review history.</Suggestion>
```

**Output:**
```python
ValidationResult(
    is_valid=False,
    error_type="parse_error",
    msg="Response must contain exactly one tag"
)
```



### Blocked keyword

**Input:**
```xml
<Note>As your AI assistant, I recommend reviewing the patient's history.</Note>
```

**Output:**
```python
ValidationResult(
    is_valid=False,
    error_type="keyword-error",
    msg="Bad keyword detected: 'as your ai assistant'"
)
```