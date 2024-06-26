import { configureStore } from "@reduxjs/toolkit";
import GameReducer from "./reducers/GameReducer";

export const store=configureStore({
    reducer:{
        game:GameReducer,
    }
})