import { CalendarDays, Settings, LogOut, ClipboardList } from "lucide-react";
import Link from "next/link";
// sidebar navigation for the dashboard
export default function Sidebar() {
  return (
    <div className="flex flex-col items-center h-full w-25 bg-[#2CA6AE] rounded-3xl py-8 gap-12">

  {/* logo */}
  <div className="flex flex-col items-center gap-1">
    <span className="text-white font-bold text-xl leading-none">CLI</span>
    <span className="text-white font-bold text-xl leading-none">nical</span>
  </div>

  {/* nav icons */}
  <div className="flex flex-col items-center gap-2">
    <div className="p-2 rounded-2xl cursor-pointer hover:bg-[#1d8a91] hover:scale-110 transition-all">
      <CalendarDays className="h-8 w-8 text-white" />
    </div>
    <Link href="/reports" className="p-2 rounded-2xl cursor-pointer hover:bg-[#1d8a91] hover:scale-110 transition-all">
      <ClipboardList className="h-8 w-8 text-white" />
    </Link>
    <div className="p-2 rounded-2xl cursor-pointer hover:bg-[#1d8a91] hover:scale-110 transition-all">
      <Settings className="h-8 w-8 text-white" />
    </div>
    <div className="p-2 rounded-2xl cursor-pointer hover:bg-[#1d8a91] hover:scale-110 transition-all">
      <LogOut className="h-8 w-8 text-white" />
    </div>
  </div>

</div>
  );
}