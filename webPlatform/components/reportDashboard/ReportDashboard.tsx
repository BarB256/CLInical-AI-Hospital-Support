"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { mockReports } from "./mockData";
import ReportRow from "./ReportRow";

export default function ReportDashboard() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? mockReports.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.content.toLowerCase().includes(query.toLowerCase()) ||
          r.patientName.toLowerCase().includes(query.toLowerCase()) ||
          r.patientSurname.toLowerCase().includes(query.toLowerCase()) ||
          r.date.toLowerCase().includes(query.toLowerCase())
      )
    : mockReports;

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>

        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#2CA6AE] focus:ring-2 focus:ring-[#2CA6AE]/20 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-3xl bg-white shadow-sm border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50/80 sticky top-0">
            <tr>
              <th className="w-14 py-4 pl-4 text-left text-xs font-bold tracking-widest text-gray-400"> </th>
              <th className="py-4 px-4 text-left text-xs font-bold tracking-widest text-[#2CA6AE]">PATIENT</th>
              <th className="py-4 px-4 text-left text-xs font-bold tracking-widest text-[#2CA6AE]">DATE</th>
              <th className="py-4 px-4 text-left text-xs font-bold tracking-widest text-[#2CA6AE]">TITLE</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm text-gray-500">
                  No reports found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((report) => (
                <ReportRow key={report.id} report={report} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
