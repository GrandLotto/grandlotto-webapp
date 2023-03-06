import React from "react";
import Lotto from "../../assets/images/lotto.png";
import pool from "../../assets/images/pool.png";
import Seven790 from "../../assets/images/790.png";
import franceLotto1 from "../../assets/images/france-lotto1.png";
import franceLotto2 from "../../assets/images/france-lotto2.png";

import "./banner.scss";

const HomeBanner = () => {
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
          <button className="grandLottoButton button-outline-trans">
            Redeem Winning
          </button>
          <button className="grandLottoButton">Play Now</button>
        </div>
        <div className="homeBannerWrraperImages">
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
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
