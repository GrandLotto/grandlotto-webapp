import React, { useEffect, useState } from "react";
import ComponentLoading from "../blocks/ComponentLoading";
import { setAlertPopUp, setPageLoading } from "../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import PinCodeBlock from "../blocks/PinCodeBlock";
import { handlePOSTRequest } from "../../rest/apiRest";
import { CHANGE_PASSWORD_URL } from "../../config/urlConfigs";
import { getUserInfo } from "../../store/authSlice/actions";

const ChangePassword = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const resetFields = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setConfirmNewPasswordError("");
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setEmptyFields(true);
  };

  useEffect(() => {
    validateForm();
  }, [
    oldPassword,
    emptyFields,
    newPassword,
    confirmNewPassword,
    confirmNewPasswordError,
  ]);

  const validateForm = () => {
    if (!oldPassword) {
      setEmptyFields(true);
      return false;
    }
    if (oldPassword !== "" && oldPassword.length < 5) {
      setEmptyFields(true);
      return false;
    }
    if (!newPassword) {
      setEmptyFields(true);
      return false;
    }
    if (newPassword !== "" && newPassword.length < 5) {
      setEmptyFields(true);
      return false;
    }
    if (!confirmNewPassword) {
      setEmptyFields(true);
      return false;
    }

    if (confirmNewPassword !== "" && confirmNewPassword.length < 5) {
      setEmptyFields(true);
      return false;
    }

    if (confirmNewPassword !== "" && confirmNewPassword !== newPassword) {
      setEmptyFields(true);
      setConfirmNewPasswordError("Passwords do not match");
      return false;
    }

    setConfirmNewPasswordError("");
    setEmptyFields(false);
  };

  // const proceed = () => {
  //   dispatch(
  //     setPageLoading({
  //       status: true,
  //       message: "Please wait ...",
  //     })
  //   );

  //   setTimeout(() => {
  //     dispatch(
  //       setPageLoading({
  //         status: false,
  //         message: "",
  //       })
  //     );

  //     dispatch(
  //       setAlertPopUp({
  //         status: true,
  //         type: "SUCCESS",
  //         title: "Successful",
  //         desc: `successfully changed Password`,
  //         payload: null,
  //       })
  //     );

  //     resetFields();
  //   }, 800);
  // };

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    const payload = {
      email: user?.email,
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: newPassword,
    };

    handlePOSTRequest(CHANGE_PASSWORD_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: " Successful",
              // desc: response?.data?.message,
              desc: "Successfully changed password",
              payload: null,
            })
          );

          dispatch(getUserInfo(user?.email));

          resetFields();
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: response?.data?.message,
              payload: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
      });
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      <div className="grandlotto_form mt-2">
        <h5 className="site_sub_title mb-5">Change Password</h5>
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="form-group " style={{ width: "100%" }}>
              <label htmlFor="">Old password</label>
              <div className="password_input">
                <input
                  type={showOldPassword ? "text" : "password"}
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="form-control largeInputFont py-3"
                  style={{ width: "100%" }}
                />

                <i
                  className={`showHide bx ${
                    showOldPassword ? "bx-hide" : "bx-show"
                  }  `}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-md-6">
            <div className="form-group " style={{ width: "100%" }}>
              <label htmlFor="">New password</label>
              <div className="password_input">
                <input
                  type={showNewPassword ? "text" : "password"}
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="form-control largeInputFont py-3"
                  style={{ width: "100%" }}
                />

                <i
                  className={`showHide bx ${
                    showNewPassword ? "bx-hide" : "bx-show"
                  }  `}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <div className="form-group " style={{ width: "100%" }}>
              <label htmlFor="">Confirm New password</label>
              <div className="password_input">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  value={confirmNewPassword}
                  className="form-control largeInputFont py-3"
                  style={{ width: "100%" }}
                />

                <i
                  className={`showHide bx ${
                    showConfirmNewPassword ? "bx-hide" : "bx-show"
                  }  `}
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                ></i>
              </div>

              {confirmNewPasswordError && (
                <p className="text-danger mt-2" style={{ fontSize: 14 }}>
                  {confirmNewPasswordError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <button
              disabled={emptyFields}
              type="button"
              className="grandLottoButton cardButton"
              onClick={() => proceed()}
            >
              Submit
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default ChangePassword;
