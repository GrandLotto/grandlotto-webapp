/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BetHistory from "../components/bet/BetHistory";
import FilterModals from "../components/modal/FilterModals";
import Transactions from "../components/transaction/Transactions";

import { GET_CLOSED_GAMES_URL, GET_OPEN_GAMES_URL } from "../config/urlConfigs";
import { handlePOSTRequest } from "../rest/apiRest";
import { setAlertPopUp, setAlertSmallPOPUP } from "../store/alert/alertSlice";
import {
  setUserCloseBetsPage,
  setUserCloseBetsTotalPages,
  setUserClosedBets,
  setUserOpenBets,
  setUserOpenBetsCurrentPage,
  setUserOpenBetsTotalPages,
} from "../store/betSlice/betSlice";

const BetHistoryPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
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

  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whichPage, setWhichPage] = useState("OPENBETS");
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log(userOpenBetsTotalPages);

  const columns = [
    // {
    //   name: "#",
    // },
    {
      name: "Game ID",
    },
    {
      name: "Games Played",
    },
    {
      name: "Games Type",
    },
    {
      name: "Amount",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },

    {
      name: "Potential winning",
    },
  ];

  const fetchByPage = (type, page) => {
    const payload = {
      email: user?.email,
      pageNumber: page,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url;
    if (type === "OPENBETS") {
      url = GET_OPEN_GAMES_URL;
    }
    if (type === "CLOSEBETS") {
      url = GET_CLOSED_GAMES_URL;
    }

    fetchMore(type, url, payload);
  };

  const previousPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber:
        type === "OPENBETS" ? userOpenBetsPage - 1 : userCloseBetsPage - 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url;
    if (type === "OPENBETS") {
      url = GET_OPEN_GAMES_URL;
    }
    if (type === "CLOSEBETS") {
      url = GET_CLOSED_GAMES_URL;
    }

    fetchMore(type, url, payload);
  };

  const nextPage = (type) => {
    const payload = {
      email: user?.email,
      pageNumber:
        type === "OPENBETS" ? userOpenBetsPage + 1 : userCloseBetsPage + 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };

    let url;
    if (type === "OPENBETS") {
      url = GET_OPEN_GAMES_URL;
    }
    if (type === "CLOSEBETS") {
      url = GET_CLOSED_GAMES_URL;
    }

    fetchMore(type, url, payload);
  };

  const fetchMore = (type, url, payload) => {
    setIsLoading(true);

    console.log(payload);

    handlePOSTRequest(url, payload)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;

          let currentPage = requestData?.pageNumber;
          let totalPages = requestData?.totalPages;
          let allDatas = requestData?.data;

          if (type === "OPENBETS") {
            dispatch(setUserOpenBets(allDatas));
            dispatch(setUserOpenBetsCurrentPage(currentPage));
            dispatch(setUserOpenBetsTotalPages(totalPages));
          }

          if (type === "CLOSEBETS") {
            dispatch(setUserClosedBets(allDatas));
            dispatch(setUserCloseBetsPage(currentPage));
            dispatch(setUserCloseBetsTotalPages(totalPages));
          }
        } else {
          if (type === "OPENBETS") {
            dispatch(setUserOpenBetsCurrentPage(userOpenBetsPage));
            dispatch(setUserOpenBetsTotalPages(userOpenBetsTotalPages));
          }

          if (type === "CLOSEBETS") {
            dispatch(setUserCloseBetsPage(userCloseBetsPage));
            dispatch(setUserCloseBetsTotalPages(userCloseBetsTotalPages));
          }

          dispatch(
            setAlertSmallPOPUP({
              status: false,
              message: response?.data?.message,
            })
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        console.log(error);
      });
  };

  const handleFilter = () => {
    setShowFilter(false);
    setClearSeasrchFilter(false);
    const payload = {
      email: user?.email,
      pageNumber: 1,
      pageSize: 10,
      startime: !startDate ? null : startDate,
      endTime: !endDate ? null : endDate,
    };
    let url;
    if (whichPage === "OPENBETS") {
      url = GET_OPEN_GAMES_URL;
    }
    if (whichPage === "CLOSEBETS") {
      url = GET_CLOSED_GAMES_URL;
    }

    fetchMore(whichPage, url, payload);
  };

  const clearFilter = () => {
    setStartDate("");
    setEndDate("");
    setClearSeasrchFilter(true);
    // setTimeout(() => {
    //   handleFilter();
    // }, 1000);
  };

  useEffect(() => {
    if (startDate && endDate) {
      // if (whichPage === "OPENBETS") {
      //   dispatch(setUserOpenBetsCurrentPage(1));
      //   dispatch(setUserOpenBetsTotalPages(3));
      // }
      // if (whichPage === "CLOSEBETS") {
      //   dispatch(setUserCloseBetsPage(1));
      //   dispatch(setUserCloseBetsTotalPages(2));
      // }

      handleFilter();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (clearSeasrchFilter === true) {
      handleFilter();
    }
  }, [clearSeasrchFilter]);

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
              <div className="form-group mb-4">
                <label htmlFor="">Start from</label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    if (e.target.value) {
                      setStartDate(e.target.value);
                    }
                  }}
                  value={startDate}
                />
                {/* <select className="form-control">
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="1 month">1 month</option>
                  <option value="1 year">1 year</option>
                </select> */}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="">To</label>
                <input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value) {
                      setEndDate(e.target.value);
                    }
                  }}
                  value={endDate}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          {/* <div className="d-flex justify-content-center mt-5">
            <button className="grandLottoButton" onClick={() => handleFilter()}>
              Filter
            </button>
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
          <br /> */}
        </div>
      </FilterModals>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Bet History </h5>
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
                <div className="d-flex justify-content-end paddRightSmall">
                  <div
                    className="d-flex align-items-center mb-4"
                    style={{ columnGap: 10 }}
                  >
                    {whichPage === "OPENBETS" && (startDate || endDate) && (
                      <a
                        href="true"
                        className="has_link"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          clearFilter();
                        }}
                      >
                        Clear Filtering
                      </a>
                    )}
                    <button
                      className="grandLottoButton filterButton"
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setShowFilter(true);
                        setWhichPage("OPENBETS");
                      }}
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
                </div>
                <div className="card">
                  <BetHistory
                    columns={columns}
                    data={userOpenBets}
                    page={userOpenBetsPage}
                    totalPages={userOpenBetsTotalPages}
                    type="OPENBETS"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                  />
                </div>
              </div>
              <div className="tab-pane" id="Withdrawable-tab">
                <div className="d-flex justify-content-end paddRightSmall">
                  <div
                    className="d-flex align-items-center mb-4"
                    style={{ columnGap: 10 }}
                  >
                    {whichPage === "CLOSEBETS" && (startDate || endDate) && (
                      <a
                        href="true"
                        className="has_link"
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          clearFilter();
                        }}
                      >
                        Clear Filtering
                      </a>
                    )}
                    <button
                      className="grandLottoButton filterButton"
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        setShowFilter(true);
                        setWhichPage("CLOSEBETS");
                      }}
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
                </div>
                <div className="card">
                  <BetHistory
                    columns={columns}
                    data={userClosedBets}
                    page={userCloseBetsPage}
                    totalPages={userCloseBetsTotalPages}
                    type="CLOSEBETS"
                    isLoading={isLoading}
                    nextP={nextPage}
                    PrevP={previousPage}
                    fetchByPage={fetchByPage}
                  />
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
