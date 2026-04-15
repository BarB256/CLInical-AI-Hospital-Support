export type SectionStatus = "pending" | "accepted";

// GET /api/reports/:id
export type ReportMeta = {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
};

// GET /api/reports/:id/sections  — list payload, no content
export type ReportSectionSummary = {
  id: string;
  title: string;
  status: SectionStatus;
};

// GET /api/reports/:id/sections/:sectionId  — detail payload, includes content
export type ReportSection = ReportSectionSummary & {
  content: string;
};
