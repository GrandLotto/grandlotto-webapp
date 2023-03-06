import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal, setRegisterModal } from "../../store/alert/alertSlice";

const RegisterModal = () => {
  const modal = useSelector((state) => state.alert.registerModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setRegisterModal(false));
  };

  const goToLogin = (e) => {
    e.preventDefault();
    closeModal();
    dispatch(setLoginModal(true));
  };

  return (
    modal && (
      <div className="alert-modal alertPOP large_modal" id="signupModal">
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
              <h4 className=" text-center">Register</h4>
            </div>
            <form className="grandlotto_form mt-4" style={{ width: "100%" }}>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">First Name</label>

                    <input
                      class="form-control py-3"
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
                      class="form-control py-3"
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
                      class="form-control py-3"
                      placeholder="Email"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Phone Number</label>

                    <input
                      class="form-control py-3"
                      placeholder="Phone Number"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group mb-4" style={{ width: "100%" }}>
                    <label htmlFor="">Password</label>
                    <input
                      class="form-control py-3"
                      placeholder="Password"
                      type="password"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-group mb-4" style={{ width: "100%" }}>
                    <label htmlFor="">Confirm password</label>
                    <input
                      class="form-control py-3"
                      placeholder="Confirm password"
                      type="password"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <br />
              <div
                className="form-group text-center mb-4 mt-2 d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <button className="grandLottoButton">Sign Up</button>
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
