import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BetHistory from "../components/bet/BetHistory";
import FilterModals from "../components/modal/FilterModals";
import Transactions from "../components/transaction/Transactions";

const BetHistoryPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const userOpenBets = useSelector((state) => state.bets.userOpenBets);
  const userOpenBetsPage = useSelector((state) => state.bets.userOpenBetsPage);
  const userOpenBetsTotalPages = useSelector(
    (state) => state.bets.userOpenBetsTotalPages
  );

  const userClosedBets = useSelector((state) => state.bets.userClosedBets);
  const userCloseBetsPage = useSelector(
    (state) => state.bets.userCloseBetsPage
  );
  const userCloseBetsTotalPages = useSelector(
    (state) => state.bets.userCloseBetsTotalPages
  );

  // console.log(userOpenBetsTotalPages);

  const columns = [
    {
      name: "#",
    },
    // {
    //   name: "Game ID",
    // },
    {
      name: "Games Played",
    },
    {
      name: "Games Type",
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

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <FilterModals
        status={showFilter}
        setVisiblityStatus={setShowFilter}
        modalTitle="Filter"
      >
        <div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">Date</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="1 month">1 month</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">By Game</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="...">...</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">By Status</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="Running">Running</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button className="grandLottoButton">Filter</button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </FilterModals>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Bet History </h5>
            <button
              className="grandLottoButton filterButton"
              onClick={() => setShowFilter(true)}
            >
              <span
                className="d-flex align-items-center"
                style={{ columnGap: 10 }}
              >
                <i className="bx bx-slider"></i>
                <span>Filter</span>
              </span>
            </button>
          </div>

          <div className="mt-2">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Wallet-tab"
                  >
                    Open bets
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Withdrawable-tab"
                  >
                    Settled bets
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card">
                  <BetHistory
                    columns={columns}
                    data={userOpenBets}
                    page={userOpenBetsPage}
                    totalPages={userOpenBetsTotalPages}
                    type="OPENBETS"
                  />
                </div>
              </div>
              <div className="tab-pane" id="Withdrawable-tab">
                <div className="card">
                  <BetHistory
                    columns={columns}
                    data={userClosedBets}
                    page={userCloseBetsPage}
                    totalPages={userCloseBetsTotalPages}
                    type="CLOSEBETS"
                  />
                  {/* <div className="body">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="text-center">
                  <b>Coming Soon</b>
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div> */}
                </div>
              </div>
              <div className="tab-pane" id="Bonus-tab">
                <div className="card">
                  <Transactions />
                  {/* <div className="body">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="text-center">
                  <b>Coming Soon</b>
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BetHistoryPage;
