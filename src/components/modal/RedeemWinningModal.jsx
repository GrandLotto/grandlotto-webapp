import React, { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";
import {
  setAlertPopUp,
  setRedeemWinningModal,
} from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";

const RedeemWinningModal = () => {
  const modal = useSelector((state) => state.alert.redeemWinningModal);
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [pin, setPin] = useState("");
  const [allBanks] = useState(sortArrayByname(nigerianBanks()));
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    dispatch(setRedeemWinningModal(false));
    setStep(1);
    setIsLoading(false);
    setSelectedBank(null);
    setEmptyFields(true);
    setPromoCode("");
    setAccountNumber("");
  };

  useEffect(() => {
    validateForm();
  }, [accountNumber, selectedBank, promoCode, emptyFields]);

  const validateForm = () => {
    if (step === 1) {
      if (!promoCode) {
        setEmptyFields(true);
        return false;
      }
    }
    if (step === 2) {
      if (!accountNumber) {
        setEmptyFields(true);
        return false;
      }
      if (!selectedBank) {
        setEmptyFields(true);
        return false;
      }
    }

    setEmptyFields(false);
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
            title: "Payout successful",
            desc: `Payout of ₦10,200 was successful`,
            payload: null,
          })
        );

        closeModal();
      }
    }, 800);
  };

  return (
    modal && (
      <div
        className="alert-modal alertPOP large_modal large_auto_height_modal"
        id="signupModal"
      >
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button">
            <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100">
              <h4 className=" text-center">Redeem Winning</h4>
              <p className="p_para">
                Enter the details below to claim your winnings
              </p>
            </div>
            <form
              className="grandlotto_form mt-4"
              style={{ width: "100%", padding: 0 }}
            >
              {step == 1 && (
                <div className="row ">
                  <div className="col-md-9 mx-auto mb-3 mt-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Enter winning code</label>

                      <input
                        onChange={(e) => setPromoCode(e.target.value)}
                        value={promoCode}
                        className="form-control py-3"
                        placeholder="Enter winning code"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step == 2 && (
                <div className="row mt-5">
                  <div className="col-md-6 mb-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Select Bank</label>

                      <select
                        style={{ width: "100%" }}
                        className="form-control "
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
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">Enter Account Number</label>

                      <input
                        onChange={(e) => setAccountNumber(e.target.value)}
                        value={accountNumber}
                        className="form-control py-3"
                        placeholder="Enter Account Number"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <br />
              <div
                className="form-group text-center mb-2 mt-2 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  disabled={emptyFields}
                  onClick={() => proceed()}
                  className="grandLottoButton"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default RedeemWinningModal;
