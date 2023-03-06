import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { daysToExpire } from "../../global/customFunctions";
import { setSelectedCoupons } from "../../store/betSlice/betSlice";
import TopSearch from "../blocks/TopSearch";

const ThreeColRight = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const [selectedAmount, setselectedAmount] = useState(0);
  const [betSlips, setBetSlips] = useState([1, 2]);

  const stakeAmounts = [
    {
      id: 1,
      amount: 50,
    },
    {
      id: 2,
      amount: 100,
    },
    {
      id: 3,
      amount: 500,
    },
    {
      id: 4,
      amount: 1000,
    },
    {
      id: 5,
      amount: 2500,
    },
    {
      id: 6,
      amount: 5000,
    },
  ];

  const removeSlip = () => {
    setBetSlips([]);
    setselectedAmount(0);
  };

  const clearallCoupons = () => {
    setBetSlips([]);
    setselectedAmount(0);
    dispatch(setSelectedCoupons([]));
  };

  useEffect(() => {
    // console.log(selectedAmount);
  }, [selectedAmount]);

  useEffect(() => {
    setTimeout(() => {
      daysToExpire();
    }, 700);
    // console.log(selectedAmount);
  }, []);

  return (
    <div className="threeColRight">
      <div className="threeColRightWrapper">
        <div className="headerTopMiddle">
          <TopSearch />
        </div>
        <div className="threeColRightSelectedPicks">
          <div className="d-flex justify-content-between align-items-center">
            <div className="threeColRightSelectedPicksBoxes">
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[0] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[0]}
              </div>
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[1] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[1]}
              </div>
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[2] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[2]}
              </div>
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[3] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[3]}
              </div>
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[4] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[4]}
              </div>
              <div
                className={`threeColRightSelectedPicksBox ${
                  selectedCoupons?.[5] ? "boxSelected" : ""
                }`}
              >
                {selectedCoupons?.[5]}
              </div>
            </div>
            <i className="bx bx-trash" onClick={() => clearallCoupons()}></i>
          </div>
        </div>

        <div className="countDownExpiry" id="countDownExpiry"></div>
        <div className="betSlips">
          <div className="betSlipsHeader">
            <h4>BetSlip(2)</h4>
          </div>
          <div className="betSlipsBody">
            {betSlips && betSlips?.length ? (
              <div className="allBetSlips">
                <div className="allBetSlipItem">
                  <div className="d-flex justify-content-between align-items-center allBetSlipItemHeader">
                    <div className="d-flex align-items-center">
                      <div className="betStatus"></div>
                      <p>Ongoing</p>
                    </div>
                    <i className="bx bx-x" onClick={() => removeSlip()}></i>
                  </div>

                  <div className="allBetSlipItemBody">
                    <div className="d-flex align-items-center allBetSlipItemBodyItem">
                      <h5>Game Name: </h5>
                      <h5>
                        <b>ROYAL A1</b>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center allBetSlipItemBodyItem">
                      <h5>Lines: </h5>
                      <h5>
                        <b>10</b>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center allBetSlipItemBodyItem">
                      <h5>Type: </h5>
                      <h5>
                        <b>PERM 2</b>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center allBetSlipItemBodyItem">
                      <h5>Stakes: </h5>
                      <h5>
                        <b>69,9,26,19,36</b>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center allBetSlipItemBodyItem">
                      <h5>Amount per line: </h5>
                      <h5>
                        <b>₦0</b>
                      </h5>
                    </div>
                    <div className="allBetSlipItemBodyItemButtons">
                      {stakeAmounts?.map((item, index) => (
                        <div
                          key={index}
                          className={`allBetSlipItemBodyItemButtonsItems ${
                            selectedAmount === item?.amount
                              ? "buttonSelected"
                              : ""
                          }`}
                          onClick={() => setselectedAmount(item?.amount)}
                        >
                          {item?.amount}
                        </div>
                      ))}
                    </div>
                    <div className="allBetSlipItemBodyItemAmount">
                      <div className={`symbolInput`}>
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={selectedAmount}
                          decimalsLimit={2}
                          contentEditable={true}
                          value={selectedAmount}
                          onValueChange={(value) => setselectedAmount(value)}
                        />
                      </div>

                      {/* <input
                      value={selectedAmount}
                      type="text"
                      placeholder="Enter Amount"
                    /> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="noBetSlip">
                <p>Your betslip is empty</p>
              </div>
            )}

            <div className="betSlipsBottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total Stake:</h5>
                <h5>₦0</h5>
              </div>
              <div className="d-flex justify-content-center align-items-center mt-4">
                <button
                  type="button"
                  className="grandLottoButton cardButton"
                  disabled={!selectedAmount}
                >
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColRight;
