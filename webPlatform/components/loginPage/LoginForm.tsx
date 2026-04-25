"use client";

import { Mail, Lock } from "lucide-react";
import type { LoginFormData, LoginFormProps } from "@/types";

export default function LoginForm({ onSubmit }: LoginFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: LoginFormData = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };

    onSubmit?.(data);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[400px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-8 py-6">
        <h1 className="text-center text-2xl font-semibold text-gray-950">Log in</h1>
      </div>

      <div className="flex flex-col gap-5 px-8 py-6">
        <p className="text-center text-sm font-semibold text-[#167980]">Welcome back</p>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 focus-within:border-[#167980] focus-within:ring-2 focus-within:ring-[#167980]/15">
            <Mail className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </label>

          <label className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 focus-within:border-[#167980] focus-within:ring-2 focus-within:ring-[#167980]/15">
            <Lock className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </label>
        </div>

        <div className="flex justify-center">
          <button className="w-full rounded-lg bg-[#167980] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12666c]">
            Log in
          </button>
        </div>
      </div>
    </form>
  );
}
