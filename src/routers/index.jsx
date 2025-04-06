import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserWrapper } from "../context/userContext";
import AddLogs from "../pages/AddLogs";
import Dashboard from "../pages/Dashboard";
import Graph from "../pages/Graph";
import Graphmail from "../pages/Graphmail";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Topup from "../pages/Topup";
import Transfer from "../pages/Transfer";
import AuthRoute from "./AuthRoute";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <BrowserRouter>
      <UserWrapper>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/topup" element={<Topup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/graphmail" element={<Graphmail />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/add-logs" element={<AddLogs />} />
          </Route>
        </Routes>
      </UserWrapper>
    </BrowserRouter>
  );
};

export default Routers;
