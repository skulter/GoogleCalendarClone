export interface allTime {
    showHour: string,
    hour: number,
}

interface scheduleTime {
    hour: number,
    min: number
}

export interface selectTimeType extends scheduleTime {
    id: number,
    showText: string
}
export interface scheduleType {
    id: string,
    title: string,
    date: string,
    startDate: scheduleTime,
    endDate: scheduleTime,
}
export interface currentCalendarType {
    days: number[],
    month: number,
    year: number
    currentDate: date
}
export interface calendarType {
    today: date,
    selectDay: date,
    current: currentCalendarType
}

export interface deleteModalInfoType {
    id: string,
    position: {
        x: number,
        y: number
    }
}