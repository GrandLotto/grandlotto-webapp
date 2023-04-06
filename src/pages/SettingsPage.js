import React, { useEffect } from "react";
import ChangePassword from "../components/settings/ChangePassword";
import TransactionPin from "../components/settings/TransactionPin";

const SettingsPage = () => {
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
            <h5 className="site_title">Settings</h5>
          </div>

          <div className="mt-5">
            <div className="grandlotto_tabs text-center">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Wallet-tab"
                  >
                    Transaction Pin
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Withdrawable-tab"
                  >
                    Change Passwords
                  </a>
                </li>
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card text-center">
                  <TransactionPin />
                </div>
              </div>
              <div className="tab-pane" id="Withdrawable-tab">
                <div className="card">
                  <ChangePassword />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
