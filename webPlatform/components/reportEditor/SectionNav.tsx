"use client";

import { useState } from "react";
import { CheckCircle, User, Calendar, Stethoscope, Search } from "lucide-react";
import type { SectionNavProps as Props } from "@/types";

const SECTION_DISPLAY_LIMIT = 80;

export default function SectionNav({ meta, sections, activeSectionId, onSelectSection }: Props) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const acceptedCount = sections.filter((s) => s.status === "accepted").length;
  const totalCount = sections.length;
  const allAccepted = acceptedCount === totalCount;

  const filtered = normalizedQuery
    ? sections.filter((s) => s.title.toLowerCase().includes(normalizedQuery))
    : sections;
  const visibleSections = filtered.slice(0, SECTION_DISPLAY_LIMIT);

  return (
    <div className="flex h-full flex-col gap-4">

      <div className="rounded-xl bg-[#167980] p-5 text-white">
        <p className="text-xs font-bold tracking-widest opacity-70 mb-3">CLINICAL REPORT</p>

        <div className="flex items-center gap-2 mb-1">
          <User className="h-4 w-4 opacity-80" />
          <span className="font-bold text-base">{meta.patientName}</span>
        </div>
        <p className="text-xs opacity-70 mb-4">ID: {meta.patientId}</p>

        <div className="flex items-center gap-2 mb-1">
          <Stethoscope className="h-4 w-4 opacity-80" />
          <span className="text-sm">{meta.doctorName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 opacity-80" />
          <span className="text-sm">{meta.date}</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto rounded-xl border border-gray-100 bg-white p-4">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter sections…"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-3 text-xs text-gray-700 outline-none transition focus:border-[#2CA6AE] focus:ring-1 focus:ring-[#2CA6AE]/30 focus:bg-white"
          />
        </div>

        <p className="px-1 text-xs font-bold tracking-widest text-[#167980]">SECTIONS</p>

        <div className="flex flex-col gap-1">
          {filtered.length === 0 && (
            <p className="text-xs text-gray-400 px-2 py-4 text-center">No sections match.</p>
          )}

          {visibleSections.map((section) => {
            const isActive = section.id === activeSectionId;
            const isAccepted = section.status === "accepted";
            const originalIndex = sections.findIndex((s) => s.id === section.id);

            return (
              <button
                key={section.id}
                onClick={() => onSelectSection(section.id)}
                className={`flex items-center gap-3 w-full rounded-lg px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-[#167980] text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="shrink-0 w-5 flex items-center justify-center">
                  {isAccepted ? (
                    <CheckCircle className={`h-4 w-4 ${isActive ? "text-white" : "text-[#167980]"}`} />
                  ) : (
                    <span className={`text-xs font-bold ${isActive ? "text-white/70" : "text-gray-400"}`}>
                      {originalIndex + 1}
                    </span>
                  )}
                </span>

                <span className="text-sm font-medium leading-tight flex-1">{section.title}</span>

                {!isAccepted && !isActive && (
                  <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 rounded-xl border border-gray-100 bg-white p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Sections reviewed</span>
          <span className="text-xs font-bold text-[#167980]">{acceptedCount}/{totalCount}</span>
        </div>

        <div className="h-1.5 w-full rounded-full bg-gray-100 mb-4">
          <div
            className="h-1.5 rounded-full bg-[#167980] transition-all duration-500"
            style={{ width: `${(acceptedCount / totalCount) * 100}%` }}
          />
        </div>

        <button
          disabled={!allAccepted}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-all ${
            allAccepted
              ? "bg-[#167980] text-white hover:bg-[#12666c]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {allAccepted ? "Submit Report" : "Review all sections first"}
        </button>
      </div>

    </div>
  );
}
