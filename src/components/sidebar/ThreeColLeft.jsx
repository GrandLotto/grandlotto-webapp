import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/image6.png";
import {
  addZero,
  formatAMPM,
  groupBy,
  groupBy2,
} from "../../global/customFunctions";
import { setSelectDrawMenu } from "../../store/alert/alertSlice";
import {
  setCalculatedGames,
  setExpiryDate,
  setSelectedCoupons,
  setSelectedGame,
  setSelectedGametimer,
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

  const [selectedLotto, setSelectedLotto] = useState(null);

  const closeMenu = () => {
    dispatch(setSelectDrawMenu(false));
  };

  // const betDates = [
  //   {
  //     name: "Wednesday, 2nd Feburary",
  //     contents: [
  //       {
  //         title: "Metro",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image2,
  //         active: true,
  //       },
  //       {
  //         title: "Royal A1",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image3,
  //         active: false,
  //       },
  //       {
  //         title: "Mega 77",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image4,
  //         active: false,
  //       },
  //       {
  //         title: "Arena",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image5,
  //         active: false,
  //       },
  //       {
  //         title: "Fortune",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image6,
  //         active: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Thursday, 3nd Feburary",
  //     contents: [
  //       {
  //         title: "Metro",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image2,
  //         active: true,
  //       },
  //       {
  //         title: "Royal A1",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image3,
  //         active: false,
  //       },
  //       {
  //         title: "Mega 77",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image4,
  //         active: false,
  //       },
  //       {
  //         title: "Arena",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image5,
  //         active: false,
  //       },
  //       {
  //         title: "Fortune",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image6,
  //         active: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Friday, 4th Feburary",
  //     contents: [
  //       {
  //         title: "Metro",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image2,
  //         active: true,
  //       },
  //       {
  //         title: "Royal A1",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image3,
  //         active: false,
  //       },
  //       {
  //         title: "Mega 77",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image4,
  //         active: false,
  //       },
  //       {
  //         title: "Arena",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image5,
  //         active: false,
  //       },
  //       {
  //         title: "Fortune",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image6,
  //         active: false,
  //       },
  //     ],
  //   },
  //   {
  //     name: "Saturday, 5thFeburary",
  //     contents: [
  //       {
  //         title: "Metro",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image2,
  //         active: true,
  //       },
  //       {
  //         title: "Royal A1",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image3,
  //         active: false,
  //       },
  //       {
  //         title: "Mega 77",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image4,
  //         active: false,
  //       },
  //       {
  //         title: "Arena",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image5,
  //         active: false,
  //       },
  //       {
  //         title: "Fortune",
  //         desc: "",
  //         closes: "8:30AM",
  //         img: image6,
  //         active: false,
  //       },
  //     ],
  //   },
  // ];

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

        <div className="open_roles">
          <div className="open_roles_grid">
            {games &&
              groupBy2(games)?.map((item, index) => (
                <div className="open_roles_grid_item" key={index}>
                  <div className={`open_roles_grid_item_header `}>
                    <h5>{item?.date}</h5>
                    <i className="fa fa-chevron-right"></i>
                  </div>
                  <div className={`open_roles_grid_item_body `}>
                    {item?.games &&
                      item?.games?.map((newItem, index2) => (
                        // <div
                        //   className={`open_body_contents ${
                        //     newItem?.active ? "buttonActive" : ""
                        //   }`}
                        //   key={index2}
                        // >
                        //   <div className="d-flex justify-content-between align-items-center">
                        //     <div className="open_body_contents_left">
                        //       <div className="d-flex justify-content-between align-items-center">
                        //         <img
                        //           src={newItem?.img}
                        //           style={{ width: 56 }}
                        //           alt="grand-logo"
                        //         />
                        //         <h5>{newItem?.title}</h5>
                        //       </div>
                        //     </div>
                        //     <div className="open_body_contents_right">
                        //       <p>BETTING CLOSES</p>
                        //       <h5>{newItem?.closes}</h5>
                        //     </div>
                        //   </div>
                        // </div>

                        <div
                          className={`open_body_contents ${
                            isSelected(newItem) == true ? "buttonActive" : ""
                          }`}
                          key={index2}
                          onClick={() => {
                            dispatch(setSelectedGame(newItem));
                            dispatch(setCalculatedGames(null));
                            handleTimer(newItem);
                            dispatch(setSelectedCoupons([]));

                            //  setSelectedLotto(newItem)
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="open_body_contents_left">
                              <div className="d-flex justify-content-between align-items-center">
                                {/* <img
                                        src={newItem?.img}
                                        style={{ width: 56 }}
                                        alt="grand-logo"
                                      /> */}
                                <h5>{newItem?.name}</h5>
                              </div>
                            </div>
                            <div className="open_body_contents_right">
                              <p>BETTING CLOSES</p>
                              <h5>{formatAMPM(newItem?.endTime)}</h5>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* <div className="open_roles">
          <div className="open_roles_grid_item_body2">
            {games &&
              games?.map((newItem, index2) => (
                <div
                  className={`open_body_contents ${
                    isSelected(newItem) == true ? "buttonActive" : ""
                  }`}
                  key={index2}
                  onClick={() => {
                    dispatch(setSelectedGame(newItem));
            
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
                      <h5>{formatAMPM(newItem?.endTime)}</h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ThreeColLeft;
