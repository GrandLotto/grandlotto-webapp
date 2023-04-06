import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { daysToExpire } from "../../global/customFunctions";
import { setSelectedCoupons } from "../../store/betSlice/betSlice";
import BetSlipsBox from "../blocks/BetSlipsBox";
import GameTimer from "../blocks/GameTimer";
import LottoNumberBox from "../blocks/LottoNumberBox";
import TopSearch from "../blocks/TopSearch";

const ThreeColRight = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const selectedGametimer = useSelector(
    (state) => state.bets.selectedGametimer
  );
  const expiryDate = useSelector((state) => state.bets.expiryDate);
  const [selectedAmount, setselectedAmount] = useState(0);
  const [betSlips, setBetSlips] = useState([1, 2]);
  const [betTimer, setBetTimer] = useState(null);
  const [betStarted, setBetStarted] = useState(false);

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
    setBetStarted(false);
    if (expiryDate) {
      let newDate = new Date(expiryDate);
      let startedTime = newDate.getTime();
      setBetTimer(startedTime);
      setBetStarted(true);
    } else {
      setBetTimer(null);
    }
  }, [expiryDate]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     daysToExpire();
  //   }, 700);

  // }, []);

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
        {betStarted && (
          <div className="countDownExpiry" id="countDownExpiry">
            <div className="daysToExpire">
              <div className="daysToExpireItems demacat">Starts In</div>

              <GameTimer time={betTimer} timeStarted={betStarted} />

              {/* <div className="daysToExpireItems">
                Days hours minutes seconds
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeColRight;
