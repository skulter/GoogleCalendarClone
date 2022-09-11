import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./modules/calendar";
import scheduleSlice from "./modules/schedule";

const store = configureStore({
    reducer: {
        schedule: scheduleSlice,
        calendar: calendarSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export type RootState = ReturnType<typeof store.getState>;
export default store