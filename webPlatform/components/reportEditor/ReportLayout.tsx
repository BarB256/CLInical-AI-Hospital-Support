"use client";

import { useState, useEffect } from "react";
import SectionNav from "./SectionNav";
import SectionEditor from "./SectionEditor";
import type { ReportMeta, ReportSectionSummary } from "@/types"; 

const SECTION_STATE_LIMIT = 80;

export default function ReportLayout({ reportId }: { reportId: string }) {
  const [meta, setMeta] = useState<ReportMeta | null>(null); 
  const [sectionList, setSectionList] = useState<ReportSectionSummary[]>([]);
  const [contentCache, setContentCache] = useState<Record<string, string>>({});
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [editingSectionId, setEditingSectionId] = useState<string>("");

  // fetch report meta and section list
  useEffect(() => {  
    async function loadReport() {  
      try {  
        const [metaResponse, sectionsRes] = await Promise.all([  
          fetch(`/api/reports/${reportId}`),  
          fetch(`/api/reports/${reportId}/sections`),  
        ]);  
  
        const metaData: ReportMeta = await metaResponse.json();  
        const sectionsData: ReportSectionSummary[] = await sectionsRes.json();  
  
        setMeta(metaData);  
        setSectionList(sectionsData);  
  
        // auto-select the first section and fetch its content  
        if (sectionsData.length > 0) {  
          const firstId = sectionsData[0].id;  
          setActiveSectionId(firstId);  
          fetchSectionContent(firstId);  
        }  
      } catch (error) {  
        console.error("Failed to load report:", error);  
      }  
    }  
    loadReport();  
  }, [reportId]); 

  // fetch only a single section's content (lazy loaded when selected)  
  async function fetchSectionContent(sectionId: string) {  
    if (contentCache[sectionId] !== undefined) return; // already cached  
  
    try {  
      const res = await fetch(`/api/reports/${reportId}/sections/${sectionId}`);  
      const data = await res.json();  
      setContentCache((prev) => ({ ...prev, [sectionId]: data.content ?? "" }));  
    } catch (error) {  
      console.error("Failed to load section content:", error);  
    }  
  }  


  function handleSelectSection(id: string) {
    setEditingSectionId("");
    setActiveSectionId(id);
    fetchSectionContent(id); // fetches content if not cached
  }

  async function handleAccept(id: string, content: string) {
    // update new section to database  
    try {  
      await fetch(`/api/reports/${reportId}/sections/${id}`, {  
        method: "PATCH",  
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({ status: "accepted", content }),  
      });  
    } catch (error) {  
      console.error("Failed to save section:", error);  
      return; // dont update UI if the save failed  
    }  
    
    // update the local state
    const updatedSections = sectionList.slice(0, SECTION_STATE_LIMIT).map((section) =>
      section.id === id ? { ...section, status: "accepted" as const } : section
    );

    setSectionList(updatedSections);
    setContentCache((prev) => ({ ...prev, [id]: content }));
    setEditingSectionId("");

    // automatically advance to next pending section  
    const currentIndex = updatedSections.findIndex((section) => section.id === id);
    const nextPending = updatedSections
      .slice(currentIndex + 1, currentIndex + 8)
      .find((section) => section.status === "pending");

    if (nextPending) handleSelectSection(nextPending.id);
  }

  if (!meta || sectionList.length === 0) return null;

  const activeSection = sectionList.find((s) => s.id === activeSectionId);
  const activeContent = contentCache[activeSectionId] ?? "";

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
