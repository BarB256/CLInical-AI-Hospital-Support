"use client";

import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";

const APPOINTMENT_DISPLAY_LIMIT = 12;

// mock appointments data - will be replaced with real data from backend later
const mockAppointments: Record<string, { time: string; title: string; color: string }[]> = {
  "2026-03-26": [
    { time: "10:30 am", title: "Meeting with chief pediatrician Dr. Whitaker", color: "bg-green-400" },
    { time: "11:00 am", title: "Consultation with Mrs. Javadi", color: "bg-[#2CA6AE]" },
    { time: "11:30 am", title: "Consultation with Mr. Stancild", color: "bg-[#2CA6AE]" },
    { time: "12:00 pm", title: "Telemedicine call with Mrs. Bond", color: "bg-yellow-400" },
    { time: "12:30 pm", title: "Follow-up with Mr. Lamar", color: "bg-pink-400" },
    { time: "01:00 pm", title: "Lunch meeting with Dr. Smith", color: "bg-gray-400" },
    { time: "02:00 pm", title: "Review patient files", color: "bg-[#2CA6AE]" },
    { time: "03:00 pm", title: "Consultation with Mr. Johnson", color: "bg-green-400" },
    { time: "03:30 pm", title: "Telemedicine call with Ms. Adams", color: "bg-yellow-400" },
    { time: "04:30 pm", title: "Department brief", color: "bg-pink-400" },
    { time: "05:00 pm", title: "End of shift review", color: "bg-gray-400" },
  ],
  "2026-03-28": [
    { time: "09:00 am", title: "Consultation with Mr. Peterson", color: "bg-[#2CA6AE]" },
    { time: "10:00 am", title: "Follow-up with Mrs. Chen", color: "bg-green-400" },
  ],
  "2026-03-30": [
    { time: "11:00 am", title: "Telemedicine call with Mr. Davis", color: "bg-yellow-400" },
  ],
};

// format date to match our mock data keys
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function AppointmentCalendar() {
  // tracks which day is selected - defaults to today
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const calendarModifiers = useMemo(() => ({ today }), [today]);
  const calendarModifiersStyles = useMemo(
    () => ({
      today: {
        fontWeight: "900",
        color: "#2CA6AE",
      },
    }),
    []
  );

  // get appointments for the selected day
  const selectedKey = formatDate(selectedDate);
  const appointments = mockAppointments[selectedKey] || [];

  // format the selected date for the list header
  const dateLabel = selectedDate.toLocaleDateString("en-GB", {
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <div className="flex gap-4 h-full w-full overflow-hidden">

      {/* appointment list for selected day */}
      <div className="flex flex-col w-[40%] shrink-0 overflow-y-auto pr-2">
        <h3 className="text-[#2CA6AE] font-bold text-base tracking-widest mb-6">
          {dateLabel}
        </h3>

        {appointments.length === 0 ? (
          <p className="text-gray-400 text-base">No appointments for this day.</p>
        ) : (
          <div className="flex flex-col">
            {appointments.slice(0, APPOINTMENT_DISPLAY_LIMIT).map((appointment, index) => (
              <div
                key={index}
                className="flex items-center gap-3 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors group"
              >
                <span className="text-[#2CA6AE] text-base font-medium w-20 shrink-0">
                  {appointment.time}
                </span>
                <span className={`h-3 w-3 rounded-full shrink-0 ${appointment.color}`} />
                <span className="text-gray-800 text-base group-hover:font-medium transition-all">
                  {appointment.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* divider */}
      <div className="w-1.5 bg-[#2CA6AE] self-stretch mx-4 shrink-0 rounded-full" />

      {/* calendar widget */}
      <div className="bg-[#2CA6AE] rounded-3xl p-4 flex-1 overflow-hidden flex items-center justify-center">
        <div className="bg-white rounded-2xl p-4 w-full h-full overflow-hidden [&_button[data-day]]:aspect-auto [&_button[data-day]]:w-16 [&_button[data-day]]:mx-auto [&_button[data-day]]:py-2.5">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            classNames={{
              root: "w-full",
              month: "flex w-full flex-col gap-3",
              month_caption: "flex h-8 w-full items-center justify-center px-(--cell-size)",
              day: "group/day relative h-10 mt-4 w-full rounded-(--cell-radius) p-0 text-center select-none [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius) [&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)",
              week: "flex w-full mt-0",
              today: "font-semibold [&_button]:bg-[#E8F3F4] [&_button]:rounded-lg",
            }}
            modifiers={calendarModifiers}
            modifiersStyles={calendarModifiersStyles}
          />
        </div>
      </div>

    </div>
  );
}
