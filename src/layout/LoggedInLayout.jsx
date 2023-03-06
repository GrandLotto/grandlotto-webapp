/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderTop from "../components/header/HeaderTop";
import BetSlipMobile from "../components/sidebar/BetSlipMobile";
import MobileMenu from "../components/sidebar/MobileMenu";
import Sidebar from "../components/sidebar/Sidebar";

const LoggedInLayout = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="content-body">
        <HeaderTop />
        <Outlet />
      </div>

      <MobileMenu />
      <BetSlipMobile />
    </div>
  );
};

export default LoggedInLayout;
