import TimeSlotButton from "./TimeSlotButton";
import { formatDateKey, formatWeekDayLabel } from "./dateUtils";
import { DoctorSchedule, BookedAppointment } from "./mockTypes";

type Props = {
    day: Date;
    selectedDate: Date | undefined;
    selectedTime: string | null;
    selectedDoctor: string;
    onSelectDate: (date: Date | undefined) => void;
    onSelectTime: (time: string | null) => void;
    doctorSchedules: DoctorSchedule[];
    bookedAppointments: BookedAppointment[];
}


// returns schedules for this day, filtered by the selected doctor
function getSchedulesForDay(doctorSchedules: DoctorSchedule[], dayNumber: number, selectedDoctor: string) {
    // gets all doctors who work on this weekday
    const schedulesForDay = doctorSchedules.filter((schedule) =>
        schedule.workingDays.includes(dayNumber)
    );

    // if "all" is selected, it return all schedules
    // otherwise returns only the selected doctor's schedule
    return selectedDoctor === "all"
        ? schedulesForDay
        : schedulesForDay.filter(
              (schedule) => schedule.doctorId === selectedDoctor
          );
}

// builds a unique list of time slots for the day to prevent e.g. "10:00 am"
// from appearing multiple times if "all" doctors is selected
function getTimesForDay(schedulesForDay: DoctorSchedule[]) {
    return Array.from(
        new Set(schedulesForDay.flatMap((schedule) => schedule.workHours))
    );
}

// determines if a time slot is fully booked
// a slot is only booked if ALL doctors working that time are already booked
function isTimeBooked(time: string, dateKey: string, schedulesForDay: DoctorSchedule[], bookedAppointments: BookedAppointment[]) {
    // find doctors who work at this time
    const doctorsWorkingThisTime = schedulesForDay
        .filter((schedule) => schedule.workHours.includes(time))
        .map((schedule) => schedule.doctorId);

    // find doctors who are already booked at this time
    const doctorsBookedThisTime = bookedAppointments
        .filter(
            (appointment) => appointment.date === dateKey && appointment.time === time
        )
        .map((appointment) => appointment.doctorId);

    // if every working doctor is booked, then the slot is unavailable and it will return true
    return doctorsWorkingThisTime.every((doctorId) =>
        doctorsBookedThisTime.includes(doctorId)
    );
}


export default function WeekDayColumn({day, selectedDate, selectedTime, selectedDoctor, onSelectDate, onSelectTime, doctorSchedules, bookedAppointments}: Props) {
    // converts the date to a string key. 
    const dateKey = formatDateKey(day);

    const dayNumber = day.getDay();
    
    // get the relevant schedules for this day and doctor filter
    const schedulesForDay = getSchedulesForDay(doctorSchedules, dayNumber, selectedDoctor);

    // get visible time slots for this day
    const timesForDay = getTimesForDay(schedulesForDay);

    return (
        <div className="min-w-[70px] rounded-xl border border-gray-100 bg-gray-50/60 p-3 overflow-hidden">
            <div className="mb-4 border-b border-gray-200 pb-3 text-center">
                <p className="text-sm font-medium text-gray-500">
                    {formatWeekDayLabel(day)}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                    {day.getDate()}
                </p>
            </div>

            <div className="space-y-2">
                {/* render each time slot */}
                {timesForDay.map((time) => {
                    
                    //check if the time slot is booked
                    const isBooked = isTimeBooked(time, dateKey, schedulesForDay, bookedAppointments);

                    return (
                        <TimeSlotButton
                            key={`${dateKey}-${time}`}
                            day={day}
                            time={time}
                            dateKey={dateKey}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            isBooked={isBooked}
                            onSelectDate={onSelectDate}
                            onSelectTime={onSelectTime}
                        />
                    );
                })}
            </div>
        </div>
        
        
        
        
        
    );
}