"use client";

import { useState, useEffect } from "react";
import { mockReportMeta, mockSectionList, mockSectionContent } from "./mockData";
import SectionNav from "./SectionNav";
import SectionEditor from "./SectionEditor";
import type { ReportMeta, ReportSectionSummary } from "./mockTypes";

export default function ReportLayout() {
  // ── server state ──────────────────────────────────────────────────────────
  // In production these three pieces come from separate endpoints:

  // GET /api/reports/:id
  const [meta, setMeta] = useState<ReportMeta | null>(null);

  // GET /api/reports/:id/sections  — lightweight list, no content
  const [sectionList, setSectionList] = useState<ReportSectionSummary[]>([]);

  // GET /api/reports/:id/sections/:sectionId  — fetched per section, on demand
  const [contentCache, setContentCache] = useState<Record<string, string>>({});

  // ── ui state ──────────────────────────────────────────────────────────────
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [editingSectionId, setEditingSectionId] = useState<string>("");
  const [loadingContentId, setLoadingContentId] = useState<string | null>(null);

  // Simulate initial page load: fetch report meta + section list
  useEffect(() => {
    // In production:
    //   const meta = await fetch(`/api/reports/${reportId}`).then(r => r.json());
    //   const list = await fetch(`/api/reports/${reportId}/sections`).then(r => r.json());
    setMeta(mockReportMeta);
    setSectionList(mockSectionList);

    // Pre-load the first section so there's no flicker on arrival
    const firstId = mockSectionList[0].id;
    setActiveSectionId(firstId);
    setContentCache({ [firstId]: mockSectionContent[firstId] });
  }, []);

  // Simulate: GET /api/reports/:id/sections/:sectionId
  function fetchSectionContent(id: string) {
    if (contentCache[id]) return; // already cached — skip
    setLoadingContentId(id);
    // In production: fetch(`/api/reports/${reportId}/sections/${id}`)
    setTimeout(() => {
      setContentCache((prev) => ({ ...prev, [id]: mockSectionContent[id] }));
      setLoadingContentId(null);
    }, 350);
  }

  function handleSelectSection(id: string) {
    setEditingSectionId("");
    setActiveSectionId(id);
    fetchSectionContent(id);
  }

  function handleAccept(id: string, content: string) {
    // In production: PATCH /api/reports/:id/sections/:sectionId  { content, status: "accepted" }
    setSectionList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "accepted" } : s))
    );
    setContentCache((prev) => ({ ...prev, [id]: content }));
    setEditingSectionId("");

    // Auto-advance to the next pending section
    const currentIndex = sectionList.findIndex((s) => s.id === id);
    const nextPending = sectionList.slice(currentIndex + 1).find((s) => s.status === "pending");
    if (nextPending) handleSelectSection(nextPending.id);
  }

  if (!meta || sectionList.length === 0) return null;

  const activeSection = sectionList.find((s) => s.id === activeSectionId);
  const isLoadingContent = loadingContentId === activeSectionId;
  // null = not yet fetched (shows skeleton), string = ready
  const activeContent = isLoadingContent ? null : (contentCache[activeSectionId] ?? null);

  return (
    <div className="flex gap-4 h-full">

      <aside className="w-72 shrink-0 flex flex-col h-full overflow-hidden">
        <SectionNav
          meta={meta}
          sections={sectionList}
          activeSectionId={activeSectionId}
          onSelectSection={handleSelectSection}
        />
      </aside>

      <main className="flex-1 min-w-0 h-full overflow-hidden">
        {activeSection && (
          <SectionEditor
            key={activeSectionId}
            section={activeSection}
            content={activeContent}
            isEditing={editingSectionId === activeSectionId}
            onAccept={handleAccept}
            onEdit={setEditingSectionId}
          />
        )}
      </main>

    </div>
  );
}
