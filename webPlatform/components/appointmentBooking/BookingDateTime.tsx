'use client';

import { Calendar } from "@/components/ui/calendar";
import WeeklyCalendar from "./WeeklyCalendar";
import { DoctorSchedule, BookedAppointment } from "./mockTypes";

type CalendarView = "month" | "week";

type Props = {
    selectedDate: Date | undefined;
    selectedTime: string | null;
    selectedDoctor: string;
    calendarView: CalendarView;
    onSelectDate: (date: Date | undefined) => void;
    onSelectTime: (time: string | null) => void;
    onSelectCalendarView: (view: CalendarView) => void;
    doctorSchedules: DoctorSchedule[];
    bookedAppointments: BookedAppointment[];
};



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
        <div>
            {/* Monthly calendar view */}
            {calendarView === "month" && (
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}

                    className="p-10 w-full h-full flex [&>div]:w-full [&>div]:h-full [&_.rdp-months]:w-full [&_.rdp-months]:h-full [&_.rdp-month]:w-full [&_.rdp-month]:h-full [&_.rdp-month]:flex [&_.rdp-month]:flex-col [&_table]:w-full [&_table]:flex-1 [&_table]:flex [&_table]:flex-col [&_thead]:w-full [&_thead]:flex [&_tr]:w-full [&_tr]:flex [&_tr]:justify-between [&_tbody]:w-full [&_tbody]:flex-1 [&_tbody]:flex [&_tbody]:flex-col [&_tbody_tr]:flex-1 [&_th]:flex-1 [&_th]:flex [&_th]:justify-center [&_th]:items-center [&_th]:text-base [&_th]:font-bold [&_th]:pb-4 [&_td]:flex-1 [&_td]:p-0 [&_td]:h-16 [&_.rdp-day]:w-full [&_.rdp-day]:h-18 [&_.rdp-day]:aspect-auto [&_.rdp-day]:text-lg [&_.rdp-day]:flex [&_.rdp-day]:items-center [&_.rdp-day]:justify-center"
                    modifiers={{ today: new Date() }}
                    modifiersStyles={{
                    today: {
                        fontWeight: "900",
                        color: "#2CA6AE",
                    },
                    }}
                />
            )}
            
            {/* Weekly calendar view */}
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