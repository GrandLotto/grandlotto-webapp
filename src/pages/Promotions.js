import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { bodyScrollTop } from "../global/customFunctions";
// import { useDispatch } from "react-redux";
import promo from "../assets/images/promotion.png";
import promo1 from "../assets/images/promo1.png";

const Promotions = () => {
  // const dispatch = useDispatch();
  let location = useLocation();

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  return (
    <div className="oauthHasWeight">
      <div className="row">
        <div className="col-md-7 p-4 mx-auto mb-5">
          {/* <h3>Promotions</h3> */}
          <div style={{ width: "100%" }}>
            <img src={promo} alt="grand-logo" />
          </div>

          <div className="text-center mt-5">No Promotions available</div>
          <div className="mt-5" style={{ width: "100%" }}>
            <img src={promo1} alt="grand-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
