import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import GameSlice from "./reducers/GameSlice";
import ScreenSlice from "./reducers/Screen";
import appConfigSlice from "./reducers/AppConfig";
import WalletSlice from "./reducers/WalletSlice";
import UserSlice from "./reducers/UserSlice";
import tokenSlice from "./reducers/tokenSlice";

export const store=configureStore({
    reducer:{
        game:GameSlice.reducer,
        screen:ScreenSlice.reducer,
        appConfig:appConfigSlice.reducer,
        wallet:WalletSlice.reducer,
        user:UserSlice.reducer,
        token:tokenSlice.reducer
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;