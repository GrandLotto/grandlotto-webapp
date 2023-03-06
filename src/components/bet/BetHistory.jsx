import React from "react";

const BetHistory = () => {
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
                <th>Betslip ID</th>
                <th>Bet details</th>
                <th>Date/Time</th>
                <th>Status</th>
                <th>Stake</th>
                <th>Returns</th>
              </tr>
            </thead>

            {transactions && transactions?.length ? (
              <tbody>
                <tr>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                  <td>Lorem, ipsum.</td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">
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
                            You don’t have any bet records
                          </h4>

                          <button className="grandLottoButton">
                            Play Game
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

      <div className="grandlotto_table_small lotto_card">
        {transactions && transactions?.length ? (
          transactions?.map((item, index) => (
            <div className="grandlotto_table_small_flex " key={index}>
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <small>28/02/2022</small>
                <small>2:00PM</small>
              </div>
              <div className="grandlotto_table_small_flex_top">
                <div className="d-flex justify-content-between">
                  <h4 className="">
                    <b>Bet ID: 546TTGSHE56</b>
                  </h4>
                  <span className="has_status isLost">Lost</span>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Game</h4>
                  <h4 className="">
                    <b>Lotto Extra-Akwa Ibom</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Details</h4>
                  <h4 className="">
                    <b>PERM 2: 24,54,62,47,3</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Stake</h4>
                  <h4 className="">
                    <b>₦500</b>
                  </h4>
                </div>
                <div className="d-flex justify-content-between">
                  <h4 className="">Winning</h4>
                  <h4 className="">
                    <b>₦250,000</b>
                  </h4>
                </div>
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
                  You don’t have any bet records
                </h4>

                <button className="grandLottoButton">Play Game</button>
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

export default BetHistory;
