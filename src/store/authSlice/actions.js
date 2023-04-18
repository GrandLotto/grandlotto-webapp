import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "../../config/axios";
import {
  GET_ACCEPTED_IDTYPE_URL,
  GET_ALL_USERS_URL,
  GET_USERINFO_URL,
} from "../../config/urlConfigs";
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

export const getacceptedid = createAsyncThunk(
  "user/getacceptedid",
  async (payload, { dispatch }) => {
    try {
      const result = axios.get(GET_ACCEPTED_IDTYPE_URL).then((response) => {
        return response.data;
      });

      return result;
    } catch (error) {}
  }
);

export const getuserlist = createAsyncThunk(
  "user/getuserlist",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const result = axios
        .post(GET_ALL_USERS_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);
