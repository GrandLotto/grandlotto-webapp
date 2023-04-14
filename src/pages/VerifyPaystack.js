/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { handlePOSTRequest } from "../rest/apiRest";
import { VERIFY_PAYSTACK_PAYMENT_URL } from "../config/urlConfigs";
import useNavigateSearch from "../global/customHooks/useNavigateSearch";

const VerifyPaystack = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigateSearch();

  let ref = searchParams.get("ref");

  let initialized = false;

  useEffect(() => {
    checkRef();
  }, []);

  const checkRef = () => {
    if (!initialized) {
      initialized = true;
      if (ref) {
        console.log(ref);
        confirmPayment();
      }
    }
  };

  const confirmPayment = () => {
    let URL = VERIFY_PAYSTACK_PAYMENT_URL;

    let payload = {
      requestId: ref,
    };

    handlePOSTRequest(URL, payload)
      .then((response) => {
        // console.log(response);
        if (response?.data?.success) {
          //   let requestData = response?.data?.data;
          //   console.log(requestData);

          navigate("/payment-response", {
            ref: ref,
            status: "success",
            message: response?.data?.message,
          });
        } else {
          navigate("/payment-response", {
            ref: ref,
            status: "error",
            message: response?.data?.message,
          });
        }
      })
      .catch((error) => {
        navigate("/payment-response", {
          ref: ref,
          status: "error",
          message: "Transaction error",
        });
      });
  };
  return (
    <div className="lottoHeightWeight">
      <div>
        <span className="spinner spinner-border" role="status"></span>
        <p className="mt-4 pl-3">Verifying ...</p>
      </div>
    </div>
  );
};

export default VerifyPaystack;
