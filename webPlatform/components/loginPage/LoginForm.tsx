"use client";

import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  return (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-[400px] overflow-hidden">
      {/* tealheader */}
      <div className="bg-[#2CA6AE] py-6 px-8 rounded-b-3xl">
        <h1 className="text-white font-bold text-2xl tracking-widest text-center">LOG IN</h1>
      </div>

      {/* form content */}
      <div className="px-8 py-6 flex flex-col gap-5">
        <p className="text-[#2CA6AE] font-semibold text-sm tracking-widest text-center">
          WELCOME BACK!
        </p>

        {/* email and password group */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2">
            <Mail className="h-4 w-4 text-white shrink-0" />
            <input
              type="email"
              placeholder="e-mail"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2">
            <Lock className="h-4 w-4 text-white shrink-0" />
            <input
              type="password"
              placeholder="password"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* login button */}
        <div className="flex justify-center">
          <button className="bg-[#48D8E3] text-white font-semibold py-3 px-12 rounded-full hover:scale-105 transition-all">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
