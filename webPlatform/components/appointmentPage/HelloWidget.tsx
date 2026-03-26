// welcome widget displaying a greeting for the logged in doctor
export default function HelloWidget() {
  // mock doctor name - will be replaced with real data from backend later
  const doctorName = "Dr. Santos";

  return (
    <div className="relative bg-[#2CA6AE] rounded-3xl p-10.5 ">
      <h2 className="text-white text-2xl">
        Welcome, <span className="font-bold">{doctorName}</span>
      </h2>
      <p className="text-white text-base mt-1">Have a nice day at work!</p>

      {/* doctor illustration - positioned absolutely to float on top */}
      <img
        src="/doctor.svg"
        alt="doctor illustration"
        className="absolute bottom-0 right-40 h-60"
      />
    </div>
  );
}