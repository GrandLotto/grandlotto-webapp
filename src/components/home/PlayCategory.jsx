import React from "react";
import Lotto from "../../assets/images/lotto.png";
// import pool from "../../assets/images/pool.png";
// import Seven790 from "../../assets/images/790.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedGameGroup } from "../../store/betSlice/betSlice";
import { getgames, getgamestype } from "../../store/betSlice/actions";

const PlayCategory = () => {
  const gamesgroup = useSelector((state) => state.bets.gamesgroup);

  console.log("gamesgroup", gamesgroup);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSelectGameGroup = (game) => {
    dispatch(setSelectedGameGroup(game));
    dispatch(getgames(game?.id));
    dispatch(getgamestype(game?.id));

    setTimeout(() => {
      navigation("/lotto");
    }, 600);
  };

  return (
    <div className="playCategory">
      <p>Instant Play</p>
      <div className="playCategoryGrid">
        {gamesgroup &&
          gamesgroup?.map((item, index) => (
            <div
              key={index}
              className="playCategoryItem"
              onClick={() => handleSelectGameGroup(item)}
            >
              <img src={Lotto} alt="grand-logo" />
              <div>
                <h5>{item?.name}</h5>
              </div>
              {/* <i className="bx bx-right-arrow-circle"></i> */}

              <div className="text-center mt-5">
                <button type="button" className="grandLottoButton">
                  Play
                </button>
              </div>
            </div>
          ))}

        {/* <div className="playCategoryItem" onClick={() => navigation("/lotto")}>
          <img src={Lotto} alt="grand-logo" />
          <div>
            <h5>Play Lotto</h5>
          </div>
          <div className="text-center mt-5">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div>
        <div
          className="playCategoryItem"
          onClick={() => {
            dispatch(setComingSoonModal(true));
          }}
        >
          <img src={pool} alt="grand-logo" />
          <div>
            <h5>Pool</h5>
          </div>
          <div className="text-center mt-5 ">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div>
        <div
          className="playCategoryItem"
          onClick={() => {
            dispatch(setComingSoonModal(true));
          }}
        >
          <img src={Seven790} alt="grand-logo" />
          <div>
            <h5>7/90</h5>
          </div>
        
          <div className="text-center mt-5">
            <button type="button" className="grandLottoButton">
              Play
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PlayCategory;
