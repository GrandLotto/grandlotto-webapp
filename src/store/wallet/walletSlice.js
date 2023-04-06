import { createSlice } from "@reduxjs/toolkit";
import {
  getacceptedpayment,
  getAccountBalances,
  getCountryBanks,
  getDepositlogs,
  getUserAccount,
  getWithdrawfundrequest,
} from "./actions";

const initialState = {
  accountBalances: null,
  userBankAccounts: null,
  acceptedpayment: null,
  userDeposits: null,
  userDepositsPage: 1,
  userDepositsTotalPages: 3,
  userWithdrawal: null,
  userWithdrawalPage: 1,
  userWithdrawalTotalPages: 3,
  countryBanks: [],
  loading: false,
  error: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setSelectedCoupons: (state, { payload }) => {
      state.selectedCoupons = payload;
    },

    setBetSlips: (state, { payload }) => {
      state.betSlips = payload;
    },

    setAccountBalances: (state, { payload }) => {
      state.accountBalances = payload;
    },

    setUserDeposits: (state, { payload }) => {
      state.userDeposits = [...payload];
    },

    setUserDepositsPage: (state, { payload }) => {
      state.userDepositsPage = payload;
    },

    setUserDepositsTotalPages: (state, { payload }) => {
      state.userDepositsTotalPages = payload;
    },

    setUserWithdrawal: (state, { payload }) => {
      state.userWithdrawal = [...payload];
    },

    setUserWithdrawalPage: (state, { payload }) => {
      state.userWithdrawalPage = payload;
    },

    setUserWithdrawalTotalPages: (state, { payload }) => {
      state.userWithdrawalTotalPages = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAccountBalances.pending, (state, { payload }) => {
      state.loading = true;
    });

    builder.addCase(getAccountBalances.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.loading = false;
        state.accountBalances = payload.data;
        state.error = false;
      } else {
        state.user = null;
        state.error = true;
        state.loading = false;
      }
    });

    builder.addCase(getAccountBalances.rejected, (state, { payload }) => {
      state.error = true;
      state.loading = false;
    });

    builder.addCase(getUserAccount.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userBankAccounts = payload.data;
      }
    });

    builder.addCase(getWithdrawfundrequest.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userWithdrawal = payload.data?.data;
        state.userWithdrawalPage = payload.data?.pageNumber;
        state.userWithdrawalTotalPages = payload.data?.totalPages;
      }
    });

    builder.addCase(getDepositlogs.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.userDeposits = payload.data?.data;
        state.userDepositsPage = payload.data?.pageNumber;
        state.userDepositsTotalPages = payload.data?.totalPages;
      }
    });

    builder.addCase(getCountryBanks.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.countryBanks = payload.data;
      }
    });

    builder.addCase(getacceptedpayment.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.acceptedpayment = payload.data;
      }
    });
  },
});

export const {
  setSelectedCoupons,
  setBetSlips,
  setAccountBalances,
  setUserDeposits,
  setUserDepositsPage,
  setUserDepositsTotalPages,
  setUserWithdrawal,
  setUserWithdrawalPage,
  setUserWithdrawalTotalPages,
} = walletSlice.actions;

export default walletSlice.reducer;
