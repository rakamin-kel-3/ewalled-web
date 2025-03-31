import { coreApi } from "..";

export const loginUser = (email, password) => {
  const param = {
    email: email,
    password: password,
  };
  return coreApi.post("/auth/login", param);
};

export const registerUser = (name, email, password, phoneNumber) => {
  const param = {
    name: name,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
  };
  return coreApi.post("/auth/register", param);
};

export const me = () => {
  return coreApi.get("/users/me");
};
