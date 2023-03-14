import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllModal from "./components/modal/AllModal";
import { addZero } from "./global/customFunctions";
import MyRouter from "./routes/MyRouter";
import {
  setAddBankModal,
  setAddPinModal,
  setAlertPopUp,
  setPageLoading,
} from "./store/alert/alertSlice";
import { getacceptedid, getUserInfo } from "./store/authSlice/actions";
import {
  logout,
  setDigitalDate,
  setIsUserLoggedIn,
  setUserInfo,
} from "./store/authSlice/authSlice";
import {
  Getuserclosedgameplayed,
  Getuseropengameplayed,
} from "./store/betSlice/actions";
import { persistor } from "./store/store";
import {
  getacceptedpayment,
  getAccountBalances,
  getCountryBanks,
  getUserAccount,
} from "./store/wallet/actions";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.oauth.user);
  const acceptedpayment = useSelector((state) => state.wallet.acceptedpayment);
  const countryBanks = useSelector((state) => state.wallet.countryBanks);

  useEffect(() => {
    (async () => {
      if (user) {
        dispatch(getUserInfo(user?.email));
        dispatch(getAccountBalances(user?.email));
        dispatch(getUserAccount(user?.email));
        dispatch(Getuseropengameplayed(user?.email));
        dispatch(Getuserclosedgameplayed(user?.email));

        if (!acceptedpayment) {
          dispatch(getacceptedpayment());
          dispatch(getacceptedid());
        }

        // dispatch(getacceptedid());

        if (!countryBanks) {
          dispatch(getCountryBanks("NG"));
        }
      }
    })();
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
        }, 500);

        checkUserAuthentication();
      }
    })();
  }, [user]);

  useEffect(() => {
    digitalClock();

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
    dispatch(setAddBankModal(false));
  }, []);

  const digitalClock = () => {
    // CLOCK
    // GET DATE

    var d = new Date();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = addZero(d.getSeconds());

    var interval = setInterval(() => {
      ++seconds;
      hour = minutes > 59 ? ++hour : hour;
      minutes = seconds > 59 ? ++minutes : minutes;
      if (hour > 24) clearInterval(interval);
      seconds = seconds > 59 ? 0 : seconds;
      if (minutes > 59) {
        ++hour;
        minutes = 0;
      }
      minutes = ("0" + minutes).slice(-2);
      hour = hour % 12 || 12;

      dispatch(
        setDigitalDate(addZero(hour) + ":" + minutes + ":" + addZero(seconds))
      );
      // currentClock = addZero(hour) + ":" + minutes + ":" + seconds;
      // console.log(currentClock);
      // this.$store.state.hourMinute = this.addZero(hour) + ":" + minutes;
    }, 1000);
  };

  const checkUserAuthentication = () => {
    let expiring = localStorage.getItem("appexrat");
    if (!expiring) {
      logoutUser();
      return;
    }

    if (isAuthenticated(expiring) === false) {
      logoutUser();
    }
  };
  const isAuthenticated = (expiresAt) => {
    let expiringDate = expiresAt;
    let newExpiry = new Date()?.getTime();

    let newDate = newExpiry < expiringDate;

    return !!newDate;
  };

  const logoutUser = () => {
    dispatch(setIsUserLoggedIn(false));
    dispatch(logout());
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
  };

  return (
    <>
      <MyRouter />
    </>
  );
};

export default App;
