import React, { useEffect, useState } from "react";
import ComponentLoading from "../blocks/ComponentLoading";
import { setAlertPopUp, setPageLoading } from "../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import PinCodeBlock from "../blocks/PinCodeBlock";
import { handlePOSTRequest } from "../../rest/apiRest";
import { CHANGE_TRANSACTION_PIN_URL } from "../../config/urlConfigs";
import { getUserInfo } from "../../store/authSlice/actions";

const TransactionPin = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.oauth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [resetEFields, setResetEFields] = useState(false);

  const resetFields = (code) => {
    setPin("");
    setPin2("");
    setEmptyFields(true);
    setResetEFields(true);
  };

  useEffect(() => {
    validateForm();
  }, [pin, emptyFields, pin2]);

  const validateForm = () => {
    if (!pin) {
      setEmptyFields(true);
      return false;
    }
    if (pin !== "" && pin.length !== 5) {
      setEmptyFields(true);
      return false;
    }

    if (!pin2) {
      setEmptyFields(true);
      return false;
    }
    if (pin2 !== "" && pin2.length !== 5) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const handleDone = (code) => {
    setPin(code);
  };

  const handleDone2 = (code) => {
    setPin2(code);
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
  //         desc: `Pin change was successful`,
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
      oldPIN: pin,
      newPIN: pin2,
      confirmNewPIN: pin2,
    };

    handlePOSTRequest(CHANGE_TRANSACTION_PIN_URL, payload)
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
              desc: "Transaction pin Updated",
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

          setResetEFields(true);
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        setResetEFields(true);
        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        console.log(error);
      });
  };

  return (
    <div
      className="grandlotto_card payment_card"
      style={{ position: "relative" }}
    >
      <div className="grandlotto_form mt-5">
        <h5 className="site_sub_title mb-5">Change Pin</h5>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="form-group text-center mb-5"
            style={{ width: "100%" }}
          >
            <label htmlFor="" className="mb-3">
              Old Transaction pin
            </label>

            <PinCodeBlock
              pinLength={4}
              handleDone={handleDone}
              resetEFields={resetEFields}
            />
          </div>
          <div className="form-group text-center" style={{ width: "100%" }}>
            <label htmlFor="" className="mb-3">
              New Transaction pin
            </label>

            <PinCodeBlock
              pinLength={4}
              handleDone={handleDone2}
              resetEFields={resetEFields}
            />
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
    </div>
  );
};

export default TransactionPin;
