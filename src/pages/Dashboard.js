/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import HomeWalletOverview from "../components/dashboard/HomeWalletOverview";
import ProfileComplete from "../components/dashboard/ProfileComplete";
import Transactions from "../components/transaction/Transactions";
import { Link, useNavigate } from "react-router-dom";

import promo1 from "../assets/images/promo1.png";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigation = useNavigate();
  const user = useSelector((state) => state.oauth.user);
  const userWithdrawal = useSelector((state) => state.wallet.userWithdrawal);
  const userDeposits = useSelector((state) => state.wallet.userDeposits);

  const [allTransactions, setAllTransactions] = useState([]);

  const columns = [
    // {
    //   name: "#",
    // },
    {
      name: "Request ID",
    },
    {
      name: "Account",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },
    {
      name: "Amount",
    },
  ];

  const emptyFunction = () => {};

  useEffect(() => {
    if (userWithdrawal && userDeposits) {
      if (allTransactions?.length <= 0) {
        let newTrans = [...userWithdrawal];
        setAllTransactions(newTrans);

        console.log(newTrans);
      }
    }
  }, [userWithdrawal, userDeposits]);

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
            <button
              className="grandLottoButton"
              onClick={() => navigation("/lotto")}
            >
              Play Game
            </button>
          </div>

          <HomeWalletOverview user={user} />
          <ProfileComplete user={user} />

          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Transactions</h5>
              <Link
                to="/account/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-dark">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>

            <Transactions
              columns={columns}
              data={allTransactions?.slice(0, 5)}
              page={1}
              totalPages={2}
              hasPagination={false}
              type="ALL"
              isLoading={false}
              nextP={emptyFunction}
              PrevP={emptyFunction}
              fetchByPage={emptyFunction}
            />
          </div>
        </div>

        {user && user?.percentageCompleted !== 100 ? (
          <div
            className="mt-3 px-3 text-light showOnMobile"
            style={{ width: "100%", padding: "0px 20px!important" }}
          >
            <div className="px-3">
              <h5 style={{ color: "#d7b703", fontWeight: 600 }}>
                Complete your profile
              </h5>
              <p>
                Extend your profile information to enable withdrawal of funds
              </p>
              <div className="mt-3">
                <button
                  className="grandLottoButton grandLottoButtonLightGreen"
                  onClick={() => navigation("/account/profile")}
                >
                  Edit profile
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Transactions</h5>

              <Link
                to="/account/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-light">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>
            <div className="transactionDark">
              <Transactions
                columns={columns}
                data={allTransactions?.slice(0, 5)}
                page={1}
                totalPages={2}
                hasPagination={false}
                type="ALL"
                isLoading={false}
                nextP={emptyFunction}
                PrevP={emptyFunction}
                fetchByPage={emptyFunction}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
