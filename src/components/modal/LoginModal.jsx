/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_URL } from "../../config/urlConfigs";
import { validEmail } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setForgotPasswordModal,
  setLoginModal,
  setRegisterModal,
} from "../../store/alert/alertSlice";
import {
  setIsToken,
  setIsUserLoggedIn,
  setRefreshing,
  setUserInfo,
} from "../../store/authSlice/authSlice";
import { getUserInfo } from "../../store/authSlice/actions";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";
import { setSelectedCoupons } from "../../store/wallet/walletSlice";
import {
  setBetAmount,
  setCalculatedGames,
  setExpiryDate,
} from "../../store/betSlice/betSlice";

const LoginModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.loginModal);

  const [isLoading, setIsLoading] = useState(false);
  const [emailPhone, setEmailPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(setLoginModal(false));
    setIsLoading(false);
    setEmptyFields(true);
    setShowPassword(false);
    setEmailPhone("");
    setPassword("");
    setEmailError("");
    setResponseError("");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setForgotPasswordModal(true));
  };

  const goToSignUp = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setRegisterModal(true));
  };

  useEffect(() => {
    validateForm();
  }, [emailPhone, password, emptyFields]);

  const validateForm = () => {
    if (!emailPhone) {
      setEmptyFields(true);
      return false;
    }

    if (validEmail(emailPhone) === false) {
      setEmailError("Invalid email address");
      setEmptyFields(true);
      return false;
    }

    setEmailError("");

    if (!password) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = { email: emailPhone, password: password };

    handlePOSTRequest(LOGIN_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          if (response.data.data.emailConfirmed) {
            const data = {
              firstName: response.data.data?.firstName,
              lastName: response.data.data?.lastName,
              email: response.data.data?.email,
              code: response.data.data?.code,
              userName: response.data.data?.userName,
              phoneNumber: response.data.data?.phoneNumber,
              photo: response.data.data?.photo,
              country: response.data.data?.country,
            };
            const token = response.data.data.token.token;
            const expireTo = response.data.data.token.expireTo;

            localStorage.setItem("appUserThemeSettingsCode", token);
            localStorage.setItem("appexrat", new Date(expireTo)?.getTime());

            dispatch(setIsToken(token));
            dispatch(setUserInfo(data));
            dispatch(setIsUserLoggedIn(true));

            // if (data?.roles?.length) {
            //   if (isUserAnAdmin(data?.roles) === true) {
            //     dispatch(setIsAdmin(true));
            //   } else {
            //     dispatch(setIsAdmin(false));
            //   }
            // }

            dispatch(getUserInfo(data?.email));
            setTimeout(() => {
              dispatch(setRefreshing(true));
              dispatch(setSelectedCoupons([]));
              dispatch(setBetAmount(0));
              dispatch(setCalculatedGames(null));
              dispatch(setExpiryDate(null));
            }, 1000);
          } else {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "ERROR",
                title: "Login Error",
                desc: `Kindly confirm your email`,
                payload: null,
              })
            );
          }

          closeModal();
        } else {
          setResponseError(
            response?.data?.message || "An error occurred, please try again"
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setResponseError("An error occurred, please try again");
        // console.log(error);
      });

    setTimeout(() => {
      // dispatch(
      //   setAlertPopUp({
      //     status: true,
      //     type: "SUCCESS",
      //     title: "Login successful",
      //     desc: `welcome`,
      //     payload: null,
      //   })
      // );
      // dispatch(setIsUserLoggedIn(true));
      // closeModal();
    }, 800);
  };

  return (
    modal && (
      <div className="alert-modal alertPOP " id="loginModal">
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
              <h4 className=" text-center">Login</h4>
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
                  onChange={(e) => setEmailPhone(e.target.value)}
                  value={emailPhone}
                  className="form-control py-3"
                  placeholder="Email"
                  type="email"
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
              <div
                className="form-group d-flex justify-content-end  mb-2"
                style={{ marginTop: "-10px" }}
              >
                <a
                  href="true"
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword(e);
                  }}
                  className="has_link pointer"
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password ?
                </a>
              </div>
              <div className="form-group mb-4" style={{ width: "100%" }}>
                <label htmlFor="">Password</label>

                <div className="password_input">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control py-3"
                    style={{ width: "100%" }}
                    placeholder="Password"
                  />

                  <i
                    className={`showHide text-light bx ${
                      showPassword ? "bx-hide" : "bx-show"
                    }  `}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
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
                  Login
                </button>
              </div>

              <div className="form-group text-light d-flex justify-content-center">
                Don’t an account? {""}
                <a
                  href="true"
                  onClick={(e) => goToSignUp(e)}
                  className="has_link ml-2"
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;
