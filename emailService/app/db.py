import os
import psycopg2
from psycopg2.extras import RealDictCursor


def _get_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))


def fetch_report(report_id: str) -> dict | None:
    with _get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT
                    r.id,
                    r.patient_name,
                    r.patient_surname,
                    r.doctor_name,
                    r.date,
                    r.title,
                    a.email AS patient_email
                FROM reports r
                JOIN accounts a ON a.id = r.patient_id
                WHERE r.id = %s
                """,
                (report_id,),
            )
            return cur.fetchone()


def fetch_report_sections(report_id: str) -> list[dict]:
    with _get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT title, content, status
                FROM report_sections
                WHERE report_id = %s
                ORDER BY created_at ASC
                """,
                (report_id,),
            )
            return cur.fetchall()
