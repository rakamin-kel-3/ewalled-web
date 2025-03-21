import React, { useState } from "react";
import { Link } from "react-router";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email == "a@g.com" && password == "password") {
      console.log("handle login");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="max-w-md m-auto w-full px-5 lg:px-0">
        <div className="mx-auto">
          <img src={logo} className="mx-auto" alt="" />
          <div className="mt-20 mx-auto">
            <Input
              type={"text"}
              name={"email"}
              value={email}
              placeholder={"Email"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-6 mx-auto">
            <Input
              type={"password"}
              name={"password"}
              value={password}
              placeholder={"Password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mx-auto mt-12">
            <Button
              label={"Login"}
              onClick={() => handleLogin()}
              classname="w-full text-xl py-4"
            />
          </div>
          <div className="mt-6">
            <p>
              Belum Punya Akun?{" "}
              <Link className="text-[#0061FF]">Daftar di sini</Link>
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-cover hidden lg:block"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>
    </div>
  );
};

export default Login;
