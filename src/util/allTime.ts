import { allTime } from "../index";
export const getAllTimeArray = (): allTime[] => {
    return [...Array(24).keys()].map((number) => {
        return {
            hour: number,
            showHour: number < 13 ? `오전 ${number === 0 ? 12 : number}` : `오후 ${number % 12}`
        }
    })
}
export const allTimeHour = getAllTimeArray();