/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  checkIfGameHasExpired,
  formatAMPM,
  groupBy2,
} from "../../global/customFunctions";
import {
  setAlertSmallPOPUP,
  setSelectDrawMenu,
} from "../../store/alert/alertSlice";
import {
  setCalculatedGames,
  setExpiryDate,
  setSelectedCoupons,
  setSelectedGame,
  setSelectedPlayingType,
} from "../../store/betSlice/betSlice";

const ThreeColLeft = () => {
  const dispatch = useDispatch();
  const selectDrawMenu = useSelector((state) => state.alert.selectDrawMenu);
  const games = useSelector((state) => state.bets.games);
  const gamePlayingTypes = useSelector((state) => state.bets.gamePlayingTypes);
  const selectedGame = useSelector((state) => state.bets.selectedGame);
  const selectedPlayingType = useSelector(
    (state) => state.bets.selectedPlayingType
  );

  const closeMenu = () => {
    dispatch(setSelectDrawMenu(false));
  };

  const isSelected = (item) => {
    let selected = selectedGame?.id === item?.id;

    return !!selected;
  };

  const handleTimer = (item) => {
    dispatch(setExpiryDate(null));
    setTimeout(() => {
      if (item) {
        dispatch(setExpiryDate(item?.startTime));
      }
    }, 500);
  };

  const handlePlayGame = (item) => {
    if (selectedGame) {
      if (selectedGame?.id === item?.id) {
        return;
      }
    }
    if (checkIfGameHasExpired(item?.startTime) === false) {
      console.log("selectedGame", item);
      dispatch(setSelectedGame(item));
      dispatch(setCalculatedGames(null));
      handleTimer(item);
      dispatch(setSelectedCoupons([]));
    } else {
      dispatch(
        setAlertSmallPOPUP({
          status: true,
          message: "Game Expired",
        })
      );
    }
  };

  useEffect(() => {
    if (games) {
      // console.log(groupBy2(games, "dayAvailable"));
    }
  }, [games]);

  useEffect(() => {
    if (selectedGame && selectedPlayingType) {
      dispatch(setSelectDrawMenu(false));
    }
  }, [selectedPlayingType, selectedGame]);

  return (
    <div className={`threeColLeft  ${selectDrawMenu ? "showMenu" : ""}`}>
      <div className="threeColLeftWrapper">
        <div className="threeColLeftWrapperClose" onClick={() => closeMenu()}>
          <i className="bx bx-x "></i>
        </div>
        {games && games?.length ? (
          <>
            <div className="betSlips">
              <div className="betSlipsMash mb-3">
                <label htmlFor=" ">Playing type</label>
                <select
                  style={{ width: "100%" }}
                  className="form-control largeInputFont"
                  onChange={(e) => {
                    dispatch(setSelectedPlayingType(e.target.value));
                    dispatch(setCalculatedGames(null));

                    //  setSelectedLotto(newItem)
                  }}
                  value={selectedPlayingType}
                >
                  <option value="">Select...</option>
                  {gamePlayingTypes && gamePlayingTypes?.length
                    ? gamePlayingTypes?.map((item, index) => (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>

              <div className="betSlipsHeader">
                <h4>Select a draw</h4>
              </div>
              <div className="betSlipsBody"></div>
            </div>
          </>
        ) : null}

        <div className="open_roles">
          <div className="open_roles_grid">
            {games && games?.length ? (
              groupBy2(games)?.map((item, index) => (
                <div className="open_roles_grid_item" key={index}>
                  <div className={`open_roles_grid_item_header `}>
                    <h5>{item?.date}</h5>
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <div className={`open_roles_grid_item_body `}>
                    {item?.games &&
                      item?.games?.map((newItem, index2) => (
                        <div
                          className={`open_body_contents ${
                            isSelected(newItem) === true ? "buttonActive" : ""
                          }`}
                          key={index2}
                          onClick={() => {
                            handlePlayGame(newItem);
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="open_body_contents_left">
                              <div className="d-flex justify-content-between align-items-center">
                                <h5>{newItem?.name}</h5>
                              </div>
                            </div>
                            <div className="open_body_contents_right">
                              <p>BETTING CLOSES</p>
                              {checkIfGameHasExpired(newItem?.startTime) ===
                              true ? (
                                <h5>
                                  <span className="badge badge-danger">
                                    Expired
                                  </span>
                                </h5>
                              ) : (
                                <h5>{formatAMPM(newItem?.startTime)}</h5>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="d-block selectLottoNumb mt-5 text-center">
                  <p>No avaialable game</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeColLeft;
