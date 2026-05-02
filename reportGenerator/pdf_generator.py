from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.pagesizes import letter
from emailService.app.db import fetch_report_sections
from emailService.app.db import fetch_report
from emailService.app.db import _get_connection
from psycopg2.extras import RealDictCursor
import os
import httpx


def add_part(merged_file, rml_string):
    try:
        merged_file += rml_string
        return merged_file
    except Exception as e:
        print(f"Error adding part: {e}")

def loop_reports(report_id: str):
    merged_file = ""
    sections = fetch_report_sections(report_id)
    
    for section in sections[:3]:
        if section['content']:
            merged_file = add_part(merged_file, section['content'])
    
    return merged_file
    
def generate_formatted_pdf(merged_file, output_file):
    try:
        doc = SimpleDocTemplate(output_file, pagesize=letter)
        doc.build([Paragraph(merged_file)])
    except Exception as e:
        print(f"Error generating PDF: {e}")


def fetch_reports_for_processing() -> list[dict]:
    """Fetch all reports where preview is NOT false (null or true)"""
    with _get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT id, patient_name, patient_surname, doctor_name, 
                       title, date, content, preview
                FROM reports
                WHERE preview IS NOT FALSE
                ORDER BY date DESC
                """,
            )
            return cur.fetchall()

def update_report_preview_flag(report_id: str, preview_value):
    """Update report preview flag: None, True, or False"""
    with _get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE reports
                SET preview = %s
                WHERE id = %s
                """,
                (preview_value, report_id),
            )
        conn.commit()

def send_to_preview_ui(report_id: str, report_data: dict):
    """Forward structured report to preview UI via HTTP POST"""
    try:
        # Fetch all report sections
        sections = fetch_report_sections(report_id)
        
        # Structure the data for preview UI
        structured_data = {
            "report_id": report_id,
            "patient_name": report_data['patient_name'],
            "patient_surname": report_data['patient_surname'],
            "doctor_name": report_data['doctor_name'],
            "title": report_data['title'],
            "date": str(report_data['date']),
            "sections": [
                {
                    "title": section['title'],
                    "content": section['content'],
                    "status": section['status']
                }
                for section in sections
            ]
        }
        
        # POST to preview endpoint
        preview_endpoint = os.getenv("PREVIEW_UI_ENDPOINT", "http://localhost:3000/api/reports/preview")
        
        with httpx.Client() as client:
            response = client.post(
                f"{preview_endpoint}/{report_id}",
                json=structured_data,
                timeout=10.0
            )
            response.raise_for_status()
        
        print(f"Preview sent to UI: Report {report_id}")
        print(f"Patient: {report_data['patient_name']} {report_data['patient_surname']}")
        print(f"Doctor: {report_data['doctor_name']}")
        print(f"Sections: {len(sections)} received")
        
    except httpx.RequestError as e:
        print(f"Could not connect to preview UI at {os.getenv('PREVIEW_UI_ENDPOINT')}: {e}")
    except Exception as e:
        print(f"Error sending to preview UI: {e}")

def process_report(report_id: str, output_dir: str = "reports/"):
    """
    Main logic to handle report based on preview flag
    - preview=NULL: Send to preview UI
    - preview=TRUE: Generate PDF and set to FALSE
    - preview=FALSE: Skip (already processed)
    """
    try:
        report = fetch_report(report_id)
        if not report:
            print(f"Report {report_id} not found")
            return
        
        preview_flag = report.get('preview')
        
        if preview_flag is None:
            # Preview mode: send to UI, leave flag unchanged
            print(f"Processing report {report_id} in PREVIEW mode")
            send_to_preview_ui(report_id, report)
            
        elif preview_flag is True:
            # Production mode: generate PDF and set flag to false
            print(f"Processing report {report_id} in PRODUCTION mode")
            
            # Fetch and merge sections
            merged_content = loop_reports(report_id)
            
            # Generate PDF
            generate_formatted_pdf(merged_content, f"{output_dir}report_{report_id}.pdf")
            
            # Update flag to false (already sent)
            update_report_preview_flag(report_id, False)
            print(f"Report marked as processed")
            
        elif preview_flag is False:
            # Already processed: skip
            print(f"Report {report_id} already processed, skipping")
            
    except Exception as e:
        print(f" Error processing report {report_id}: {e}")

def process_all_pending_reports(output_dir: str = "reports/"):
    """Process all reports that need processing (preview NULL or TRUE)"""
    try:
        reports = fetch_reports_for_processing()
        print(f"Found {len(reports)} reports to process")
        
        for report in reports:
            process_report(report['id'], output_dir)
            
    except Exception as e:
        print(f"Error in batch processing: {e}")
