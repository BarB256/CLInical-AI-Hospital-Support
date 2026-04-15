"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Download } from "lucide-react";
import type { ReportListItem } from "./mockTypes";

type Props = {
  report: ReportListItem;
};

export default function ReportRow({ report }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadPdf = () => {
    const blob = new Blob([""], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${report.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 pr-4 pl-4">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-400" />
          </button>

          {menuOpen && (
            <div className="absolute left-0 top-full mt-1 z-10 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[160px]">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          )}
        </div>
      </td>
      <td className="py-4 pr-4 text-sm text-gray-900">{report.patientName} {report.patientSurname}</td>
      <td className="py-4 pr-4 text-sm text-gray-500">{report.date}</td>
      <td className="py-4 text-sm text-gray-900">{report.title}</td>
    </tr>
  );
}
