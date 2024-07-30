import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  AddBalanceFinalizeAction,
  AddBalanceInitAction,
  GetBalanceAction,
} from '../../services/backend';
import {AppThunk} from '../store';
import {
  getHideBalanceTs,
  openPaymentApp,
  saveHideBalanceTs,
} from '../../services/misc';
import { showToast } from '../../utils/logger';

export interface WalletState {
  balance: number;
  virtualBalance:number;
  balanceDelta: number;
  showDelta: boolean;
}

export type SubmitAnswerResponse = {
  balanceDelta: number;
  currentBalance: number;
  currentVirtualBalance:number;
  insufficientBalance: boolean;
  insufficientVBalance:boolean;
  invalidToken: boolean;
  isCorrect: boolean;
  isTimeout: boolean;
};

const initialState: WalletState = {
  balance: 0,
  balanceDelta: 0,
  virtualBalance:0,
  showDelta: false,
};

async function waitTillHideTime() {
  const ts = await getHideBalanceTs();
  if (ts) {
    let hideTill = Number(ts);
    hideTill = Number.isNaN(hideTill) ? 0 : hideTill;
    const currTs = new Date().getTime();
    if (hideTill > currTs) {
      const diff = hideTill - currTs;
      await new Promise(resolve => setTimeout(resolve, diff));
    }
  }
}

export const fetchWalletBalance = createAsyncThunk(
  'walletSlice/fetch',
  async () => {
    try {
      await waitTillHideTime();
      const {data} = await GetBalanceAction();
      console.log(data.data)
      if (!data.success) {
        throw new Error('could not fetch wallet balance');
      }
      return data.data;
    } catch (err) {
      showToast('could not fetch wallet balance','success');
      throw err;
    }
  },
);

export const updateBalanceHideTs =
  (): AppThunk => async (dispatch, getState) => {
    dispatch(hideBalanceDelta());
    const {questionTimer} = getState().appConfig;
    const ts = new Date().getTime() + questionTimer * 1000;
    await saveHideBalanceTs(ts);
  };

export const addBalanceThunk =
  (amount: number): AppThunk =>
  async (dispatch, _getState) => {
    const {data} = await AddBalanceInitAction(amount);
    const {transactionId, appUpiId} = data.data;
    let isSuccessful = false;
    let errorReason = '';
    let trackingId = '';
    try {
      const res = await openPaymentApp(appUpiId, amount, transactionId);
      isSuccessful = res.isSuccessful;
      trackingId = res.response;
      if (!isSuccessful) {
        errorReason = 'Not able to find SUCCESS status';
      }
    } catch (res: any) {
      errorReason = res.toString();
      isSuccessful = false;
    }
    await AddBalanceFinalizeAction(
      amount,
      transactionId,
      isSuccessful,
      errorReason,
      trackingId,
    );
    dispatch(fetchWalletBalance());
    if (isSuccessful) {
      showToast('Balance added successfully',  'success');
    } else {
      showToast('Failed to add balance','success');
    }
  };

const WalletSlice = createSlice({
  name: 'walletSlice',
  initialState,
  reducers: {
    hideBalanceDelta: state => {
      state.showDelta = false;
    },
    updateBalanceDelta: (
      state,
      action: PayloadAction<SubmitAnswerResponse>,
    ) => {
      if (
        !action.payload.insufficientBalance &&
        !action.payload.invalidToken &&
        !action.payload.isTimeout
      ) {
        state.virtualBalance=action.payload.currentVirtualBalance;
        state.balance = action.payload.currentBalance;
        state.balanceDelta = action.payload.balanceDelta;
        state.showDelta = true;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWalletBalance.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.virtualBalance=action.payload.virtualBalance;
    });
  },
});

export const {updateBalanceDelta, hideBalanceDelta} = WalletSlice.actions;
export default WalletSlice;
