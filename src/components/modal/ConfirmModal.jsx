/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setConfirmModal } from "../../store/alert/alertSlice";

const ConfirmModal = () => {
  const modal = useSelector((state) => state.alert.confirmModal);
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const [inputt, setInputt] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    dispatch(
      setConfirmModal({
        status: false,
        type: "",
        title: "",
        desc: "",
        hasMesage: false,
        payload: null,
        buttonText: "",
      })
    );

    setEmptyFields(true);
    setInputt("");
  };

  useEffect(() => {
    validateForm();
  }, [inputt, emptyFields]);

  const validateForm = () => {
    if (modal?.hasMesage === true) {
      if (!inputt) {
        setEmptyFields(true);
        return false;
      }
    } else {
      setEmptyFields(false);
    }

    setEmptyFields(false);
  };

  const proceed = () => {
    closeModal();
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />
            <h4 className="text-light">{modal.title}</h4>

            <form
              className="grandlotto_form mt-5  p-0"
              style={{ width: "100%" }}
            >
              <div className="form-group" style={{ width: "100%" }}>
                <label>
                  {modal.desc} <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  type="text"
                  onChange={(e) => setInputt(e.target.value)}
                  value={inputt}
                  placeholder="Message"
                  className="form-control py-3"
                  style={{ width: "100%" }}
                />
              </div>
            </form>
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
                onClick={() => proceed()}
                disabled={emptyFields}
                style={{ width: "100%!important", display: "block" }}
                className="grandLottoButton"
              >
                {modal?.buttonText || "Ok"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
