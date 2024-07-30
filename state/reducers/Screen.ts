import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeView } from "../../components/utility/Interfaces";

interface ScreenState {
    homeView: HomeView;
    loading:boolean
}
const initialState = {
    homeView:HomeView.UNDEFINED,
    loading: false,
}
const ScreenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        updateHomeView: (state, action: PayloadAction<HomeView>) =>{
            return {
               ...initialState,
                homeView: action.payload,
            }
        }
    },
   
  });
  export const { updateHomeView } = ScreenSlice.actions;
  export default ScreenSlice;