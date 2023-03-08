import React, { useEffect, useState } from "react";

import {
  accordionTab,
  generate,
  numbersFromOneTo90,
  tabDropDown,
} from "../global/customFunctions";

import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import image4 from "../assets/images/image4.png";
import image5 from "../assets/images/image5.png";
import image6 from "../assets/images/image6.png";

import { useDispatch, useSelector } from "react-redux";
import FilterModals from "../components/modal/FilterModals";

const Results = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);

  const [selectedLotto, setSelectedLotto] = useState({
    id: 1,
    title: "Metro",
    desc: "",
    closes: "8:30AM",
    img: image2,
  });

  const contents = [
    {
      id: 1,
      title: "Metro",
      desc: "",
      closes: "8:30AM",
      img: image2,
    },
    {
      id: 2,
      title: "Royal A1",
      desc: "",
      closes: "8:30AM",
      img: image3,
    },
    {
      id: 3,
      title: "Mega 77",
      desc: "",
      closes: "8:30AM",
      img: image4,
    },
    {
      id: 4,
      title: "Arena",
      desc: "",
      closes: "8:30AM",
      img: image5,
    },
    {
      id: 5,
      title: "Fortune",
      desc: "",
      closes: "8:30AM",
      img: image6,
    },
    {
      id: 6,
      title: "Metro",
      desc: "",
      closes: "8:30AM",
      img: image2,
    },
    {
      id: 7,
      title: "Royal A1",
      desc: "",
      closes: "8:30AM",
      img: image3,
    },
    {
      id: 8,
      title: "Mega 77",
      desc: "",
      closes: "8:30AM",
      img: image4,
    },
    {
      id: 9,
      title: "Arena",
      desc: "",
      closes: "8:30AM",
      img: image5,
    },
    {
      id: 10,
      title: "Fortune",
      desc: "",
      closes: "8:30AM",
      img: image6,
    },
  ];

  const isSelected = (item) => {
    let selected = selectedLotto?.id === item?.id;
    console.log(!!selected);
    return !!selected;
  };

  useEffect(() => {
    setTimeout(() => {
      // tabDropDown();
      accordionTab();
    }, 1500);
  }, []);

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
              <h6 className="text-light">Date</h6>
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
              <h6 className="text-light">By Draw name</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="...">...</option>
                </select>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button className="grandLottoButton">Search</button>
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
      <div className="page_content main_center">
        <div className="main_center_wrapper">
          <div className="main_center_wrapper_content">
            <div className="d-flex justify-content-between align-items-center main_center_wrapper_contentHeader">
              <h5>Lotto Result</h5>
              <div className="d-flex align-items-center">
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
              </div>
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
                  {contents &&
                    contents?.map((item, index2) => (
                      <div
                        className={`open_body_contents ${
                          isSelected(item) == true ? "buttonActive" : ""
                        }`}
                        key={index2}
                        onClick={() => setSelectedLotto(item)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="open_body_contents_left">
                            <div className="d-flex justify-content-between align-items-center">
                              <img
                                src={item?.img}
                                style={{ width: 56 }}
                                alt="grand-logo"
                              />
                              <h5>{item?.title}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="lotto_results_right">
                  <h3>{selectedLotto?.title}</h3>

                  <div className="mt-4">
                    <div className="grandlotto_table">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Results</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td>Yesterday, Tue, Mar 07 2023</td>
                              <td>
                                <div className="lotto_results_right_coupons">
                                  <div className="lotto_results_right_coupons_item">
                                    15
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    41
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    50
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    07
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Yesterday, Tue, Mar 07 2023</td>
                              <td>
                                <div className="lotto_results_right_coupons">
                                  <div className="lotto_results_right_coupons_item">
                                    15
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    41
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    50
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    07
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Yesterday, Tue, Mar 07 2023</td>
                              <td>
                                <div className="lotto_results_right_coupons">
                                  <div className="lotto_results_right_coupons_item">
                                    15
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    41
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    50
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    07
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Yesterday, Tue, Mar 07 2023</td>
                              <td>
                                <div className="lotto_results_right_coupons">
                                  <div className="lotto_results_right_coupons_item">
                                    15
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    41
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    50
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    07
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Yesterday, Tue, Mar 07 2023</td>
                              <td>
                                <div className="lotto_results_right_coupons">
                                  <div className="lotto_results_right_coupons_item">
                                    15
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    23
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    41
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    50
                                  </div>
                                  <div className="lotto_results_right_coupons_item">
                                    07
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
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
              <div className="card ">
                <div className="card-header">
                  <h6 className="text-dark">Date</h6>
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
                  <h6 className="text-dark">By Draw name</h6>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <select className="form-control">
                      <option value="...">...</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-5">
                <button className="grandLottoButton">Search</button>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
