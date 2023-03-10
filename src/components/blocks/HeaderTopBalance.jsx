import React from "react";
import { useSelector } from "react-redux";
import { addComma } from "../../global/customFunctions";

const HeaderTopBalance = () => {
  const accountBalances = useSelector((state) => state.wallet.accountBalances);
  return (
    <div className="topHeaderRightLoggedInBalance">
      <p style={{ textAlign: "left" }}>Balance</p>

      {accountBalances ? (
        <h5>₦ {addComma(accountBalances?.totalBalance)}</h5>
      ) : (
        <h5>-----</h5>
      )}
    </div>
  );
};

export default HeaderTopBalance;
