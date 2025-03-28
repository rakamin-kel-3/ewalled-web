import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../../api/model/user";
import loginImg from "../../assets/login.png";
import logo from "../../assets/logo.svg";
import Button from "../../components/Button/button";
import Input from "../../components/Input";
import useSnackbar from "../../hooks/useSnackbar";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = async (d) => {
    try {
      await registerUser(d.name, d.email, d.password, d.phoneNumber);
      snackbar.success("Berhasil daftar, silahkan login!");
      navigate("/login");
    } catch (error) {
      snackbar.error(error.response?.data.metadata.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="max-w-md m-auto w-full px-5 lg:px-0">
        <div className="mx-auto">
          <img src={logo} className="mx-auto" alt="" />
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-20 mx-auto">
              <Input
                type={"text"}
                name={"name"}
                placeholder={"Nama Lengkap"}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-sm text-red-600">Nama wajib diisi</span>
              )}
            </div>
            <div className="mt-6 mx-auto">
              <Input
                type={"email"}
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
            <div className="mt-6 mx-auto">
              <Input
                type={"number"}
                name={"phoneNumber"}
                placeholder={"No Hp"}
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <span className="text-sm text-red-600">No HP wajib diisi</span>
              )}
            </div>
            <div className="mx-auto mt-12">
              <Button label={"Register"} classname="w-full text-xl py-4" />
            </div>
          </form>
          <div className="mt-6">
            <p>
              Sudah Punya Akun?{" "}
              <Link to={"/login"} className="text-[#0061FF]">
                Masuk di sini
              </Link>
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

export default Register;
