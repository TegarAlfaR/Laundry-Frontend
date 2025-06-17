import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuthRole = ({ requiredRole }) => {
  const location = useLocation();
  const userData = Cookies.get("user");
  if (!userData) {
    // jika belum login, redirect ke login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const user = JSON.parse(userData);
  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuthRole;
