/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_WINNING_URL, PLAY_GAME_URL } from "../../config/urlConfigs";
import { handlePOSTRequest } from "../../rest/apiRest";
import {
  setAlertBetModal,
  setAlertPopUp,
  setLoginModal,
  setPageLoading,
} from "../../store/alert/alertSlice";
import { setRefreshing } from "../../store/authSlice/authSlice";
import {
  setBetAmount,
  setCalculatedGames,
  setExpiryDate,
  setSelectedCoupons,
  setSelectedGame,
  setSelectedPlayingType,
  setSelectedType,
} from "../../store/betSlice/betSlice";
import { checkIfGameHasEnded } from "../../global/customFunctions";

const BetPlayButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const selectedGameGroup = useSelector(
    (state) => state.bets.selectedGameGroup
  );
  const gameTypes = useSelector((state) => state.bets.gameTypes);
  const gamePlayingTypes = useSelector((state) => state.bets.gamePlayingTypes);
  const isUserLoggedIn = useSelector((state) => state.oauth.isUserLoggedIn);
  const betAmount = useSelector((state) => state.bets.betAmount);
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);
  const selectedType = useSelector((state) => state.bets.selectedType);
  const selectedGame = useSelector((state) => state.bets.selectedGame);
  const selectedPlayingType = useSelector(
    (state) => state.bets.selectedPlayingType
  );
  const calculatedGames = useSelector((state) => state.bets.calculatedGames);

  const [isDisabled, setIsDisabled] = useState(true);

  const [isCalculatingGames, setIsCalculatingGames] = useState(false);

  useEffect(() => {
    validateButton();
  }, [
    selectedCoupons,
    selectedGameGroup,
    selectedType,
    betAmount,
    calculatedGames,
  ]);

  const validateButton = () => {
    if (selectedCoupons && selectedType) {
      // if (selectedCoupons?.length !== selectedType?.maxNumbercount) {
      //   setIsDisabled(true);
      //   return;
      // }

      // if (!betAmount) {
      //   setIsDisabled(true);
      //   return;
      // }

      // if (betAmount < 100) {
      //   setIsDisabled(true);
      //   return;
      // }

      // console.log("isDisabled", isDisabled);
      // console.log("calculatedGames", calculatedGames);

      if (selectedGameGroup && selectedGameGroup?.code === "310") {
        if (selectedCoupons?.length !== 3) {
          setIsDisabled(true);
          return;
        }
      }

      if (!calculatedGames) {
        setIsDisabled(true);
        return;
      }

      setIsDisabled(false);
    }
  };

  const resetFields = () => {
    let newgateType = gameTypes;
    // dispatch(setSelectedGame(undefined));
    dispatch(setSelectedPlayingType(undefined));
    if (newgateType && newgateType?.length) {
      dispatch(setSelectedType(newgateType[0]));
    }

    dispatch(setSelectedCoupons([]));
    dispatch(setBetAmount(0));
    dispatch(setCalculatedGames(null));
    dispatch(setExpiryDate(null));
  };

  const handleCalculateGame = () => {
    setIsCalculatingGames(true);
    setIsDisabled(true);

    const payload = {
      email: user?.email,
      gameId: selectedGame?.id,
      gametypeId: selectedType?.id,
      gameType: selectedType?.type,
      numbersPlay: String(selectedCoupons),
      ammount: Number(betAmount),
      playingTypeId: gamePlayingTypes?.find(
        (item) =>
          item?.name.toLowerCase() === selectedPlayingType?.toLowerCase()
      )?.id,
    };

    dispatch(setCalculatedGames(null));
    // console.log(selectedGame);

    handlePOSTRequest(CALCULATE_WINNING_URL, payload)
      .then((response) => {
        setIsCalculatingGames(false);
        setIsDisabled(false);

        // console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;
          // console.log(requestData);
          dispatch(setCalculatedGames(requestData));
        } else {
          dispatch(
            setAlertBetModal({
              status: true,
              type: "ERROR",
              title: response?.data?.message,
              betId: "",
              amountStake: 0,
              amountWinning: 0,
              payload: null,
              buttonText: "Deposit Funds",
              buttonURL: "DEPOSIT",
            })
          );
        }
      })
      .catch((error) => {
        setIsCalculatingGames(false);
        setIsDisabled(false);
        // console.log(error);
      });
  };

  const handlePayGame = () => {
    if (!calculatedGames) {
      handleCalculateGame();

      return;
    }

    if (checkIfGameHasEnded(selectedGame?.endTime) === true) {
      dispatch(
        setAlertPopUp({
          status: true,
          type: "ERROR",
          title: "Game expired",
          desc: "Sorry this game has expired",
          payload: null,
        })
      );
      dispatch(setRefreshing(true));
      dispatch(setSelectedCoupons([]));
      dispatch(setBetAmount(0));
      dispatch(setCalculatedGames(null));
      dispatch(setExpiryDate(null));
      dispatch(setSelectedGame(null));

      return;
    }
    dispatch(
      setPageLoading({
        status: true,
        message: "Please wait ...",
      })
    );

    const payload = {
      email: user?.email,
      gameId: selectedGame?.id,
      gametypeId: selectedType?.id,
      gameType: selectedType?.type,
      numbersPlay: String(selectedCoupons),
      ammount: Number(calculatedGames?.ammountTopay),
      playingTypeId: gamePlayingTypes?.find(
        (item) =>
          item?.name.toLowerCase() === selectedPlayingType?.toLowerCase()
      )?.id,
      gameGroupId: selectedGameGroup?.id,
    };

    console.log("handlePayGame", payload);

    handlePOSTRequest(PLAY_GAME_URL, payload)
      .then((response) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );
        console.log(response);
        if (response?.data?.success) {
          let requestData = response?.data?.data;

          dispatch(
            setAlertBetModal({
              status: true,
              type: "SUCCESS",
              title: "Bet Successful",
              betId: requestData?.gameticket,
              amountStake: requestData?.ammountTopay,
              amountWinning: 0,
              payload: null,
              buttonText: "Continue Betting",
              buttonURL: "",
            })
          );

          dispatch(setRefreshing(true));

          resetFields();
        } else {
          dispatch(
            setAlertBetModal({
              status: true,
              type: "ERROR",
              title:
                response?.data?.message ||
                "An error occurred, please try again",
              betId: "",
              amountStake: 0,
              amountWinning: 0,
              payload: null,
              buttonText: "Close",
              buttonURL: "",
              // buttonText: "Deposit Funds",
              // buttonURL: "DEPOSIT",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          setPageLoading({
            status: false,
            message: "",
          })
        );

        dispatch(
          setAlertPopUp({
            status: true,
            type: "ERROR",
            title: "Error",
            desc: "An error occurred, please try again",
            payload: null,
          })
        );
        // console.log(error);
      });
  };

  return isUserLoggedIn ? (
    <button
      type="button"
      className="grandLottoButton cardButton"
      disabled={isDisabled}
      onClick={() => handlePayGame()}
    >
      {/* {calculatedGames ? "Place Bet" : "Continue"}{" "} */}
      Place Bet
      {isCalculatingGames && (
        <span
          className="spinner spinner-border"
          role="status"
          style={{ width: 12, height: 12 }}
        ></span>
      )}
    </button>
  ) : (
    <button
      type="button"
      onClick={() => dispatch(setLoginModal(true))}
      className="grandLottoButton cardButton"
      disabled={false}
    >
      Login to place bet
    </button>
  );
};

export default BetPlayButton;
