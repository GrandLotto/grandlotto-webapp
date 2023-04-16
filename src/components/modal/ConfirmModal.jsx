/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { setAlertPopUp, setConfirmModal } from "../../store/alert/alertSlice";
import { DELETE_GAMETYPE_URL, DELETE_GAME_URL } from "../../config/urlConfigs";
import { handleDELETERequest } from "../../rest/apiRest";
import ComponentLoading from "../blocks/ComponentLoading";
import { setRefreshing } from "../../store/authSlice/authSlice";
import Reponsemessage from "../blocks/Reponsemessage";

const ConfirmModal = () => {
  const modal = useSelector((state) => state.alert.confirmModal);
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const [inputt, setInputt] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState("");

  const closeModal = () => {
    if (isLoading) {
      return;
    }
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
    setResponseError("");
    setIsLoading(false);
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
    if (modal.type === "DELETE_GAME_TYPE") {
      handleDELETE(
        DELETE_GAMETYPE_URL + `?Id=${modal?.payload?.id}`,
        "Game type deleted"
      );
      return;
    }
    if (modal.type === "DELETE_GAME") {
      handleDELETE(
        DELETE_GAME_URL + `?Id=${modal?.payload?.id}`,
        "Game deleted"
      );
      return;
    }
  };

  const handleDELETE = (URL, responseMessage) => {
    setIsLoading(true);

    setTimeout(() => {
      handleDELETERequest(URL)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: responseMessage,
                desc: response?.data?.message,
                payload: null,
              })
            );
            dispatch(setRefreshing(true));

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
    }, 4000);
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP overAll">
        <div className="alert-modal-overlay" onClick={closeModal}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && <ComponentLoading title="Please wait ..." />}
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            {responseError ? (
              <Reponsemessage
                message={responseError}
                error={responseError ? true : false}
              />
            ) : null}
            <br />
            <h4 className="text-light">{modal.title}</h4>

            {modal?.hasMesage ? (
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
            ) : (
              <label>{modal.desc}</label>
            )}

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
                type="button"
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
