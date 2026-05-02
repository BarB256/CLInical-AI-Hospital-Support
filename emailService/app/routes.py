from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from app.auth import verify_api_key
from app import db, template, email_sender

router = APIRouter()


class SendReportRequest(BaseModel):
    report_id: str = Field(
        ...,
        description="UUID of the report to send.",
        examples=["a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"],
    )


class SendReportResponse(BaseModel):
    success: bool
    recipient: str


@router.post(
    "/send-report",
    response_model=SendReportResponse,
    summary="Send a report to the patient via email",
)
def send_report(
    body: SendReportRequest,
    _: str = Depends(verify_api_key),
) -> SendReportResponse:
    report = db.fetch_report(body.report_id)

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Report not found",
        )

    sections = db.fetch_report_sections(body.report_id)
    subject, html, text = template.build_email(report, sections)

    try:
        email_sender.send_email(report["patient_email"], subject, html, text)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Failed to send email: {exc}",
        )

    return SendReportResponse(success=True, recipient=report["patient_email"])
