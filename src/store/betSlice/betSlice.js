import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCoupons: [],
};

const betSlice = createSlice({
  name: "bets",
  initialState,
  reducers: {
    setSelectedCoupons: (state, { payload }) => {
      state.selectedCoupons = payload;
    },
  },

  extraReducers: {
    // [getUserInfo.pending]: (state, action) => {
    //   state.loading = true;
    // },
  },
});

export const { setSelectedCoupons } = betSlice.actions;

export default betSlice.reducer;
