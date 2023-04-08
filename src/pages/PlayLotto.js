/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  accordionTab,
  addComma,
  generateLottoNumbers,
  numbersFromOneTo90,
} from "../global/customFunctions";

import greenball from "../assets/images/greenball.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setBetAmount,
  setCalculatedGames,
  setSelectedCoupons,
  setSelectedGame,
  setSelectedPlayingType,
  setSelectedType,
} from "../store/betSlice/betSlice";
import { setSelectDrawMenu } from "../store/alert/alertSlice";

import LottoNumberBox from "../components/blocks/LottoNumberBox";
import BetAmount from "../components/blocks/BetAmount";
import BetPlayButton from "../components/blocks/BetPlayButton";
import GameSummary from "../components/blocks/GameSummary";

const PlayLotto = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const betAmount = useSelector((state) => state.bets.betAmount);
  const gameTypes = useSelector((state) => state.bets.gameTypes);
  const selectedGame = useSelector((state) => state.bets.selectedGame);
  const selectedPlayingType = useSelector(
    (state) => state.bets.selectedPlayingType
  );
  const selectedType = useSelector((state) => state.bets.selectedType);
  const calculatedGames = useSelector((state) => state.bets.calculatedGames);

  const [selectedT, setselectedT] = useState(undefined);
  const [allCoupons] = useState(numbersFromOneTo90());

  // console.log(allCoupons);

  const isSelected = (item) => {
    let selected = selectedCoupons?.find((it) => it === item);

    return !!selected;
  };

  const handlePlayType = (pay) => {
    if (pay) {
      let findType = gameTypes?.find((item) => item?.type === pay);

      if (findType) {
        console.log(findType);

        dispatch(setSelectedType(findType));
        dispatch(setSelectedCoupons([]));

        // if (selectedCoupons && selectedCoupons?.length) {
        //   let maxNumbercount = findType?.maxNumbercount;

        //   let removedCoupons = [];
        //   let allCoupons = selectedCoupons;

        //   for (let index = 0; index < maxNumbercount; index++) {
        //     removedCoupons.push(allCoupons[index]);
        //   }

        //   console.log(maxNumbercount);

        //   // let removedCoupons = allCoupons.slice(0, maxNumbercount - 1);
        //   console.log(removedCoupons);
        //   dispatch(setSelectedCoupons(removedCoupons));
        // }
      }
      dispatch(setCalculatedGames(null));
    }
  };

  const handleSelectItem = (item) => {
    // console.log(item);
    if (selectedType) {
      handlePickItem(item);
    } else {
      dispatch(setSelectedType(selectedType[0]));
      handlePickItem(item);
    }
  };

  const handlePickItem = (item) => {
    if (selectedCoupons?.length) {
      let maxNumbercount = selectedType?.maxNumbercount;

      let addedC = selectedCoupons?.find((ite) => ite === item);

      if (addedC) {
        let remove = selectedCoupons?.filter((ite) => ite !== item);
        if (remove) {
          dispatch(setSelectedCoupons(remove));
        }
      } else {
        // console.log("selectedCoupons?.length", selectedCoupons?.length);
        // console.log("maxNumbercount", maxNumbercount);

        if (selectedType?.type === "BANKER") {
          return;
        }

        if (selectedCoupons?.length >= maxNumbercount) {
          let filteredWith = "NAP2";

          if (selectedCoupons?.length === 2) {
            filteredWith = "PERM2";
          }

          if (selectedCoupons?.length === 3) {
            filteredWith = "PERM3";
          }

          if (selectedCoupons?.length === 4) {
            filteredWith = "PERM4";
          }

          if (selectedCoupons?.length === 5) {
            filteredWith = "PERM5";
          }

          let selectednewType = gameTypes?.find(
            (gameT) => gameT?.type === filteredWith
          );

          if (selectednewType) {
            if (maxNumbercount !== 10) {
              dispatch(setSelectedType(selectednewType));
            }
          }
        }

        let newC = [...selectedCoupons, item];

        dispatch(setSelectedCoupons(newC));
      }
    } else {
      dispatch(setSelectedCoupons([item]));
    }
    dispatch(setCalculatedGames(null));
  };

  const randomPick = () => {
    let filteredWith = "NAP5";
    dispatch(setSelectedCoupons(generateLottoNumbers(5, 1, 90)));
    dispatch(setCalculatedGames(null));
    dispatch(setSelectedType(null));

    let selectednewType = gameTypes?.find(
      (gameT) => gameT?.type === filteredWith
    );

    if (selectednewType) {
      dispatch(setSelectedType(selectednewType));
    }

    // console.log(allNumbers);
  };

  useEffect(() => {
    setTimeout(() => {
      // tabDropDown();
      accordionTab();
    }, 1500);
  }, []);

  useEffect(() => {
    return () => {
      let newgateType = gameTypes;
      // let newgameplayingType = gamePlayingTypes;
      dispatch(setSelectedGame(undefined));
      dispatch(setSelectedPlayingType(undefined));
      if (newgateType && newgateType?.length) {
        dispatch(setSelectedType(newgateType[0]));
      }
      dispatch(setCalculatedGames(null));
      dispatch(setSelectedCoupons([]));
      dispatch(setBetAmount(0));
    };
  }, []);

  useEffect(() => {
    if (selectedType) {
      setselectedT(selectedType?.type);
    }
  }, [selectedType]);

  useEffect(() => {
    return () => {
      document.querySelector(".oauth-wrapper") &&
        document.querySelector(".oauth-wrapper").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div
        className={`main_center_wrapper_content ${
          selectedType && selectedType?.maxNumbercount > 6
            ? "main_center_wrapper_contentTopp"
            : ""
        }`}
      >
        <div className="smallLottoNumber mb-3">
          <LottoNumberBox />
        </div>

        {selectedGame && selectedPlayingType ? (
          <div>
            <div className="d-flex justify-content-between align-items-center main_center_wrapper_contentHeader">
              <h5>{selectedGame?.name}</h5>
              <div className="d-flex align-items-center">
                <span>{selectedPlayingType}</span>
                {/* <i className="bx bx-error-circle ml-2"></i> */}
              </div>
            </div>
            <div className="main_center_wrapper_content_top mt-5">
              <div className="d-flex justify-content-between align-items-center main_center_wrapper_middle">
                <div className="selectDrawGame">
                  <button
                    className="grandLottoButton grandLottoButtonLightGreen"
                    onClick={() => dispatch(setSelectDrawMenu(true))}
                  >
                    <div
                      className="d-flex align-items-center isGrid"
                      style={{ columnGap: 5 }}
                    >
                      <span style={{ fontSize: 14 }}> Draw</span>

                      <i className="bx bx-chevron-down"></i>
                    </div>
                  </button>
                </div>

                <div className="">
                  <select
                    style={{ width: "100%" }}
                    className="form-control largeInputFont"
                    onChange={(e) => {
                      if (e.target.value) {
                        handlePlayType(e.target.value);
                        // console.log(JSON.stringify(e.target.value));
                      }
                    }}
                    value={selectedT}
                  >
                    <option value="">Select...</option>
                    {gameTypes && gameTypes?.length
                      ? gameTypes?.map((item, index) => (
                          <option key={index} value={item?.type}>
                            {item?.type}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    onClick={() => randomPick()}
                    className="grandLottoButton cardButton"
                    style={{ borderRadius: 10 }}
                  >
                    Lucky dip
                  </button>
                </div>
              </div>
            </div>

            <div className="allCoupons">
              {allCoupons &&
                allCoupons?.map((item, index) => (
                  <div
                    key={index}
                    className={`gameBalls ${
                      isSelected(item) ? "" : "notSelected"
                    } `}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="gameBallsCardDiv">
                      {isSelected(item) && (
                        <div className="gameBallsCardDivSelected">
                          <img
                            src={greenball}
                            style={{ width: "50px", height: "50px" }}
                            alt="grand-logo"
                          />
                        </div>
                      )}
                      {/*  */}
                      <div className="gameBallsCardDivValue">{item}</div>
                    </div>
                  </div>
                ))}
            </div>

            {/* <div className="d-flex justify-content-end align-items-end mt-5">
          <button
            type="button"
            className="grandLottoButton cardButton buttonPlayLottoFirst"
            disabled={!selectedCoupons || selectedCoupons?.length < 6}
          >
            Play
          </button>
        </div> */}
            <div className="mt-5 buttonPlayLotto">
              <div className="buttonPlayLottoSmall">
                <BetAmount />
                <div className="buttonPlayLottoSmallDesc">
                  {calculatedGames && (
                    <GameSummary calculatedGames={calculatedGames} />
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-3 buttonPlayLottoSmallStake">
                    <div className="buttonPlayLottoSmallStakeLeft">
                      <p>
                        Total stake{" "}
                        {/* {["PERM2", "PERM3", "PERM4", "PERM5"].includes(
                          calculatedGames?.gametype
                        ) && "per line"} */}
                        :
                      </p>
                      <p>
                        <b>
                          ₦
                          {calculatedGames?.ammountTopay
                            ? addComma(calculatedGames?.ammountTopay)
                            : 0}
                        </b>
                      </p>
                    </div>
                    <div className="buttonPlayLottoSmallStakeRight">
                      <p>Possible Win:</p>
                      <p>
                        <b>
                          ₦
                          {calculatedGames &&
                          calculatedGames?.maximumWiningAmount
                            ? addComma(calculatedGames?.maximumWiningAmount)
                            : 0}
                        </b>
                      </p>
                    </div>
                  </div>
                  <div className="buttonPlayLottoSmallButton">
                    <div className="d-flex justify-content-end align-items-end mt-3">
                      <BetPlayButton betAmount={betAmount} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="noBetSlip darkBg">
              <p>Please select draw and playing type</p>
              <br />
              <div className="selectDrawGame">
                <button
                  className="grandLottoButton grandLottoButtonLightGreen"
                  onClick={() => dispatch(setSelectDrawMenu(true))}
                >
                  <div
                    className="d-flex align-items-center isGrid"
                    style={{ columnGap: "0px!important-" }}
                  >
                    <span style={{ fontSize: 14 }}>Select Draw</span>

                    <i className="bx bx-chevron-down"></i>
                  </div>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PlayLotto;
