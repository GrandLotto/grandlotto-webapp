import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoggedInLayout from "../layout/LoggedInLayout";
import MainLayout from "../layout/MainLayout";
import OAuthLayout from "../layout/OAuthLayout";
import ThreeColLayout from "../layout/ThreeColLayout";
import TwoColLayout from "../layout/TwoColLayout";

import BetHistoryPage from "../pages/BetHistoryPage";
import BetSlip from "../pages/BetSlip";
import Dashboard from "../pages/Dashboard";
import FundWalletPage from "../pages/FundWalletPage";
import Home from "../pages/Home";
import KYCPage from "../pages/KYCPage";
import PlayLotto from "../pages/PlayLotto";
import Profile from "../pages/Profile";
import Results from "../pages/Results";
import SettingsPage from "../pages/SettingsPage";
import TransactionsPage from "../pages/TransactionsPage";
import TransferPage from "../pages/TransferPage";
import WithdrawalPage from "../pages/WithdrawalPage";
import VerifyPaystack from "../pages/VerifyPaystack";
import PaymentResponsePage from "../pages/PaymentResponsePage";
import ReferralPage from "../pages/ReferralPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import Promotions from "../pages/Promotions";
import HowToPlay from "../pages/HowToPlay";
import Contacts from "../pages/Contacts";

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<OAuthLayout />}>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/contact-us" element={<Contacts />} />
          </Route>
          <Route element={<LoggedInLayout />}>
            <Route path="/account/dashboard" element={<Dashboard />} />
            {/* <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/transactions"
                element={<AdminTransactionsPage />}
              />
              <Route
                path="/admin/verify-kyc"
                element={<AdminVerifyKYCPage />}
              />
              <Route
                path="/admin/user-controls"
                element={<AdminUserAccountPage />}
              />
              <Route
                path="/admin/games/create-games-types"
                element={<AdminCreateGametypes />}
              />
              <Route
                path="/admin/games/create-games"
                element={<AdminCreateGames />}
              />
              <Route
                path="/admin/games/validate-games"
                element={<AdminValidateGames />}
              />
              <Route
                path="/admin/games/winnings"
                element={<AdminGameWinning />}
              />
            </Route> */}
            <Route path="/account/profile" element={<Profile />} />
            <Route path="/account/fund-wallet" element={<FundWalletPage />} />
            <Route path="/account/transfer" element={<TransferPage />} />
            <Route path="/account/bet-history" element={<BetHistoryPage />} />
            <Route
              path="/account/transactions"
              element={<TransactionsPage />}
            />
            <Route path="/account/kyc-documentation" element={<KYCPage />} />
            <Route
              path="/account/withdraw-funds"
              element={<WithdrawalPage />}
            />
            <Route path="/account/referral" element={<ReferralPage />} />
            <Route path="/account/settings" element={<SettingsPage />} />
            <Route path="/account/betslip" element={<BetSlip />} />
          </Route>
          <Route element={<ThreeColLayout />}>
            <Route path="/lotto" element={<PlayLotto />} />
            <Route path="/betslip" element={<BetSlip />} />
          </Route>
          <Route element={<TwoColLayout />}>
            <Route path="/results" element={<Results />} />
          </Route>
          <Route path="/verify-paystack" element={<VerifyPaystack />} />
          <Route path="/payment-response" element={<PaymentResponsePage />} />

          {/* <Route element={<OAuthLayout2 />}>
          <Route path="/redeem-winning" element={<RedeemWining />} />
        </Route> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MyRouter;
