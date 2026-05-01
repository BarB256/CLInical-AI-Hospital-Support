import Sidebar from "@/components/appointmentPage/Sidebar";
import ReportLayout from "@/components/reportEditor/ReportLayout";

export default async function ReportEditorPage({ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;


  return (
    <div className="flex gap-4 h-screen overflow-hidden bg-[#F4F7F7] p-4">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pt-4 px-6 pb-4">

        {/* page header */}
        <div className="mb-4 shrink-0">
          <h1 className="text-2xl font-semibold text-gray-950">Report Editor</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and edit each section, then accept to submit the final report.
          </p>
        </div>

        {/* main layout */}
        <div className="flex-1 min-h-0">
          <ReportLayout reportId={id}/>
        </div>

      </div>
    </div>
  );
}
