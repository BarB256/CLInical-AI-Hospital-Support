import type { ReportListItem } from "./mockTypes";

export const mockReports: ReportListItem[] = [
  {
    id: "1",
    patientName: "John",
    patientSurname: "Kowalski",
    date: "2024-03-15",
    title: "Discharge Summary",
    content: "Patient discharged in stable condition. Recommended follow-up in 2 weeks. Medications prescribed: Metformin 500mg twice daily, Lisinopril 10mg once daily. No complications observed during stay.",
  },
  {
    id: "2",
    patientName: "Anna",
    patientSurname: "Nowak",
    date: "2024-03-14",
    title: "Laboratory Results - Blood Panel",
    content: "Complete blood count shows hemoglobin 14.2 g/dL, WBC 7,500/mcL, platelets 250,000/mcL. Metabolic panel within normal limits. Glucose 95 mg/dL, creatinine 1.0 mg/dL.",
  },
  {
    id: "3",
    patientName: "Piotr",
    patientSurname: "Wiśniewski",
    date: "2024-03-13",
    title: "Imaging Report - Chest X-Ray",
    content: "Frontal and lateral chest radiograph demonstrates clear lung fields bilaterally. No infiltrates, effusions, or pneumothorax. Heart size normal. Osseous structures unremarkable.",
  },
];
