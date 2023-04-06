import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nigerianBanks } from "../../global/banks/banks";
import { sortArrayByname } from "../../global/customFunctions";
import { setNotiicationModal } from "../../store/alert/alertSlice";

const NotiicationModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.alert.notiicationModal);

  const [allBanks] = useState(sortArrayByname(nigerianBanks()));
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const closeModal = () => {
    dispatch(setNotiicationModal(false));
  };

  return (
    modal && (
      <div className="select_modals higherModal">
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
              <h5>Notifications</h5>
            </div>
          </div>
          <div className="select_modals_body"></div>
        </div>
      </div>
    )
  );
};

export default NotiicationModal;
