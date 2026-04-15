"use client"; 

import { useState, useEffect } from "react";
import  NoteCard  from "../../components/conversationScreen/NoteCard";
import SuggestionCard  from "../../components/conversationScreen/SuggestionCard";
import  StreamStatus  from "../../components/conversationScreen/StreamStatus";
import Sidebar from "../../components/appointmentPage/Sidebar"
// Mock data structure matching future API shape
interface Note {
  id: string;
  content: string;
  source: string;
  timestamp: Date;
  isNew?: boolean;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  timestamp: Date;
  isNew?: boolean;
}

// Mock initial data
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

export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate realtime streaming with mock data
  useEffect(() => {
    // In production, this would be replaced with WebSocket or SSE connection:
    // const ws = new WebSocket('wss://your-api/stream');
    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'note') setNotes(prev => [data, ...prev]);
    //   if (data.type === 'suggestion') setSuggestions(prev => [data, ...prev]);
    // };

    const interval = setInterval(() => {
      const shouldAddNote = Math.random() > 0.5;
      const timestamp = new Date();
      setLastUpdate(timestamp);

      if (shouldAddNote) {
        const mockNotes = [
          "Vital signs recorded: BP 120/80, HR 72, Temp 98.6°F. All within normal range.",
          "Patient questionnaire completed. No new concerns reported.",
          "Prescription refill approved and sent to pharmacy.",
          "Insurance verification completed. Coverage confirmed.",
          "Care team meeting notes uploaded to patient file.",
        ];

        const sources = ["Dr. Santos", "Nurse Johnson", "Pharmacy", "Admin", "Care Coordinator"];

        const newNote: Note = {
          id: `note-${Date.now()}`,
          content: mockNotes[Math.floor(Math.random() * mockNotes.length)],
          source: sources[Math.floor(Math.random() * sources.length)],
          timestamp,
          isNew: true,
        };

        setNotes((prev) => [newNote, ...prev].slice(0, 10));
      } else {
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

        const suggestion = mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)];

        const newSuggestion: Suggestion = {
          id: `suggestion-${Date.now()}`,
          ...suggestion,
          timestamp,
          isNew: true,
        };

        setSuggestions((prev) => [newSuggestion, ...prev].slice(0, 10));
      }

      // Clear "new" status after animation
      setTimeout(() => {
        setNotes((prev) => prev.map((note) => ({ ...note, isNew: false })));
        setSuggestions((prev) => prev.map((sug) => ({ ...sug, isNew: false })));
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
  <div className="size-full h-screen bg-[#F8F7F3] overflow-auto flex">
    <Sidebar />

    <div className="flex-1 p-6">
      <div className="mb-8">
          <div className="flex items-center justify-between mb-2 font-bold text-xl">
            <h1 className="text-foreground">Diagnosis Support</h1>
            <StreamStatus isConnected={isConnected} lastUpdate={lastUpdate} />
          </div>
          
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-xl font-semibold">Notes</h2>
            <span className="text-sm text-muted-foreground">
              {notes.length} total
            </span>
          </div>
          <div className="space-y-3">
            {notes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-xl font-semibold">Suggestions</h2>
            <span className="text-sm text-muted-foreground">
              {suggestions.length} total
            </span>
          </div>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} {...suggestion} />
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
  );
}