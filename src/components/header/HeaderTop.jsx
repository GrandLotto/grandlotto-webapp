import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/images/grandlotto.png";
import person from "../../assets/images/person.png";
import { setMobileMenu, setSideBarMenu } from "../../store/alert/alertSlice";
import TopSearch from "../blocks/TopSearch";

const HeaderTop = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);
  const sideBarMenu = useSelector((state) => state.alert.sideBarMenu);

  const [showDropDown, setshowDropDown] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const toggleDropDown = (val) => {
    setTimeout(() => {
      val === false ? setshowDropDown(val) : setshowDropDown(!showDropDown);
    }, 200);
  };

  window.addEventListener("click", (e) => {
    const dropDown = document.querySelector(".header_top_dropDown");
    if (dropDown)
      if (!e.composedPath().includes(dropDown)) toggleDropDown(false);
  });

  const navigateBack = () => {
    if (sideBarMenu) {
      dispatch(setSideBarMenu(false));

      return;
    }
    navigation(-1);
  };

  useEffect(() => {
    if (location) {
      toggleDropDown(false);
      dispatch(setSideBarMenu(false));
      dispatch(setMobileMenu(false));
      setCurrentLocation(location?.pathname);

      console.log(currentLocation);
    }
  }, [location]);

  return (
    <div className="headerTop">
      <div className="headerTopFlex">
        <div className="headerTopLeft">
          <h4 className="hideOnMobile">Welcome, David</h4>
          <p className="hideOnMobile">ID: 3542453995</p>
          {(sideBarMenu || currentLocation !== "/account/dashboard") && (
            <i
              className="bx bx-left-arrow-alt showOnMobile"
              onClick={() => navigateBack()}
            ></i>
          )}
        </div>
        <div className="headerTopMiddle">
          <TopSearch />

          <div className="showOnMobile">
            <a className="topHeaderLogo">
              <img src={Logo} alt="grand-logo" />
            </a>
          </div>
        </div>
        <div className="headerTopRight">
          <div className="topHeaderRightLoggedIn">
            <div className="topHeaderRightLoggedInBalance">
              <p style={{ textAlign: "left" }}>Balance</p>
              <h5>₦20,000.00</h5>
            </div>
            <div className="topHeaderRightLoggedInNotification hideOnMobile">
              <i className="bx bx-bell"></i>
            </div>

            <div
              className="topHeaderRightLoggedInImage hideOnMobile"
              onClick={() => toggleDropDown(true)}
            >
              <img src={person} alt="grand-logo" />
              <i className="bx bx-chevron-down"></i>
            </div>
            {showDropDown ? (
              <div className="header_top_dropDown">
                <div className="header_top_dropDown_card">
                  <p>
                    <Link to="/account/profile" className="has_link">
                      View profile
                    </Link>
                  </p>
                  <p>
                    <a href="erwqfe" className="has_link">
                      Deposit Funds
                    </a>
                  </p>
                  <p>
                    <a href="rfwrg" className="has_link">
                      Transaction history
                    </a>
                  </p>
                  <p>
                    <a href="wg3gfg4" className="has_link">
                      Bet history
                    </a>
                  </p>
                  <p>
                    <a href="w3tg54g" className="has_link">
                      Draw Results
                    </a>
                  </p>
                  {/* <p>
                    <a href="tgw3t54tg" className="has_link">
                      Logout
                    </a>
                  </p> */}
                </div>
              </div>
            ) : null}
            <div className="hideOnMobile">
              <div
                className="hamburgar "
                onClick={() => dispatch(setSideBarMenu(true))}
              >
                <i className="bx bx-menu"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
