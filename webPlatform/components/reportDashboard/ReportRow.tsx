"use client";

import { MoreHorizontal, Download } from "lucide-react";
import type { ReportRowProps as Props } from "@/types";

export default function ReportRow({ report }: Props) {
  function handleDownloadPdf(event: React.MouseEvent<HTMLButtonElement>) {
    const blob = new Blob([""], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `report-${report.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    event.currentTarget.closest("details")?.removeAttribute("open");
  }

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 pr-4 pl-4">
        <details className="relative">
          <summary
            aria-label="Report actions"
            className="list-none rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 [&::-webkit-details-marker]:hidden"
          >
            <MoreHorizontal className="h-5 w-5" />
          </summary>

          <div className="absolute left-0 top-full z-10 mt-1 min-w-[160px] rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            <button
              onClick={handleDownloadPdf}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </details>
      </td>
      <td className="py-4 pr-4 text-sm text-gray-900">{report.patientName} {report.patientSurname}</td>
      <td className="py-4 pr-4 text-sm text-gray-500">{report.date}</td>
      <td className="py-4 text-sm text-gray-900">{report.title}</td>
    </tr>
  );
}
