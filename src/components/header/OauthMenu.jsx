import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAMPM } from "../../global/customFunctions";
import { setMobileMenu } from "../../store/alert/alertSlice";

const OauthMenu = () => {
  const dispatch = useDispatch();
  const mobileMenu = useSelector((state) => state.alert.mobileMenu);
  const digitalDate = useSelector((state) => state.oauth.digitalDate);
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  const closeMenu = () => {
    dispatch(setMobileMenu(false));
  };

  return (
    <>
      <div className={`oauthMenu  ${mobileMenu ? "showMenu" : ""}`}>
        <div className="oauthMenuLeft">
          <div className="close-menu-button">
            <i
              onClick={() => closeMenu()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <NavLink to="/" className="top_link">
            Home
          </NavLink>
          <NavLink to="/lotto" className="top_link">
            Lotto
          </NavLink>
          <NavLink to="/about" className="top_link">
            Pool
          </NavLink>
          <NavLink to="/results" className="top_link">
            Results
          </NavLink>
          {isUserLoggedIn ? (
            <NavLink to="/account/fund-wallet" className="top_link">
              Deposit Funds
            </NavLink>
          ) : null}

          <NavLink to="/about" className="top_link">
            Redeem Winning
          </NavLink>
        </div>
        <div className="oauthMenuRight">
          {/* <p>12:00:59 AM</p> */}
          <p>
            {digitalDate} {getAMPM()}
          </p>
        </div>
      </div>

      <div
        className={`menu_wrapper_div  ${mobileMenu === true ? "showMenu" : ""}`}
        onClick={() => closeMenu()}
      ></div>
    </>
  );
};

export default OauthMenu;
