import type { BookingDoctorProps as Props } from "@/types";

export default function BookingDoctor({selectedDoctor, doctors, onSelectDoctor, onSelectTime}: Props) {
    
    // resets selected time when doctor changes to avoid invalid selections 
    function handleDoctorSelect(doctor: string) {
        onSelectDoctor(doctor);
        onSelectTime(null);
    }
    
    return (
        <div className="flex h-full flex-col">
            <div className="space-y-8 p-8">
                {/* title header */}
                <div className="space-y-2">
                    <h2 className="text-[26px] font-semibold leading-tight text-gray-900">
                        Book an appointment with {selectedDoctor === "all" ? "one of our experienced doctors" : selectedDoctor}.
                    </h2>
                </div>
                {/* logo */}
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-sm font-medium text-gray-600">
                        +
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            Saint Harmony&apos;s Clinic
                        </p>
                        <p className="text-sm text-gray-500">Organizer</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="text-base">🗓</span>
                    <span>in less than 5 minutes</span>
                </div>

                {/* select doctor */}
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
                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-gray-400"
                    >
                        <option value="all">All doctors</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* description */}
                <p className="max-w-[240px] text-sm leading-6 text-gray-500">
                    Schedule an appointment with {selectedDoctor === "all" ? "one of our experienced doctors" : selectedDoctor + ", our dedicated doctor,"} to adress your
                    healthcare needs. Book your appointment today for expert medical care and personalized attention.
                </p>
            </div>
        </div>
    );
}