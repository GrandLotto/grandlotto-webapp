/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ConfirmBlock from "../components/blocks/ConfirmBlock";
import { useSearchParams } from "react-router-dom";
import useNavigateSearch from "../global/customHooks/useNavigateSearch";

const PaymentResponsePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigateSearch();

  let ref = searchParams.get("ref");
  let status = searchParams.get("status");
  let message = searchParams.get("message");

  useEffect(() => {
    if (!ref) {
      navigate("/");
    }
  }, [ref]);

  const handleNavigation = () => {
    navigate("/account/dashboard");
  };

  return (
    <div className="lottoHeightWeight">
      <div>
        <ConfirmBlock
          status={status === "success" ? true : false}
          title={
            status === "success"
              ? "Payment successful"
              : "Payment not successful"
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
