import { Route, Routes } from "react-router-dom";
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

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getProfile());
}, [dispatch]);

  return (
    <Routes>

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="users" element={<Users />} />

          {/* <Route path="packages" element={<Packages />} /> */}

        </Route>

      </Route>

    </Routes>
  );
}

export default App;