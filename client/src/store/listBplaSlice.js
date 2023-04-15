import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const listBplaSlice = createSlice({
  name: 'listBpla',
  initialState,
  reducers: {
    set: (state, action) => {
      state = action.payload;
    },
  },
});

export const { set } = listBplaSlice.actions;

export default listBplaSlice.reducer;
