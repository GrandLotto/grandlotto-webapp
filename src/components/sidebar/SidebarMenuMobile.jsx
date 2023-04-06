import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setLogoutModal,
  setNotiicationModal,
  setRedeemWinningModal,
  setSideBarMenu,
} from "../../store/alert/alertSlice";
import TopSearch from "../blocks/TopSearch";

import fluent_lottery from "../../assets/images/fluent_lottery.png";
import ion_football from "../../assets/images/ion_football.png";
import healthicons from "../../assets/images/healthicons.png";
import carbon_result from "../../assets/images/carbon_result.png";
import verifiedcheck from "../../assets/images/verifiedcheck.png";

const SidebarMenuMobile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <>
      <div
        className={`sidebar  ${
          sideBarMenu ? "showSidebarMenu" : ""
        } showOnMobile`}
      >
        <div className="sidebar-mobile">
          {isUserLoggedIn && (
            <>
              <div className="sidebarMobleHeader">
                {/* <img src={person} alt="grand-logo" style={{ width: 70 }} /> */}
                <div className="imageInitial">D</div>
                <h4 className="">Welcome, David</h4>
                <p className="">ID: 3542453995</p>
              </div>
              <div className="sidebarMobleHeaderTopBalance">
                <h4 className="">Wallet Balance</h4>
                <p className="">₦20,000.00</p>
              </div>
              <div className="sidebarMobleHeaderBottomBalance">
                <div className="sidebarMobleHeaderBottomBalanceItem">
                  <h4 className="">Withdrawable</h4>
                  <p className="">₦20,000.00</p>
                </div>
                <div className="sidebarMobleHeaderBottomBalanceItem">
                  <h4 className="">Bonus </h4>
                  <p className="">₦20,000.00</p>
                </div>
              </div>
            </>
          )}

          {!isUserLoggedIn && (
            <div className="headerTopMiddle">
              <TopSearch />
            </div>
          )}

          {isUserLoggedIn && (
            <div className="sidebarMobleHeaderWalletButtons">
              <div
                className="sidebarMobleHeaderWalletButtonsItem"
                onClick={() => navigation("/account/fund-wallet")}
              >
                <i className="bx bx-wallet-alt"></i>
                <span>Fund wallet</span>
              </div>
              <div
                className="sidebarMobleHeaderWalletButtonsItem"
                onClick={() => navigation("/account/fund-wallet")}
              >
                <i className="bx bx-wallet-alt"></i>
                <span>Transfer </span>
              </div>
              <div
                className="sidebarMobleHeaderWalletButtonsItem"
                onClick={() => navigation("/account/withdraw-funds")}
              >
                <i className="bx bx-wallet-alt"></i>
                <span>Withdaw </span>
              </div>
            </div>
          )}

          {isUserLoggedIn ? (
            <div className="sidebarLinkMenus">
              <NavLink className="sidebarLinkMenusItem" to="/account/profile">
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-user-circle"></i>
                  <span>My Profile</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <NavLink
                className="sidebarLinkMenusItem"
                to="/account/bet-history"
              >
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-history"></i>
                  <span>Bet History</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <NavLink
                className="sidebarLinkMenusItem"
                to="/account/transactions"
              >
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-receipt"></i>
                  <span>Transactions</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <NavLink
                className="sidebarLinkMenusItem"
                to="/account/kyc-documentation"
              >
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-food-menu"></i>
                  <span>KYC documentation</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <NavLink className="sidebarLinkMenusItem" to="/account/settings">
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-cog"></i>
                  <span>Settings</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <NavLink className="sidebarLinkMenusItem" to="/account/referal">
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-share-alt"></i>
                  <span>Refer & Earn</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </NavLink>
              <a
                href="true"
                className="sidebarLinkMenusItem"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setNotiicationModal(true));
                  //   dispatch(setSideBarMenu(false));
                }}
              >
                <div className="sidebarLinkMenusItemLeft">
                  <i className="bx bx-bell"></i>
                  <span>Notification</span>
                </div>
                <i className="bx bx-chevron-right"></i>
              </a>
            </div>
          ) : (
            <div className="sidebarLinkMenus">
              <div className="sidebarLinkMenusDiv">
                <h3>Games</h3>

                <NavLink className="sidebarLinkMenusItem" to="/lotto">
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={fluent_lottery}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Lotto</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <a
                  className="sidebarLinkMenusItem"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={ion_football}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Pool</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </a>
                {/* <NavLink
                  className="sidebarLinkMenusItem"
                  to="/account/bet-history"
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={ion_football}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Pool</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink> */}
              </div>
              <div className="sidebarLinkMenusDiv">
                <h3>Quicklinks</h3>
                <NavLink className="sidebarLinkMenusItem" to="/account/profile">
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-play-circle"></i>
                    <span>How to play</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <a
                  href="true"
                  className="sidebarLinkMenusItem"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSideBarMenu(false));
                    dispatch(setRedeemWinningModal(true));
                  }}
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <i className="bx bx-money"></i>
                    <span>Check Winning</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </a>
                <a
                  className="sidebarLinkMenusItem"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={verifiedcheck}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Promotions</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </a>
                <NavLink className="sidebarLinkMenusItem" to="/results">
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={carbon_result}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Results</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </NavLink>
                <a
                  className="sidebarLinkMenusItem"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={healthicons}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>Contact us</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </a>
                {/* <a
                  className="sidebarLinkMenusItem"
                
                >
                  <div className="sidebarLinkMenusItemLeft">
                    <img
                      src={cil_football}
                      alt="grand-logo"
                      style={{ width: 20 }}
                    />
                    <span>First bet</span>
                  </div>
                  <i className="bx bx-chevron-right"></i>
                </a> */}
              </div>
            </div>
          )}

          <a
            href="true"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                setLogoutModal({
                  status: true,
                  payload: null,
                })
              );
            }}
            className="sidebarLinkMenusItem"
          >
            <div className="sidebarLinkMenusItemLeft">
              <i className="bx bx-log-out"></i>
              <span>Logout</span>
            </div>
            <i className="bx bx-chevron-right"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default SidebarMenuMobile;
