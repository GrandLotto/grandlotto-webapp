import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoggedInLayout from "../layout/LoggedInLayout";
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
import WithdrawalPage from "../pages/WithdrawalPage";

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<OAuthLayout />}>
          <Route path="/" exact element={<Home />} />
        </Route>
        <Route element={<LoggedInLayout />}>
          <Route path="/account/dashboard" element={<Dashboard />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/fund-wallet" element={<FundWalletPage />} />
          <Route path="/account/bet-history" element={<BetHistoryPage />} />
          <Route path="/account/transactions" element={<TransactionsPage />} />
          <Route path="/account/kyc-documentation" element={<KYCPage />} />
          <Route path="/account/withdraw-funds" element={<WithdrawalPage />} />
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
      </Routes>
    </Router>
  );
};

export default MyRouter;
