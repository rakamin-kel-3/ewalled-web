import { coreApi } from "..";

export const getUser = () => {
  return coreApi.get("/users");
};
