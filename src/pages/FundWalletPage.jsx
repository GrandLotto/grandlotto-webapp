import React, { useEffect, useState } from "react";
import "../components/wallet/fundwallet.scss";
import DebitCard from "../components/wallet/DebitCard";
import FilterModals from "../components/modal/FilterModals";
import Transactions from "../components/transaction/Transactions";
import TransferTab from "../components/wallet/TransferTab";
import USSDTab from "../components/wallet/USSDTab";

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
            <h5 className="site_title">Fund Wallet</h5>
          </div>

          <div className="mt-3">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Debit-card-tab"
                  >
                    Debit card
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Transfer-tab"
                  >
                    Transfer
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#USSD-tab">
                    USSD
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Debit-card-tab">
                <div className="card">
                  <DebitCard />
                </div>
              </div>
              <div className="tab-pane" id="Transfer-tab">
                <div className="card">
                  <TransferTab />
                </div>
              </div>
              <div className="tab-pane" id="USSD-tab">
                <div className="card">
                  <USSDTab />
                  {/* <div className="body">
                <br />
                <br />
                <br />
                <br />
                <br />
                <p className="text-center">
                  <b>Coming Soon</b>
                </p>
                <br />
                <br />
                <br />
                <br />
                <br />
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundWalletPage;
