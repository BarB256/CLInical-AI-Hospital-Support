import type { ReportMeta, ReportSectionSummary } from "./mockTypes";

// Mock: GET /api/reports/:id
export const mockReportMeta: ReportMeta = {
  id: "report-2026-0042",
  patientId: "PAT-2026-0042",
  patientName: "John Eriksen",
  doctorName: "Dr. Julian Santos",
  date: "2026-04-15",
};

// Mock: GET /api/reports/:id/sections
// Lightweight list — titles and status only, no content.
export const mockSectionList: ReportSectionSummary[] = [
  { id: "patient-overview",      title: "Patient Overview",      status: "pending" },
  { id: "presenting-complaint",  title: "Presenting Complaint",  status: "pending" },
  { id: "medical-history",       title: "Medical History",       status: "pending" },
  { id: "examination-findings",  title: "Examination Findings",  status: "pending" },
  { id: "assessment",            title: "Assessment / Diagnosis",status: "pending" },
  { id: "treatment-plan",        title: "Treatment Plan",        status: "pending" },
  { id: "additional-notes",      title: "Additional Notes",      status: "pending" },
];

// Mock: GET /api/reports/:id/sections/:sectionId
// Fetched individually on demand — keyed by section ID.
export const mockSectionContent: Record<string, string> = {
  "patient-overview": `Patient: John Eriksen
Date of Birth: 14 March 1982 (44 years old)
Patient ID: PAT-2026-0042
Date of Consultation: 15 April 2026
Attending Physician: Dr. Julian Santos, Pediatrician
Facility: Saint Harmony's Clinic, Kolding, Denmark`,

  "presenting-complaint": `Patient presents with a 3-day history of persistent productive cough, mild fever (38.2°C), and generalised fatigue. Patient denies shortness of breath or chest pain at rest. Onset was gradual following close contact with a colleague displaying similar symptoms approximately 5 days prior.`,

  "medical-history": `Past Medical History:
- Seasonal allergic rhinitis (ongoing, managed with antihistamines)
- Appendectomy (2015, uncomplicated)

Current Medications:
- Cetirizine 10 mg once daily (PRN)

Allergies:
- Penicillin — maculopapular rash (documented 2019)

Social History:
- Non-smoker, occasional alcohol use
- Works in open-plan office environment

Family History:
- Father: Type 2 diabetes, hypertension
- Mother: No significant conditions reported`,

  "examination-findings": `Vital Signs:
- Temperature: 38.2°C
- Blood Pressure: 118/76 mmHg
- Heart Rate: 88 bpm (regular)
- Respiratory Rate: 18 breaths/min
- O₂ Saturation: 97% on room air

General: Alert and oriented ×3. Mild distress secondary to cough. No cyanosis or clubbing.

Respiratory: Mild bilateral crackles on auscultation in the lower lobes. No wheeze. Percussion resonant throughout. Trachea central.

Cardiovascular: Regular rate and rhythm. S1/S2 present, no murmurs or added sounds.

Abdomen: Soft, non-tender, non-distended. No hepatosplenomegaly.

Neurological: No focal deficits noted.`,

  "assessment": `Primary Diagnosis:
- Community-acquired pneumonia (CAP), mild severity — ICD-10: J18.9

Differential Diagnoses:
- Acute bronchitis (J20.9)
- Viral upper respiratory tract infection (J06.9)

Clinical Reasoning:
Presentation is consistent with mild CAP given bilateral basal crackles, low-grade fever, productive cough, and recent epidemiological exposure. PSI/PORT score assessment pending CXR result. Severity classified as CURB-65 score 1 (fever only), indicating outpatient management is appropriate.`,

  "treatment-plan": `1. Antibiotic therapy:
   - Penicillin allergy on record — do NOT prescribe amoxicillin
   - Clarithromycin 500 mg twice daily for 5 days (first-line alternative for CAP in penicillin-allergic patients)

2. Symptomatic relief:
   - Paracetamol 1 g every 6 hours as needed for fever or discomfort
   - Adequate oral hydration (minimum 2 L/day)
   - Rest advised for 3–5 days

3. Investigations ordered:
   - Chest X-ray (PA + lateral) — to confirm consolidation
   - FBC, CRP, U&E
   - Sputum culture & sensitivity (before antibiotic initiation if possible)

4. Follow-up:
   - Review in 48–72 hours if no clinical improvement
   - Return immediately if dyspnoea worsens, O₂ sat drops below 94%, or chest pain develops
   - Patient verbally counselled on warning signs`,

  "additional-notes": `Patient was cooperative and well-informed throughout the consultation. Verbal consent obtained for the proposed treatment plan and investigations.

Patient advised to avoid close contact with vulnerable individuals (elderly, immunocompromised) until at least 48 hours after fever resolution.

This report was generated with AI-assisted clinical support (CLInical AI). All clinical findings, differential diagnoses, and treatment recommendations have been reviewed and confirmed by the attending physician prior to submission.`,
};
