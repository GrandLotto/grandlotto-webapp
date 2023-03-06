import React from "react";

const ConfirmBlock = ({ title, status }) => {
  return (
    <div className="confirmBlock">
      <div>
        {status ? (
          <i className="bx bx-check success_b"></i>
        ) : (
          <i className="bx bx-error-alt error_b"></i>
        )}
      </div>
      <h4>{title}</h4>
    </div>
  );
};

export default ConfirmBlock;
