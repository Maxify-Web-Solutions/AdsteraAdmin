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
// import AdminProfilePage from "./Pages/Profile";

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
        </Route>
      </Route>

    </Routes>
  );
}

export default App;