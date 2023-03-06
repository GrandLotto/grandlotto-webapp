import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ComponentLoading from "../blocks/ComponentLoading";

import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";
import { setAddBankModal, setAlertPopUp } from "../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import PinCodeBlock from "../blocks/PinCodeBlock";

const WithdrawalTab = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);
  const [pin, setPin] = useState("");
  const [allBanks] = useState(sortArrayByname(nigerianBanks()));
  const [emptyFields, setEmptyFields] = useState(true);
  const [resetEFields, setResetEFields] = useState(false);

  const resetFields = (code) => {
    setStep(1);
    setIsLoading(false);
    setAmount(0);
    setSelectedBank(null);
    setPin("");
    setEmptyFields(true);
    setResetEFields(true);
  };

  useEffect(() => {
    validateForm();
  }, [amount, selectedBank, pin, emptyFields]);

  const validateForm = () => {
    if (step === 1) {
      if (!amount) {
        setEmptyFields(true);
        return false;
      }
      if (!selectedBank) {
        setEmptyFields(true);
        return false;
      }
    }

    if (step === 2) {
      if (!pin) {
        setEmptyFields(true);
        return false;
      }
      if (pin !== "" && pin.length !== 7) {
        setEmptyFields(true);
        return false;
      }
    }

    setEmptyFields(false);
  };

  const handleDone = (code) => {
    setPin(code);
  };

  const proceed = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (step === 1) {
        setStep(2);
      }
      if (step === 2) {
        dispatch(
          setAlertPopUp({
            status: true,
            type: "SUCCESS",
            title: "Withdrawal successful",
            desc: `Withdrawal of ₦${amount} was successful`,
            payload: null,
          })
        );

        resetFields();
      }
    }, 800);
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      {isLoading && <ComponentLoading title="Please wait ..." />}

      <div className="grandlotto_form mt-5">
        {step === 1 ? (
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
                    <option value="">Select bank</option>

                    {allBanks &&
                      allBanks?.map((item, index) => (
                        <option key={index} value={item}>
                          {item?.name}
                        </option>
                      ))}
                  </select>

                  <div className="d-flex justify-content-end mt-2">
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setAddBankModal(true));
                      }}
                    >
                      <div
                        className="d-flex align-items-center"
                        style={{ columnGap: 5 }}
                      >
                        <i className="bx bx-plus"></i>
                        <span style={{ fontSize: 14 }}> Add Bank</span>
                      </div>
                    </a>
                    {/* <button
                      className="grandLottoButton button-outline-light bg-light border"
                      onClick={() => dispatch(setAddBankModal(true))}
                    >
                      Add Bank
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-4">
                <button
                  disabled={emptyFields}
                  type="button"
                  className="grandLottoButton cardButton"
                  onClick={() => proceed()}
                >
                  Continue
                </button>
              </div>
            </div>
            <br />
          </>
        ) : null}
        {step === 2 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="form-group text-center" style={{ width: "100%" }}>
              <label htmlFor="" className="mb-3">
                Enter Pin
              </label>

              <PinCodeBlock
                pinLength={6}
                handleDone={handleDone}
                resetEFields={resetEFields}
              />
            </div>

            <div className="row mt-5">
              <div className="col-md-4">
                <button
                  disabled={emptyFields}
                  type="button"
                  className="grandLottoButton cardButton"
                  onClick={() => proceed()}
                >
                  Withdraw
                </button>
              </div>
            </div>
            <br />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WithdrawalTab;
