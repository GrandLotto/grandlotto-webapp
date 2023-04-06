import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ComponentLoading from "../blocks/ComponentLoading";

import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";

const USSDTab = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);
  // const [time, setTime] = useState(10);
  const [allBanks] = useState(sortArrayByname(nigerianBanks()));

  const handlePay = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowAccount(true);

      // setTime(10);
    }, 800);
  };

  const handleCancel = () => {
    setShowAccount(false);

    // setTime(10);
  };

  const handleDone = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleCancel();
    }, 500);
  };

  // const handleRefresh = () => {
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //     handleCancel();
  //   }, 500);
  // };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      {isLoading && <ComponentLoading title="Please wait ..." />}

      <div className="grandlotto_form mt-5">
        {showAccount ? (
          <>
            <div className="showAccount">
              <div>
                <i className="bx bxs-devices"></i>
              </div>
              <h5>Dial the code below on your mobile device</h5>
              <div className="showAccountBox" style={{ cursor: "pointer" }}>
                <h6 style={{ marginBottom: 0 }}>*901*1*{amount}*8393763471#</h6>
              </div>

              <div
                className="d-flex align-items-center justify-content-center mt-5 mb-3"
                style={{ columnGap: 15 }}
              >
                <button
                  onClick={() => handleDone()}
                  className="grandLottoButton cardButton"
                >
                  Done
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* <div className="paymentGateWay mt-4">
                  <h5>
                    <b>Transfer</b>
                  </h5>
                </div> */}
            <div className="row mb-3">
              <div className="col-md-4 mb-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="">Enter amount</label>
                  <div className={`symbolInput`}>
                    <span>₦</span>
                    <CurrencyInput
                      name="input-name"
                      placeholder="Enter Amount "
                      defaultValue={amount}
                      decimalsLimit={2}
                      onValueChange={(value) => setAmount(value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="">Select Bank</label>

                  <select
                    style={{ width: "100%" }}
                    className="form-control largeInputFont"
                    onChange={(e) => setSelectedBank(e.target.value)}
                  >
                    <option value="" disabled>
                      Select bank
                    </option>

                    {allBanks &&
                      allBanks?.map((item, index) => (
                        <option key={index} value={item}>
                          {item?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <button
                  disabled={!amount || !selectedBank}
                  type="button"
                  className="grandLottoButton cardButton lengthyButton"
                  onClick={() => handlePay()}
                >
                  Continue
                </button>
              </div>
            </div>
            <br />
          </>
        )}
      </div>
    </div>
  );
};

export default USSDTab;
