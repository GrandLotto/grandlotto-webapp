import React from "react";

const ComponentLoading = ({ title = "Please wait ..." }) => {
  return (
    <div className="componentLoading">
      <div className="componentLoading_wrapper">
        <div className="componentLoading_loader">
          <div className="componentLoading_loader loader-inner"></div>
        </div>
      </div>
      <p>{title}</p>
    </div>
  );
};

export default ComponentLoading;
