import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "../../config/axios";
import {
  GET_ACCEPTED_PAYMENT_URL,
  GET_ACCOUNT_BALANCES_URL,
  GET_COUNTRY_BANK_ACCOUNTS_URL,
  GET_USER_BANK_ACCOUNTS_URL,
} from "../../config/urlConfigs";

export const getAccountBalances = createAsyncThunk(
  "wallet/GetAccountBalances",
  async (payload, { dispatch }) => {
    const newPayload = {
      email: payload,
    };
    try {
      const result = axios
        .post(GET_ACCOUNT_BALANCES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const getUserAccount = createAsyncThunk(
  "wallet/getUserAccount",
  async (payload, { dispatch }) => {
    const newPayload = {
      email: payload,
    };
    try {
      const result = axios
        .post(GET_USER_BANK_ACCOUNTS_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const getCountryBanks = createAsyncThunk(
  "wallet/getCountryBanks",
  async (payload, { dispatch }) => {
    const newPayload = {
      countryCode: payload || "NG",
    };
    try {
      const result = axios
        .post(GET_COUNTRY_BANK_ACCOUNTS_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const getacceptedpayment = createAsyncThunk(
  "wallet/getacceptedpayment",
  async (payload, { dispatch }) => {
    try {
      const result = axios.get(GET_ACCEPTED_PAYMENT_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);
