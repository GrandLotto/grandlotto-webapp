import React, { useEffect } from "react";
import person from "../assets/images/person.png";

const Profile = () => {
  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="pages">
      <div className="pages_mobile_dark">
        <div className="card border-0">
          <div className="card-body mt-2">
            <h5 className="site_title">Update Profile</h5>

            <p>
              Please fill the form below to setup your profile
              information.Kindly note that your name must match your bank
              account name.
            </p>

            <div className="mt-5">
              <div className="d-flex align-items-center d-smm-block sm-text-center profile_center ">
                <img
                  src={person}
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                  alt="grand-logo"
                />

                <div className="ml-5 mt-sm-3">
                  <button className="grandLottoButton grandLottoButtonLightGreen">
                    Change profile picture
                  </button>
                </div>
              </div>
            </div>
            <form className="grandlotto_form mt-5">
              <div className="row mb-3">
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">First Name</label>

                    <input
                      className="form-control py-3"
                      placeholder="First Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Last Name</label>

                    <input
                      className="form-control py-3"
                      placeholder="Last Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Email</label>

                    <input
                      className="form-control py-3"
                      placeholder="Email"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Phone Number</label>

                    <input
                      className="form-control py-3"
                      placeholder="Phone Number"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Date of birth</label>

                    <input
                      className="form-control py-3"
                      type="date"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Gender</label>

                    <select className="form-control " style={{ width: "100%" }}>
                      <option value="" disabled>
                        Select Gendar
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-4">
                  <button className="grandLottoButton">Submit</button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
