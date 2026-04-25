import { useState } from "react";
import { Pencil, CheckCircle, X, CheckCircle2 } from "lucide-react";
import type { SectionEditorProps as Props } from "@/types";

// Renders plain-text content styled to match the generated PDF output.
// Parses line-by-line: indented bullets, top-level bullets, headings (ends with ':'), numbered items, plain text.
function DocumentPreview({ content }: { content: string }) {
  const lines = content.split("\n").slice(0, 240);

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (line.trim() === "") {
          return <div key={i} className="h-3" />;
        }
        if (/^   - /.test(line)) {
          return (
            <div key={i} className="flex items-start gap-2 pl-6">
              <span className="mt-2 h-1 w-1 rounded-full bg-[#2CA6AE] shrink-0" />
              <p className="text-sm leading-7 text-gray-700">{line.replace(/^   - /, "")}</p>
            </div>
          );
        }
        if (/^- /.test(line)) {
          return (
            <div key={i} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#2CA6AE] shrink-0" />
              <p className="text-sm leading-7 text-gray-700">{line.replace(/^- /, "")}</p>
            </div>
          );
        }
        if (/^\d+\.\s/.test(line) || /:\s*$/.test(line)) {
          return (
            <p key={i} className="text-sm font-semibold text-gray-900 pt-2 leading-7">
              {line}
            </p>
          );
        }
        return (
          <p key={i} className="text-sm leading-7 text-gray-700">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function SectionEditor({ section, content, onAccept, onEdit, isEditing }: Props) {
  const [draft, setDraft] = useState(content ?? "");

  function handleCancel() {
    setDraft(content ?? "");
    onEdit("");
  }

  function handleAccept() {
    onAccept(section.id, draft);
  }

  const isLoading = content === null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>

          {section.status === "accepted" ? (
            <span className="flex items-center gap-1.5 rounded-lg bg-[#E6F7F7] px-3 py-1 text-xs font-semibold text-[#167980]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Accepted
            </span>
          ) : (
            <span className="rounded-lg bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
              Pending review
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="flex items-center gap-1.5 rounded-lg bg-[#167980] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#12666c]"
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </button>
            </>
          ) : (
            <button
              disabled={isLoading}
              onClick={() => { setDraft(content ?? ""); onEdit(section.id); }}
              className="flex items-center gap-1.5 rounded-lg border border-[#167980] px-4 py-2 text-sm font-medium text-[#167980] transition hover:bg-[#E6F7F7] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 w-3/4 rounded bg-gray-100" />
            <div className="h-4 w-full rounded bg-gray-100" />
            <div className="h-4 w-5/6 rounded bg-gray-100" />
            <div className="h-4 w-2/3 rounded bg-gray-100" />
          </div>
        ) : isEditing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-full min-h-[400px] resize-none rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-800 outline-none transition focus:border-[#167980] focus:ring-2 focus:ring-[#167980]/20 focus:bg-white font-mono"
            spellCheck
            autoFocus
          />
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-lg border border-gray-200 bg-white px-10 py-8 shadow-sm">
              <div className="mb-6 border-b-2 border-[#167980] pb-5">
                <p className="mb-1 text-xs font-bold tracking-widest text-[#167980]">
                  SAINT HARMONY&apos;S CLINIC - CLINICAL REPORT
                </p>
                <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
              </div>
              <DocumentPreview content={content!} />
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              Preview reflects how this section will appear in the generated PDF.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
