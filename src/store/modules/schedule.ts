import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../index";
import { scheduleType } from '../../index'

const initialState: scheduleType[] = [];

const getInitialState = (): scheduleType[] => {
    const initState = localStorage.getItem('schedules') ? JSON.parse(localStorage.getItem('schedules') as string) : initialState
    return initState;
};

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: getInitialState(),
    reducers: {
        addSchedule: (state: scheduleType[], action: PayloadAction<scheduleType>) => {
            state.push({
                ...action.payload,
                id: Math.random().toString(36).substring(2, 16)
            })
            localStorage.setItem('schedules', JSON.stringify(state));
        },
        deleteSchedule: (state: scheduleType[], action: PayloadAction<string>) => {
            const currentState = state.filter((data) => (
                data.id !== action.payload
            ))
            localStorage.setItem('schedules', JSON.stringify(currentState));
            return currentState;
        }
    }
});

export const { addSchedule, deleteSchedule } = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;
export default scheduleSlice.reducer