import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./Pages/LoginPage";

import ProtectedRoute from "./Components/ProtectedRoute";

import DashboardLayout from "./Pages/AdminLayout";
import Dashboard from "./Pages/Dashboard";
import Users from "./Components/Users";
// import Packages from "./Pages/Packages";

import { useDispatch } from "react-redux";
import { getProfile } from "./redux/slice/authSlice";
import { useEffect } from "react";
import Smartlinks from "./Pages/Smartlinks";
import ApprovedLinks from "./Pages/ApprovedLinks";
import PendingLinks from "./Pages/PendingLinks";
import RejectedLinks from "./Pages/RejectedLinks";
import Profile from "./Pages/Profile";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Routes>
      

      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="all_Smartlinks" element={<Smartlinks />} />
          <Route path="approved_Smartlinks" element={<ApprovedLinks />} />
          <Route path="pending_Smartlinks" element={<PendingLinks />} />
          <Route path="rejected_Smartlinks" element={<RejectedLinks />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;