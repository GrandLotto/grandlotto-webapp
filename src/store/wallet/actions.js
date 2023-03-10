import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "../../config/axios";
import { GET_ACCOUNT_BALANCES_URL } from "../../config/urlConfigs";

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
