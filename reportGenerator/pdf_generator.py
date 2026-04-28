from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.pagesizes import letter
from eavesdropper.batching.main import get_next_batch

def add_batch(merged_file, rml_string):
    try:
        merged_file += rml_string
        return merged_file
    except Exception as e:
        print(f"Error adding batch: {e}")

def loop_batch(batch_string):
    merged_file = ""
    while batch_string is not None:
        merged_file = add_batch(merged_file, batch_string)
        batch_string = get_next_batch()
    return merged_file
    
def generate_pdf(merged_file, output_file):
    try:
        doc = SimpleDocTemplate(output_file, pagesize=letter)
        doc.build([Paragraph(merged_file)])
    except Exception as e:
        print(f"Error generating PDF: {e}")