import { configureStore } from "@reduxjs/toolkit";
import pelitReducer from "./pelitSlice";
import yksiPeliReducer from "./yksiPeliSlice";

export const store = configureStore({

    reducer : {
        pelit : pelitReducer,
        peli : yksiPeliReducer
    }

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;