/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_GAME_URL, UPDATE_GAME_URL } from "../../config/urlConfigs";
import { handlePOSTRequest, handlePUTRequest } from "../../rest/apiRest";
import {
  setAlertPopUp,
  setCreateGameModal,
} from "../../store/alert/alertSlice";
import ComponentLoading from "../blocks/ComponentLoading";
import Reponsemessage from "../blocks/Reponsemessage";
import { setRefreshing } from "../../store/authSlice/authSlice";

const CreateGameModal = () => {
  const dispatch = useDispatch();

  const modal = useSelector((state) => state.alert.createGameModal);
  // const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [gameName, setGameName] = useState("");
  // const [selectedDay, setSelectedDay] = useState("");
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isAvailableToplay, setIsAvailableToplay] = useState(true);

  const [responseError, setResponseError] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  const closeModal = () => {
    if (isLoading === true) {
      return;
    }
    dispatch(
      setCreateGameModal({
        status: false,
        type: "",
        payload: null,
      })
    );
    setIsLoading(false);
    setGameName("");
    setStartTime("");
    // setSelectedDay("");
    setStatus("");
    setIsAvailableToplay(true);
    setStartTime(new Date());
    setEndTime(new Date());
    setEmptyFields(true);
    setResponseError("");
  };

  const dayOfTheWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  useEffect(() => {
    if (modal?.status) {
      if (modal?.payload) {
        setGameName(modal?.payload?.name);
        setIsAvailableToplay(modal?.payload?.isAvailableToplay);
        // setSelectedDay(modal?.payload?.dayAvailable);
        setStatus(modal?.payload?.status);
        setStartTime(modal?.payload?.startTime);
        setEndTime(modal?.payload?.endTime);
        validateForm();
      }
    }
  }, [modal]);

  useEffect(() => {
    validateForm();
  }, [gameName, status, endTime, startTime, isAvailableToplay, emptyFields]);

  const validateForm = () => {
    if (!gameName) {
      setEmptyFields(true);
      return false;
    }

    // if (!selectedDay) {
    //   setEmptyFields(true);
    //   return false;
    // }

    if (!status) {
      setEmptyFields(true);
      return false;
    }

    if (!startTime) {
      setEmptyFields(true);
      return false;
    }

    if (!endTime) {
      setEmptyFields(true);
      return false;
    }

    // if (startTime) {
    //   setEmptyFields(true);
    //   return false;
    // }
    setEmptyFields(false);
  };

  const proceed = () => {
    setResponseError("");
    let selectedStartTime = new Date(startTime)?.getTime();
    let selectedEndTime = new Date(endTime)?.getTime();
    let timeNow = new Date()?.getTime();

    if (selectedStartTime < timeNow) {
      setResponseError("Start time should be a future time");

      return;
    }

    if (selectedEndTime < timeNow) {
      setResponseError("End time should be a future time");

      return;
    }

    if (selectedStartTime > selectedEndTime) {
      setResponseError("End time should be a greater than start time");

      return;
    }

    let currentDate = new Date(startTime);
    let newDatwToPlay = dayOfTheWeek[currentDate.getDay()];

    setIsLoading(true);
    const payload = {
      // email: user?.email,
      name: gameName,
      daytoplay: newDatwToPlay,
      startTime: startTime,
      endTime: endTime,
      status: status,
    };

    // console.log("payload", payload);

    let URL =
      modal?.type === "EDIT"
        ? UPDATE_GAME_URL + `?Id=${modal?.payload?.id}`
        : CREATE_GAME_URL;

    // console.log(JSON.stringify(payload));

    if (modal?.type === "EDIT") {
      handlePUTRequest(URL, payload)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "Game Updated Successful",
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
          // console.log(error);
        });
    } else {
      handlePOSTRequest(CREATE_GAME_URL, payload)
        .then((response) => {
          setIsLoading(false);
          // console.log(response);
          if (response?.data?.success) {
            dispatch(
              setAlertPopUp({
                status: true,
                type: "SUCCESS",
                title: "Game Created Successful",
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
          // console.log(error);
        });
    }
  };

  return (
    modal?.status && (
      <div className="alert-modal alertPOP " id="loginModal">
        <div className="alert-modal-overlay" onClick={() => closeModal()}></div>
        <div className="alert-modal-card vivify popInBottom">
          {isLoading && (
            <ComponentLoading title="Please wait ..." inner={true} />
          )}
          <div className="close-alert-button">
            <i
              onClick={() => closeModal()}
              className="bx bx-x"
              id="closeAlertModal"
            ></i>
          </div>

          <div className="alert-modal-body">
            <div className="text-center w-100">
              <h4 className=" text-center">
                {modal?.type === "EDIT" ? "Edit Game" : "Create Game"}
              </h4>
              {responseError ? (
                <Reponsemessage
                  message={responseError}
                  error={responseError ? true : false}
                />
              ) : null}
            </div>
            <form
              className="grandlotto_form mt-4"
              style={{ width: "100%", padding: 0 }}
            >
              <div className="row">
                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Name</label>
                    <input
                      onChange={(e) => setGameName(e.target.value)}
                      value={gameName}
                      className="form-control largeInputFont py-3"
                      placeholder="Game name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Start time</label>
                    <input
                      onChange={(e) => setStartTime(e.target.value)}
                      value={startTime}
                      className="form-control largeInputFont py-3"
                      type="datetime-local"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">End time</label>
                    <input
                      onChange={(e) => setEndTime(e.target.value)}
                      value={endTime}
                      className="form-control largeInputFont py-3"
                      type="datetime-local"
                      id="birthdaytime"
                      name="birthdaytime"
                    />
                  </div>
                </div>
                {/* <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Day to play</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedDay(e.target.value);
                        }
                      }}
                      value={selectedDay}
                    >
                      <option value="">Select day</option>

                      {dayOfTheWeek &&
                        dayOfTheWeek?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                  </div>
                </div> */}

                <div className="col-md-12 mb-3">
                  <div className="form-group">
                    <label htmlFor="">Status</label>
                    <select
                      style={{ width: "100%" }}
                      className="form-control hasCapitalized"
                      onChange={(e) => {
                        if (e.target.value) {
                          setStatus(e.target.value);
                        }
                      }}
                      value={status}
                    >
                      <option value="" disabled>
                        Select status
                      </option>

                      {["OPEN", "CLOSE"]?.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label htmlFor=""></label>
                    <div className="checkboxDiv">
                      <div className="form-check form-switch">
                        <input
                          onChange={() =>
                            setIsAvailableToplay(!isAvailableToplay)
                          }
                          checked={isAvailableToplay}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                        />
                        <label
                          style={{ fontSize: 17, paddingTop: 5 }}
                          className="form-check-label mb-0"
                          htmlFor="flexSwitchCheckDefault"
                        >
                          Is Available
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center mb-3">
                <div className="d-flex justify-content-center">
                  <button
                    disabled={emptyFields}
                    type="button"
                    className="grandLottoButton cardButton"
                    onClick={() => proceed()}
                  >
                    {modal?.type === "EDIT" ? "Update" : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateGameModal;
