import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllApiCalls from "./global/AllApiCalls";
import { isUserAnAdmin } from "./global/customFunctions";
import DigitalClock from "./global/DigitalClock";
import MyRouter from "./routes/MyRouter";
import {
  setAddBankModal,
  setAddPinModal,
  setAlertBetModal,
  setAlertPopUp,
  setComingSoonModal,
  setPageLoading,
} from "./store/alert/alertSlice";
import {
  logout,
  setIsAdmin,
  setIsUserLoggedIn,
  setRefreshing,
} from "./store/authSlice/authSlice";
import {
  getallexistinggames,
  getgames,
  getgamesplayingtype,
  getgamestype,
  Getgameswininglogs,
} from "./store/betSlice/actions";
import {
  setCalculatedGames,
  setExpiryDate,
  setSelectedGametimer,
} from "./store/betSlice/betSlice";
import { persistor } from "./store/store";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);

  useEffect(() => {
    (async () => {
      if (user) {
        dispatch(setRefreshing(true));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      if (user) {
        setTimeout(() => {
          dispatch(setAddPinModal(false));
          // if (!user?.transactionPIN) {
          //   dispatch(setAddPinModal(true));
          // } else {
          //   dispatch(setAddPinModal(false));
          // }

          if (
            user &&
            user?.roles?.length &&
            isUserAnAdmin(user?.roles) === true
          ) {
            dispatch(setIsAdmin(true));
          } else {
            dispatch(setIsAdmin(false));
          }
        }, 500);

        // checkUserAuthentication();
        handleInactivity();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    dispatch(
      setPageLoading({
        status: false,
        message: "",
      })
    );

    dispatch(
      setAlertPopUp({
        status: false,
        type: "",
        title: "",
        desc: "",
        payload: null,
      })
    );

    dispatch(
      setAlertBetModal({
        status: false,
        type: "",
        title: "",
        betId: "",
        amountStake: 0,
        amountWinning: 0,
        payload: null,
        buttonText: "",
        buttonURL: "",
      })
    );
    dispatch(setAddBankModal(false));
    dispatch(setComingSoonModal(false));
    dispatch(Getgameswininglogs());
    dispatch(getgames());
    dispatch(getallexistinggames());
    dispatch(getgamestype());
    dispatch(getgamesplayingtype());
    dispatch(setSelectedGametimer(null));
    dispatch(setCalculatedGames(null));
    dispatch(setExpiryDate(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const checkUserAuthentication = () => {
  //   let expiring = localStorage.getItem("appexrat");
  //   if (!expiring) {
  //     logoutUser();
  //     return;
  //   }

  //   if (isAuthenticated(expiring) === false) {
  //     logoutUser();
  //   }
  // };
  // const isAuthenticated = (expiresAt) => {
  //   let expiringDate = expiresAt;
  //   let newExpiry = new Date()?.getTime();

  //   let newDate = newExpiry < expiringDate;

  //   return !!newDate;
  // };

  const logoutUser = () => {
    dispatch(setIsUserLoggedIn(false));
    dispatch(logout());
    dispatch(setIsAdmin(false));
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  const handleInactivity = () => {
    var t,
      timeout = 3000000;

    function resetTimer() {
      // console.log("reset: " + new Date().toLocaleString());
      if (t) {
        window.clearTimeout(t);
      }
      t = window.setTimeout(logout, timeout);
    }

    function logout() {
      logoutUser();
      // console.log("done: " + new Date().toLocaleString());
    }
    resetTimer();

    //And bind the events to call `resetTimer()`
    ["click", "mousemove", "keypress"].forEach(function (name) {
      // console.log(name);
      document.addEventListener(name, resetTimer);
    });
  };

  return (
    <>
      <MyRouter />
      <AllApiCalls />
      <DigitalClock />
    </>
  );
};

export default App;
