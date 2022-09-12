import { selectTimeType } from "..";
import { allTimeHour } from "./allTime";

export const createSelectTime = (startIndex?: number) => {
    const minute = [0, 15, 30, 45,];
    let index = 0;
    return allTimeHour.map((hour): selectTimeType[] => {
        return minute.map((min) => {
            return {
                id: index++,
                hour: hour.hour,
                min: min,
                showText: `${hour.showHour}:${min.toString().padStart(2, '0')}`
            }
        })
    }).flat(2).slice(startIndex);
}

