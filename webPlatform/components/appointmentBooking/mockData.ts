import type { Doctor, DoctorSchedule, BookedAppointment } from "./mockTypes";


// mock data for a list of doctors.
export const doctors: Doctor[] = [
    { id: "dr-evans", name: "Dr Evans"},
    { id: "dr-smith", name: "Dr Smith"},
]

// mock data for doctor schedules. Since you can filter based on doctors, you need to know when they work
export const doctorSchedules: DoctorSchedule[] = [
    {
        doctorId: "dr-evans",
        workingDays: [1, 2, 3, 4, 5],
        workHours: ["8:00 am", "9:00 am", "10:00 am", "11:00 am"],
    },
    {
        doctorId: "dr-smith",
        workingDays: [1, 3, 5],
        workHours: ["10:00 am", "11:00 am", "12:00 pm", "1:00 pm"],
    },
];

// mock data for booked appointments.
export const bookedAppointments: BookedAppointment[] = [
    { doctorId: "dr-evans", date: "2026-04-08", time: "10:00 am" },
    { doctorId: "dr-evans", date: "2026-04-08", time: "11:00 am" },
    { doctorId: "dr-smith", date: "2026-04-09", time: "10:00 am" },
    { doctorId: "dr-smith", date: "2026-04-11", time: "1:00 pm" },
];