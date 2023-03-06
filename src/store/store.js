import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import alertSlice from "./alert/alertSlice";
import betSlice from "./betSlice/betSlice";

export const store = configureStore({
  reducer: {
    oauth: authSlice,
    alert: alertSlice,
    bets: betSlice,
  },
});
