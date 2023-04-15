import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  photos: [],
  photo: null,
  name: '',
  model: '',
  shortDescription: '',
  description: '',
  vendor: '',
  contryVendor: '',
  typeEngine: '',
  functions: [],
  levelsApply: [],
  levelWarActions: '',
  class: '',
  flightRange: 0,
  wingspan: 0,
  maxFlyWeight: 0,
  payloadWeight: 0,
  maxSpeed: 0,
  cruiseSpeed: 0,
  maxFlyHeight: 0,
  heightOfUse: 0,
  flyDuration: 0,
};

export const currentBplaSlice = createSlice({
  name: 'currentBpla',
  initialState,
  reducers: {
    setElement: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setPhoto: (state, action) => {
      state.photo = action.payload;
    },
  },
});

export const { setPhoto, setElement } = currentBplaSlice.actions;

export default currentBplaSlice.reducer;
