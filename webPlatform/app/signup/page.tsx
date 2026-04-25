import Link from "next/link";
import SignUpForm from "@/components/signupPage/SignUpForm";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 bg-[#F4F7F7] p-4 pt-14">
      <p className="text-sm font-semibold text-[#167980]">
        Already have an account?{" "}
        <Link href="/login" className="font-bold underline">
          Log in
        </Link>
      </p>

      <SignUpForm />
    </main>
  );
}
