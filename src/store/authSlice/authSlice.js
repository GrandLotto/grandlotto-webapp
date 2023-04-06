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
  isAdmin: false,
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
  refreshing: false,
  digitalDate: "00:00",
  acceptedIDType: null,
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

    setRefreshing: (state, { payload }) => {
      state.refreshing = payload;
    },

    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
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

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.loading = false;
        state.user = payload.data;
        state.error = false;
        // console.log(action.payload.data);
      } else {
        state.user = null;
        state.error = true;
        state.loading = false;
      }
    });
    builder.addCase(getUserInfo.rejected, (state, { payload }) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getacceptedid.fulfilled, (state, { payload }) => {
      if (payload && payload.data) {
        state.acceptedIDType = payload.data;
        // console.log("acceptedIDType", state.acceptedIDType);
      }
    });
  },
});

export const {
  setDigitalDate,
  setIsUserLoggedIn,
  logout,
  setUserInfo,
  setIsToken,
  setRefreshing,
  setIsAdmin,
} = authSlice.actions;

export default authSlice.reducer;
