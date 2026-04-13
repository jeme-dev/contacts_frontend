import { Navigate, Outlet } from "react-router-dom";
import { getValidToken } from "../services/auth";

const ProtectedRoute = () => {
  const isAuthenticated = !!getValidToken();
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;