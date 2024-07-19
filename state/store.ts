import { configureStore } from "@reduxjs/toolkit";
import GameSlice from "./reducers/GameSlice";

export const store=configureStore({
    reducer:{
        game:GameSlice.reducer,
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;