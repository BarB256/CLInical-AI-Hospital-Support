import BookingLayout from "@/components/appointmentBooking/BookingLayout";

export default function NewAppointmentPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F4F7F7] p-4">
            <main className="h-[95vh] w-full max-w-[95vw] overflow-hidden rounded-xl bg-white">
                <BookingLayout />
            </main>
        </div>
    );
}
