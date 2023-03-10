import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONFIRM_EMAIL_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setForgotPasswordModal,
  setInputCodeModal,
  setLoginModal,
  setAlertPopUp,
} from "../../store/alert/alertSlice";

import ComponentLoading from "../blocks/ComponentLoading";
import PinCodeBlock from "../blocks/PinCodeBlock";
import Reponsemessage from "../blocks/Reponsemessage";

const FnputCodeModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.inputCodeModal);

  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const [pin, setPin] = useState("");
  const [resetEFields, setResetEFields] = useState(false);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(
      setInputCodeModal({
        status: false,
        type: "",
        title: "",
        desc: "",
        btnText: "",
        payload: null,
      })
    );

    setIsLoading(false);
    setEmptyFields(true);
    setPin("");
    setResponseError("");
  };

  const handleDone = (code) => {
    setPin(code);
  };

  const goToLogin = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setLoginModal(true));
  };

  useEffect(() => {
    validateForm();
  }, [pin, emptyFields]);

  const validateForm = () => {
    if (!pin) {
      setEmptyFields(true);
      return false;
    }
    if (pin !== "" && pin.length !== 5) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = { email: modal?.payload?.email, token: pin };

    handlePOSTRequest(CONFIRM_EMAIL_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: " Successful",
              desc: response?.data?.message,
              payload: null,
            })
          );

          closeModal();
        } else {
          setResponseError(response?.data?.message);
          setResetEFields(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseError("An error occurred, please try again");
        console.log(error);
      });
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP" id="loginModal">
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
              <h4 className=" text-center">{modal?.title}</h4>
              <p className="mt-3 p_para">{modal?.desc}</p>

              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form
              className="grandlotto_form mt-4 text-center"
              style={{ width: "100%" }}
            >
              <PinCodeBlock
                pinLength={4}
                handleDone={handleDone}
                resetEFields={resetEFields}
              />

              <br />
              <div
                className="form-group text-center  mb-4 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  disabled={emptyFields}
                  type="button"
                  onClick={() => proceed()}
                  className="grandLottoButton"
                >
                  {modal?.btnText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default FnputCodeModal;
