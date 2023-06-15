import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BetSlipsBox from "../blocks/BetSlipsBox";
import GameTimer from "../blocks/GameTimer";
import LottoNumberBox from "../blocks/LottoNumberBox";
import TopSearch from "../blocks/TopSearch";
import { checkIfGameHasStarted } from "../../global/customFunctions";

const ThreeColRight = () => {
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const selectedGame = useSelector((state) => state.bets.selectedGame);
  const expiryDate = useSelector((state) => state.bets.expiryDate);
  const [selectedAmount, setselectedAmount] = useState(0);
  const [betTimer, setBetTimer] = useState(null);
  const [betStarted, setBetStarted] = useState(false);

  useEffect(() => {
    // console.log(selectedAmount);
  }, [selectedAmount]);

  useEffect(() => {
    setBetStarted(false);
    if (expiryDate) {
      if (checkIfGameHasStarted(expiryDate) === true) {
        setBetStarted(false);
      } else {
        let newDate = new Date(expiryDate);
        let startedTime = newDate.getTime();
        setBetTimer(startedTime);
        setBetStarted(true);
      }
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
        {(selectedGame || expiryDate) && (
          <div className="countDownExpiry" id="countDownExpiry">
            <div className="daysToExpire">
              <div className="daysToExpireItems demacat">
                {checkIfGameHasStarted(selectedGame?.startTime) === true
                  ? "CLOSES IN"
                  : betTimer
                  ? "STARTS IN"
                  : ""}
              </div>

              {checkIfGameHasStarted(selectedGame?.startTime) === true ? (
                <GameTimer
                  time={new Date(selectedGame?.endTime).getTime()}
                  timeStarted={true}
                />
              ) : (
                betStarted && (
                  <GameTimer time={betTimer} timeStarted={betStarted} />
                )
              )}

              {/* <div className="daysToExpireItems">
                Days hours minutes seconds
              </div> */}
            </div>
          </div>
        )}
        <LottoNumberBox />
        <div className="betSlips">
          {/* <div className="betSlipsHeader">
            <h4>BetSlip(2)</h4>
          </div> */}

          {selectedCoupons && selectedCoupons?.length && selectedGame ? (
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
      </div>
    </div>
  );
};

export default ThreeColRight;
