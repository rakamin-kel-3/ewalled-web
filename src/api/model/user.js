import { coreApi } from "..";

export const loginUser = (email, password) => {
  const param = {
    email: email,
    password: password,
  };
  return coreApi.post("/public/login", param);
};

export const me = () => {
  return coreApi.get("/users/me");
};
