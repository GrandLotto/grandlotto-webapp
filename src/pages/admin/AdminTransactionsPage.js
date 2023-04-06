/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../components/dashboard/dashboard.scss";
import FilterModals from "../../components/modal/FilterModals";
import Transactions from "../../components/transaction/Transactions";
import {
  GET_USER_DEPOSITS_URL,
  GET_USER_WITHDRAWALS_URL,
} from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setAlertSmallPOPUP,
} from "../../store/alert/alertSlice";
import {
  setUserDeposits,
  setUserDepositsPage,
  setUserDepositsTotalPages,
  setUserWithdrawal,
  setUserWithdrawalPage,
  setUserWithdrawalTotalPages,
} from "../../store/wallet/walletSlice";

const AdminTransactionsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const userWithdrawalPage = useSelector(
    (state) => state.wallet.userWithdrawalPage
  );
  const userWithdrawalTotalPages = useSelector(
    (state) => state.wallet.userWithdrawalTotalPages
  );

  const userDepositsPage = useSelector(
    (state) => state.wallet.userDepositsPage
  );
  const userDepositsTotalPages = useSelector(
    (state) => state.wallet.userDepositsTotalPages
  );

  const [showFilter, setShowFilter] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [whichPage, setWhichPage] = useState("WITHDRAWAL");
  const [clearSeasrchFilter, setClearSeasrchFilter] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log(userWithdrawalTotalPages);

  const columns = [
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

  // const fetchByPage = (type, page) => {
  //   const payload = {
  //     email: user?.email,
  //     pageNumber: page,
  //     pageSize: 10,
  //     startime: !startDate ? null : startDate,
  //     endTime: !endDate ? null : endDate,
  //   };
  //   let url;
  //   if (type === "WITHDRAWAL") {
  //     url = GET_USER_WITHDRAWALS_URL;
  //   }
  //   if (type === "DEPOSIT") {
  //     url = GET_USER_DEPOSITS_URL;
  //   }

  //   fetchMore(type, url, payload);
  // };

  // const previousPage = (type) => {
  //   const payload = {
  //     email: user?.email,
  //     pageNumber:
  //       type === "WITHDRAWAL" ? userWithdrawalPage - 1 : userDepositsPage - 1,
  //     pageSize: 10,
  //     startime: !startDate ? null : startDate,
  //     endTime: !endDate ? null : endDate,
  //   };
  //   let url;
  //   if (type === "WITHDRAWAL") {
  //     url = GET_USER_WITHDRAWALS_URL;
  //   }
  //   if (type === "DEPOSIT") {
  //     url = GET_USER_DEPOSITS_URL;
  //   }

  //   fetchMore(type, url, payload);
  // };

  // const nextPage = (type) => {
  //   const payload = {
  //     email: user?.email,
  //     pageNumber:
  //       type === "WITHDRAWAL" ? userWithdrawalPage + 1 : userDepositsPage + 1,
  //     pageSize: 10,
  //     startime: !startDate ? null : startDate,
  //     endTime: !endDate ? null : endDate,
  //   };

  //   let url;
  //   if (type === "WITHDRAWAL") {
  //     url = GET_USER_WITHDRAWALS_URL;
  //   }
  //   if (type === "DEPOSIT") {
  //     url = GET_USER_DEPOSITS_URL;
  //   }

  //   fetchMore(type, url, payload);
  // };

  const fetchMore = (type, url, payload) => {
    // setIsLoading(true);

    console.log(payload);

    handlePOSTRequest(url, payload)
      .then((response) => {
        // setIsLoading(false);
        console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;

          let currentPage = requestData?.pageNumber;
          let totalPages = requestData?.totalPages;
          let allDatas = requestData?.data;

          if (type === "WITHDRAWAL") {
            dispatch(setUserWithdrawal(allDatas));
            dispatch(setUserWithdrawalPage(currentPage));
            dispatch(setUserWithdrawalTotalPages(totalPages));
          }

          if (type === "DEPOSIT") {
            dispatch(setUserDeposits(allDatas));
            dispatch(setUserDepositsPage(currentPage));
            dispatch(setUserDepositsTotalPages(totalPages));
          }
        } else {
          if (type === "WITHDRAWAL") {
            dispatch(setUserWithdrawalPage(userWithdrawalPage));
            dispatch(setUserWithdrawalTotalPages(userWithdrawalTotalPages));
          }

          if (type === "DEPOSIT") {
            dispatch(setUserDepositsPage(userDepositsPage));
            dispatch(setUserDepositsTotalPages(userDepositsTotalPages));
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
        // setIsLoading(false);

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
    if (whichPage === "WITHDRAWAL") {
      url = GET_USER_WITHDRAWALS_URL;
    }
    if (whichPage === "DEPOSIT") {
      url = GET_USER_DEPOSITS_URL;
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
        </div>
      </FilterModals>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">All Transactions</h5>
          </div>

          <div className="mt-5">
            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="d-flex justify-content-end paddRightSmall">
                  <div
                    className="d-flex align-items-center mb-4"
                    style={{ columnGap: 10 }}
                  >
                    {whichPage === "WITHDRAWAL" && (startDate || endDate) && (
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
                        setWhichPage("WITHDRAWAL");
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
                  <Transactions
                    columns={columns}
                    data={[]}
                    page={1}
                    totalPages={2}
                    type="ADMIN"
                    isLoading={false}
                    nextP={() => {}}
                    PrevP={() => {}}
                    fetchByPage={() => {}}
                    columnSpan={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTransactionsPage;
