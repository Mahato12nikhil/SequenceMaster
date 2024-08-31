import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "../../utils/logger";
import { GetAppConfigAction } from "../../services/backend";
import { reWriteUrl } from "../../utils/utilFns";
const TAG='AppConfig slice'
interface AppConfigState {
    appConfigLoaded: boolean;
    otpLength: number;
    gameEntryMinBalance: number;
    addBalMinAmount: number;
    addBalTax: number;
    addBalPlatform: number;
    withdrawBalMinAmount: number;
    questionTimer: number;
    resendOtpTimer: number;
    contactUsTxt: string;
    termCondUrl: string;
    playOptionAmounts: number[];
    gameJoinSocketUrl: string;
    webSocketServerPingUrl: string;
    webSocketQuestionTopic: string;
    webSocketAnswerTopic: string;
    playStoreUrl: string;
  }

  const initialState: AppConfigState = {
    appConfigLoaded: false,
    otpLength: 0,
    gameEntryMinBalance: 0,
    addBalMinAmount: 0,
    addBalTax: 0,
    addBalPlatform: 0,
    withdrawBalMinAmount: 0,
    questionTimer: 0,
    resendOtpTimer: 0,
    contactUsTxt: '',
    termCondUrl: '',
    playOptionAmounts: [],
    gameJoinSocketUrl: '',
    webSocketServerPingUrl: '',
    webSocketQuestionTopic: '',
    webSocketAnswerTopic: '',
    playStoreUrl: '',
  };

  export const fetchAppConfig = createAsyncThunk(
    'appConfigSlice/fetch',
    async () => {
      try {
        const {data} = await GetAppConfigAction();
        showMessage(TAG,data.data.otpLength)
        if (!data.success) {
          throw new Error('could not fetch app config');
        }
        showMessage(TAG,'Configuration loaded');
        return data.data as AppConfigState;
      } catch (err) {
        showMessage(TAG,'Could not fetch app config'+err);
        throw err;
      }
    },
  );
  const appConfigSlice = createSlice({
    name: 'appConfigSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchAppConfig.fulfilled, (state, action) => {
        state.appConfigLoaded = true;
        state.otpLength = action.payload.otpLength;
        state.gameEntryMinBalance = action.payload.gameEntryMinBalance;
        state.addBalMinAmount = action.payload.addBalMinAmount;
        state.addBalTax = action.payload.addBalTax;
        state.addBalPlatform = action.payload.addBalPlatform;
        state.withdrawBalMinAmount = action.payload.withdrawBalMinAmount;
        state.questionTimer = action.payload.questionTimer;
        state.resendOtpTimer = action.payload.resendOtpTimer;
        state.contactUsTxt = action.payload.contactUsTxt;
        state.termCondUrl = action.payload.termCondUrl;
        state.playOptionAmounts = action.payload.playOptionAmounts;
        state.gameJoinSocketUrl = action.payload.gameJoinSocketUrl;
        state.webSocketServerPingUrl =reWriteUrl(action.payload.webSocketServerPingUrl);
        state.webSocketQuestionTopic = action.payload.webSocketQuestionTopic;
        state.webSocketAnswerTopic = action.payload.webSocketAnswerTopic;
        state.playStoreUrl = action.payload.playStoreUrl;
      });
    },
  });
  
  export default appConfigSlice;