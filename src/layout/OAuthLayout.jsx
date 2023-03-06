/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import MobileMenu from "../components/sidebar/MobileMenu";
import SidebarMenuMobile from "../components/sidebar/SidebarMenuMobile";

const OAuthLayout = () => {
  return (
    <div className="oauth-wrapper">
      <Header />
      <SidebarMenuMobile />
      <div className="page_content">
        <Outlet />
        <Footer />
      </div>
      <MobileMenu />
    </div>
  );
};

export default OAuthLayout;
