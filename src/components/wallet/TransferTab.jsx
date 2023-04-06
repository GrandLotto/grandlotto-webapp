import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_DYNAMIC_ACCOUNT_URL } from "../../config/urlConfigs";
import { addComma } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import { setAlertPopUp, setPageLoading } from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import ConfirmBlock from "../blocks/ConfirmBlock";
import Timer from "../blocks/Timer";

const TransferTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);

  const [showAccount, setShowAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [time, setTime] = useState(30);

  // const handlePay = () => {
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setShowAccount(null);
  //     setMadePayment(false);
  //     setTime(30);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setShowAccount(null);
    setTime(30);
    setAmount(0);
  };

  const handlePaid = () => {
    handleCancel();
  };

  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleCancel();
    }, 500);
  };

  const handleRetry = () => {
    setShowAccount(null);
    handlePay();
  };
  const handlePay = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait, this will take a while ...",
      })
    );

    const payload = {
      email: user?.email,
    };

    handlePOSTRequest(CREATE_DYNAMIC_ACCOUNT_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        console.log(response);
        if (response?.data?.success) {
          setShowAccount(response?.data?.data);
          setTime(30);
        } else {
          setShowAccount(null);
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
        setShowAccount(null);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
      });
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      <div className="grandlotto_form mt-5">
        {showAccount ? (
          <>
            <div className="showAccount">
              <div>
                <i className="bx bx-transfer"></i>
              </div>
              {time !== 0 ? (
                <>
                  <h5>
                    Transfer <b>₦{addComma(amount)}</b> to the account details
                    displayed below{" "}
                  </h5>
                  <div className="showAccountBox">
                    <h6>{showAccount?.bankName}</h6>
                    <h6>{showAccount?.accountName}</h6>
                    <h3>{showAccount?.accountNumber}</h3>
                    <p>Use this account for this transaction only.</p>
                    <p className="mt-2">
                      Expires in <Timer time={time * 60} setTime={setTime} />
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h5></h5>
                  <div className="showAccountBox">
                    <h3>Expired!!</h3>
                  </div>
                </>
              )}

              <div
                className="d-flex align-items-center justify-content-center mt-5 mb-3"
                style={{ columnGap: 15 }}
              >
                {/* <button
                  className="grandLottoButton button-outline-light cardButton border text-dark "
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button> */}

                {time !== 0 ? (
                  <button
                    onClick={() => handlePaid()}
                    className="grandLottoButton cardButton"
                  >
                    Okay
                  </button>
                ) : (
                  <>
                    <button
                      className="grandLottoButton button-outline-light cardButton border text-dark "
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleRetry()}
                      className="grandLottoButton cardButton"
                    >
                      Retry
                    </button>
                  </>
                )}
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
            <div className="row mb-3 text-center">
              <div className="col-md-5 mx-auto mb-3">
                <div className="form-group" style={{ width: "100%" }}>
                  <label htmlFor="" className="text-left">
                    Enter amount
                  </label>
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
            <div className=" text-center mt-2">
              <div className="d-flex justify-content-center  text-center">
                <button
                  type="button"
                  disabled={!amount}
                  className="grandLottoButton cardButton lengthyButton"
                  onClick={() => handlePay()}
                >
                  Continue
                </button>
              </div>
            </div>
            <br />

            {/* {madePayment ? (
              <div className="text-center mb-5">
                <ConfirmBlock title={"Payment confirmed"} status={true} />
                <br />
                <br />

                <div className="d-flex align-items-center justify-content-center mt-5 mb-3">
                  <button
                    type="button"
                    onClick={() => handleRefresh()}
                    className="grandLottoButton cardButton"
                  >
                    Refresh
                  </button>
                </div>

                <br />
              </div>
            ) : (
              
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default TransferTab;
