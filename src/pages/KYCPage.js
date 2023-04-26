/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoading from "../components/blocks/ComponentLoading";
import ConfirmBlock from "../components/blocks/ConfirmBlock";
import { UPDATE_USERIDENTITY_URL } from "../config/urlConfigs";
import { handlePOSTRequest } from "../rest/apiRest";
import { setAlertPopUp, setPageLoading } from "../store/alert/alertSlice";
import { getUserInfo } from "../store/authSlice/actions";
import { setRefreshing } from "../store/authSlice/authSlice";

const KYCPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const acceptedIDType = useSelector((state) => state.oauth.acceptedIDType);

  const [focusedDiv, setfocusedDiv] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIDType, setSelectedIDType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [emptyFields, setEmptyFields] = useState(true);
  const [reSubmit, setReSubmit] = useState(false);

  const resetFields = () => {
    setfocusedDiv(false);
    setSelectedFile(null);
    setIsLoading(false);
    setSelectedIDType("");
    setIdNumber("");
    setEmptyFields(true);
    setReSubmit(false);
  };

  const handleFileDroped = (file) => {
    setIsLoading(true);
    console.log("file", file);
    setTimeout(() => {
      setIsLoading(false);
      setfocusedDiv(false);

      if (file && file?.length) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        alert("Invalid file type");
      }
    }, 1000);
  };

  const accept = {
    "image/jpeg": [],
    "image/jpg": [],
    "image/png": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
    "application/pdf": [],
  };

  useEffect(() => {
    validateForm();
  }, [selectedFile, selectedIDType, idNumber, emptyFields]);

  const validateForm = () => {
    if (!selectedFile) {
      setEmptyFields(true);
      return false;
    }

    if (!selectedIDType) {
      setEmptyFields(true);
      return false;
    }

    if (!idNumber) {
      setEmptyFields(true);
      return false;
    }

    setEmptyFields(false);
  };

  const seSubmitKyc = () => {
    setReSubmit(true);
  };

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    var fd = new FormData();

    fd.append("Email", user?.email);
    fd.append("Idname", selectedIDType);
    fd.append("IdNumber", idNumber);
    fd.append("Idfile", selectedFile);

    // console.log(selectedFile);

    handlePOSTRequest(UPDATE_USERIDENTITY_URL, fd)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        // console.log(response);
        if (response?.data?.success) {
          dispatch(setRefreshing(true));
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
          resetFields();
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

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="pages">
      {isLoading && <ComponentLoading title="Please wait ..." />}
      <div className="pages_mobile_dark">
        <div className="card border-0">
          {(user?.kycverification == null || reSubmit === true) && (
            <div className="card-body mt-2">
              <h5 className="site_title">KYC Update</h5>

              <p>
                Uploading your KYC documents is very essential so as to remove
                the limitations in withdrawing funds to your accounts.
              </p>

              <p className="inputError " style={{ color: "#ce6b02" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  role="presentation"
                  focusable="false"
                  tabIndex="-1"
                  fill="#ce6b02"
                >
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                </svg>
                <span className="ml-2">
                  <b>NOTE: </b>
                </span>
                <span style={{ fontSize: 13 }} className="ml-2 d-block pr-2">
                  The name on your kyc document must match with your bank
                  account name
                </span>
              </p>

              <form className="grandlotto_form mt-5">
                <div className="row mb-3">
                  <div className="col-md-4 mb-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">ID Type</label>

                      <select
                        className="form-control "
                        style={{ width: "100%" }}
                        onChange={(e) => setSelectedIDType(e.target.value)}
                        value={selectedIDType}
                      >
                        <option value="" disabled>
                          Select
                        </option>

                        {acceptedIDType &&
                          acceptedIDType?.map((item, index) => (
                            <option key={index} value={item?.name}>
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label htmlFor="">ID Number</label>
                      <input
                        onChange={(e) => setIdNumber(e.target.value)}
                        value={idNumber}
                        className="form-control py-3"
                        placeholder="ID Number"
                        type="text"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="">Upload file</label>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleFileDroped(acceptedFiles);
                      }}
                      onDragEnter={() => {
                        setfocusedDiv(true);
                      }}
                      onDragLeave={() => {
                        setfocusedDiv(false);
                      }}
                      maxSize={5000000}
                      accept={accept}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section
                          className={`dragdropDiv ${
                            focusedDiv ? "isFocusedd" : ""
                          }`}
                        >
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag file here or browse</p>

                            <small className="upFile">
                              Max. File Size: 5MB
                            </small>

                            {selectedFile && (
                              <small className="upFile mt-3">
                                <b>
                                  {selectedFile[0]?.type +
                                    "/" +
                                    selectedFile[0]?.name}
                                </b>
                              </small>
                            )}
                          </div>
                        </section>
                      )}
                    </Dropzone>
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
          )}

          {user?.kycverification &&
            user?.kycverification?.toLowerCase() === "pending" &&
            reSubmit === false && (
              <div className="card-body mt-2">
                <h5 className="site_title">KYC Update</h5>
                <br />
                <br />
                <div className="text-center mb-5 mt-5">
                  <ConfirmBlock
                    title={"Verification is Pending"}
                    des={
                      "We are currently reviewing your kyc. Please wait while we verify your documents"
                    }
                    status={"pending"}
                  />
                  <br />
                  <br />

                  <div className="d-flex align-items-center justify-content-center mt-5 mb-3"></div>

                  <br />
                </div>
              </div>
            )}

          {user?.kycverification &&
            user?.kycverification?.toLowerCase() === "approved" &&
            reSubmit === false && (
              <div className="card-body mt-2">
                <h5 className="site_title">KYC Update</h5>
                <br />
                <br />
                <div className="text-center mb-5 mt-5">
                  <ConfirmBlock
                    title={"KYC Verified"}
                    des={
                      "Congratulations!! your kyc verification has successfully been approved"
                    }
                    status={true}
                  />
                  <br />
                  <br />

                  <div className="d-flex align-items-center justify-content-center mt-5 mb-3"></div>

                  <br />
                </div>
              </div>
            )}

          {user?.kycverification &&
            user?.kycverification?.toLowerCase() === "declined" &&
            reSubmit === false && (
              <div className="card-body mt-2">
                <h5 className="site_title">KYC Update</h5>
                <br />
                <br />
                <div className="text-center mb-5 mt-5">
                  <ConfirmBlock
                    title={"KYC Declined"}
                    des={user?.kycDeclineReason || "Please submit your kyc"}
                    status={false}
                  />
                  <br />
                  <br />

                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <button
                      className=" grandLottoButton button-outline-light border text-dark"
                      style={{ marginRight: "10px" }}
                      onClick={() => seSubmitKyc()}
                    >
                      Resubmit kyc
                    </button>
                  </div>

                  <br />
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
