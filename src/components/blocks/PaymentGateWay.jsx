import React, { useState } from "react";

import paystack from "../../assets/images/paystack.png";
import flutterwave from "../../assets/images/flutterwave.png";
import opay from "../../assets/images/opay.png";

const PaymentGateWay = ({ selectedGateWay, handleSelectGateWay }) => {
  const gateways = [
    {
      id: 1,
      name: "Paystack",
      logo: paystack,
    },
    {
      id: 2,
      name: "Flutterwave",
      logo: flutterwave,
    },
    {
      id: 3,
      name: "Opay",
      logo: opay,
    },
  ];

  return (
    <div className="paymentGateWay">
      <h5>Select payment gateway</h5>

      <div className="paymentGateWayGrid">
        {gateways &&
          gateways?.map((item, index) => (
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

              <img src={item?.logo} alt="grand-logo" />
              <h6>{item?.name}</h6>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentGateWay;
