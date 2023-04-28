/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ComponentLoading from "../blocks/ComponentLoading";

import {
  setAddBankModal,
  setAlertPopUp,
  setPageLoading,
} from "../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import PinCodeBlock from "../blocks/PinCodeBlock";
import { handlePOSTRequest } from "../../rest/apiRest";
import { WITHDRAW_FUNDS_URL } from "../../config/urlConfigs";
import { setRefreshing } from "../../store/authSlice/authSlice";

const WithdrawalTab = () => {
  const dispatch = useDispatch();

  const userBankAccounts = useSelector(
    (state) => state.wallet.userBankAccounts
  );
  const accountBalances = useSelector((state) => state.wallet.accountBalances);
  const user = useSelector((state) => state.oauth.user);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState(undefined);
  const [pin, setPin] = useState("");
  const [narration, setNarration] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [resetEFields, setResetEFields] = useState(false);
  const [insufficientFunds, setInsufficientFunds] = useState("");

  const resetFields = (code) => {
    setStep(1);
    setIsLoading(false);
    setAmount(0);
    setSelectedBank(undefined);
    setPin("");
    setNarration("");
    setEmptyFields(true);
    setResetEFields(true);
    setInsufficientFunds("");
  };

  const handleSelectBank = (bank) => {
    if (bank) {
      let newBank = JSON.parse(bank);
      setSelectedBank(newBank);
      // console.log(JSON.parse(bank));
    }
  };

  useEffect(() => {
    validateForm();
  }, [amount, selectedBank, pin, emptyFields, step]);

  const validateForm = () => {
    if (step === 1) {
      if (!amount) {
        setEmptyFields(true);
        return false;
      }

      if (amount && amount > accountBalances?.winningBalance) {
        setEmptyFields(true);
        setInsufficientFunds(
          "You don't have that much in your withdrawable balance "
        );
        return false;
      }

      setInsufficientFunds("");
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
      if (pin !== "" && pin.length !== 5) {
        setEmptyFields(true);
        return false;
      }
    }

    setEmptyFields(false);
  };

  const handleDone = (code) => {
    setPin(code);
  };

  const previousStep = () => {
    if (step === 2) {
      setStep(1);
      validateForm();
    }
  };
  const proceed = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (step === 1) {
        setStep(2);
      }
      if (step === 2) {
        submit();
        // dispatch(
        //   setAlertPopUp({
        //     status: true,
        //     type: "SUCCESS",
        //     title: "Withdrawal successful",
        //     desc: `Withdrawal of ₦${amount} was successful`,
        //     payload: null,
        //   })
        // );

        // resetFields();
      }
    }, 800);
  };

  const submit = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );
    let newbank = JSON.parse(selectedBank);
    // console.log(selectedBank);
    // console.log(newbank);

    let payload = {
      email: user?.email,
      amount: amount,
      pin: pin.trim(),
      narration: narration,
      accountNumber: newbank?.accountNo,
      wallet: "WINNING",
    };

    // console.log(JSON.stringify(payload));

    handlePOSTRequest(WITHDRAW_FUNDS_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: "Withdrawal successful",
              desc: response?.data?.message,
              payload: null,
            })
          );

          dispatch(setRefreshing(true));
          resetFields();
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: response?.data?.message,
              payload: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
      });
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      {isLoading && <ComponentLoading title="Please wait ..." />}
      {step !== 1 && (
        <div
          className="d-flex align-items-center mt-4 backButton"
          onClick={() => previousStep()}
        >
          <i className="bx bx-left-arrow-alt" style={{ fontSize: 30 }}></i>{" "}
          <span>Back</span>
        </div>
      )}

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
                  {insufficientFunds && (
                    <p className="inputError text-danger">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 20 20"
                        role="presentation"
                        focusable="false"
                        tabIndex="-1"
                        fill="red"
                      >
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                      </svg>
                      <span className="ml-2">{insufficientFunds}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="">Select Bank</label>

                  <select
                    style={{ width: "100%" }}
                    className="form-control largeInputFont"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleSelectBank(JSON.stringify(e.target.value));
                      }
                    }}
                    value={selectedBank}
                  >
                    <option value="">Select bank</option>

                    {userBankAccounts &&
                      userBankAccounts?.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item?.bankName + " - " + item?.accountNo}
                        </option>
                      ))}
                  </select>

                  <div className="d-flex justify-content-end mt-2">
                    <a
                      href="true"
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
              <div className="col-md-4 mb-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="">Narration</label>

                  <input
                    type="text"
                    value={narration}
                    onChange={(e) => {
                      setNarration(e.target.value);
                    }}
                    className="form-control largeInputFont"
                    placeholder="narration"
                  />
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
                pinLength={4}
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
