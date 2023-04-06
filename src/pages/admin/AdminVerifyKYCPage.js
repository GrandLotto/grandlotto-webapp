import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import "../../components/dashboard/dashboard.scss";
import Transactions from "../../components/transaction/Transactions";

const AdminVerifyKYCPage = () => {
  // console.log(userWithdrawalTotalPages);

  const columns = [
    {
      name: "#",
    },
    {
      name: "Name",
    },
    {
      name: "Email",
    },
    {
      name: "Doc URL",
    },
    {
      name: "Date/Time",
    },
    {
      name: "Status",
    },

    {
      name: "Action",
    },
  ];

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
            <h5 className="site_title">Verify KYC</h5>
          </div>

          <div className="mt-5">
            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
                <div className="card">
                  <Transactions
                    columns={columns}
                    data={[]}
                    page={1}
                    totalPages={2}
                    type="ADMIN"
                    isLoading={false}
                    nextP={() => {}}
                    PrevP={() => {}}
                    fetchByPage={() => {}}
                    columnSpan={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminVerifyKYCPage;
