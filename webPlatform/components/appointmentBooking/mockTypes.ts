
export type DoctorId = string;

export type Doctor = {
    id: DoctorId;
    name: string;
}

export type DoctorSchedule = {
    doctorId: DoctorId;
    workingDays: number[]; // 0 = Sunday, 1 = Monday, and so on.
    workHours: string[];
};

export type BookedAppointment = {
    doctorId: DoctorId;
    date: string; // e.g. "2026-04-08"
    time: string; // e.g. "10:00 am"
};