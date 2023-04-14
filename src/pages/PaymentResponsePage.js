/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useLayoutEffect, useState } from "react";
import ConfirmBlock from "../components/blocks/ConfirmBlock";
import { useSearchParams } from "react-router-dom";
import useNavigateSearch from "../global/customHooks/useNavigateSearch";

const PaymentResponsePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigateSearch();

  const [paymentSttats, setpaymentSttats] = useState(false);

  let ref = searchParams.get("ref");
  //   let status = searchParams.get("status");
  let message = searchParams.get("message");

  useEffect(() => {
    if (!ref) {
      navigate("/");
    }
  }, [ref]);

  useLayoutEffect(() => {
    let payStatys = sessionStorage.getItem("paystatus");

    if (payStatys) {
      setpaymentSttats(true);
    } else {
      setpaymentSttats(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      setpaymentSttats(false);
      sessionStorage.removeItem("paystatus");
    };
  }, []);

  const handleNavigation = () => {
    navigate("/account/dashboard");
  };

  return (
    <div className="lottoHeightWeight">
      <div>
        <ConfirmBlock
          status={paymentSttats ? true : false}
          title={
            paymentSttats ? "Payment successful" : "Payment not successful"
          }
          des={message}
        />
        <div className="text-center d-flex justify-content-center align-items-center mt-4">
          <button
            disabled={false}
            type="button"
            style={{ margin: 0 }}
            onClick={() => handleNavigation()}
            className="grandLottoButton cardButton"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentResponsePage;
