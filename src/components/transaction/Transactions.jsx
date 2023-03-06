import React from "react";

const Transactions = () => {
  let transactions = [
    {
      id: 1,
      name: "book",
    },
    {
      id: 2,
      name: "book",
    },
    {
      id: 3,
      name: "book",
    },
  ];
  return (
    <>
      <div className="grandlotto_table">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Date/Time</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>

            {transactions && transactions?.length ? (
              <tbody>
                <tr>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="5">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="no_data_div">
                        <br />
                        <br />
                        <br />
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ flexDirection: "column" }}
                        >
                          <h4
                            className="mb-4"
                            style={{ fontSize: "18px", fontWeight: 500 }}
                          >
                            You don’t have any transaction history
                          </h4>

                          <button className="grandLottoButton">
                            Deposit Funds
                          </button>
                        </div>

                        <br />
                        <br />
                        <br />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="grandlotto_table_small border-top">
        {transactions && transactions?.length ? (
          transactions?.map((item, index) => (
            <div
              className="grandlotto_table_small_flex d-flex justify-content-between"
              key={index}
            >
              <div className="grandlotto_table_small_flex_left">
                <div className="d-flex">
                  <div className="fullStop error"></div>
                  <div>
                    <h4 className="">Payment ID: GT45546Y7XS</h4>
                    <p className="">28/02/2022</p>
                  </div>
                </div>
              </div>
              <div className="grandlotto_table_small_flex_right">
                <h4 className="">+₦500</h4>
                <p className="">Bal ₦500 </p>
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="no_data_div">
              <br />
              <br />
              <br />
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <h4
                  className="mb-4"
                  style={{ fontSize: "18px", fontWeight: 500 }}
                >
                  You don’t have any transaction history
                </h4>

                <button className="grandLottoButton">Deposit Funds</button>
              </div>

              <br />
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Transactions;
