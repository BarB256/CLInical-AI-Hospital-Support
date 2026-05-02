from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.pagesizes import letter

def add_part(merged_file, rml_string):
    try:
        merged_file += rml_string
        return merged_file
    except Exception as e:
        print(f"Error adding part: {e}")

def loop_batch(text_string):
    merged_file = ""
    while text_string is not None:
        merged_file = add_part(merged_file, text_string)
        
    return merged_file
    
def generate_pdf(merged_file, output_file):
    try:
        doc = SimpleDocTemplate(output_file, pagesize=letter)
        doc.build([Paragraph(merged_file)])
    except Exception as e:
        print(f"Error generating PDF: {e}")