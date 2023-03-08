import React, { useEffect } from "react";
import HomeWalletOverview from "../components/dashboard/HomeWalletOverview";
import ProfileComplete from "../components/dashboard/ProfileComplete";
import Transactions from "../components/transaction/Transactions";
import { Link, NavLink, useNavigate } from "react-router-dom";

import promo1 from "../assets/images/promo1.png";

const Dashboard = () => {
  const navigation = useNavigate();

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="pages">
      <div className="dashboard_mobile" style={{ marginTop: "-3px" }}>
        <img src={promo1} alt="grand-logo" className="showOnMobile" />
        <div className="">
          <div className="d-flex justify-content-between pages_header hideOnMobile">
            <h5 className="site_title">Overview</h5>
            <button className="grandLottoButton">Play Game</button>
          </div>

          <HomeWalletOverview />
          <ProfileComplete />

          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Transactions</h5>
              <a className="d-flex align-items-center">
                <span>See all</span>
                <i className="bx bx-chevron-right"></i>
              </a>
            </div>

            <Transactions />
          </div>
        </div>

        <div
          className="mt-3 px-3 text-light showOnMobile"
          style={{ width: "100%", padding: "0px 20px!important" }}
        >
          <div className="px-3">
            <h5 style={{ color: "#d7b703", fontWeight: 600 }}>
              Complete your profile
            </h5>
            <p>Extend your profile information to enable withdrawal of funds</p>
            <div>
              <button
                className="grandLottoButton grandLottoButtonLightGreen"
                onClick={() => navigation("/account/profile")}
              >
                Edit profile
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Transactions</h5>
              <a className="d-flex align-items-center">
                <span className="text-light">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </a>
            </div>
            <div className="transactionDark">
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
