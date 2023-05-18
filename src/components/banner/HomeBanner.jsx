import React from "react";
// import Lotto from "../../assets/images/lotto.png";
// import pool from "../../assets/images/pool.png";
// import Seven790 from "../../assets/images/790.png";
import franceLotto1 from "../../assets/images/france-lotto1.png";
import franceLotto2 from "../../assets/images/france-lotto2.png";

import "./banner.scss";
import { useNavigate } from "react-router-dom";
import { setRedeemWinningModal } from "../../store/alert/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGameGroup } from "../../store/betSlice/betSlice";
import { getgames, getgamestype } from "../../store/betSlice/actions";

const HomeBanner = () => {
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSelectGameGroup = () => {
    if (gamesgroup) {
      dispatch(setSelectedGameGroup(gamesgroup[0]));
      dispatch(getgames(gamesgroup[0]?.id));
      dispatch(getgamestype(gamesgroup[0]?.id));

      setTimeout(() => {
        navigation("/lotto");
      }, 600);
    }
  };

  return (
    <div className="homeBanner">
      <div className="homeBannerAbsolueImages">
        <img src={franceLotto1} alt="grand-logo" />
        <img src={franceLotto2} alt="grand-logo" />
      </div>
      <div className="homeBannerWrraper">
        <h5>SAME GAME, SMARTER WAY</h5>
        <h3>INSTANT PAYMENT, NO STORY!</h3>

        <div className="homeBannerWrraperButtons ">
          <button
            className="grandLottoButton button-outline-trans"
            onClick={() => {
              setTimeout(() => {
                dispatch(setRedeemWinningModal(true));
              }, 200);

              navigation("/lotto");
            }}
          >
            Redeem Winning
          </button>
          <button
            className="grandLottoButton"
            onClick={() => handleSelectGameGroup()}
          >
            Play Now
          </button>
        </div>
        {/* <div className="homeBannerWrraperImages">
          <div className="homeBannerWrraperImagesItem">
            <img src={Lotto} alt="grand-logo" />
            <p>Lotto</p>
          </div>
          <div className="homeBannerWrraperImagesItem">
            <img src={pool} alt="grand-logo" />
            <p>Pool</p>
          </div>
          <div className="homeBannerWrraperImagesItem">
            <img src={Seven790} alt="grand-logo" />
            <p>7/90</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HomeBanner;
