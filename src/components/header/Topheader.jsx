import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/grandlotto.png";

import person from "../../assets/images/default.png";
import {
  setLoginModal,
  setRegisterModal,
  setMobileMenu,
  setLogoutModal,
  setSideBarMenu,
  setComingSoonModal,
} from "../../store/alert/alertSlice";
import HeaderDropDownBlock from "../blocks/HeaderDropDownBlock";
import HeaderTopBalance from "../blocks/HeaderTopBalance";

const Topheader = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);
  const user = useSelector((state) => state.oauth.user);

  const [showDropDown, setshowDropDown] = useState(false);

  const toggleDropDown = (val) => {
    setTimeout(() => {
      val === false ? setshowDropDown(val) : setshowDropDown(!showDropDown);
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
          <a
            className="top_link"
            onClick={() => {
              dispatch(setComingSoonModal(true));
            }}
          >
            How to play
          </a>
          <a
            className="top_link"
            onClick={() => {
              dispatch(setComingSoonModal(true));
            }}
          >
            Promotions
          </a>
          <a
            className="top_link"
            onClick={() => {
              dispatch(setComingSoonModal(true));
            }}
          >
            Contact Us
          </a>
          <a
            className="top_link"
            onClick={() => {
              dispatch(setComingSoonModal(true));
            }}
          >
            FirstBet
          </a>
        </div>

        {isUserLoggedIn ? (
          <div className="topHeaderRightLoggedIn">
            <HeaderTopBalance />

            <div
              className="topHeaderRightLoggedInImage"
              onClick={() => toggleDropDown(true)}
            >
              {user && user?.photo ? (
                <img
                  src={user?.photo}
                  onError={(e) => {
                    e.currentTarget.src = person;
                  }}
                  alt={user?.firstName}
                />
              ) : (
                <img src={person} alt="grand-logo" />
              )}

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
          onClick={() => {
            dispatch(setMobileMenu(true));
            dispatch(setSideBarMenu(false));
          }}
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
