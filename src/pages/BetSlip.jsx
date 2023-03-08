import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BetSlipsBox from "../components/blocks/BetSlipsBox";

const BetSlip = () => {
  const [selectedAmount, setselectedAmount] = useState(0);
  const betSlips = useSelector((state) => state.bets.betSlips);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="main_center_wrapper_content">
      <div className="betSlipMobileBets">
        <BetSlipsBox
          showAmount={false}
          showInput={false}
          selectedAmount={selectedAmount}
          setselectedAmount={setselectedAmount}
        />

        {betSlips && betSlips?.length ? (
          <div className="mt-5">
            <div className="betSlipMobileBetsButtons ">
              <button className="grandLottoButton button-outline-light">
                Cancel
              </button>
              <button className="grandLottoButton">Place Bet</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BetSlip;
