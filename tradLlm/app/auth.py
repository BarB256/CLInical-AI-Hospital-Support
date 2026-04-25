import os

from fastapi import HTTPException, Security, status
from fastapi.security.api_key import APIKeyHeader


API_KEY_HEADER = APIKeyHeader(name="X-API-Key", auto_error=False)


def get_valid_keys() -> set[str]:
    raw = os.getenv("API_KEYS", "")
    return {key.strip() for key in raw.split(",") if key.strip()}


async def verify_api_key(api_key: str = Security(API_KEY_HEADER)) -> str:
    valid_keys = get_valid_keys()

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-API-Key header",
        )

    if api_key not in valid_keys:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
        )

    return api_key
