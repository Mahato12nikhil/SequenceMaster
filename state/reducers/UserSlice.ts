import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { UserSchema } from '../../definitions/user';


export interface userState {
  userDetail?: UserSchema;
  loading: boolean;
  loginState: userLoginState;
  intermediatePhone: string | undefined;
}
export enum userLoginState {
  login = 0,
  otp = 1,
}

const initialState: userState = {
  userDetail: undefined,
  loading: false,
  loginState: userLoginState.login,
  intermediatePhone: undefined,
};

type UserLoginStateUpdateSchema = {
  value: userLoginState;
  intermediatePhone?: string;
};

const UserSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    userRegLogState: (
      state,
      action: PayloadAction<UserLoginStateUpdateSchema>,
    ) => {
      state.loginState = action.payload.value;
      state.intermediatePhone = action.payload.intermediatePhone;
    },
    userDetailUpdate: (state, action: PayloadAction<UserSchema>) => {
      state.userDetail = action.payload;
    },
    loadingUpdate: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const {userDetailUpdate, loadingUpdate, userRegLogState} =
  UserSlice.actions;
export default UserSlice;
