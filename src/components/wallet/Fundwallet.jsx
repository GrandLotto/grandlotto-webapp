/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PaymentGateWay from "../blocks/PaymentGateWay";
import CurrencyInput from "react-currency-input-field";
import ComponentLoading from "../blocks/ComponentLoading";
import Timer from "../blocks/Timer";
import { useDispatch, useSelector } from "react-redux";
import { handlePOSTRequest, handleGETRequest } from "../../rest/apiRest";
import {
  CREATE_DYNAMIC_ACCOUNT_URL,
  INITIATE_PAYSTACK_PAYMENT_URL,
  VERIFY_PAYSTACK_PAYMENT_URL,
  VERIFY_PROVIDUS_URL,
} from "../../config/urlConfigs";
import { addComma } from "../../global/customFunctions";
import { setAlertPopUp } from "../../store/alert/alertSlice";
import { setRefreshing } from "../../store/authSlice/authSlice";

const Fundwallet = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);

  const [providusAccount, setProvidusAccount] = useState(null);
  // const [paystackAccount, setPaystackAccount] = useState(null);
  const [selectedGateWay, setselectedGateWay] = useState(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [transactionID, setTransactionID] = useState("");
  const [time, setTime] = useState(30);
  const [emptyFields, setEmptyFields] = useState(true);
  const [pageText, setpageText] = useState("Payment methods");

  const resetFields = () => {
    setProvidusAccount(null);
    // setPaystackAccount(null);
    setselectedGateWay(null);
    setStep(1);
    setIsLoading(false);
    setAmount(0);
    setTransactionID("");
    setTime(30);
    setEmptyFields(true);
    setpageText("Payment methods");
  };

  useEffect(() => {
    if (step === 1) {
      setpageText("Payment methods");
    }

    if (step === 2) {
      setpageText("Deposit Amount");
    }

    if (step === 3) {
      setpageText("Fund Wallet");
    }

    if (step === 4) {
      setpageText("Verify payment");
    }
  }, [step]);

  useEffect(() => {
    validateForm();
  }, [amount, providusAccount, selectedGateWay, emptyFields, step]);

  const validateForm = () => {
    // if (step === 1) {
    //   if (!selectedGateWay) {
    //     setEmptyFields(true);
    //     return false;
    //   }
    // }

    if (step === 2) {
      // console.log(amount);
      if (!amount || amount <= 0) {
        setEmptyFields(true);
        return false;
      }
    }

    setEmptyFields(false);
  };

  const handleSelectGateWay = (item) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (item) {
        // console.log(item);
        setselectedGateWay(item);

        validateForm();

        if (item?.name === "Providus") {
          if (providusAccount) {
            if (time !== 0) {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
                setStep(3);
              }, 800);
            } else {
              setStep(2);
            }
          } else {
            setStep(2);
          }
        } else {
          setStep(2);
        }
      }
    }, 800);
  };

  const handleCancel = () => {
    setProvidusAccount(null);
    // setPaystackAccount(null);
    setTime(30);
    setAmount(0);
    setStep(1);
  };

  const previousStep = () => {
    if (step === 2) {
      setStep(1);
      //   validateForm();
    }
    if (step === 3) {
      if (selectedGateWay?.name === "Providus") {
        if (providusAccount) {
          if (time !== 0) {
            setStep(1);
          } else {
            setStep(2);
          }
        } else {
          setStep(2);
        }
      } else {
        setStep(2);
      }
    }
  };

  const proceed = () => {
    if (step === 2) {
      if (selectedGateWay?.name === "Paystack") {
        initiatepaystackpayment();
      } else {
        if (providusAccount) {
          if (time !== 0) {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setStep(3);
            }, 800);
          } else {
            handlePay();
          }
        } else {
          handlePay();
        }
      }
      validateForm();
    }
  };

  const handlePay = () => {
    setIsLoading(true);

    const payload = {
      email: user?.email,
    };

    handlePOSTRequest(CREATE_DYNAMIC_ACCOUNT_URL, payload)
      .then((response) => {
        setIsLoading(false);

        // console.log(response);
        if (response?.data?.success) {
          setProvidusAccount(response?.data?.data);
          setTime(30);
          setStep(3);
        } else {
          setProvidusAccount(null);
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
        setProvidusAccount(null);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        setIsLoading(false);
      });
  };

  const initiatepaystackpayment = () => {
    setIsLoading(true);

    const payload = {
      email: user?.email,
      amount: String(
        +amount * 100 + Number(user?.paystackCharge ? user?.paystackCharge : 0)
      ),
    };

    console.log(payload);

    handlePOSTRequest(INITIATE_PAYSTACK_PAYMENT_URL, payload)
      .then((response) => {
        setIsLoading(false);

        // console.log(response);
        if (response?.data?.success) {
          // setPaystackAccount(response?.data?.data);
          setStep(3);
          window.open(
            response?.data?.data?.datareturn?.authorization_url,
            "_blank"
          );
        } else {
          // setPaystackAccount(null);
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
        // setPaystackAccount(null);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        setIsLoading(false);
      });
  };

  const confirmPayment = () => {
    setIsLoading(true);

    let URL =
      selectedGateWay?.name === "Providus"
        ? VERIFY_PROVIDUS_URL
        : VERIFY_PAYSTACK_PAYMENT_URL;

    if (selectedGateWay?.name === "Providus") {
      handleGETRequest(URL + `?session_id=${transactionID}`)
        .then((response) => {
          setIsLoading(false);

          // console.log(response);
          // console.log(paystackAccount);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "payment successful",
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
          // setPaystackAccount(null);
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: "An error occurred, please try again",
              payload: null,
            })
          );
          setIsLoading(false);
        });
    } else {
      let payload = {
        requestId: transactionID,
      };

      handlePOSTRequest(URL, payload)
        .then((response) => {
          setIsLoading(false);

          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "payment successful",
                desc: response?.data?.message,
                payload: null,
              })
            );

            // let requestData = response?.data?.data;
            // console.log(requestData);

            // dispatch(
            //   setAlertBetModal({
            //     status: true,
            //     type: "SUCCESS",
            //     title: "Payment Successful",
            //     betId: "REF: " + requestData?.reference,
            //     amountStake: `Deposit Amount: ₦ ${addComma(
            //       requestData?.requested_amount
            //     )}`,
            //     amountWinning: requestData?.reference,
            //     payload: null,
            //     buttonText: "Done",
            //     buttonURL: "",
            //   })
            // );

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
          // setPaystackAccount(null);
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: "An error occurred, please try again",
              payload: null,
            })
          );
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div className="grandlotto_card payment_card">
        {isLoading && <ComponentLoading title="Please wait ..." inner={true} />}
        <h5 className="border-bottom pb-4">{pageText} </h5>
        {step !== 1 && (
          <div className="d-inline-block">
            {" "}
            <div
              className="d-flex align-items-center mt-4 backButton"
              onClick={() => previousStep()}
            >
              <i className="bx bx-left-arrow-alt" style={{ fontSize: 30 }}></i>{" "}
              <span>Back</span>
            </div>
          </div>
        )}
        {step === 1 && (
          <PaymentGateWay
            selectedGateWay={selectedGateWay}
            handleSelectGateWay={handleSelectGateWay}
          />
        )}

        {selectedGateWay && step !== 1 && (
          <form className="grandlotto_form mt-2 animated preFadeInRight fadeInRight">
            {step === 2 && (
              <div className="animated preFadeInRight fadeInRight">
                <div className="row mb-3">
                  <div className="col-md-12">
                    {selectedGateWay &&
                      selectedGateWay?.name === "Paystack" && (
                        <div
                          className=""
                          style={{ marginTop: -15, marginBottom: 69 }}
                        >
                          <p
                            className="inputError "
                            style={{ color: "#ce6b02" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              viewBox="0 0 20 20"
                              role="presentation"
                              focusable="false"
                              tabIndex="-1"
                              fill="#ce6b02"
                            >
                              <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                            </svg>

                            <span
                              style={{ fontSize: 13 }}
                              className="ml-2  pr-2"
                            >
                              NOTE: You will be redirected to complete this
                              payment
                            </span>
                          </p>
                        </div>
                      )}
                  </div>
                  <div className="col-md-5 mx-auto mb-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Enter amount</label>
                      <div
                        className={`symbolInput ${
                          !selectedGateWay ? "isDisabled" : ""
                        }`}
                      >
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={amount || 0}
                          decimalsLimit={2}
                          disabled={!selectedGateWay}
                          onValueChange={(value) => setAmount(value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-4 mb-3">
            <div className="form-group" style={{ width: "100%" }}>
              <label htmlFor="">Enter Promo Code (Optional)</label>

              <input
                type="text"
                onChange={(e) => setPromoCode(e.target.value)}
                value={promoCode}
                className="form-control largeInputFont py-3"
                style={{ width: "100%" }}
              />
            </div>
          </div> */}
                </div>
              </div>
            )}

            {step === 3 && (
              <>
                {selectedGateWay && selectedGateWay?.name === "Paystack" ? (
                  <div className="animated preFadeInRight fadeInRight">
                    <div className="showAccount">
                      <div>
                        <i className="bx bx-transfer"></i>
                      </div>

                      <h5>Authorization URL created</h5>

                      <div
                        className="d-flex align-items-center justify-content-center mt-5 mb-3"
                        style={{ columnGap: 15 }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleCancel();

                            dispatch(setRefreshing(true));
                          }}
                          className="grandLottoButton cardButton"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="animated preFadeInRight fadeInRight">
                    <div className="showAccount">
                      <div>
                        <i className="bx bx-transfer"></i>
                      </div>
                      {time !== 0 ? (
                        <>
                          <h5>
                            Transfer{" "}
                            <b>
                              ₦
                              {addComma(
                                user?.providusCharge
                                  ? Number(amount) +
                                      Number(user?.providusCharge)
                                  : Number(amount) + 0
                              )}
                            </b>{" "}
                            to the account details displayed below{" "}
                          </h5>
                          <div className="showAccountBox">
                            <h6>{providusAccount?.bankName}</h6>
                            <h6>{providusAccount?.accountName}</h6>
                            <h3>{providusAccount?.accountNumber}</h3>
                            <p>Use this account for this transaction only.</p>
                            <p className="mt-2">
                              Expires in{" "}
                              <Timer time={time * 60} setTime={setTime} />
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="showAccountBox">
                            <h3>Expired!!</h3>
                          </div>
                        </>
                      )}

                      <div
                        className="d-flex align-items-center justify-content-center mt-5 mb-3"
                        style={{ columnGap: 15 }}
                      >
                        {time !== 0 ? (
                          // <button
                          //   type="button"
                          //   onClick={() => handlePaid()}
                          //   className="grandLottoButton cardButton"
                          // >
                          //   I have paid
                          // </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleCancel();

                              dispatch(setRefreshing(true));
                            }}
                            className="grandLottoButton cardButton"
                          >
                            Close
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="grandLottoButton button-outline-light cardButton border text-dark "
                              onClick={() => handleCancel()}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => confirmPayment()}
                              className="grandLottoButton cardButton"
                            >
                              Retry
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {step === 4 && (
              <div className="animated preFadeInRight fadeInRight">
                <div className="row mb-3">
                  <div className="col-md-5 mx-auto mb-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Enter Transaction ID</label>
                      <input
                        type="text"
                        onChange={(e) => setTransactionID(e.target.value)}
                        value={transactionID}
                        className="form-control largeInputFont py-3"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-7 mx-auto mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center mt-5 mb-3"
                      style={{ columnGap: 15 }}
                    >
                      <button
                        type="button"
                        className="grandLottoButton button-outline-light cardButton border text-dark "
                        onClick={() => handleCancel()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={!transactionID}
                        onClick={() => confirmPayment()}
                        className="grandLottoButton cardButton"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className=" text-center mt-2">
                <div className="d-flex justify-content-center  text-center">
                  <button
                    type="button"
                    onClick={() => proceed()}
                    className="grandLottoButton cardButton lengthyButton"
                    disabled={emptyFields}
                  >
                    Pay {selectedGateWay ? "with " + selectedGateWay?.name : ""}
                  </button>
                </div>
                <br />
              </div>
            )}
          </form>
        )}
        <br />
      </div>
    </>
  );
};

export default Fundwallet;
