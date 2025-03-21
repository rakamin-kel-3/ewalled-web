import React from "react";
import { Navigate, Outlet } from "react-router";
import useUserStore from "../store/userStore";

const AuthRoute = () => {
  const { isAuthenticated } = useUserStore();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
