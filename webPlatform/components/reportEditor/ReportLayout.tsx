"use client";

import { useState } from "react";
import { mockReportMeta, mockSectionList, mockSectionContent } from "./mockData";
import SectionNav from "./SectionNav";
import SectionEditor from "./SectionEditor";
import type { ReportSectionSummary } from "@/types";

const initialSectionId = mockSectionList[0]?.id ?? "";
const initialContentCache = initialSectionId
  ? { [initialSectionId]: mockSectionContent[initialSectionId] }
  : {};
const SECTION_STATE_LIMIT = 80;

export default function ReportLayout() {
  const [sectionList, setSectionList] = useState<ReportSectionSummary[]>(mockSectionList);
  const [contentCache, setContentCache] = useState<Record<string, string>>(initialContentCache);
  const [activeSectionId, setActiveSectionId] = useState<string>(initialSectionId);
  const [editingSectionId, setEditingSectionId] = useState<string>("");

  function ensureSectionContent(id: string) {
    if (contentCache[id]) return;

    setContentCache((prev) => ({ ...prev, [id]: mockSectionContent[id] }));
  }

  function handleSelectSection(id: string) {
    setEditingSectionId("");
    setActiveSectionId(id);
    ensureSectionContent(id);
  }

  function handleAccept(id: string, content: string) {
    const updatedSections = sectionList.slice(0, SECTION_STATE_LIMIT).map((section) =>
      section.id === id ? { ...section, status: "accepted" as const } : section
    );

    setSectionList(updatedSections);
    setContentCache((prev) => ({ ...prev, [id]: content }));
    setEditingSectionId("");

    const currentIndex = updatedSections.findIndex((section) => section.id === id);
    const nextPending = updatedSections
      .slice(currentIndex + 1, currentIndex + 8)
      .find((section) => section.status === "pending");

    if (nextPending) handleSelectSection(nextPending.id);
  }

  if (sectionList.length === 0) return null;

  const activeSection = sectionList.find((s) => s.id === activeSectionId);
  const activeContent = contentCache[activeSectionId] ?? "";

  return (
    <div className="flex gap-4 h-full">

      <aside className="w-72 shrink-0 flex flex-col h-full overflow-hidden">
        <SectionNav
          meta={mockReportMeta}
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
