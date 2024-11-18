import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../splice/appSlice';
export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
