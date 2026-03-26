// displays the dashboard title and the current date
export default function DashboardHeader() {
  // get the current date
  const today = new Date();
  
  // get each part of the date separately
  const weekday = today.toLocaleDateString("en-GB", { weekday: "long" });
  const rest = today.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <h1 className="text-2xl font-bold text[#000000]">Dashboard</h1>
      <p className="font-bold mt-2">
        <span className="text-[#2CA6AE]">{weekday}, </span>
        <span className="text-[000000]">{rest}</span>
      </p>
    </div>
  );
}