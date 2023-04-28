/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import person from "../assets/images/default.png";
import { UPDATE_USERINFO_URL } from "../config/urlConfigs";
// import { getAge, removeTimeZone } from "../global/customFunctions";
import { handlePOSTRequest } from "../rest/apiRest";
import { setAlertPopUp, setPageLoading } from "../store/alert/alertSlice";
import { getUserInfo } from "../store/authSlice/actions";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const [dob, setDob] = useState("");
  // const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);

  // const [dobError, setDobError] = useState("");

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [photo, setPhoto] = useState(person);

  const imageRef = useRef(null);

  const triggerInput = () => {
    imageRef.current.click();
  };

  const changeProfileImage = (event) => {
    if (event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (event) {
        setPhoto(event.target.result);
      };

      setUploadedPhoto(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      // console.log(user);
      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setPhone(user?.phoneNumber);
      // setGender(user?.gender);
      setPhoto(user?.photo || person);
      // setDob(user?.dateOfBirth ? removeTimeZone(user?.dateOfBirth) : "");
    }
  }, [user]);

  useEffect(() => {
    validateForm();
  }, [email, firstName, lastName, phone, address, emptyFields]);

  const validateForm = () => {
    if (!firstName) {
      setEmptyFields(true);
      return false;
    }

    if (!lastName) {
      setEmptyFields(true);
      return false;
    }

    if (!email) {
      setEmptyFields(true);
      return false;
    }

    if (!phone) {
      setEmptyFields(true);
      return false;
    }

    // if (!dob) {
    //   setEmptyFields(true);
    //   return false;
    // }

    // if (dob) {
    //   let enteredDate = getAge(dob);

    //   if (enteredDate < 18) {
    //     setDobError("Must be 18 years and above");
    //     setEmptyFields(true);
    //     return false;
    //   }
    // }

    // setDobError("");

    // if (!gender) {
    //   setEmptyFields(true);
    //   return false;
    // }

    if (!address) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    var fd = new FormData();

    fd.append("Email", email);
    fd.append("UserCode", user.code);
    fd.append("BVN", user?.bvn || "");
    fd.append("HomeAddress", address);
    fd.append("PhoneNumber", phone);
    fd.append("ReferredBy", user?.referredBy);
    fd.append("Country", user?.country);
    // fd.append("Gender", gender);
    // fd.append("DateOfBirth", dob);
    fd.append("FirstName", firstName);
    fd.append("LastName", lastName);
    fd.append("MiddleName", user?.middleName);
    fd.append("PhotoFile", uploadedPhoto);
    fd.append("IdCardFile", null);

    handlePOSTRequest(UPDATE_USERINFO_URL, fd)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        // console.log(response);
        if (response?.data?.success) {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "SUCCESS",
              title: "Successful",
              desc: response?.data?.message,
              payload: null,
            })
          );

          dispatch(getUserInfo(user?.email));
        } else {
          dispatch(
            setAlertPopUp({
              status: true,
              type: "ERROR",
              title: "Error",
              desc: response?.data?.message,
              payload: null,
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
      });
  };

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
                  src={photo}
                  onError={(e) => {
                    e.currentTarget.src = person;
                  }}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  alt={user?.firstName}
                />

                <input
                  type="file"
                  ref={imageRef}
                  style={{ display: "none" }}
                  onChange={changeProfileImage}
                  accept="image/png, image/gif, image/jpeg"
                />

                <div className="ml-5 mt-sm-3">
                  <button
                    type="button"
                    onClick={() => triggerInput()}
                    className="grandLottoButton grandLottoButtonLightGreen"
                  >
                    Change profile picture
                  </button>
                </div>
              </div>
            </div>
            <form className="grandlotto_form mt-5">
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">First Name</label>

                    <input
                      disabled
                      value={firstName}
                      className="form-control py-3"
                      placeholder="First Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Last Name</label>

                    <input
                      value={lastName}
                      disabled
                      className="form-control py-3"
                      placeholder="Last Name"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Email</label>

                    <input
                      value={email}
                      disabled
                      className="form-control py-3"
                      placeholder="Email"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Phone Number</label>

                    <input
                      disabled
                      value={phone}
                      className="form-control py-3"
                      placeholder="Phone Number"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Date of birth</label>

                    <input
                      onChange={(e) => setDob(e.target.value)}
                      value={dob}
                      className="form-control py-3"
                      type="date"
                      style={{ width: "100%" }}
                    />

                    {dobError && (
                      <p className="inputError text-danger">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="10"
                          viewBox="0 0 20 20"
                          role="presentation"
                          focusable="false"
                          tabIndex="-1"
                          fill="red"
                        >
                          <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                        </svg>
                        <span className="ml-2">{dobError}</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Gender</label>

                    <select
                      className="form-control "
                      style={{ width: "100%" }}
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="" disabled>
                        Select Gendar
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="row mb-3">
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">Address</label>

                    <input
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="form-control py-3"
                      placeholder="your home address"
                      type="text"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-4">
                  <button
                    disabled={emptyFields}
                    type="button"
                    onClick={() => proceed()}
                    className="grandLottoButton"
                  >
                    Submit
                  </button>
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
