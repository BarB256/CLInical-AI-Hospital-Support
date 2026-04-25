import Sidebar from "@/components/appointmentPage/Sidebar";
import ReportDashboard from "@/components/reportDashboard/ReportDashboard";

export default function ReportsPage() {
  return (
    <div className="flex gap-4 h-screen overflow-hidden bg-[#F4F7F7] p-4">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-4 px-6 pb-4">
        <div className="flex-1 min-h-0">
          <ReportDashboard />
        </div>
      </div>
    </div>
  );
}
