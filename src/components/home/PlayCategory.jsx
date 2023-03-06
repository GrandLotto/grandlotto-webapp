import React from "react";
import Lotto from "../../assets/images/lotto.png";
import pool from "../../assets/images/pool.png";
import Seven790 from "../../assets/images/790.png";

const PlayCategory = () => {
  return (
    <div className="playCategory">
      <p>Instant Play</p>
      <div className="playCategoryGrid">
        <div className="playCategoryItem">
          <img src={Lotto} alt="grand-logo" />
          <div>
            <h5>Play Lotto</h5>
          </div>
          <i className="bx bx-right-arrow-circle"></i>
        </div>
        <div className="playCategoryItem">
          <img src={pool} alt="grand-logo" />
          <div>
            <h5>Pool</h5>
          </div>
          <i className="bx bx-right-arrow-circle"></i>
        </div>
        <div className="playCategoryItem">
          <img src={Seven790} alt="grand-logo" />
          <div>
            <h5>7/90</h5>
          </div>
          <i className="bx bx-right-arrow-circle"></i>
        </div>
      </div>
    </div>
  );
};

export default PlayCategory;
