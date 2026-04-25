import { Pencil, MapPin } from "lucide-react";
import Image from "next/image";

export default function DoctorProfileWidget() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <span className="text-xs font-bold tracking-widest text-[#167980]">MY PROFILE</span>
        <button className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#167980] hover:text-[#167980]">
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 items-center gap-5 p-5">
        <Image
          src="/avatar.svg"
          alt="doctor avatar"
          width={72}
          height={72}
          className="h-18 w-18 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-950">Dr. Julian Santos</h3>
          <span className="text-xs font-bold tracking-widest text-[#167980]">PEDIATRICIAN</span>
          <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Kolding, Denmark</span>
          </div>
        </div>

        <div className="rounded-lg bg-[#F4F7F7] px-4 py-3 text-center">
          <span className="block text-xs text-gray-500">Working hours</span>
          <span className="text-sm font-semibold text-gray-900">10am - 5pm</span>
        </div>

      </div>
    </div>
  );
}
