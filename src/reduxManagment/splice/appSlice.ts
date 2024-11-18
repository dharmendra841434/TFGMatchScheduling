import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface AppState {
  test?: string;
  scheduledList: Array<object>;
  // Add other properties as needed
}
// Define the initial state
const initialState: AppState = {
  test: 'testing',
  scheduledList: [],
  // Initialize other properties as needed
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTest: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
    },
    setScheduledMatchList: (state, action: PayloadAction<any>) => {
      state.scheduledList = action.payload;
    },
  },
});
export const {setTest, setScheduledMatchList} = appSlice.actions;

export default appSlice.reducer;
