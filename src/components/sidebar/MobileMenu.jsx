import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  setLoginModal,
  setMobileMenu,
  setSideBarMenu,
} from "../../store/alert/alertSlice";

const MobileMenu = () => {
  const dispatch = useDispatch();
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <div className="mobile-menu">
      <a
        href="true"
        onClick={(e) => {
          e.preventDefault();
          dispatch(setMobileMenu(false));
          dispatch(setSideBarMenu(!sideBarMenu));
        }}
      >
        <div>
          <i className="bx bx-menu"></i>
        </div>
        <span>Menu</span>
      </a>

      {isUserLoggedIn ? (
        <NavLink to="/account/dashboard">
          <div>
            <i className="bx bx-home"></i>
          </div>
          <span>Home</span>
        </NavLink>
      ) : (
        <NavLink to="/">
          <div>
            <i className="bx bx-home"></i>
          </div>
          <span>Home</span>
        </NavLink>
      )}

      {/* <NavLink to="/betslip">
        <div className="has_count mb-0">
          <small>2</small>
          <i className="bx bx-receipt"></i>
        </div>
        <span>Betslip</span>
      </NavLink> */}

      <NavLink to="/lotto">
        <div>
          <i className="bx bxs-bowling-ball"></i>
        </div>
        <span>Lotto</span>
      </NavLink>

      {isUserLoggedIn ? (
        <NavLink to="/account/bet-history">
          <div>
            <i className="bx bx-receipt"></i>
          </div>
          <span>My Bets</span>
        </NavLink>
      ) : (
        <NavLink to="/results">
          <div>
            <i className="bx bx-history"></i>
          </div>
          <span>Results</span>
        </NavLink>
      )}

      {isUserLoggedIn ? (
        <NavLink to="/account/fund-wallet">
          <div>
            <i className="bx bx-wallet-alt"></i>
          </div>
          <span>Deposit</span>
        </NavLink>
      ) : (
        <a
          href="true"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setLoginModal(true));
          }}
        >
          <div>
            <i className="bx bx-log-in"></i>
          </div>
          <span>Login</span>
        </a>
      )}
    </div>
  );
};

export default MobileMenu;
