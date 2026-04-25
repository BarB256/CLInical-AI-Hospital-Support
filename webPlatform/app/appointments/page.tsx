import Sidebar from "@/components/appointmentPage/Sidebar";
import Header from "@/components/appointmentPage/Header";
import HelloWidget from "@/components/appointmentPage/HelloWidget";
import DoctorProfileWidget from "@/components/appointmentPage/DoctorProfileWidget";
import AppointmentCalendar from "@/components/appointmentPage/AppointmentCalendar";

export default function AppointmentsPage() {
  return (
    <div className="flex h-screen gap-4 overflow-hidden bg-[#F4F7F7] p-4">
      <Sidebar />
      <main className="flex flex-1 flex-col gap-4 overflow-hidden px-4 py-3">

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.8fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <Header />
            <HelloWidget />
          </div>

          <div className="min-w-0">
            <DoctorProfileWidget />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <AppointmentCalendar />
        </div>

      </main>
    </div>
  );
}
