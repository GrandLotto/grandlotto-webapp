import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_URL } from "../../config/urlConfigs";
import { validEmail } from "../../global/customFunctions";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setLoginModal,
  setRegisterModal,
} from "../../store/alert/alertSlice";
import { getUserInfo } from "../../store/authSlice/actions";
import {
  setIsToken,
  setIsUserLoggedIn,
  setUserInfo,
} from "../../store/authSlice/authSlice";
import { getUserAccount } from "../../store/wallet/actions";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";

const RegisterModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.registerModal);

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(setRegisterModal(false));

    setIsLoading(false);
    setEmptyFields(true);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setConfirmPassword("");
    setConfirmPasswordError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setPassword("");
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
  }, [
    email,
    firstName,
    lastName,
    phone,
    password,
    confirmPassword,
    confirmPasswordError,
    emailError,
    emptyFields,
  ]);

  const validateForm = () => {
    if (!firstName) {
      setEmptyFields(true);
      return false;
    }

    if (!lastName) {
      setEmptyFields(true);
      return false;
    }

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

    if (!phone) {
      setEmptyFields(true);
      return false;
    }

    if (!password) {
      setEmptyFields(true);
      return false;
    }

    if (!confirmPassword) {
      setEmptyFields(true);
      return false;
    }

    if (password !== confirmPassword) {
      setEmptyFields(true);
      setConfirmPasswordError("Password do not match");
      return false;
    }

    setConfirmPasswordError("");

    setEmptyFields(false);
  };

  const proceed = () => {
    setIsLoading(true);
    setResponseError("");

    const payload = {
      phoneNumber: phone,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      roleName: "USER",
      gender: "Male",
      firstName: firstName,
      lastName: lastName,
      referredBy: "",
      userName:
        firstName.substring(0, 3) +
        lastName.substring(0, 3) +
        phone.slice(phone.length - 4),
    };

    // console.log(JSON.stringify(payload));

    handlePOSTRequest(REGISTER_URL, payload)
      .then((response) => {
        setIsLoading(false);
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: "Registration Successful",
              desc: `Congratulations, your account has been successfully created`,
              payload: null,
            })
          );

          setTimeout(() => {
            dispatch(setLoginModal(true));
          }, 2000);

          // if (response.data.data.emailConfirmed) {
          //   // const data = {
          //   //   firstName: response.data.data?.firstName,
          //   //   lastName: response.data.data?.lastName,
          //   //   email: response.data.data?.email,
          //   //   code: response.data.data?.code,
          //   //   userName: response.data.data?.userName,
          //   //   phoneNumber: response.data.data?.phoneNumber,
          //   //   photo: response.data.data?.photo,
          //   //   country: response.data.data?.country,
          //   // };
          //   // const token = response.data.data.token.token;
          //   // const expireTo = response.data.data.token.expireTo;

          //   // localStorage.setItem("appUserThemeSettingsCode", token);
          //   // localStorage.setItem("appexrat", new Date(expireTo)?.getTime());

          //   // dispatch(setIsToken(token));
          //   // dispatch(setUserInfo(data));
          //   // dispatch(setIsUserLoggedIn(true));
          //   // dispatch(getUserAccount(data?.email));
          //   // dispatch(getUserInfo(data?.email));

          // } else {
          //   dispatch(
          //     setAlertPopUp({
          //       status: true,
          //       type: "ERROR",
          //       title: "Login Error",
          //       desc: `Kindly confirm your email`,
          //       payload: null,
          //     })
          //   );
          // }

          closeModal();
        } else {
          setResponseError(response?.data?.message);
          setEmail("");
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
      <div className="alert-modal alertPOP large_modal" id="signupModal">
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
              <h4 className=" text-center">Register</h4>
              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form className="grandlotto_form mt-4" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">First Name</label>

                    <input
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      className="form-control py-3"
                      placeholder="First Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Last Name</label>

                    <input
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      className="form-control py-3"
                      placeholder="Last Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Email</label>

                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
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
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Phone Number</label>

                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className="form-control py-3"
                      placeholder="Phone Number"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group mb-4" style={{ width: "100%" }}>
                    <label htmlFor="">Password</label>

                    <div className="password_input">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="form-control py-3"
                        style={{ width: "100%" }}
                      />

                      <i
                        className={`showHide bx ${
                          showPassword ? "bx-hide" : "bx-show"
                        }  `}
                        style={{ color: "#222" }}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group mb-4" style={{ width: "100%" }}>
                    <label htmlFor="">Confirm password</label>
                    <div className="password_input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className="form-control py-3"
                        style={{ width: "100%" }}
                      />

                      <i
                        className={`showHide bx ${
                          showConfirmPassword ? "bx-hide" : "bx-show"
                        }  `}
                        style={{ color: "#222" }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      ></i>
                    </div>

                    {confirmPasswordError && (
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
                        <span className="ml-2">{confirmPasswordError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, fontStyle: "italic" }}>
                By creating an account, you agree to our Terms & Conditions and
                confirm that you are at least 18 years old or over and all
                information given is true.
              </p>
              <br />
              <div
                className="form-group text-center mb-4 mt-2 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  disabled={emptyFields}
                  type="button"
                  onClick={() => proceed()}
                  className="grandLottoButton"
                >
                  Sign Up
                </button>
              </div>

              <div className="form-group text-dark d-flex justify-content-center">
                Already have an account? {""}
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

export default RegisterModal;
