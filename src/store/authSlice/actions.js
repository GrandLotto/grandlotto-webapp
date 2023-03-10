import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "../../config/axios";
import { GET_USERINFO_URL } from "../../config/urlConfigs";
import { logout } from "./authSlice";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (payload, { dispatch }) => {
    const newPayload = {
      email: payload,
    };
    try {
      const result = axios
        .post(GET_USERINFO_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {
      dispatch(logout());
    }
  }
);
