"use client"; 

import { useState, useEffect, useRef } from "react";
import  NoteCard  from "../../components/conversationScreen/NoteCard";
import SuggestionCard  from "../../components/conversationScreen/SuggestionCard";
import  StreamStatus  from "../../components/conversationScreen/StreamStatus";
import Sidebar from "../../components/appointmentPage/Sidebar"
import type { Note, Suggestion } from "@/types";

const DISPLAY_LIMIT = 10;
const POLL_INTERVAL = 3000;

export default function ConversationPage() {
    const [notes, setNotes] = useState<Note[]>([]);  
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);  
    const [lastUpdate, setLastUpdate] = useState<Date>(new Date());  
    const [appointmentId, setAppointmentId] = useState<string | null>(null);  
    const [error, setError] = useState<string | null>(null); 

     // reference to track the current appointment ID without re-triggering the polling effect  
    const appointmentIdRef = useRef<string | null>(null); 

    // find current appointment for logged in user via poll
    useEffect(() => {  
        async function loadCurrentAppointment() {  
        try {  
            const response = await fetch("/api/appointments/current");  
            if (!response.ok) {    
                const data = await response.json();    
                setError(data.error || "Could not find current appointment");    
                return;    
            } 
            const appointment = await response.json();  
            setError(null);  

            // if the appointment changed, clear the old notes/suggestions
            if (appointment.id !== appointmentIdRef.current) {  
                appointmentIdRef.current = appointment.id;  
                setAppointmentId(appointment.id);  
                setNotes([]);  
                setSuggestions([]);  
            } 


        } catch {  
            setError("Failed to connect to server");  
        }  
        }
        // check immediately, then every POLL_INTERVAL  
        loadCurrentAppointment();    
        const interval = setInterval(loadCurrentAppointment, POLL_INTERVAL);  
        return () => clearInterval(interval);  
    }, []);  
    
    // once there is an appointmentId, poll for notes and suggestions every POLL_INTERVAL miliseconds  
    useEffect(() => {  
        if (!appointmentId) return;  
    
        async function fetchData() {  
        try {  
            const [notesResponse, suggestionsResponse] = await Promise.all([  
            fetch(`/api/notes?appointmentId=${appointmentId}`),  
            fetch(`/api/suggestions?appointmentId=${appointmentId}`),  
            ]);  
    
            if (notesResponse.ok) {  
            const notesData = await notesResponse.json();  
            setNotes(  
                notesData.map((n: Note) => ({  
                    ...n,  
                    timestamp: new Date(n.timestamp),  
                }))  
            );  
            }  
    
            if (suggestionsResponse.ok) {  
            const suggestionsData = await suggestionsResponse.json();  
            setSuggestions(  
                suggestionsData.map((s: Suggestion) => ({  
                    ...s,  
                    timestamp: new Date(s.timestamp),  
                }))  
            );  
            }  
    
            setLastUpdate(new Date());  
        } catch (err) {  
            console.error("Polling error:", err);  
        } 
        }
    
        // fetch immediately, then every 3 seconds  
        fetchData();  
        const interval = setInterval(fetchData, POLL_INTERVAL);  
        return () => clearInterval(interval);  
    }, [appointmentId]); 

    // show error/no-appointment state  
    if (error) {  
        return (  
            <div className="flex h-screen size-full overflow-hidden bg-[#F4F7F7] p-4">  
                <Sidebar />  
                <main className="flex-1 flex items-center justify-center">  
                    <div className="text-center">  
                        <h2 className="text-xl font-semibold text-gray-950">No Active Appointment</h2>  
                        <p className="mt-2 text-sm text-gray-500">{error}</p>  
                    </div>  
                </main>  
            </div>  
        );  
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
