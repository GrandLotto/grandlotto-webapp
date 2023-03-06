import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoupons: [],
  betSlips: [],
};

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setSelectedCoupons: (state, { payload }) => {
      state.selectedCoupons = payload;
    },

    setBetSlips: (state, { payload }) => {
      state.betSlips = payload;
    },
  },

  extraReducers: {
    // [getUserInfo.pending]: (state, action) => {
    //   state.loading = true;
    // },
  },
});

export const { setSelectedCoupons, setBetSlips } = betSlice.actions;

export default betSlice.reducer;
