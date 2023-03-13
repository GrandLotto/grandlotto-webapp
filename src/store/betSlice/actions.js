import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import "../../config/axios";
import {
  GET_CLOSED_GAMES_URL,
  GET_OPEN_GAMES_URL,
} from "../../config/urlConfigs";

export const Getuseropengameplayed = createAsyncThunk(
  "bets/Getuseropengameplayed",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      email: payload,
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const result = axios
        .post(GET_OPEN_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const GetMoreuseropengameplayed = createAsyncThunk(
  "bets/Getuseropengameplayed",
  async (payload, { getState, dispatch }) => {
    // const page = getState().bets.userOpenBetsPage;
    const newPayload = {
      email: payload?.email,
      pageNumber: payload?.page,
      pageSize: 20,
    };
    try {
      const result = axios
        .post(GET_OPEN_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const Getuserclosedgameplayed = createAsyncThunk(
  "bets/Getuserclosedgameplayed",
  async (payload, { getState, dispatch }) => {
    const newPayload = {
      email: payload,
      pageNumber: 1,
      pageSize: 10,
    };
    try {
      const result = axios
        .post(GET_CLOSED_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);

export const GetMoreuserclosedgameplayed = createAsyncThunk(
  "bets/GetMoreuserclosedgameplayed",
  async (payload, { getState, dispatch }) => {
    // const page = getState().bets.userOpenBetsPage;
    const newPayload = {
      email: payload?.email,
      pageNumber: payload?.page,
      pageSize: 20,
    };
    try {
      const result = axios
        .post(GET_CLOSED_GAMES_URL, newPayload)
        .then((response) => {
          return response.data;
        });

      return result;
    } catch (error) {}
  }
);
