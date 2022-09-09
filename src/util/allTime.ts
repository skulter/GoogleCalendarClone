import { allTime } from "index";
export const getAllTimeArray = (): allTime[] => {
    return [...Array(24).keys()].map((number, index) => {
        return { hour: number, showHour: number < 13 ? `오전 ${number}시` : `오후 ${number % 12}시` }
    })
}
export const allTimeHour = getAllTimeArray();