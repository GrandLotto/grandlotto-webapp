import React, { useEffect, useState } from "react";

import {
  accordionTab,
  generate,
  numbersFromOneTo90,
  tabDropDown,
} from "../global/customFunctions";

import greenball from "../assets/images/greenball.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCoupons } from "../store/betSlice/betSlice";
import { setSelectDrawMenu } from "../store/alert/alertSlice";

import LottoNumberBox from "../components/blocks/LottoNumberBox";
import CurrencyInput from "react-currency-input-field";

const PlayLotto = () => {
  const dispatch = useDispatch();
  const selectedCoupons = useSelector((state) => state.bets.selectedCoupons);

  const [amount, setAmount] = useState(0);

  // const [selectedCoupons, setselectedCoupons] = useState([]);
  const [allCoupons] = useState(numbersFromOneTo90());

  // console.log(allCoupons);

  const isSelected = (item) => {
    let selected = selectedCoupons?.find((it) => it === item);

    return !!selected;
  };

  const handleSelectItem = (item) => {
    if (selectedCoupons?.length) {
      let addedC = selectedCoupons?.find((ite) => ite === item);

      if (addedC) {
        let remove = selectedCoupons?.filter((ite) => ite !== item);
        if (remove) {
          dispatch(setSelectedCoupons(remove));
        }
      } else {
        if (selectedCoupons?.length === 6) {
          return;
        }

        let newC = [...selectedCoupons, item];

        dispatch(setSelectedCoupons(newC));
      }
    } else {
      dispatch(setSelectedCoupons([item]));
    }
  };

  const randomPick = () => {
    let firstNumber = Number(generate(2)) > 47 ? generate(1) : generate(2);
    let secNumber = Number(generate(1)) == 0 ? 0 + 1 : generate(1);
    let thirdNumber = Number(generate(2)) > 47 ? generate(1) : generate(2);
    let forthNumber = Number(generate(1)) == 0 ? 1 + 2 : generate(1);
    let fiftNumber = Number(generate(1)) == 0 ? 2 + 3 : generate(1);
    let sixNumber = Number(generate(2)) > 47 ? generate(1) + 3 : generate(2);

    console.log(
      firstNumber,
      secNumber,
      thirdNumber,
      forthNumber,
      fiftNumber,
      sixNumber
    );

    let allNumbers = [
      Number(firstNumber),
      +secNumber,
      +thirdNumber,
      +forthNumber,
      +fiftNumber,
      +sixNumber,
    ];

    dispatch(setSelectedCoupons(allNumbers));

    // console.log(allNumbers);
  };

  useEffect(() => {
    setTimeout(() => {
      // tabDropDown();
      accordionTab();
    }, 1500);
  }, []);

  return (
    <>
      <div className="main_center_wrapper_content">
        <div className="smallLottoNumber mb-3">
          <LottoNumberBox />
        </div>
        <div className="d-flex justify-content-between align-items-center main_center_wrapper_contentHeader">
          <h5>Original Lotto 7/90</h5>
          <div className="d-flex align-items-center">
            <span>More info</span>
            <i className="bx bx-error-circle ml-2"></i>
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
              >
                <option value="nap 1">nap 1</option>
                <option value="nap 2">nap 2</option>
                <option value="nap 3">nap 3</option>
                <option value="nap 4">nap 4</option>
                <option value="nap 5">nap 5</option>
                <option value="Perm 3">Perm 3</option>
                <option value="Perm 4">Perm 4</option>
                <option value="Perm 5">Perm 5</option>
                <option value="1 BANKER">1 BANKER</option>
                <option value="1 BANKER">AGAINST</option>
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => randomPick()}
                className="grandLottoButton cardButton"
                style={{ borderRadius: 10 }}
              >
                Quickpick
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
            <div className={`symbolInput`}>
              <span>₦</span>
              <CurrencyInput
                name="input-name"
                placeholder="Enter Amount "
                defaultValue={amount}
                decimalsLimit={2}
                contentEditable={true}
                value={amount}
                onValueChange={(value) => setAmount(value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 buttonPlayLottoSmallStake">
              <div className="buttonPlayLottoSmallStakeLeft">
                <p>Total stake:</p>
                <p>₦0</p>
              </div>
              <div className="buttonPlayLottoSmallStakeRight">
                <p>Total return:</p>
                <p>₦0</p>
              </div>
            </div>
            <div className="buttonPlayLottoSmallButton">
              <div className="d-flex justify-content-end align-items-end mt-3">
                <button
                  type="button"
                  className="grandLottoButton cardButton"
                  disabled={!selectedCoupons || selectedCoupons?.length < 6}
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayLotto;
