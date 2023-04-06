import React, { useEffect, useState } from "react";
import { GET_GAMES_BY_TICKETID_URL } from "../../config/urlConfigs";
import { handleGETRequest } from "../../rest/apiRest";
import { setSearchCouponCodeModal } from "../../store/alert/alertSlice";
import { useDispatch } from "react-redux";
import Reponsemessage from "./Reponsemessage";

const TopSearch = () => {
  const dispatch = useDispatch();

  const [ticketID, setTicketID] = useState("");
  const [responseError, setResponseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkWinning = () => {
    if (!ticketID) {
      return;
    }

    if (isLoading) {
      return;
    }

    setResponseError("");
    setIsLoading(true);

    let URL = GET_GAMES_BY_TICKETID_URL;

    console.log(URL);

    handleGETRequest(URL + `?TicketId=${ticketID}`)
      .then((response) => {
        setIsLoading(false);

        console.log(response);
        if (response?.data?.success) {
          dispatch(
            setSearchCouponCodeModal({
              status: true,
              type: "",
              payload: response?.data?.data,
            })
          );
          setTicketID("");
        } else {
          setResponseError(response?.data?.message);
          setTicketID("");
        }
      })
      .catch((error) => {
        setResponseError("An error occurred, please try again");
        setTicketID("");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (responseError) {
      setTimeout(() => {
        setResponseError("");
      }, 4000);
    }
  }, [responseError]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          checkWinning();
        }}
        className="headerTopMiddleSearch"
      >
        <input
          onChange={(e) => setTicketID(e.target.value)}
          value={ticketID}
          type="text"
          placeholder="Search for coupon code"
        />
        <span className="searchIconn" onClick={() => checkWinning()}>
          {isLoading ? (
            <i className={`fa fa-refresh font-weight-bold fa-spin`}></i>
          ) : (
            <i className="bx bx-search"></i>
          )}
        </span>
      </form>

      {responseError ? (
        <div className=" text-left" style={{ marginTop: -37, marginLeft: 10 }}>
          <Reponsemessage
            message={responseError}
            error={responseError ? true : false}
          />
        </div>
      ) : null}
    </>
  );
};

export default TopSearch;
