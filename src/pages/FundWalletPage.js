import React, { useEffect, useState } from "react";
import FilterModals from "../components/modal/FilterModals";
import Fundwallet from "../components/wallet/Fundwallet";

const FundWalletPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <FilterModals
        status={showFilter}
        setVisiblityStatus={setShowFilter}
        modalTitle="Filter"
      >
        <div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">Date</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="1 month">1 month</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">By wallet type</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="Wallet">Wallet</option>
                  <option value="Withdrawable wallet">
                    Withdrawable wallet
                  </option>
                  <option value="Bonus wallet">Bonus wallet</option>
                </select>
              </div>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-header">
              <h6 className="font-weight-bold">By transaction type</h6>
            </div>
            <div className="card-body">
              <div className="form-group">
                <select className="form-control">
                  <option value="All">All</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </FilterModals>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            {/* <h5 className="site_title">Fund Wallet</h5> */}
          </div>

          <div className="mt-3">
            <div className="mt-3">
              <div className="card">
                <Fundwallet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundWalletPage;
