/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import BetSlipMobile from "../components/sidebar/BetSlipMobile";
import MobileMenu from "../components/sidebar/MobileMenu";
import SidebarMenuMobile from "../components/sidebar/SidebarMenuMobile";
import ThreeColLeft from "../components/sidebar/ThreeColLeft";
import ThreeColRight from "../components/sidebar/ThreeColRight";
import DigitalClock from "../global/DigitalClock";

const ThreeColLayout = () => {
  return (
    <>
      <div className="oauth-wrapper">
        <Header />
        <SidebarMenuMobile />
        <div className="threeColWrapper">
          <ThreeColLeft />
          <div className="page_content main_center">
            <div className="main_center_wrapper">
              <Outlet />
            </div>
          </div>

          <ThreeColRight />
        </div>
        <Footer />

        <MobileMenu />
        <BetSlipMobile />
      </div>
    </>
  );
};

export default ThreeColLayout;
