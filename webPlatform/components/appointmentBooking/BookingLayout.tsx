'use client';
import { useState } from "react";
import BookingDoctor from "./BookingDoctor";
import BookingDateTime from "./BookingDateTime";
import BookingForm from "./BookingForm";
import { doctors, doctorSchedules, bookedAppointments } from "./mockData";

export default function BookingLayout() {

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
    const [calendarView, setCalendarView] = useState<"month" | "week">("month");

    return (
    <div className="grid h-full grid-cols-[320px_minmax(0,1fr)_380px] gap-4 p-4">
        <section className="min-w-0">
            <BookingDoctor
                selectedDoctor={selectedDoctor}
                doctors={doctors}
                onSelectDoctor={setSelectedDoctor}
                onSelectTime={setSelectedTime}
            />
        </section>

        <section className="min-w-0 overflow-hidden">
            <BookingDateTime
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedDoctor={selectedDoctor}
                calendarView={calendarView}
                onSelectDate={setSelectedDate}
                onSelectTime={setSelectedTime}
                onSelectCalendarView={setCalendarView}
                doctorSchedules={doctorSchedules}
                bookedAppointments={bookedAppointments}
            />
        </section>

        <section className="min-w-0 overflow-y-auto">
            <BookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                selectedDoctor={selectedDoctor}
            />
        </section>
    </div>
);
}