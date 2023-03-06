import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutModal } from "../../store/alert/alertSlice";

const LogoutModal = () => {
  const modal = useSelector((state) => state.alert.logoutModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setLogoutModal({
        status: false,
        payload: null,
      })
    );
  };

  const handleLogout = () => {
    closeModal();
  };
  return (
    modal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card pages_mobile_dark vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              className={`alert-modal-icon `}
              style={{ padding: 0, background: "transparent", color: "#222" }}
            >
              <i className="bx bx-log-out"></i>
            </div>
            <h4>Logout</h4>
            <p>Do you want to Logout?</p>
            <br />
            <div className="alert-modal-button modalButton d-flex">
              <button
                onClick={() => closeModal()}
                className=" border"
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleLogout()}
                style={{ width: "100%!important", display: "block" }}
                className="grandLottoButton"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LogoutModal;
