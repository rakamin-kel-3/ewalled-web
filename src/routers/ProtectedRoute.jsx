import React from "react";
import { Navigate, Outlet } from "react-router";
import useSnackbar from "../hooks/useSnackbar";
import useUserStore from "../store/userStore";

const ProtectedRoute = () => {
  const { isAuthenticated } = useUserStore();
  const snackbar = useSnackbar();

  if (isAuthenticated) {
    return <Outlet />;
  }

  snackbar.error("Login required");
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
