import { createSlice } from "@reduxjs/toolkit";
import { getacceptedid, getUserInfo } from "./actions";

const initialState = {
  appScreenSize: "",
  siteName: "Grand Lotto",
  // user: localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null,
  user: null,
  token: localStorage.getItem("appUserThemeSettingsCode") || "",
  // token: localStorage.getItem("appUserThemeSettingsCode") || "",
  darkMode: false,
  loginIdentity: null,
  isUserLoggedIn: false,
  // isUserLoggedIn: !!localStorage.getItem("appUserThemeSettingsCode"),
  pageLoading: {
    status: false,
    message: "",
  },
  loading: false,
  error: false,
  digitalDate: "00:00",
  acceptedIDType: [],
};

const authSlice = createSlice({
  name: "oauth",
  initialState,
  reducers: {
    setDigitalDate: (state, { payload }) => {
      state.digitalDate = payload;
    },

    setIsUserLoggedIn: (state, { payload }) => {
      state.isUserLoggedIn = payload;
    },
    setIsToken: (state, { payload }) => {
      state.token = payload;
    },

    setUserInfo: (state, { payload }) => {
      state.user = payload;
    },

    logout: (state) => {
      state.token = "";
      state.isUserLoggedIn = false;
      state.user = null;
      localStorage.removeItem("appUserThemeSettingsCode");
      localStorage.removeItem("appexrat");
      localStorage.removeItem("persist:root");
    },
  },

  extraReducers: {
    [getUserInfo.pending]: (state, action) => {
      state.loading = true;
    },

    [getUserInfo.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload && action.payload.data) {
        state.loading = false;
        state.user = action.payload.data;
        state.error = false;
        // console.log(action.payload.data);
      } else {
        state.user = null;
        state.error = true;
        state.loading = false;
      }
    },

    [getUserInfo.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },

    [getacceptedid.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload && action.payload.data) {
        state.acceptedIDType = action.payload.data;
        console.log("acceptedIDType", state.acceptedIDType);
      }
    },
  },
});

export const {
  setDigitalDate,
  setIsUserLoggedIn,
  logout,
  setUserInfo,
  setIsToken,
} = authSlice.actions;

export default authSlice.reducer;
