import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

  const { user, isAuthChecked } = useSelector((state) => state.auth);

  // Wait until auth check finishes
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  // If no user after check → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;