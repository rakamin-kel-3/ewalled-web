import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Topup from "../pages/Topup";
import Transfer from "../pages/Transfer";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/topup" element={<Topup />} />
        {/* <Route path="/pokedetail/:id" element={<PokeDetail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
