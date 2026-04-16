import { Pencil, MapPin } from "lucide-react";

// displays the logged in doctor's profile information
export default function DoctorProfileWidget() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white flex flex-col h-full">

      {/* teal header bar */}
      <div className="bg-[#2CA6AE] px-6 py-4 flex items-center justify-between rounded-b-3xl">
        <span className="text-white font-bold text-sm tracking-widest">MY PROFILE</span>
        <div className="bg-[#C1D7D9] p-2 rounded-xl cursor-pointer hover:scale-110 transition-transform">
          <Pencil className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* profile content */}
      <div className="flex items-center gap-6 p-6 flex-1">

        {/* avatar */}
        <img
          src="/avatar.svg"
          alt="doctor avatar"
          className="h-20 w-20 rounded-full object-cover"
        />

        {/* doctor info */}
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-[#000000] text-lg">Dr. Julian Santos</h3>
          <span className="text-[#2CA6AE] font-bold text-sm tracking-widest">PEDIATRICIAN</span>
          <div className="flex items-center gap-1 text-[#000000] text-sm">
            <MapPin className="h-4 w-4" />
            <span>Kolding, Denmark</span>
          </div>
        </div>

        {/* divider */}
        <div className="w-1 bg-[#2CA6AE] self-stretch mx-8 rounded-full" />

        {/* working hours */}
        <div className="flex flex-col items-center gap-1 px-4">
          <span className="text-[#000000] text-base">Working Hours</span>
          <span className="text-[#000000] text-lg">10am - 5pm</span>
        </div>

      </div>
    </div>
  );
}