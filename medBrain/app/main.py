from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="Med Brain - LLM Gate",
    description="Receives questions from the Trad LLM and returns validated Notes or Suggestions from a medical LLM.",
    version="0.1.0",
)

app.include_router(router)


@app.get("/health", tags=["health"])
async def health():
    return {"status": "ok"}