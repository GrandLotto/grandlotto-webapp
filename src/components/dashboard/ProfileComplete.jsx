import React from "react";

const ProfileComplete = () => {
  return (
    <div className="hideOnMobile">
      <div className="profileComplete">
        <div className="profileCompleteFlex">
          <div className="profileCompleteFlexLeft">
            <h5>Complete your profile</h5>
            <p>Extend your profile information to enable withdrawal of funds</p>
            <div>
              <button className="grandLottoButton grandLottoButtonLightGreen">
                Edit profile
              </button>
            </div>
          </div>
          <div
            className="profileCompleteFlexRight"
            style={{ position: "relative" }}
          >
            <div>
              <p>Profile status</p>
              <h5>Fair</h5>
            </div>

            <div style={{ position: "relative" }}>
              <div className="radialProgressBar progress-30">
                <div className="overlay">30%</div>
              </div>
            </div>

            {/* <div class="progress_container">
            <div class="progress_bar">
              <span
                class="progress_title timer"
                data-from="0"
                data-to="70"
                data-speed="1800"
              >
                70
              </span>
              <div class="progress_overlay"></div>
              <div class="progress_left"></div>
              <div class="progress_right"></div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComplete;
