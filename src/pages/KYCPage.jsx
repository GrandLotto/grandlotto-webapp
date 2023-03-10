import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import ComponentLoading from "../components/blocks/ComponentLoading";
import { UPDATE_USERIDENTITY_URL } from "../config/urlConfigs";
import { handlePOSTRequest } from "../rest/apiRest";
import { setAlertPopUp, setPageLoading } from "../store/alert/alertSlice";
import { getUserInfo } from "../store/authSlice/actions";

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

  const resetFields = () => {
    setfocusedDiv(false);
    setSelectedFile(null);
    setIsLoading(false);
    setSelectedIDType("");
    setIdNumber("");
    setEmptyFields(true);
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

  const proceed = () => {
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    var fd = new FormData();

    fd.append("Email", user?.email);
    fd.append("Idname", selectedIDType?.name);
    fd.append("IdNumber", idNumber);
    fd.append("Idfile", selectedFile);

    handlePOSTRequest(UPDATE_USERIDENTITY_URL, fd)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        console.log(response);
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
          <div className="card-body mt-2">
            <h5 className="site_title">KYC Update</h5>

            <p>
              Uploading your KYC documents is very essential so as to remove the
              limitations in withdrawing funds to your accounts.
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

                          <small className="upFile">Max. File Size: 5MB</small>

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
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
