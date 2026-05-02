def build_email(report: dict, sections: list[dict]) -> tuple[str, str, str]:
    subject = (
        f"Medical Report – {report['patient_name']} {report['patient_surname']}"
        f" – {report['date']}"
    )
    return subject, _build_html(report, sections), _build_text(report, sections)


def _build_html(report: dict, sections: list[dict]) -> str:
    sections_html = "".join(
        f"<h2>{section['title']}</h2><p>{section['content'] or 'N/A'}</p>"
        for section in sections
    )
    stamp = (
        f"Best Regards,<br><strong>Dr. {report['doctor_name']}</strong>"
        "<br>CLInical Hospital Support"
    )
    return f"""<html><body>
<h1>{report['title']}</h1>
<p><strong>Patient:</strong> {report['patient_name']} {report['patient_surname']}</p>
<p><strong>Date:</strong> {report['date']}</p>
<p><strong>Doctor:</strong> Dr. {report['doctor_name']}</p>
<hr>{sections_html}<hr>
<p>{stamp}</p>
</body></html>"""


def _build_text(report: dict, sections: list[dict]) -> str:
    lines = [
        report["title"],
        f"Patient: {report['patient_name']} {report['patient_surname']}",
        f"Date: {report['date']}",
        f"Doctor: Dr. {report['doctor_name']}",
        "",
    ]
    for section in sections:
        lines += [section["title"], section["content"] or "N/A", ""]
    lines += ["Best Regards,", f"Dr. {report['doctor_name']}", "CLInical Hospital Support"]
    return "\n".join(lines)
