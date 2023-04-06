/* eslint-disable no-unused-vars */
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import BetSlipMobile from "../components/sidebar/BetSlipMobile";
import MobileMenu from "../components/sidebar/MobileMenu";
import SidebarMenuMobile from "../components/sidebar/SidebarMenuMobile";
import DigitalClock from "../global/DigitalClock";

const OAuthLayout = () => {
  const isLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);
  useLayoutEffect(() => {}, [isLoggedIn]);

  return (
    <>
      <div className="oauth-wrapper">
        <Header />
        <SidebarMenuMobile />
        <div className="page_content">
          <Outlet />
          <Footer />
        </div>
        <MobileMenu />
        <BetSlipMobile />
      </div>
    </>
  );
};

export default OAuthLayout;
