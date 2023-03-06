import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  setBetSlipMobileModal,
  setSideBarMenu,
} from "../../store/alert/alertSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);

  return (
    <div className="mobile-menu">
      <a
        onClick={() => {
          dispatch(setSideBarMenu(!sideBarMenu));
        }}
      >
        <div>
          <i className="bx bx-menu"></i>
        </div>
        <span>Menu</span>
      </a>
      <NavLink to="/account/dashboard">
        <div>
          <i className="bx bx-home"></i>
        </div>
        <span>Home</span>
      </NavLink>
      <NavLink to="/betslip">
        <div className="has_count mb-0">
          <small>2</small>
          <i className="bx bx-receipt"></i>
        </div>
        <span>Betslip</span>
      </NavLink>

      <NavLink to="/account/profile">
        <div>
          <i className="bx bx-user-circle"></i>
        </div>
        <span>Profile</span>
      </NavLink>
      <a>
        <div>
          <i className="bx bx-message-rounded"></i>
        </div>
        <span>Live chat</span>
      </a>
    </div>
  );
};

export default MobileMenu;
