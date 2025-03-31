import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { loginUser } from "../../api/model/user";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import { useUserContext } from "../../context/userContext";
import useSnackbar from "../../hooks/useSnackbar";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useUserContext();
  const snackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (d) => {
    try {
      setIsLoading(true);
      const res = await loginUser(d.email, d.password);
      login(res.data.data.token);
      snackbar.success("Selamat Datang!");
    } catch (error) {
      snackbar.error(error.response?.data.metadata.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="max-w-md m-auto w-full px-5 lg:px-0">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto">
            <img src={logo} className="mx-auto" alt="" />
            <div className="mt-20 mx-auto">
              <Input
                type={"text"}
                name={"email"}
                placeholder={"Email"}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-600">Email wajib diisi</span>
              )}
            </div>
            <div className="mt-6 mx-auto">
              <Input
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  Password wajib diisi
                </span>
              )}
            </div>
            <div className="mx-auto mt-12">
              <Button
                label={"Login"}
                classname="w-full text-xl py-4"
                isLoading={isLoading}
              />
            </div>
            <div className="mt-6">
              <p>
                Belum Punya Akun?{" "}
                <Link to={"/register"} className="text-[#0061FF]">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div
        className="bg-cover hidden lg:block"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>
    </div>
  );
};

export default Login;
