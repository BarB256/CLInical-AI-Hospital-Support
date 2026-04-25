import Link from "next/link";
import LoginForm from "@/components/loginPage/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-start justify-center bg-[#F4F7F7] px-4 pt-16">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-4">
        <p className="text-sm font-semibold text-[#167980]">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold underline">
            Sign up
          </Link>
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
