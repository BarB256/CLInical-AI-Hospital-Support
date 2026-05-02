from dotenv import load_dotenv
from fastapi import FastAPI
from app.routes import router

load_dotenv()

app = FastAPI(
    title="Email Service",
    description="Sends medical reports to patients via email.",
    version="0.1.0",
)

app.include_router(router)


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok"}
