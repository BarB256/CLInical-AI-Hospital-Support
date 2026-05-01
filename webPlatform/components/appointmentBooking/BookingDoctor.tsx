import type { BookingDoctorProps as Props } from "@/types";
import { CalendarClock, Plus } from "lucide-react";

const DOCTOR_OPTION_LIMIT = 25;

export default function BookingDoctor({selectedDoctor, doctors, onSelectDoctor, onSelectTime}: Props) {
    
    // resets selected time when doctor changes to avoid invalid selections 
    function handleDoctorSelect(doctor: string) {
        onSelectDoctor(doctor);
        onSelectTime(null);
    }
    
    return (
        <div className="flex h-full flex-col">
            <div className="space-y-7 p-8">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold leading-tight text-gray-950">
                        Book an appointment with {selectedDoctor === "all" ? "one of our experienced doctors" : selectedDoctor}.
                    </h2>
                </div>

                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E6F7F7] text-[#167980]">
                        <Plus className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            CLInical
                        </p>
                        <p className="text-sm text-gray-500">Clinic</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <CalendarClock className="h-4 w-4 text-[#167980]" />
                    <span>in less than 5 minutes</span>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="doctor"
                        className="text-sm font-medium text-gray-700"
                    >
                        Select doctor
                    </label>

                    <select
                        id="doctor"
                        value={selectedDoctor}
                        onChange={(e) => handleDoctorSelect(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#167980] focus:ring-2 focus:ring-[#167980]/15"
                    >
                        <option value="all">All doctors</option>
                        {doctors.slice(0, DOCTOR_OPTION_LIMIT).map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="max-w-[240px] text-sm leading-6 text-gray-500">
                    Schedule an appointment with {selectedDoctor === "all" ? "one of our experienced doctors" : selectedDoctor + ", our dedicated doctor,"} to address your
                    healthcare needs. Book your appointment today for expert medical care and personalized attention.
                </p>
            </div>
        </div>
    );
}
