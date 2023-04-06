import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../../components/users/UsersTable";

const AdminCreateGames = () => {
  // const dispatch = useDispatch();

  const columns = [
    {
      name: "Type",
    },
    {
      name: "Min",
    },
    {
      name: "Max",
    },

    {
      name: "Created on",
    },
    {
      name: "Credit Line",
    },
    {
      name: "Max Number Count",
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
    <div className="pages">
      <div className="pages_mobile_dark">
        <div className="d-flex justify-content-between pages_header">
          <h5 className="site_title">{"Games > Create game"}</h5>
        </div>
        <div className="d-flex justify-content-end paddRightSmall">
          <div
            className="d-flex align-items-center mb-4"
            style={{ columnGap: 10 }}
          >
            <button className="grandLottoButton filterButton">Create</button>
          </div>
        </div>

        <div className="mt-5 w_inner">
          <div className="card mb-4">
            <UsersTable
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
              noDataText="No game created"
            />
          </div>

          {/* <div className="card mb-4">
            <div className="grandlotto_card">
              <form className="grandlotto_form mt-4">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Type</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Game type"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Min Amount</label>
                      <div className={`symbolInput`}>
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={amount}
                          decimalsLimit={2}
                          onValueChange={(value) => setAmount(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Max Amount</label>
                      <div className={`symbolInput`}>
                        <span>₦</span>
                        <CurrencyInput
                          name="input-name"
                          placeholder="Enter Amount "
                          defaultValue={amount}
                          decimalsLimit={2}
                          onValueChange={(value) => setAmount(value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Credit Line</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Credit Line"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="form-group">
                      <label htmlFor="">Max Number count</label>
                      <input
                        className="form-control largeInputFont py-3"
                        placeholder="Max Number count"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right mb-3">
                  <div className="text-right">
                    <button
                      disabled={emptyFields}
                      type="button"
                      className="grandLottoButton cardButton"
                      onClick={() => proceed()}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminCreateGames;
