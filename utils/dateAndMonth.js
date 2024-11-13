
export function getCurrentDate() {
    return new Date().getDate().toString();
}

export function getCurrentMonth() {
    return new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
}

export function getWeekDates(startDate = new Date()) {
    const dates = [];
    const today = startDate.getDay(); 
    const daysToEndOfWeek = 6 - today;

    for (let i = 0; i <= daysToEndOfWeek; i++) {
        const nextDate = new Date(startDate);
        nextDate.setDate(startDate.getDate() + i);
        dates.push(nextDate.getDate().toString());
    }
    return dates;
}



