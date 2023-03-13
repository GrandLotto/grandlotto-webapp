import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { daysToExpire } from "../../global/customFunctions";
import { setSelectedCoupons } from "../../store/betSlice/betSlice";
import BetSlipsBox from "../blocks/BetSlipsBox";
import LottoNumberBox from "../blocks/LottoNumberBox";
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
        <LottoNumberBox />
        <div className="betSlips">
          {/* <div className="betSlipsHeader">
            <h4>BetSlip(2)</h4>
          </div> */}

          {selectedCoupons && selectedCoupons?.length ? (
            <div className="betSlipsBody">
              <BetSlipsBox
                showAmount={true}
                showInput={true}
                selectedAmount={selectedAmount}
                setselectedAmount={setselectedAmount}
              />

              {/* <div className="betSlipsBottom">
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
            </div> */}
            </div>
          ) : null}
        </div>
        <div className="countDownExpiry" id="countDownExpiry"></div>
      </div>
    </div>
  );
};

export default ThreeColRight;
