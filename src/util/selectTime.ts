import { selectTimeType } from "..";
import { allTimeHour } from "./allTime";
export const createSelectTime = () => {
    const minute = [0, 15, 30, 45,];
    return allTimeHour.map((hour): selectTimeType[] => {
        return minute.map(min => {
            return {
                hour: hour.hour,
                min: min,
                showText: `${hour.showHour}:${min.toString().padStart(2, '0')}`
            }
        })
    }).flat(2)
}

