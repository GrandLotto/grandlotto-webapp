import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ComponentLoading from "../blocks/ComponentLoading";
import ConfirmBlock from "../blocks/ConfirmBlock";
import Timer from "../blocks/Timer";

const TransferTab = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [madePayment, setMadePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [time, setTime] = useState(10);

  const handlePay = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowAccount(true);
      setMadePayment(false);
      setTime(10);
    }, 2000);
  };

  const handleCancel = () => {
    setShowAccount(false);
    setMadePayment(false);
    setTime(10);
  };

  const handlePaid = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleCancel();
      setMadePayment(true);
    }, 2000);
  };

  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleCancel();
    }, 500);
  };

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
                <i className="bx bx-transfer"></i>
              </div>
              <h5>
                Transfer <b>₦5,000.00</b> to the account details displayed below{" "}
              </h5>
              <div className="showAccountBox">
                <h6>GTBank</h6>
                <h3>0027254724</h3>
                <p>Use this account for this transaction only.</p>
                <p>
                  Expires in <Timer time={time * 60} />
                </p>
              </div>

              <div
                className="d-flex align-items-center justify-content-center mt-5 mb-3"
                style={{ columnGap: 15 }}
              >
                <button
                  className="grandLottoButton button-outline-light cardButton border text-dark "
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePaid()}
                  className="grandLottoButton cardButton"
                >
                  I have paid
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {madePayment ? (
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
                      <label htmlFor="">Enter Promo Code (Optional)</label>

                      <input
                        type="text"
                        onChange={(e) => setPromoCode(e.target.value)}
                        value={promoCode}
                        className="form-control largeInputFont py-3"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-4">
                    <button
                      type="button"
                      disabled={!amount}
                      className="grandLottoButton cardButton lengthyButton"
                      onClick={() => handlePay()}
                    >
                      Pay
                    </button>
                  </div>
                </div>
                <br />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransferTab;
