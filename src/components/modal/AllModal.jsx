import React from "react";
import AddBankModal from "./AddBankModal";
import "./alert.scss";
import AlertModal from "./AlertModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import NotiicationModal from "./NotiicationModal";
import PageLoading from "./PageLoading";
import RedeemWinningModal from "./RedeemWinningModal";
import RegisterModal from "./RegisterModal";

const AllModal = () => {
  return (
    <>
      <AlertModal />
      <PageLoading />
      <LogoutModal />
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <AddBankModal />
      <NotiicationModal />
      <RedeemWinningModal />
    </>
  );
};

export default AllModal;
