import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AllModal from "./components/modal/AllModal";
import { addZero } from "./global/customFunctions";
import MyRouter from "./routes/MyRouter";
import { setDigitalDate } from "./store/authSlice/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    digitalClock();
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

  return (
    <>
      <MyRouter />
      <AllModal />
    </>
  );
};

export default App;
