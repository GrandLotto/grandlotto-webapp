import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appScreenSize: "",
  siteName: "Grand Lotto",
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token") || "",
  darkMode: false,
  loginIdentity: null,
  isUserLoggedIn: false,
  // isUserLoggedIn: !!localStorage.getItem("userInfo"),
  pageLoading: {
    status: false,
    message: "",
  },

  digitalDate: "00:00",
};

const authSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setPageLoading: (state, { payload }) => {
      state.pageLoading = {
        status: payload.status,
        message: payload.message,
      };
    },
    setDigitalDate: (state, { payload }) => {
      state.digitalDate = payload;
    },
  },

  extraReducers: {
    // [getUserInfo.pending]: (state, action) => {
    //   state.loading = true;
    // },
  },
});

export const { setPageLoading, setDigitalDate } = authSlice.actions;

export default authSlice.reducer;
