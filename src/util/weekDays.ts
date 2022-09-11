export const getWeekDays = (selectDay: string) => {
    const selectDayforDate = new Date(selectDay);
    let weekStart = selectDayforDate.getDate() - selectDayforDate.getDay();
    if (weekStart < 1) {
        const minusDate = weekStart;
        weekStart = new Date(selectDayforDate.getFullYear(), selectDayforDate.getMonth(), minusDate).getDate();
    }
    const weekDays = [...Array(7).keys()].map((day) => (
        weekStart + day
    ));
    return weekDays;
}
