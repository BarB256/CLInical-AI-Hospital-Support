import WeekDayColumn from "./WeekDayColumn";
import { getWeekDays, formatDateKey } from "./dateUtils";
import type { WeeklyCalendarProps as Props } from "@/types";

// subtracts 7 from current date, moving into the previous week
function handlePreviousWeek(selectedDate: Date | undefined, onSelectDate: (date: Date | undefined) => void, onSelectTime: (time: string | null) => void) {
    if (!selectedDate) return;

    const previousWeek = new Date(selectedDate);
    previousWeek.setDate(previousWeek.getDate() - 7);

    onSelectDate(previousWeek);
    onSelectTime(null);
}

// adds 7 to current date, moving into the next week
function handleNextWeek(selectedDate: Date | undefined, onSelectDate: (date: Date | undefined) => void, onSelectTime: (time: string | null) => void) {
    if (!selectedDate) return;

    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(nextWeek.getDate() + 7);

    onSelectDate(nextWeek);
    onSelectTime(null);
}


export default function WeeklyCalendar({selectedDate, selectedTime, selectedDoctor, onSelectDate, onSelectTime, onBackToMonthView, doctorSchedules, bookedAppointments}: Props) {
    if (!selectedDate) return null;

    // get all 7 days of the week based on input date
    const weekDays = getWeekDays(selectedDate);

    // formats year and month for header
    const monthYear = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div>
            {/* header with navigation */}
           <div className="mb-8 mt-8 flex items-center justify-between">

                {/* back to monthly calendar */}
                <button onClick={onBackToMonthView} className="inline-flex items-center gap-2 rounded-lg bg-gray-100/75 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200">
                    <span className="text-base leading-none">←</span>
                    <span>Month view</span>
                </button>

                {/* week navigation */}
                <div className="flex items-center gap-4">
                    <button onClick={() => handlePreviousWeek(selectedDate, onSelectDate, onSelectTime)} className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                        ←
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-900">
                        {monthYear}
                    </h2>

                    <button onClick={() => handleNextWeek(selectedDate, onSelectDate, onSelectTime)} className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                        →
                    </button>
                </div>

                <div className="w-[110px]" />
            </div>

            {/* weekly grid (7 columns for 7 days) */}
            <div className="grid grid-cols-7 gap-3">
                {weekDays.map((day) => (
                    <WeekDayColumn
                        key={formatDateKey(day)}
                        day={day}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        selectedDoctor={selectedDoctor}
                        onSelectDate={onSelectDate}
                        onSelectTime={onSelectTime}
                        doctorSchedules={doctorSchedules}
                        bookedAppointments={bookedAppointments}
                    />
                ))}
            </div>
        </div>
        
    );
}