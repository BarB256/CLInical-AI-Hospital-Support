import { formatDateKey } from "./dateUtils";
import type { TimeSlotButtonProps as Props } from "@/types";

export default function TimeSlotButton({day, time, dateKey, selectedDate, selectedTime, isBooked, onSelectDate, onSelectTime,}: Props) {

    // checks if the specific time slot is selected
    const isSelected =
        selectedDate &&
        formatDateKey(selectedDate) === dateKey &&
        selectedTime === time;

    // handles clicking a time slot (only if not selected)
    function handleClick() {
        if (isBooked) return;

        onSelectDate(day);
        onSelectTime(time);
    }

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={isBooked}
                className={`
                    h-11 w-full rounded-lg border px-3 text-left text-sm font-medium transition
                    ${isBooked
                        ? "border-gray-100  bg-gray-100 text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "border-[#2CA6AE] bg-[#E8F3F4] text-[#1E6D73]"
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}
                `}
            >
                {time}
            </button>
        </div>
    );
}