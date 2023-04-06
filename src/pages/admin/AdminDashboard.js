/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Transactions from "../../components/transaction/Transactions";
import { Link } from "react-router-dom";

import promo1 from "../../assets/images/promo4.png";
import { useSelector } from "react-redux";
import AdminWalletOverview from "../../components/dashboard/AdminWalletOverview";
import BetHistory from "../../components/bet/BetHistory";

const AdminDashboard = () => {
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
      name: "Bank name",
    },
    {
      name: "Account number",
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

  const columns2 = [
    {
      name: "Game ID",
    },
    {
      name: "Games Played",
    },
    {
      name: "User",
    },
    {
      name: "Stake",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },

    {
      name: "winning Amount",
    },
  ];

  const emptyFunction = () => {};

  useEffect(() => {
    if (userWithdrawal && userDeposits) {
      if (allTransactions?.length <= 0) {
        let newTrans = [...userWithdrawal, ...userDeposits];
        setAllTransactions(newTrans);
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
          </div>

          <AdminWalletOverview user={user} />

          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Winnings</h5>
              <Link
                to="/admin/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-dark">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>

            <BetHistory
              columns={columns2}
              data={[]}
              page={1}
              totalPages={3}
              type="ADMIN"
              isLoading={false}
              nextP={() => {}}
              PrevP={() => {}}
              fetchByPage={() => {}}
            />
          </div>
          <div className="mt-5 hideOnMobile">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5>Transactions</h5>
              <Link
                to="/admin/transactions"
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
              type="ADMIN"
              isLoading={false}
              nextP={emptyFunction}
              PrevP={emptyFunction}
              fetchByPage={emptyFunction}
            />
          </div>
        </div>

        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Winnings</h5>

              <Link
                to="/admin/transactions"
                className="d-flex align-items-center"
              >
                <span className="text-light">See all</span>
                <i className="bx bx-chevron-right text-light"></i>
              </Link>
            </div>
            <div className="transactionDark">
              <BetHistory
                columns={columns2}
                data={[]}
                page={1}
                totalPages={3}
                type="ADMIN"
                isLoading={false}
                nextP={() => {}}
                PrevP={() => {}}
                fetchByPage={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="mt-5  text-light showOnMobile">
          <div className="px-3 mt-5">
            <div className="page_flex d-flex justify-content-between align-items-center mb-4">
              <h5 className="text-light">Transactions</h5>

              <Link
                to="/admin/transactions"
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

export default AdminDashboard;
