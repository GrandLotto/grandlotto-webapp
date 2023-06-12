import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { bodyScrollTop } from "../global/customFunctions";
// import { useDispatch } from "react-redux";
// import promo from "../assets/images/promo7.png";

const Contacts = () => {
  // const dispatch = useDispatch();
  let location = useLocation();

  useLayoutEffect(() => {
    bodyScrollTop();
  }, [location]);

  return (
    <div className="oauthHasWeight">
      <div className="row">
        <div className="col-md-7 mx-auto p-3 mb-5">
          <h3>Contacts Us</h3>
          {/* <div style={{ width: "100%" }}>
            <img src={promo} alt="grand-logo" />
          </div> */}
          <div className="mt-5">
            <h5>We’re here for you.</h5>
            <p className="mt-4">
              Connect with a customer service agent on the channel most
              convenient for you:
            </p>
            <h6 className="mt-4">
              <i>
                When sending us a message, please include your full name and
                your GrandLotto Username or Account ID.
              </i>
            </h6>
            <p className="mt-4">
              Opening Hours: <b>24/7 (Monday through Sunday)</b>
            </p>
          </div>
          <br />
          <br />
          <div className="mt-4">
            <a
              className="mb-4 d-flex align-items-center text-light"
              target="_blank"
              href="https://www.facebook.com/grandlotto?mibextid=ZbWKwL"
              style={{ columnGap: 10 }}
              rel="noreferrer"
            >
              <i
                className="bx bxl-facebook-circle"
                style={{ fontSize: 39 }}
              ></i>

              <span>Grandlotto</span>
            </a>
            <a
              className="mb-4 d-flex align-items-center text-light"
              target="_blank"
              href="https://twitter.com/_grandlotto?t=rKHX5y1EWsYAL-jv8-_BWQ&s=09"
              style={{ columnGap: 10 }}
              rel="noreferrer"
            >
              <i
                className="bx bxl-twitter"
                style={{ fontSize: 39, color: "#1D9BF0" }}
              ></i>
              <span>@_grandlotto</span>
            </a>
            <a
              className="mb-4 d-flex align-items-center text-light"
              target="_blank"
              href="https://instagram.com/grandlotto.ng?igshid=MzNlNGNkZWQ4Mg=="
              style={{ columnGap: 10 }}
              rel="noreferrer"
            >
              <i
                className="bx bxl-instagram"
                style={{ fontSize: 39, color: "#CB2E97" }}
              ></i>
              <span>@grandlottogames</span>
            </a>
            <a
              className="mb-4 d-flex align-items-center text-light"
              target="_blank"
              href="https://www.youtube.com/channel/UCtdwh4Y2M-Tbd3uJsutxrHw"
              style={{ columnGap: 10 }}
              rel="noreferrer"
            >
              <i
                className="bx bxl-youtube"
                style={{ fontSize: 39, color: "red" }}
              ></i>

              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
