import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCoupons } from "../../store/betSlice/betSlice";

const LottoNumberBox = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);

  const clearallCoupons = () => {
    dispatch(setSelectedCoupons([]));
  };

  return (
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
  );
};

export default LottoNumberBox;
