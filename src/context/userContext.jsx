import React, { createContext, useContext, useEffect, useState } from "react";
import { coreApi } from "../api";
import { me } from "../api/model/user";
import useSnackbar from "../hooks/useSnackbar";

export const defaultValue = {
  isAuthenticated: !!localStorage.getItem("ewalled_token"),
  userInfo: null,
  login: () => {},
  logout: () => {},
  fetchUser: () => {},
};

const UserContext = createContext(defaultValue);

export const UserWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultValue.isAuthenticated
  );
  const [userInfo, setUserInfo] = useState(defaultValue.userInfo);

  const snackbar = useSnackbar();

  const login = (token) => {
    coreApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    localStorage.setItem("ewalled_token", token);
    fetchUser();
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserInfo({});
    localStorage.removeItem("ewalled_token");
    coreApi.defaults.headers.common["Authorization"] = "";
    snackbar.success("Successfully logout");
  };

  const fetchUser = async () => {
    try {
      const res = await me();
      if (res.data.data) {
        setUserInfo(res.data.data);
      }
    } catch (error) {
      snackbar.error(error.response?.meta.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userInfo,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
