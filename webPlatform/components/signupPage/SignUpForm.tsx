"use client";

import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

type AccountType = "patient" | "doctor";

export default function SignUpForm() {
  const [accountType, setAccountType] = useState<AccountType>("patient");

  return (
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-[400px] overflow-hidden">

      {/* teal header */}
      <div className="bg-[#2CA6AE] py-6 px-8 rounded-b-3xl">
        <h1 className="text-white font-bold text-2xl tracking-widest text-center">SIGN UP</h1>
      </div>

      {/* form content */}
      <div className="px-8 py-6 flex flex-col gap-5">

        {/* account type selector */}
        <div className="flex flex-col items-center gap-3 mb-3">
          <p className="text-[#2CA6AE] font-semibold text-sm tracking-widest">SELECT YOUR ACCOUNT TYPE</p>
          <div className="flex items-center gap-4">

            <button
              onClick={() => setAccountType("patient")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all
                ${accountType === "patient"
                  ? "bg-[#48D8E3] text-white"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              PATIENT
            </button>

            <span className="text-[#2CA6AE] text-sm font-semibold">OR</span>

            <button
              onClick={() => setAccountType("doctor")}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all
                ${accountType === "doctor"
                  ? "bg-[#48D8E3] text-white"
                  : "bg-gray-200 text-gray-400"
                }`}
            >
              DOCTOR
            </button>

          </div>
        </div>

        {/* name and email group */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2">
            <User className="h-4 w-4 text-white shrink-0" />
            <input
              type="text"
              placeholder="name"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2 mb-3">
            <Mail className="h-4 w-4 text-white shrink-0" />
            <input
              type="email"
              placeholder="e-mail"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* password group */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2">
            <Lock className="h-4 w-4 text-white shrink-0" />
            <input
              type="password"
              placeholder="password"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-3 bg-[#2CA6AE] rounded-full px-4 py-2">
            <Lock className="h-4 w-4 text-white shrink-0" />
            <input
              type="password"
              placeholder="repeat password"
              className="bg-transparent text-white placeholder-white/70 outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* terms checkbox */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="accent-[#2CA6AE] h-4 w-4 cursor-pointer" />
          <p className="text-gray-500 text-xs">
            I agree with{" "}
            <span className="text-[#2CA6AE] underline cursor-pointer">Terms</span>
            {" "}and{" "}
            <span className="text-[#2CA6AE] underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        {/* create account button */}
        <div className="flex justify-center">
          <button className="bg-[#48D8E3] text-white font-semibold py-3 px-12 rounded-full hover:scale-105 transition-all">
            Create account
          </button>
        </div>

      </div>
    </div>
  );
}
