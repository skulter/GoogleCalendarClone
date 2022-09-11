import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../index";
import { scheduleType } from '../../index'

let nextId = 1;
const initialState: scheduleType[] = [
    {
        id: 1,
        date: '2022-09-12',
        startDate: {
            hour: 0,
            min: 0
        },
        endDate: {
            hour: 0,
            min: 15
        },
        title: '테스트'
    },
    {
        id: 2,
        date: '2022-09-13',
        startDate: {
            hour: 0,
            min: 15
        },
        endDate: {
            hour: 0,
            min: 30
        },
        title: '테스트'
    },
    {
        id: 3,
        date: '2022-09-14',
        startDate: {
            hour: 0,
            min: 0
        },
        endDate: {
            hour: 0,
            min: 30
        },
        title: '테스트'
    },
    {
        id: 4,
        date: '2022-09-15',
        startDate: {
            hour: 0,
            min: 0
        },
        endDate: {
            hour: 1,
            min: 0
        },
        title: '테스트'
    },
];

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        addSchedule: (state: scheduleType[], action: PayloadAction<scheduleType>) => {
            state.push({
                ...action.payload,
                id: ++nextId
            })
        },
        deleteSchedule: (state: scheduleType[], action: PayloadAction<number>) => {
            console.log(action.payload)
            return state.filter((data) => (
                data.id !== action.payload
            ))
        }
    }
})

export const { addSchedule, deleteSchedule } = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;
export default scheduleSlice.reducer