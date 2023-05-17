import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import person from "../assets/images/default.png";
import { copyCode } from "../global/customFunctions";
import { setAlertSmallPOPUP } from "../store/alert/alertSlice";
import CardLoading from "../components/blocks/CardLoading";
import PaginationBlock from "../components/blocks/PaginationBlock";

const ReferralPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.oauth.user);
  const referrals = useSelector((state) => state.oauth.referrals);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setcopied] = useState(false);

  const handleClick = (code) => {
    if (isLoading === true) {
      return;
    }

    if (copied === true) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setcopied(true);
      copyCode(code);

      setTimeout(() => {
        setcopied(false);
        setIsLoading(false);
        dispatch(
          setAlertSmallPOPUP({
            status: true,
            message: "Copied to clipboard",
          })
        );
      }, 2000);
    }, 1400);
  };

  useEffect(() => {
    return () => {
      document.querySelector(".content-body") &&
        document.querySelector(".content-body").scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <div className="pages">
        <div className="pages_mobile_dark">
          <div className="d-flex justify-content-between pages_header">
            <h5 className="site_title">Referrals</h5>
          </div>
          <div className="mt-5  px-3">
            {referrals ? (
              <>
                <div className="card p-4 mb-5">
                  <div className="card-body">
                    <div className="row ">
                      <div className="col-md-6 mx-auto">
                        <label htmlFor="">Referral Code</label>
                        <div className="inputWithSufix">
                          <input
                            type="text"
                            placeholder="referral code"
                            disabled
                            value={user?.code}
                          />
                          <span
                            className="searchIconn"
                            onClick={() => handleClick(user?.code)}
                          >
                            <span>
                              {isLoading ? (
                                <>
                                  {copied ? (
                                    <i
                                      className="bx bx-check"
                                      style={{ fontSize: 19 }}
                                    ></i>
                                  ) : (
                                    <i
                                      className={`fa fa-refresh font-weight-bold fa-spin`}
                                    ></i>
                                  )}
                                </>
                              ) : (
                                <i
                                  className="bx bx-copy"
                                  style={{ fontSize: 16 }}
                                ></i>
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {referrals?.referralData?.length ? (
                  <>
                    <div className="animated mt-5 mb-5 preFadeInLeft fadeInLeft">
                      <div className="referral_grid">
                        {referrals?.referralData?.map((item, index) => (
                          <div className="card" key={index}>
                            <div className="card-body text-center py-3 px-2">
                              <img
                                src={item?.photo || person}
                                onError={(e) => {
                                  e.currentTarget.src = person;
                                }}
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "50%",
                                }}
                                alt="referra"
                              />
                              <h5 className="mt-4" style={{ fontSize: 14 }}>
                                {item?.firstName + " " + item?.lastName}
                              </h5>
                              {/* <p style={{ fontSize: 12 }}>{item?.code}</p> */}
                              <p style={{ fontSize: 12 }}>{item?.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {referrals?.referralData?.length ? (
                      <PaginationBlock
                        handlePrev={() => {}}
                        handleNext={() => {}}
                        page={1}
                        totalPages={1}
                        handleFetchByPage={() => {}}
                      />
                    ) : null}
                  </>
                ) : (
                  <div className="card">
                    <div className="card-body p-5 text-center">
                      <p style={{ fontSize: 17 }}>No Referral</p>
                    </div>
                  </div>
                )}

                {/* <div className="card"></div> */}
              </>
            ) : referrals === null ? (
              <CardLoading />
            ) : (
              <div className="card">
                <div className="card-body p-5 text-center">
                  <p style={{ fontSize: 17 }}>No Referral</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferralPage;
