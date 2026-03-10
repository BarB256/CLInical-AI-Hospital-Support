import os
import httpx
from app.system_prompt import SYSTEM_PROMPT

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/chat")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "medllama2")


async def ask_medical_llm(question: str) -> str:
    """
    forwards a question from the Trad LLM to the medical LLM via ollama
    applies the medical system prompt and returns the raw response string
    the validator is responsible for parsing the response
    """
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            OLLAMA_URL,
            json={
                "model": OLLAMA_MODEL,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": question},
                ],
                "stream": False,
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["message"]["content"]