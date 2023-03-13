import { createSlice } from "@reduxjs/toolkit";
import {
  Getuseropengameplayed,
  GetMoreuseropengameplayed,
  Getuserclosedgameplayed,
  GetMoreuserclosedgameplayed,
} from "./actions";

const initialState = {
  selectedCoupons: [],
  betSlips: [1, 2],
  userOpenBets: null,
  userOpenBetsPage: 1,
  userOpenBetsTotalPages: 3,
  userClosedBets: null,
  userCloseBetsPage: 1,
  userCloseBetsTotalPages: 3,
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
    [Getuseropengameplayed.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data) {
        state.userOpenBets = action.payload.data?.data;
        state.userOpenBetsPage = action.payload.data?.pageNumber;
        state.userOpenBetsTotalPages = action.payload.data?.totalPages;
        // console.log("userOpenBets", state.userOpenBets);
      }
    },

    [Getuserclosedgameplayed.fulfilled]: (state, action) => {
      if (action.payload && action.payload.data) {
        state.userClosedBets = action.payload.data?.data;
        state.userCloseBetsPage = action.payload.data?.pageNumber;
        state.userCloseBetsTotalPages = action.payload.data?.totalPages;
        // console.log("userClosedBets", state.userClosedBets);
      }
    },
  },
});

export const { setSelectedCoupons, setBetSlips } = betSlice.actions;

export default betSlice.reducer;
