import { configureStore } from "@reduxjs/toolkit";
import pelitReducer from "./pelitSlice";

export const store = configureStore({

    reducer : {
        pelit : pelitReducer
    }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;