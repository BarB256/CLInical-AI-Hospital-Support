import { useState, useEffect } from "react";
import { Pencil, CheckCircle, X, CheckCircle2 } from "lucide-react";
import type { SectionEditorProps as Props } from "@/types";

// Renders plain-text content styled to match the generated PDF output.
// Parses line-by-line: indented bullets, top-level bullets, headings (ends with ':'), numbered items, plain text.
function DocumentPreview({ content }: { content: string }) {
  const lines = content.split("\n");

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

  // Sync draft when content arrives after the async fetch.
  // Skipped while editing to avoid overwriting in-progress changes.
  useEffect(() => {
    if (content !== null && !isEditing) {
      setDraft(content);
    }
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleCancel() {
    setDraft(content ?? "");
    onEdit("");
  }

  function handleAccept() {
    onAccept(section.id, draft);
  }

  const isLoading = content === null;

  return (
    <div className="flex h-full flex-col bg-white rounded-3xl overflow-hidden">

      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>

          {section.status === "accepted" ? (
            <span className="flex items-center gap-1.5 rounded-full bg-[#E6F7F7] px-3 py-1 text-xs font-semibold text-[#2CA6AE]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Accepted
            </span>
          ) : (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
              Pending review
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleAccept}
                className="flex items-center gap-1.5 rounded-xl bg-[#2CA6AE] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1d8a91]"
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </button>
            </>
          ) : (
            <button
              disabled={isLoading}
              onClick={() => { setDraft(content ?? ""); onEdit(section.id); }}
              className="flex items-center gap-1.5 rounded-xl border border-[#2CA6AE] px-4 py-2 text-sm font-medium text-[#2CA6AE] transition hover:bg-[#E6F7F7] disabled:opacity-40 disabled:cursor-not-allowed"
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
            className="w-full h-full min-h-[400px] resize-none rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-800 outline-none transition focus:border-[#2CA6AE] focus:ring-2 focus:ring-[#2CA6AE]/20 focus:bg-white font-mono"
            spellCheck
            autoFocus
          />
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm px-10 py-8">
              <div className="mb-6 pb-5 border-b-2 border-[#2CA6AE]">
                <p className="text-xs font-bold tracking-widest text-[#2CA6AE] mb-1">
                  SAINT HARMONY&apos;S CLINIC — CLINICAL REPORT
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
