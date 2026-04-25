from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from pydantic import BaseModel, Field

from app.auth import verify_api_key
from app.batch_log import log_sent_batch, read_sent_batches
from app.llm_gate import generate_question_from_batch, read_next_batch


load_dotenv()

app = FastAPI(
    title="Trad LLM - Question Generation Gate",
    description=(
        "Receives transcript batches from the batching module and returns "
        "one generated question for Med Brain."
    ),
    version="0.1.0",
)


class QuestionGenerationRequest(BaseModel):
    batch: str = Field(
        ...,
        min_length=1,
        description="Transcript batch string produced by the existing batching module.",
        examples=["Patient says the pain started yesterday and gets worse when breathing."],
    )


class QuestionGenerationResponse(BaseModel):
    question: str = Field(description="Question generated from the transcript batch.")


class SentBatchRecord(BaseModel):
    created_at: str
    source: str
    batch: str
    question: str


@app.get("/health", tags=["health"])
async def health():
    return {"status": "ok"}


@app.post(
    "/question-generation",
    response_model=QuestionGenerationResponse,
    summary="Generate a medical LLM question from a transcript batch",
    description=(
        "Accepts a batch string from the existing batching module, calls Ollama "
        "with the question-generation system prompt, logs the sent batch, and "
        "returns a single generated question."
    ),
)
async def generate_question(
    body: QuestionGenerationRequest,
    _: str = Depends(verify_api_key),
) -> QuestionGenerationResponse:
    try:
        question = await generate_question_from_batch(body.batch)
        log_sent_batch(body.batch, question, source="request")
        return QuestionGenerationResponse(question=question)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Ollama unreachable or returned an unexpected error: {exc}",
        )


@app.post(
    "/question-generation/from-batching",
    response_model=QuestionGenerationResponse,
    summary="Read the next batch and generate a medical LLM question",
    description=(
        "Calls the existing batching module endpoint, forwards the returned batch "
        "to Ollama for question generation, logs the sent batch, and returns the question."
    ),
)
async def generate_question_from_next_batch(
    _: str = Depends(verify_api_key),
) -> QuestionGenerationResponse:
    try:
        batch = await read_next_batch()
        if not batch:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No batch is currently available.",
            )

        question = await generate_question_from_batch(batch)
        log_sent_batch(batch, question, source="batching")
        return QuestionGenerationResponse(question=question)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Batching or Ollama endpoint returned an unexpected error: {exc}",
        )


@app.get(
    "/question-generation/batches",
    response_model=list[SentBatchRecord],
    summary="Read batches sent for question generation",
    description="Returns the latest transcript batches sent through the question-generation gateway.",
)
async def list_sent_batches(
    limit: int = 50,
    _: str = Depends(verify_api_key),
) -> list[SentBatchRecord]:
    if limit < 1 or limit > 500:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="limit must be between 1 and 500",
        )

    return read_sent_batches(limit=limit)
