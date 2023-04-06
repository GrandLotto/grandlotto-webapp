import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLogoutModal } from "../../store/alert/alertSlice";

const HeaderDropDownBlock = () => {
  const dispatch = useDispatch();

  // const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);

  return (
    <div className="header_top_dropDown">
      <div className="header_top_dropDown_card">
        <p>
          <Link to="/account/profile" className="has_link">
            View profile
          </Link>
        </p>
        <p>
          <Link to="/account/fund-wallet" className="has_link">
            Deposit Funds
          </Link>
        </p>
        <p>
          <Link to="/account/transactions" className="has_link">
            Transaction history
          </Link>
        </p>
        <p>
          <Link to="/lotto" className="has_link">
            Lotto
          </Link>
        </p>
        <p>
          {/* <a href="wg3gfg4" className="has_link">
            Bet history
          </a> */}

          <Link to="/account/bet-history" className="has_link">
            Bet history
          </Link>
        </p>
        <p>
          <Link to="/results" className="has_link">
            Draw Results
          </Link>
        </p>
        <p>
          <a
            href="true"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                setLogoutModal({
                  status: true,
                  payload: null,
                })
              );
            }}
            className="has_link"
          >
            Logout
          </a>
        </p>
      </div>
    </div>
  );
};

export default HeaderDropDownBlock;
