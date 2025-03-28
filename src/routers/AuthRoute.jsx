import React from "react";
import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../context/userContext";

const AuthRoute = () => {
  const { isAuthenticated } = useUserContext();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
