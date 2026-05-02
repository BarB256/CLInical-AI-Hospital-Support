
// returns the first day of the week (monday) from any input date
export function getStartOfWeek(date: Date) {
    const selectedDate = new Date(date);
    const dayNumber = selectedDate.getDay(); // e.g. Sunday = 0, Monday = 1, Tuesday = 2 and so on.

    const difference = dayNumber === 0 ? -6 : 1 - dayNumber; // calculates how far back to move to get to Monday.
    selectedDate.setDate(selectedDate.getDate() + difference);
    selectedDate.setHours(0, 0, 0, 0); // set time to midnight

    return selectedDate;
}

// returns the entire week based on input date
export function getWeekDays(date: Date) {
    if (!date) return [];

    const startOfWeek = getStartOfWeek(date);

    return Array.from({ length: 7}, (_, index) => { 
        const weekDay = new Date(startOfWeek);
        weekDay.setDate(startOfWeek.getDate() + index);     // start from Monday, then iterate through the entire week
        return weekDay;
    })

}


// formats a date into a string (e.g. 2026-04-04)
export function formatDateKey(date: Date) {
    const year = date.getFullYear();  
    const month = String(date.getMonth() + 1).padStart(2, "0");  
    const day = String(date.getDate()).padStart(2, "0");  
    return `${year}-${month}-${day}`;  
}

// turns a date (2026-04-05) into e.g. Mon (for Monday)
export function formatWeekDayLabel(date: Date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
}