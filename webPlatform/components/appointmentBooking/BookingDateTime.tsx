'use client';

import { Calendar } from "@/components/ui/calendar";
import WeeklyCalendar from "./WeeklyCalendar";
import type { BookingDateTimeProps as Props } from "@/types";



export default function BookingDateTime({selectedDate, selectedTime, selectedDoctor, calendarView, onSelectDate, onSelectTime, onSelectCalendarView, doctorSchedules, bookedAppointments}: Props) {

    // resets selected time when date changes to avoid invalid selections 
    function handleDateSelect(date: Date | undefined) {
        onSelectDate(date);
        onSelectTime(null);
        
        // switches calendar to weekly view
        if (date) {
            onSelectCalendarView("week");
        }
    };

    return (
        <div className="h-full">
            {calendarView === "month" && (
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}

                    className="flex h-full w-full p-10 [&>div]:h-full [&>div]:w-full [&_table]:w-full [&_tbody_tr]:h-16 [&_td]:p-0 [&_th]:pb-4 [&_th]:text-base [&_th]:font-semibold [&_.rdp-month]:flex [&_.rdp-month]:h-full [&_.rdp-month]:w-full [&_.rdp-month]:flex-col [&_.rdp-months]:h-full [&_.rdp-months]:w-full [&_.rdp-day]:flex [&_.rdp-day]:h-12 [&_.rdp-day]:w-full [&_.rdp-day]:items-center [&_.rdp-day]:justify-center [&_.rdp-day]:text-base"
                    modifiers={{ today: new Date() }}
                    modifiersStyles={{
                    today: {
                        fontWeight: "900",
                        color: "#167980",
                    },
                    }}
                />
            )}
            
            {calendarView === "week" && (
                <WeeklyCalendar 
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    selectedDoctor={selectedDoctor}
                    onSelectDate={onSelectDate}
                    onSelectTime={onSelectTime}
                    onBackToMonthView={() => {onSelectCalendarView("month"); onSelectDate(undefined); onSelectTime(null)}}
                    doctorSchedules={doctorSchedules}
                    bookedAppointments={bookedAppointments}
                />
            )}
            
        </div>
    );
}
