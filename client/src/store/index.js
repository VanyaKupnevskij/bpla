import { configureStore } from '@reduxjs/toolkit';
import currentBplaReducer from './currentBplaSlice';
import listBplaReducer from './listBplaSlice';

export const store = configureStore({
  reducer: {
    currentBpla: currentBplaReducer,
    listBpla: listBplaReducer,
  },
});
