import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setForgotPasswordModal,
  setLoginModal,
  setRegisterModal,
} from "../../store/alert/alertSlice";

const LoginModal = () => {
  const modal = useSelector((state) => state.alert.loginModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setLoginModal(false));
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

  return (
    modal && (
      <div className="alert-modal alertPOP" id="loginModal">
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
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
            </div>
            <form className="grandlotto_form mt-4" style={{ width: "100%" }}>
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="">Email/phone Number</label>

                <input
                  class="form-control py-3"
                  placeholder="Email/phone Number"
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>
              <div
                className="form-group d-flex justify-content-end  mb-2"
                style={{ marginTop: "-10px" }}
              >
                <a
                  onClick={(e) => handleForgotPassword(e)}
                  className="has_link pointer"
                  style={{ cursor: "pointer" }}
                >
                  Forgot Password ?
                </a>
              </div>
              <div className="form-group mb-4" style={{ width: "100%" }}>
                <label htmlFor="">Password</label>
                <input
                  class="form-control py-3"
                  placeholder="Password"
                  type="password"
                  style={{ width: "100%" }}
                />
              </div>
              <br />
              <div
                className="form-group text-center  mb-4 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button className="grandLottoButton">Login</button>
              </div>

              <div className="form-group text-dark d-flex justify-content-center">
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
