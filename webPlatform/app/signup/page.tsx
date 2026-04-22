import Link from "next/link";
import SignUpForm from "@/components/signupPage/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-14 gap-4 p-4" style={{ backgroundImage: "url('/background.svg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

      {/* already have an account */}
      <p className="text-[#2CA6AE] text-sm font-bold">
        Already have an account?{" "}
        <Link href="/login" className="underline cursor-pointer font-extrabold">
            Log in
          </Link>
      </p>

      <SignUpForm />

    </div>
  );
}