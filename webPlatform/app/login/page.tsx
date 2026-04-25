import Link from "next/link";
import LoginForm from "@/components/loginPage/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-start justify-center px-4 pt-16" style={{ backgroundImage: "url('/background.svg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
        <p className="text-[#2CA6AE] text-sm font-bold">
          Don't have an account?{" "}
          <Link href="/signup" className="underline cursor-pointer font-extrabold">
            Sign up
          </Link>
        </p>
        <LoginForm />
      </div>
    </main>
  );
}