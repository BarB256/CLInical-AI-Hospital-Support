"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SignUpForm from "@/components/signupPage/SignUpForm";

export default function SignUpPage() {
  const [accountType, setAccountType] = useState<"patient" | "doctor">("patient");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start gap-4 bg-[#F4F7F7] p-4 pt-14 overflow-hidden">
      {/* Patient Image - Appears on the left when patient is selected */}
      <div 
        className={`absolute left-0 bottom-0 top-0 w-1/3 transition-all duration-700 ease-in-out flex items-end justify-start pl-12 ${
          accountType === "patient" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        }`}
      >
        <Image 
          src="/patient.svg" 
          alt="Patients illustration" 
          width={500} 
          height={500} 
          className="object-contain w-full h-auto max-w-[500px]"
          priority
        />
      </div>

      {/* Doctor Image - Appears on the right when doctor is selected */}
      <div 
        className={`absolute right-0 bottom-0 top-0 w-1/3 transition-all duration-700 ease-in-out flex items-end justify-end pr-12 ${
          accountType === "doctor" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }`}
      >
        <Image 
          src="/doctorr.svg" 
          alt="Doctor illustration" 
          width={500} 
          height={500} 
          className="object-contain w-full h-auto max-w-[400px] -scale-x-100"
          priority
        />
      </div>

      <div className="z-10 flex flex-col items-center gap-4 w-full">
        <p className="text-sm font-semibold text-[#167980]">
          Already have an account?{" "}
          <Link href="/login" className="font-bold underline">
            Log in
          </Link>
        </p>

        <SignUpForm 
          accountType={accountType} 
          setAccountType={setAccountType} 
          onSubmit={(data) => console.log(data)}
        />
      </div>
    </main>
  );
}
