import React from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import {
  setBetAmount,
  setCalculatedGames,
} from "../../store/betSlice/betSlice";

const BetAmount = () => {
  const dispatch = useDispatch();

  const betAmount = useSelector((state) => state.bets.betAmount);
  const selectedType = useSelector((state) => state.bets.selectedType);

  const handleAmount = (value) => {
    let minAmmount = selectedType?.minAmmount;
    let maxAmmount = selectedType?.maxAmmount;
    let newValue = Number(value);

    if (maxAmmount !== 0) {
      if (newValue && newValue <= maxAmmount) {
        dispatch(setBetAmount(newValue));
      } else {
        if (!newValue) {
          dispatch(setBetAmount(0));
        }
      }
    } else {
      dispatch(setBetAmount(newValue));
    }

    dispatch(setCalculatedGames(null));

    // console.log(typeof newValue);
    // console.log(typeof minAmmount);
    // console.log(maxAmmount);
    // if (newValue < maxAmmount) {
    //   setselectedAmount(value);

    //   console.log(true);
    // }

    // // console.log(value);
    // console.log(selectedType);
  };

  return (
    <div className={`symbolInput`}>
      <span>₦</span>
      <CurrencyInput
        name="input-name"
        placeholder="Enter Amount "
        defaultValue={betAmount}
        decimalsLimit={2}
        contentEditable={true}
        value={betAmount}
        onValueChange={(value) => handleAmount(value)}
      />
    </div>
  );
};

export default BetAmount;
