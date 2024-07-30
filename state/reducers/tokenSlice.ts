import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {userDetailUpdate} from './UserSlice';
import { RootStackParamList } from '../../utils/navigation';
import { RenewTokenResponse } from '../../definitions/user';
import { AppThunk } from '../store';
import { saveRefreshToken, saveUserPhone } from '../../services/misc';


export interface TokenState {
  token: string;
  refreshToken: string;
  splashLoaded: boolean;
  screenAfterSplash: keyof RootStackParamList | null;
  screenParams: any | {[k: string]: string | number | boolean} | undefined;
}
type ScrnPayload = {
  screenName: keyof RootStackParamList | null;
  param: {[k: string]: string | number | boolean} | undefined;
};
const initialState: TokenState = {
  token: '',
  refreshToken: '',
  splashLoaded: false,
  screenAfterSplash: null,
  screenParams: undefined,
};
export const updateTokenThunk =
  (param: RenewTokenResponse): AppThunk =>
  async (dispatch, _getState) => {
    dispatch(userDetailUpdate(param.data.user));
    dispatch(updateToken(param.data.token));
    if (param.data.refreshToken) {
      dispatch(updateRefreshToken(param.data.refreshToken));
      await saveRefreshToken(param.data.refreshToken);
      await saveUserPhone(param.data.user.phone);
    }
  };

const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState,
  reducers: {
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    updateSplashLoaded: state => {
      state.splashLoaded = true;
    },
    updateScreenAfterSplsh: (state, action: PayloadAction<ScrnPayload>) => {
      state.screenAfterSplash = action.payload.screenName;
      state.screenParams = action.payload.param;
    },
  },
});
export const {
  updateRefreshToken,
  updateToken,
  updateSplashLoaded,
  updateScreenAfterSplsh,
} = tokenSlice.actions;
export default tokenSlice;
