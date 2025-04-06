import axios from "axios";

const BASE_URL = "https://fulusku-api.kobulwidodo.my.id";

const coreApi = axios.create({
  baseURL: BASE_URL,
});

coreApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("ewalled_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
  delete config.headers.Authorization;
  return config;
});

coreApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 403) {
      const errorMessage = response.data?.message ?? "";
      if (errorMessage.toLowerCase().includes("token")) {
        localStorage.removeItem("ewalled_token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default coreApi;
