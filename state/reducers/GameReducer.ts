import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AxiosService } from "../../backend/services";
import { addPost } from "../../backend/urls";

interface GameState {
  gameResponse: any;
  message?: string;
}

const initialState: GameState = {
  gameResponse: {},
  message:''
};

export const fetchGameData = createAsyncThunk<
  AxiosResponse<any> | { message: string },
  void
>('data/fetchGameData', async () => {
  const header = {
    'Content-Type': 'application/json',
  };
  const response = await AxiosService.post(addPost, header);

  if (response?.data) return response;
  return { message: 'no response from server' };
});

const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGameData.fulfilled, (state, action: PayloadAction<AxiosResponse<any> | { message: string }>) => {
      console.log('response success: ', action.payload);
      if ('data' in action.payload) {
        state.gameResponse = action.payload.data;
      } else {
        state.message = action.payload.message;
      }
    });
  },
});

export default GameSlice.reducer;
