import Sidebar from "@/components/appointmentPage/Sidebar";
import Header from "@/components/appointmentPage/Header";
import HelloWidget from "@/components/appointmentPage/HelloWidget";
import DoctorProfileWidget from "@/components/appointmentPage/DoctorProfileWidget";
import AppointmentCalendar from "@/components/appointmentPage/AppointmentCalendar";

export default function AppointmentsPage() {
  return (
    <div className="flex gap-4 h-screen overflow-hidden bg-yellow-50 p-4">
      <Sidebar />
      <main className="flex-1 flex flex-col gap-3 pt-4 px-6 overflow-hidden">

        {/* top row - header+welcome on left, profile on right */}
        <div className="flex gap-4">

          {/* left side - header and welcome stacked */}
          <div className="flex flex-col gap-3 flex-1 w-[55%]">
            <Header />
            <HelloWidget />
          </div>

          {/* right side - profile widget matches height */}
          <div className="w-[45%]">
            <DoctorProfileWidget />
          </div>

        </div>

        {/* bottom row - appointment list and calendar */}
        <div className="flex gap-4 flex-1 bg-white rounded-3xl p-6 overflow-hidden">
          <AppointmentCalendar />
        </div>

      </main>
    </div>
  );
}