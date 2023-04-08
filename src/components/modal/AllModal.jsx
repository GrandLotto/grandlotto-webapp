import React from "react";
import AddBankModal from "./AddBankModal";
import AlertModal from "./AlertModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import FnputCodeModal from "./FnputCodeModal";
import LoginModal from "./LoginModal";
import LogoutModal from "./LogoutModal";
import NotiicationModal from "./NotiicationModal";
import PageLoading from "./PageLoading";
import RedeemWinningModal from "./RedeemWinningModal";
import RegisterModal from "./RegisterModal";
import AddPinModal from "./AddPinModal";
import ComingSoonModal from "./ComingSoonModal";
import AlertModalBet from "./AlertModalBet";
import AlertSmallPopUp from "./AlertSmallPopUp";
import SearchCouponCodeModal from "./SearchCouponCodeModal";
import ConfirmModal from "./ConfirmModal";

const AllModal = () => {
  return (
    <>
      <AlertModal />
      <AlertSmallPopUp />
      <AlertModalBet />
      <PageLoading />
      <ConfirmModal />
      <LogoutModal />
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <AddPinModal />
      <AddBankModal />
      <NotiicationModal />
      <RedeemWinningModal />
      <SearchCouponCodeModal />
      <FnputCodeModal />
      <ComingSoonModal />
    </>
  );
};

export default AllModal;
