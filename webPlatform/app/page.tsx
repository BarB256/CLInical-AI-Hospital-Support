import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F7F7] px-6 py-8">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col justify-center gap-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#2CA6AE]">CLInical AI</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-950">
            Hospital support workspace
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
            Open the clinical dashboard, review reports, or book patient appointments from a single clean entry point.
          </p>
        </div>

        <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <HomeLink href="/appointments" label="Appointments" />
          <HomeLink href="/conversation" label="Diagnosis Support" />
          <HomeLink href="/reports" label="Reports" />
          <HomeLink href="/login" label="Log in" />
        </nav>
      </main>
    </div>
  );
}

function HomeLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-[#2CA6AE] hover:text-[#167980]"
    >
      {label}
    </Link>
  );
}
