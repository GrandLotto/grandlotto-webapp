import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../../components/users/UsersTable";

const AdminUserAccountPage = () => {
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
      name: "Created on",
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
            <h5 className="site_title">User Controls</h5>
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
                    Activate/Deactiactivate User
                  </a>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#Bonus-tab">
                    Search users
                  </a>
                </li> */}
              </ul>
            </div>

            <div className="tab-content padding-0 border-0">
              <div className="tab-pane active" id="Wallet-tab">
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
                  />
                </div>
              </div>
              <div className="tab-pane" id="Bonus-tab">
                <div className="card mb-4">
                  <form className="grandlotto_form mt-5">
                    <div className="row">
                      <div className="col-md-6 mx-auto">
                        <div className="form-group">
                          <label htmlFor="">User Email</label>
                          <input
                            className="form-control py-3"
                            placeholder="Email for search"
                            type="text"
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserAccountPage;
