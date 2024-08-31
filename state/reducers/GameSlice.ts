import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { EnterGameAction, LeaveGameAction } from '../../services/backend';
import { showMessage } from '../../utils/logger';
import { Platform } from 'react-native';
import { reWriteUrl } from '../../utils/utilFns';


export interface GameState {
  loading: boolean;
  selectedAmount: number;
  gameToken: string;
  gameJoinSocketUrl: string;
  gameType:string
}

export type EnterGameRes = {
  selectedAmount: number;
  gameToken: string;
  gameJoinSocketUrl: string;
  gameType:string

};
const initialState: GameState = {
  loading: false,
  selectedAmount: 0,
  gameToken: '',
  gameJoinSocketUrl: '',
  gameType:''
};
interface GAME_ACTION_TYPE{
  amount:number,
  gameType:string
}
export const enterGame = createAsyncThunk(
  'gameSlice/enter',
  async ({amount,gameType}:GAME_ACTION_TYPE):Promise<EnterGameRes> => {
    const {data} = await EnterGameAction(amount,gameType);
    if (data && data.success) {
      return data.data as EnterGameRes;
    }
    throw new Error('could not join game');
  },
);

export const leaveGame = createAsyncThunk(
  'gameSlice/leave',
  async (gameToken: string) => {
    await LeaveGameAction(gameToken);
  },
);

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(enterGame.pending, state => {
      state.loading = true;
      state.selectedAmount = 0;
      state.gameJoinSocketUrl = '';
      state.gameToken = '';
      state.gameType=''
      console.log('url')
    });
    builder.addCase(enterGame.rejected, state => {
      state.loading = false;
      showMessage('GameSlice','Room is full');
    });
    builder.addCase(enterGame.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedAmount = action.payload.selectedAmount;
      state.gameToken = action.payload.gameToken;
      const url= action.payload.gameJoinSocketUrl;
      //localhost
      state.gameJoinSocketUrl = reWriteUrl(url);
      state.gameType=action.payload.gameType
      console.log(state.gameJoinSocketUrl)
    });
    builder.addCase(leaveGame.fulfilled, state => {
      state.selectedAmount = 0;
      state.gameToken = '';
      state.gameJoinSocketUrl = '';
      state.gameType=''
    });
  },
});

export default gameSlice;
