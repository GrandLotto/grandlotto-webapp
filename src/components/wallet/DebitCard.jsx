import React, { useState } from "react";
import PaymentGateWay from "../blocks/PaymentGateWay";
import CurrencyInput from "react-currency-input-field";

const DebitCard = () => {
  const [selectedGateWay, setselectedGateWay] = useState(null);
  const [amount, setAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  const handleSelectGateWay = (item) => {
    if (item) {
      setselectedGateWay(item);
    }
  };

  return (
    <div className="grandlotto_card payment_card">
      <PaymentGateWay
        selectedGateWay={selectedGateWay}
        handleSelectGateWay={handleSelectGateWay}
      />
      <form className="grandlotto_form mt-5">
        <div className="row mb-3">
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
                {/* <input
                  className=""
                  disabled={!selectedGateWay}
                  type="text"
                  onChange={(e) => setAmount(e.target.value.replace(/\s/g, ""))}
                  value={amount}
                  style={{ width: "100%" }}
                /> */}
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
              className="grandLottoButton cardButton lengthyButton"
              disabled={!amount || !selectedGateWay}
            >
              Pay {selectedGateWay ? "with " + selectedGateWay?.name : ""}
            </button>
          </div>
        </div>
        <br />
      </form>
    </div>
  );
};

export default DebitCard;
