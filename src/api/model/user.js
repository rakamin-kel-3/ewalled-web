import { coreApi } from "..";

export const loginUser = (email, password) => {
  const param = {
    email: email,
    password: password,
  };
  return coreApi.post("/public/login", param);
};

export const registerUser = (name, email, password, phoneNumber) => {
  const param = {
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
  };
  return coreApi.post("/public/register", param);
};

export const me = () => {
  return coreApi.get("/users/me");
};
