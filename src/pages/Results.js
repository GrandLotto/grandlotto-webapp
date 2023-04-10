/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";

import {
  accordionTab,
  bodyScrollTop,
  formateDateAndTimeByName,
} from "../global/customFunctions";

import { useSelector } from "react-redux";
import FilterModals from "../components/modal/FilterModals";
import { handlePOSTRequest } from "../rest/apiRest";
import { GET_GAME_WINNING_NUMBERS_URL } from "../config/urlConfigs";
import { useLocation } from "react-router-dom";

const Results = () => {
  let location = useLocation();
  // const dispatch = useDispatch();
  const allexistinggames = useSelector((state) => state.bets.allexistinggames);
  const [showFilter, setShowFilter] = useState(false);

  const [selectedLotto, setSelectedLotto] = useState(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allResults, setAllResults] = useState([]);

  const isSelected = (item) => {
    let selected = selectedLotto?.id === item?.id;

    return !!selected;
  };

  useEffect(() => {
    setTimeout(() => {
      // tabDropDown();
      accordionTab();
    }, 1500);
  }, []);

  useEffect(() => {
    if (allexistinggames && allexistinggames?.length) {
      if (!selectedLotto) {
        setSelectedLotto(allexistinggames[0]);
      }
    }
  }, [allexistinggames]);

  useEffect(() => {
    if (selectedLotto) {
      handleGetResult();
    }
  }, [selectedLotto]);

  const handleGetResult = () => {
    const payload = {
      gameId: selectedLotto?.id,
      pageNumber: 1,
      pageSize: 10,
      startDate: !startDate ? null : startDate,
      endDate: !endDate ? null : endDate,
    };
    setIsLoading(true);

    console.log(payload);

    handlePOSTRequest(GET_GAME_WINNING_NUMBERS_URL, payload)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data?.data;
          setAllResults(requestData);
          console.log(requestData);
        } else {
          setAllResults([]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setAllResults([]);
        console.log(error);
      });
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleGetResult();
    }
  }, [startDate, endDate]);

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  return (
    <>
      <FilterModals
        status={showFilter}
        setVisiblityStatus={setShowFilter}
        modalTitle="Find Result"
      >
        <div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold text-dark">Date</h6>
            </div>
            <div className="card-body">
              <div className="form-group mb-4">
                <label htmlFor="" className="text-dark">
                  Start from
                </label>
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
                <label htmlFor="" className="text-dark">
                  To
                </label>
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
            <button className="grandLottoButton">Search</button>
          </div> */}

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
      <div className="page_content main_center">
        <div className="main_center_wrapper">
          <div className="main_center_wrapper_content">
            <div className="d-flex justify-content-between align-items-center main_center_wrapper_contentHeader">
              <h5>Lotto Result</h5>
              {isLoading && (
                <span
                  className="spinner spinner-border"
                  role="status"
                  style={{ width: 19, height: 19 }}
                ></span>
              )}

              {/* <div className="d-flex align-items-center">
                <select
                  style={{
                    width: "100%",
                  }}
                  className="form-control largeInputFont"
                >
                  <option value="Original Lotto 7/90">
                    Original Lotto 7/90
                  </option>
                  <option value="nap 2">Pool</option>
                </select>
              </div> */}
            </div>
            <div className="d-flex justify-content-end filter_button_header">
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
            <div className="main_center_wrapper_content_body">
              <div className="lotto_results">
                <div className="lotto_results_left">
                  {allexistinggames && allexistinggames?.length ? (
                    allexistinggames?.map((item, index2) => (
                      <div
                        className={`open_body_contents ${
                          isSelected(item) === true ? "buttonActive" : ""
                        }`}
                        key={index2}
                        onClick={() => {
                          setStartDate("");
                          setEndDate("");
                          setSelectedLotto(item);
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="open_body_contents_left">
                            <div className="d-flex justify-content-between align-items-center">
                              {/* <img
                                src={item?.img}
                                style={{ width: 56 }}
                                alt="grand-logo"
                              /> */}
                              <h5>{item?.name}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="noBetSlip darkBg">
                      <p>Please select draw and playing type</p>
                      <br />
                    </div>
                  )}
                </div>
                <div className="lotto_results_right">
                  <h3>{selectedLotto?.name}</h3>

                  <div className="mt-4">
                    {allResults ? (
                      <div className="grandlotto_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Results</th>
                              </tr>
                            </thead>
                            {allResults?.length ? (
                              <tbody>
                                {allResults?.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      {formateDateAndTimeByName(
                                        item?.dateValidated
                                      )}
                                    </td>
                                    <td>
                                      <div className="gameResults mb-3">
                                        <span className="mb-2 d-block">
                                          WinningNumbers
                                        </span>
                                        <div className="lotto_results_right_coupons">
                                          {item?.winningNumbers
                                            .split(",")
                                            ?.map((newItem, newIndex) => (
                                              <div
                                                className="lotto_results_right_coupons_item"
                                                key={newIndex}
                                              >
                                                {newItem}
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                      <div className="gameResults">
                                        <span className="mb-2 d-block">
                                          machineNumber
                                        </span>
                                        <div className="lotto_results_right_coupons">
                                          {item?.machineNumber
                                            .split(",")
                                            ?.map((newItem, newIndex) => (
                                              <div
                                                className="lotto_results_right_coupons_item"
                                                key={newIndex}
                                              >
                                                {newItem}
                                              </div>
                                            ))}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            ) : (
                              <tbody>
                                <tr>
                                  <td colSpan="6">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div className="no_data_div">
                                        <br />
                                        <br />
                                        <br />
                                        <div
                                          className="d-flex align-items-center justify-content-center"
                                          style={{ flexDirection: "column" }}
                                        >
                                          <h4
                                            className="mb-4"
                                            style={{
                                              fontSize: "18px",
                                              fontWeight: 500,
                                            }}
                                          >
                                            No winning record
                                          </h4>
                                        </div>

                                        <br />
                                        <br />
                                        <br />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            )}
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <br />
                        <br />
                        <br />
                        <br />
                        <span
                          className="spinner spinner-border"
                          role="status"
                          style={{ width: 19, height: 19 }}
                        ></span>
                        <br />
                        <br />
                        <br />
                        <br />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="threeColRight">
        <div className="threeColRightWrapper">
          <div className="betSlips">
            <div className="betSlipsHeader mt-0">
              <h4>Find a Result</h4>
            </div>
            <div className="betSlipsBody bg-light">
              <div>
                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="font-weight-bold text-dark">Date</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group mb-4">
                      <label htmlFor="" className="text-dark">
                        Start from
                      </label>
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
                      <label htmlFor="" className="text-dark">
                        To
                      </label>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
