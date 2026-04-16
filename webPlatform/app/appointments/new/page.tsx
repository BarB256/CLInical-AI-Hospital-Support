import BookingLayout from "@/components/appointmentBooking/BookingLayout";

export default function NewAppointmentPage() {
    return (
        <div className="min-h-screen bg-yellow-50 p-4 flex items-center justify-center">
            <main className="w-full max-w-[95vw] h-[95vh] bg-white rounded-xl shadow-lg overflow-hidden">
                <BookingLayout />
            </main>
        </div>
    );
}