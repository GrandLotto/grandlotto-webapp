/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORGOT_PASSWORD_URL } from "../../config/urlConfigs";
import { validEmail } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setForgotPasswordModal,
  setInputCodeModal,
  setLoginModal,
} from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";

const ForgotPasswordModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.forgotPasswordModal);

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(setForgotPasswordModal(false));

    setIsLoading(false);
    setEmptyFields(true);
    setEmail("");
    setEmailError("");
    setResponseError("");
  };

  const goToLogin = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setLoginModal(true));
  };

  useEffect(() => {
    validateForm();
  }, [email, emptyFields]);

  const validateForm = () => {
    if (!email) {
      setEmptyFields(true);
      return false;
    }

    if (validEmail(email) === false) {
      setEmailError("Invalid email address");
      setEmptyFields(true);
      return false;
    }

    setEmailError("");

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = { email: email };

    handlePOSTRequest(FORGOT_PASSWORD_URL, payload)
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        if (response?.data?.success) {
          let newPayload = {
            ...response?.data?.data,
            email: email,
          };
          dispatch(
            setInputCodeModal({
              status: true,
              type: "RESET_PASSWORD",
              title: "Reset Password",
              desc: response?.data?.data?.message,
              btnText: "Reset",
              payload: newPayload,
            })
          );
          closeModal();
        } else {
          setResponseError(response?.data?.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseError("An error occurred, please try again");
        console.log(error);
      });
  };

  return (
    modal && (
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
              <h4 className=" text-center">Forgot password</h4>
              <p className="mt-3 p_para">
                A recovery link will be sent to your phone
              </p>

              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form className="grandlotto_form mt-4" style={{ width: "100%" }}>
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="">Email</label>

                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control py-3"
                  placeholder="Email"
                  type="text"
                  style={{ width: "100%" }}
                />

                {emailError && (
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
                    <span className="ml-2">{emailError}</span>
                  </p>
                )}
              </div>

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
                  Continue
                </button>
              </div>

              <div className="form-group text-light d-flex justify-content-center">
                Forget it
                <a
                  href="true"
                  onClick={(e) => goToLogin(e)}
                  className="has_link ml-2"
                >
                  Login
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ForgotPasswordModal;
