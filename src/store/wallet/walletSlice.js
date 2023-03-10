import { createSlice } from "@reduxjs/toolkit";
import { getAccountBalances, getUserAccount } from "./actions";

const initialState = {
  accountBalances: null,
  userBankAccounts: null,
  loading: false,
  error: false,
};

const walletSlice = createSlice({
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
    [getAccountBalances.pending]: (state, action) => {
      state.loading = true;
    },

    [getAccountBalances.fulfilled]: (state, action) => {
      // console.log("here");
      // console.log(action.payload);
      if (action.payload && action.payload.data) {
        state.loading = false;
        state.accountBalances = action.payload.data;
        state.error = false;
        // console.log(action.payload.data);
      } else {
        state.error = true;
        state.loading = false;
      }
    },

    [getAccountBalances.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getUserAccount.fulfilled]: (state, action) => {
      // console.log("here");
      // console.log(action.payload);
      if (action.payload && action.payload.data) {
        state.userBankAccounts = action.payload.data;
        console.log("userBankAccounts", state.userBankAccounts);
      }
    },
  },
});

export const { setSelectedCoupons, setBetSlips } = walletSlice.actions;

export default walletSlice.reducer;
