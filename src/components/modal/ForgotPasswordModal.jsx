import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setForgotPasswordModal,
  setLoginModal,
} from "../../store/alert/alertSlice";

const ForgotPasswordModal = () => {
  const modal = useSelector((state) => state.alert.forgotPasswordModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setForgotPasswordModal(false));
  };

  const goToLogin = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setLoginModal(true));
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
              <h4 className=" text-center">Forgot password</h4>
              <p className="mt-3 p_para">
                A recovery link will be sent to your phone
              </p>
            </div>
            <form className="grandlotto_form mt-4" style={{ width: "100%" }}>
              <div className="form-group" style={{ width: "100%" }}>
                <label htmlFor="">Email</label>

                <input
                  class="form-control py-3"
                  placeholder="Email"
                  type="text"
                  style={{ width: "100%" }}
                />
              </div>

              <br />
              <div
                className="form-group text-center  mb-4 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button className="grandLottoButton">Continue</button>
              </div>

              <div className="form-group text-dark d-flex justify-content-center">
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
