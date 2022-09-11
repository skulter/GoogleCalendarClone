import { currentCalendarType } from "..";
import { getWeekDays } from "./weekDays";

export const createCurrentDate = (date: string): currentCalendarType => {
    const currentDate = new Date(date);
    return {
        days: getWeekDays(currentDate.toString()),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        currentDate: currentDate
    }
}