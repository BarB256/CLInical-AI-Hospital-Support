export default function DashboardHeader() {
  const today = new Date();
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const rest = today.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-950">Dashboard</h1>
      <p className="mt-1 text-sm font-medium text-gray-500">
        <span className="text-[#167980]">{weekday}, </span>
        <span>{rest}</span>
      </p>
    </div>
  );
}
