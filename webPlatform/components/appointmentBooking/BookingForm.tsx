import { useState } from "react";
import type { BookingFormProps as Props } from "@/types";

export default function BookingForm({selectedDate, selectedTime, selectedDoctor}: Props) {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [appointmentType, setAppointmentType] = useState<string | null>(null);
    const [consent, setConsent] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState("");

    // validation and submission for form
    function handleSubmit() {
        if (
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !emailAddress ||
            !contactNumber ||
            !appointmentType ||
            !consent ||
            !selectedDate ||
            !selectedTime ||
            !selectedDoctor

        ) {
            console.log("Missing required fields");
            return;
        }

        const appointment = {
            firstName,
            lastName,
            dateOfBirth,
            emailAddress,
            contactNumber,
            appointmentType,
            consent,
            medicalHistory, // optional
            selectedDate,
            selectedTime,
            selectedDoctor
        };

        console.log("Appointment:", appointment);
    }
    
    const inputStyle =
        "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#167980] focus:ring-2 focus:ring-[#167980]/15";

    const readOnlyStyle =
        "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600";

    return (
        <div className="h-full overflow-y-auto bg-white p-8">
            {!selectedDate || !selectedTime 
            // before date and time is selected, shows small div element
            ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                <p className="text-sm">
                    Choose a date and time to book an appointment.
                </p>
            </div> )
            : (
            // date and time is selected, shows the form
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="space-y-6"
            >
                {/* title */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Patient Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Fill in your details to complete the booking.
                    </p>
                </div>

                {/* name */}
                <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <input id="firstName"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* date of birth + phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input id="dateOfBirth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                            className={inputStyle}
                        />
                    </div>

                    <div>
                        <label htmlFor="contactNumber" className="mb-2 block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input id="contactNumber"
                            type="tel"
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className={inputStyle}
                        />
                    </div>
                </div>

                {/* email */}
                <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input id="email"
                        type="email"
                        placeholder="Email Address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                        className={inputStyle}
                    />
                </div>

                {/* booking summary */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Doctor
                        </label>
                        <input
                            type="text"
                            value={selectedDoctor === "all" ?  "Any" : selectedDoctor}
                            readOnly
                            className={readOnlyStyle}
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="mb-2 block text-sm font-medium text-gray-700">
                            Date
                        </label>
                        <input id="date"
                            type="text"
                            value={
                                selectedDate
                                    ? selectedDate.toLocaleDateString()
                                    : ""
                            }
                            readOnly
                            className={readOnlyStyle}
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700">
                            Time
                        </label>
                        <input id="time"
                            type="text"
                            value={selectedTime ?? ""}
                            readOnly
                            className={readOnlyStyle}
                        />
                    </div>
                </div>

                {/* appointment type */}
                <div>
                    <p className="mb-3 text-sm font-medium text-gray-700">
                        Appointment Type
                    </p>

                    <div className="space-y-3">
                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-4">
                            <input
                                type="radio"
                                name="appointmentForm"
                                value="initial"
                                checked={appointmentType === "initial"}
                                onChange={() => setAppointmentType("initial")}
                                required
                            />
                            <span className="text-sm text-gray-800">
                                Initial consultation visit
                            </span>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 px-4 py-4">
                            <input
                                type="radio"
                                name="appointmentForm"
                                value="follow-up"
                                checked={appointmentType === "follow-up"}
                                onChange={() => setAppointmentType("follow-up")}
                                required
                            />
                            <span className="text-sm text-gray-800">
                                Follow-up visit
                            </span>
                        </label>
                    </div>
                </div>

                {/* medical history */}
                <div>
                    <label htmlFor="medicalHistory" className="mb-2 block text-sm font-medium text-gray-700">
                        Medical History (optional)
                    </label>
                    <textarea id="medicalHistory"
                        value={medicalHistory}
                        onChange={(e) => setMedicalHistory(e.target.value)}
                        className="min-h-[140px] w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#167980] focus:ring-2 focus:ring-[#167980]/15"
                    />
                </div>

                {/* consent */}
                <div className="flex items-start gap-3">
                    <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        required
                        className="mt-1"
                    />
                    <p className="text-sm leading-6 text-gray-600">
                        I agree to the processing of my appointment details.
                    </p>
                </div>

                {/* submit */}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-[#167980] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12666c]"
                >
                    Book Appointment
                </button>
            </form>
            )}
        </div>
    );
}
