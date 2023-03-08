import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.scss";

import Logo from "../../assets/images/grandlotto.png";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal, setSideBarMenu } from "../../store/alert/alertSlice";
import SidebarMenuMobile from "./SidebarMenuMobile";

const Sidebar = () => {
  const dispatch = useDispatch();

  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);

  return (
    <>
      <div
        className={`sidebar  ${
          sideBarMenu ? "showSidebarMenu" : ""
        } hideOnMobile`}
      >
        <div className="sidebar-top hideOnMobile">
          <div className="sidebar-logo">
            <NavLink to="/account/dashboard" className="topHeaderLogo">
              <img src={Logo} alt="grand-logo" />
            </NavLink>

            <div className="close-menu-button">
              <i
                onClick={() => dispatch(setSideBarMenu(false))}
                className="bx bx-x"
                id="closeAlertModal"
              ></i>
            </div>
          </div>
          <div className="sidebar-scroll">
            <ul>
              <li className="sidebar_links">
                <NavLink to="/account/dashboard">
                  <i className="bx bx-layout"></i>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/profile">
                  <i className="bx bx-user-circle"></i>
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/fund-wallet">
                  <i className="bx bx-wallet-alt"></i>
                  <span>Fund Wallet</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/bet-history">
                  <i className="bx bx-history"></i>
                  <span>Bet History</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/transactions">
                  <i className="bx bx-receipt"></i>
                  <span>Transactions</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/kyc-documentation">
                  <i className="bx bx-food-menu"></i>
                  <span>KYC documentation</span>
                </NavLink>
              </li>
              {/* <li className="sidebar_links">
                <NavLink to="/account/transfer">
                  <i className="bx bx-transfer"></i>
                  <span>Fund Transfer</span>
                </NavLink>
              </li> */}
              <li className="sidebar_links">
                <NavLink to="/account/withdraw-funds">
                  <i className="bx bx-import"></i>
                  <span>Withdraw Funds</span>
                </NavLink>
              </li>
              <li className="sidebar_links">
                <NavLink to="/account/settings">
                  <i className="bx bx-cog"></i>
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-bottom hideOnMobile">
          <ul>
            <li className="sidebar_links">
              <a
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch(
                    setLogoutModal({
                      status: true,
                      payload: null,
                    })
                  )
                }
              >
                <i className="bx bx-log-out"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <SidebarMenuMobile />

      <div
        className={`menu_wrapper_div  ${
          sideBarMenu === true ? "showSidebarMenu" : ""
        }`}
        onClick={() => dispatch(setSideBarMenu(false))}
        id="menuWrapper"
      ></div>
    </>
  );
};

export default Sidebar;
