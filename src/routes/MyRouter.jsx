import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import LoggedInLayout from "../layout/LoggedInLayout";
import MainLayout from "../layout/MainLayout";
import OAuthLayout from "../layout/OAuthLayout";
import ThreeColLayout from "../layout/ThreeColLayout";
import TwoColLayout from "../layout/TwoColLayout";
import AdminCreateGames from "../pages/admin/AdminCreateGames";
import AdminCreateGametypes from "../pages/admin/AdminCreateGametypes";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminGameWinning from "../pages/admin/AdminGameWinning";
import AdminTransactionsPage from "../pages/admin/AdminTransactionsPage";
import AdminUserAccountPage from "../pages/admin/AdminUserAccountPage";
import AdminVerifyKYCPage from "../pages/admin/AdminVerifyKYCPage";
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

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<OAuthLayout />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route element={<LoggedInLayout />}>
            <Route path="/account/dashboard" element={<Dashboard />} />
            <Route element={<AdminLayout />}>
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
                path="/admin/games/winnings"
                element={<AdminGameWinning />}
              />
            </Route>
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
          {/* <Route element={<OAuthLayout2 />}>
          <Route path="/redeem-winning" element={<RedeemWining />} />
        </Route> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default MyRouter;
