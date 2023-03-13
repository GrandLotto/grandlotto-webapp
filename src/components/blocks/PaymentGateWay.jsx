import React, { useState } from "react";

import paystack from "../../assets/images/paystack.png";
import Providus from "../../assets/images/Providus.png";
import opay from "../../assets/images/opay.png";
import { useSelector } from "react-redux";

const PaymentGateWay = ({ selectedGateWay, handleSelectGateWay }) => {
  const acceptedpayment = useSelector((state) => state.wallet.acceptedpayment);
  const user = useSelector((state) => state.oauth.user);

  const gateways = [
    {
      id: 1,
      name: "Paystack",
      logo: paystack,
    },
    {
      id: 2,
      name: "Providus",
      logo: Providus,
    },
    // {
    //   id: 3,
    //   name: "Opay",
    //   logo: opay,
    // },
  ];

  return (
    <div className="paymentGateWay text-center">
      <h5>Select payment gateway</h5>

      <div className="paymentGateWayGrid text-center">
        {acceptedpayment
          ? acceptedpayment
              ?.filter((ite) => ite?.isAvailable === true)
              ?.map((item, index) => (
                <div
                  key={index}
                  className={`paymentGateWayGridItem   ${
                    selectedGateWay?.id === item?.id ? "selectedGateway" : ""
                  }`}
                  onClick={() => handleSelectGateWay(item)}
                >
                  {selectedGateWay?.id === item?.id ? (
                    <div className="selectedIcon">
                      {" "}
                      <i className="bx bx-check-circle"></i>{" "}
                    </div>
                  ) : null}

                  {item?.name === "Paystack" && (
                    <img src={paystack} alt="grand-logo" />
                  )}
                  {item?.name === "Providus" && (
                    <img src={Providus} alt="grand-logo" />
                  )}

                  {/* <h6>{item?.name}</h6> */}
                </div>
              ))
          : null}
      </div>
    </div>
  );
};

export default PaymentGateWay;
