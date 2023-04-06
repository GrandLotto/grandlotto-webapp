import React, { useEffect } from "react";
import TransferTab from "../components/wallet/TransferTab";

const TransferPage = () => {
  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Fund Wallet</h5>
          </div>

          <div className="mt-3">
            <div className="card">
              <TransferTab />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPage;
