import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/grandlotto.png";

import person from "../../assets/images/person.png";
import {
  setLoginModal,
  setRegisterModal,
  setMobileMenu,
  setLogoutModal,
  setSideBarMenu,
} from "../../store/alert/alertSlice";
import HeaderDropDownBlock from "../blocks/HeaderDropDownBlock";

const Topheader = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  const [showDropDown, setshowDropDown] = useState(false);

  const toggleDropDown = (val) => {
    setTimeout(() => {
      val === false ? setshowDropDown(val) : setshowDropDown(!showDropDown);
      console.log("here");
    }, 200);
  };

  window.addEventListener("click", (e) => {
    const dropDown = document.querySelector(".header_top_dropDown");
    if (dropDown)
      if (!e.composedPath().includes(dropDown)) toggleDropDown(false);
  });

  useEffect(() => {
    if (location) {
      toggleDropDown(false);
      dispatch(setSideBarMenu(false));
      dispatch(setMobileMenu(false));
    }
  }, [location]);

  return (
    <div className="relative  topHeader">
      <NavLink to="/" className="topHeaderLogo">
        <img src={Logo} alt="grand-logo" />
      </NavLink>
      <div className="topHeaderRight ">
        <div className="topHeaderRightLeft d-flex align-items-center">
          <NavLink to="/about" className="top_link">
            How to play
          </NavLink>
          <NavLink to="/about" className="top_link">
            Promotions
          </NavLink>
          <NavLink to="/about" className="top_link">
            Contact Us
          </NavLink>
          <NavLink to="/about" className="top_link">
            FirstBet
          </NavLink>
        </div>

        {isUserLoggedIn ? (
          <div className="topHeaderRightLoggedIn">
            <div className="topHeaderRightLoggedInBalance">
              <p>Balance</p>
              <h5>₦0.00</h5>
            </div>
            <div
              className="topHeaderRightLoggedInImage"
              onClick={() => toggleDropDown(true)}
            >
              <img src={person} alt="grand-logo" />
              <i
                className="bx bx-chevron-down"
                style={{ color: "#fff", display: "block" }}
              ></i>
            </div>
            {showDropDown ? <HeaderDropDownBlock /> : null}
          </div>
        ) : (
          <div className="topHeaderRightButtons ">
            <button
              className="grandLottoButton button-outline-light"
              onClick={() => dispatch(setLoginModal(true))}
            >
              Sign In
            </button>
            <button
              onClick={() => dispatch(setRegisterModal(true))}
              className="grandLottoButton"
            >
              Sign Up
            </button>
          </div>
        )}

        <div
          className="hamburgar"
          onClick={() => dispatch(setMobileMenu(true))}
        >
          <i className="bx bx-menu"></i>
        </div>

        {/* <div className="topHeaderRightButtons ">
          <button
            className="grandLottoButton button-outline-light"
            onClick={() => dispatch(setLoginModal(true))}
          >
            Sign In
          </button>
          <button
            onClick={() => dispatch(setRegisterModal(true))}
            className="grandLottoButton"
          >
            Sign Up
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Topheader;
