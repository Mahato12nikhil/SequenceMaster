import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
//import { AxiosService } from "../../services/rest";
import { RootState } from "@reduxjs/toolkit/query";

interface GameState {
  gameResponse: any;
  message?: string;
}

const initialState: GameState = {
  gameResponse: {},
  message:''
};

export const fetchGameData = createAsyncThunk<
  any,any
>('', async () => {
  const header = {
    'Content-Type': 'application/json',
  };
  
  return { message: 'no response from server' };
});

const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameData.fulfilled, (state, action: any) => {
      console.log('response success: ', action.payload);
    });
    
  },
});

export default GameSlice;
