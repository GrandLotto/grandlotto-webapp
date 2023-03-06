import React, { useEffect, useState } from "react";
import "../components/dashboard/dashboard.scss";
import Dropzone from "react-dropzone";
import ComponentLoading from "../components/blocks/ComponentLoading";

const KYCPage = () => {
  const [focusedDiv, setfocusedDiv] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

                    <select className="form-control " style={{ width: "100%" }}>
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="male">Driver's License</option>
                      <option value="female">Voter's card</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label htmlFor="">ID Number</label>
                    <input
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

export default KYCPage;
