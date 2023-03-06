import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";
import { setAddBankModal } from "../../store/alert/alertSlice";

const AddBankModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.addBankModal);

  const [allBanks] = useState(sortArrayByname(nigerianBanks()));
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const closeModal = () => {
    dispatch(setAddBankModal(false));
  };

  return (
    modal && (
      <div className="select_modals">
        <div
          className="select_modals_overlay"
          onClick={() => closeModal()}
        ></div>
        <div className="select_modals_cards">
          <div className="select-modal-header">
            <div className="d-flex align-items-center">
              <i
                className="bx bx-chevron-left"
                onClick={() => closeModal()}
              ></i>
              <h5>Add Bank</h5>
            </div>
          </div>
          <div className="select_modals_body">
            <form className="grandlotto_form  p-0">
              <div className="row mb-3">
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Select Bank <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      style={{ width: "100%" }}
                      className="form-control"
                      onChange={(e) => setSelectedBank(e.target.value)}
                    >
                      <option value="">Select bank</option>

                      {allBanks &&
                        allBanks?.map((item, index) => (
                          <option key={index} value={item}>
                            {item?.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Account Number <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      onChange={(e) => setAccountNumber(e.target.value)}
                      value={accountNumber}
                      className="form-control py-3"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="form-group" style={{ width: "100%" }}>
                    <label>
                      Account Name <span style={{ color: "red" }}>*</span>
                    </label>

                    <input
                      type="text"
                      onChange={(e) => setAccountName(e.target.value)}
                      value={accountName}
                      className="form-control py-3"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-2">
                <button
                  style={{ width: "100%" }}
                  type="button"
                  className="grandLottoButton cardButton"
                  onClick={() => handlePay()}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default AddBankModal;
