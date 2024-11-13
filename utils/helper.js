function getCurrentDate() {
    return new Date().getDate().toString();
}

function getCurrentMonth() {
    return new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
}

function getWeekDates(startDate = new Date()) {
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

module.exports = {
    getCurrentDate,
    getCurrentMonth,
    getWeekDates
};
