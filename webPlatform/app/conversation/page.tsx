"use client"; 

import { useState } from "react";
import  NoteCard  from "../../components/conversationScreen/NoteCard";
import SuggestionCard  from "../../components/conversationScreen/SuggestionCard";
import  StreamStatus  from "../../components/conversationScreen/StreamStatus";
import Sidebar from "../../components/appointmentPage/Sidebar"
import type { Note, Suggestion } from "@/types";

const DISPLAY_LIMIT = 10;

const initialNotes: Note[] = [
  {
    id: "1",
    content: "Patient reported improved mobility after physical therapy session. Continue current treatment plan.",
    source: "Dr. Whitaker",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "2",
    content: "Lab results indicate normal glucose levels. No immediate action required.",
    source: "Lab Services",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "3",
    content: "Follow-up appointment scheduled for next week. Reminder sent to patient.",
    source: "Scheduling",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];

const initialSuggestions: Suggestion[] = [
  {
    id: "1",
    title: "Review medication dosage",
    description: "Patient weight change may require adjustment to current prescription.",
    priority: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: "2",
    title: "Schedule preventive screening",
    description: "Patient is due for annual wellness check based on age and medical history.",
    priority: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "3",
    title: "Update contact information",
    description: "Patient phone number bounced on last communication attempt.",
    priority: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
];

const mockNoteContent = [
  "Vital signs recorded: BP 120/80, HR 72, Temp 98.6°F. All within normal range.",
  "Patient questionnaire completed. No new concerns reported.",
  "Prescription refill approved and sent to pharmacy.",
  "Insurance verification completed. Coverage confirmed.",
  "Care team meeting notes uploaded to patient file.",
];

const mockSources = ["Dr. Santos", "Nurse Johnson", "Pharmacy", "Admin", "Care Coordinator"];

const mockSuggestions = [
  {
    title: "Consider specialist referral",
    description: "Symptoms may benefit from cardiology consultation based on recent tests.",
    priority: "high" as const,
  },
  {
    title: "Update care plan documentation",
    description: "Recent changes to treatment protocol need to be reflected in system.",
    priority: "medium" as const,
  },
  {
    title: "Patient education materials",
    description: "Send recommended reading on nutrition and exercise guidelines.",
    priority: "low" as const,
  },
  {
    title: "Verify emergency contact",
    description: "Secondary contact information is over 2 years old.",
    priority: "medium" as const,
  },
];

function pickItem<T>(items: T[]): T {
  const safeIndex = Math.min(Math.floor(Math.random() * items.length), items.length - 1);
  return items[safeIndex];
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  function clearNewFlags() {
    setNotes((prev) => prev.slice(0, DISPLAY_LIMIT).map((note) => ({ ...note, isNew: false })));
    setSuggestions((prev) => prev.slice(0, DISPLAY_LIMIT).map((suggestion) => ({ ...suggestion, isNew: false })));
  }

  function addMockUpdate() {
    const timestamp = new Date();
    const shouldAddNote = notes.length <= suggestions.length;

    clearNewFlags();
    setLastUpdate(timestamp);

    if (shouldAddNote) {
      addNote(timestamp);
      return;
    }

    addSuggestion(timestamp);
  }

  function addNote(timestamp: Date) {
    const newNote: Note = {
      id: `note-${timestamp.getTime()}`,
      content: pickItem(mockNoteContent),
      source: pickItem(mockSources),
      timestamp,
      isNew: true,
    };

    setNotes((prev) => [newNote, ...prev].slice(0, DISPLAY_LIMIT));
  }

  function addSuggestion(timestamp: Date) {
    const suggestion = pickItem(mockSuggestions);
    const newSuggestion: Suggestion = {
      id: `suggestion-${timestamp.getTime()}`,
      ...suggestion,
      timestamp,
      isNew: true,
    };

    setSuggestions((prev) => [newSuggestion, ...prev].slice(0, DISPLAY_LIMIT));
  }

  return (
  <div className="flex h-screen size-full overflow-hidden bg-[#F4F7F7] p-4">
    <Sidebar />

    <main className="flex-1 overflow-auto px-6 py-3">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-950">Diagnosis Support</h1>
          <p className="mt-1 text-sm text-gray-500">Triage notes and AI suggestions for active patient review.</p>
        </div>
        <div className="flex items-center gap-3">
          <StreamStatus isConnected={true} lastUpdate={lastUpdate} />
          <button
            onClick={addMockUpdate}
            className="rounded-lg bg-[#167980] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#12666c]"
          >
            Add update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-950">Notes</h2>
            <span className="text-sm text-muted-foreground">
              {notes.length} total
            </span>
          </div>
          <div className="space-y-3">
            {notes.slice(0, DISPLAY_LIMIT).map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-950">Suggestions</h2>
            <span className="text-sm text-muted-foreground">
              {suggestions.length} total
            </span>
          </div>
          <div className="space-y-3">
            {suggestions.slice(0, DISPLAY_LIMIT).map((suggestion) => (
              <SuggestionCard key={suggestion.id} {...suggestion} />
            ))}
          </div>
        </section>
      </div>
    </main>
  </div>
  );
}
