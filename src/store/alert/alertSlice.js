import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: {
    status: false,
    payload: null,
  },
  alertPopUp: {
    status: false,
    type: "",
    title: "",
    desc: "",
    payload: null,
  },
  pageLoading: {
    status: false,
    message: "",
  },

  loginModal: false,
  registerModal: false,
  forgotPasswordModal: false,
  mobileMenu: false,
  sideBarMenu: false,
  selectDrawMenu: false,
  addBankModal: false,
  notiicationModal: false,
  betSlipMobileModal: false,
  redeemWinningModal: false,

  inputCodeModal: {
    status: false,
    type: "",
    title: "",
    desc: "",
    btnText: "",
    payload: null,
  },
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setPageLoading: (state, { payload }) => {
      state.pageLoading = {
        status: payload.status,
        message: payload.message,
      };
    },

    setLoginModal: (state, { payload }) => {
      state.loginModal = payload;
    },

    setRegisterModal: (state, { payload }) => {
      state.registerModal = payload;
    },

    setForgotPasswordModal: (state, { payload }) => {
      state.forgotPasswordModal = payload;
    },

    setMobileMenu: (state, { payload }) => {
      state.mobileMenu = payload;
    },

    setSideBarMenu: (state, { payload }) => {
      state.sideBarMenu = payload;
    },

    setAddBankModal: (state, { payload }) => {
      state.addBankModal = payload;
    },

    setAlertPopUp: (state, { payload }) => {
      state.alertPopUp = {
        status: payload.status,
        type: payload.type,
        title: payload.title,
        desc: payload.desc,
        payload: payload.payload,
      };
    },
    setLogoutModal: (state, { payload }) => {
      state.logoutModal = {
        status: payload.status,
        payload: payload.payload,
      };
    },
    setNotiicationModal: (state, { payload }) => {
      state.notiicationModal = payload;
    },

    setSelectDrawMenu: (state, { payload }) => {
      state.selectDrawMenu = payload;
    },

    setBetSlipMobileModal: (state, { payload }) => {
      state.betSlipMobileModal = payload;
    },

    setPageLoading: (state, { payload }) => {
      state.pageLoading = payload;
    },

    setRedeemWinningModal: (state, { payload }) => {
      state.redeemWinningModal = payload;
    },

    setInputCodeModal: (state, { payload }) => {
      state.inputCodeModal = payload;
    },
  },

  extraReducers: {
    // [getUserInfo.pending]: (state, action) => {
    //   state.loading = true;
    // },
  },
});

export const {
  setAlertPopUp,
  setLoginModal,
  setLogoutModal,
  setRegisterModal,
  setForgotPasswordModal,
  setMobileMenu,
  setSideBarMenu,
  setAddBankModal,
  setNotiicationModal,
  setSelectDrawMenu,
  setBetSlipMobileModal,
  setPageLoading,
  setRedeemWinningModal,
  setInputCodeModal,
} = alertSlice.actions;

export default alertSlice.reducer;
