import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";
//import { uiSlice, calendarSlice, authSlice } from "./";




export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        ui:       uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
        serializableCheck: false
        
    })

})