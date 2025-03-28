import axios from "axios";

const BASE_URL = "https://ewalled-service.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ewalled_token") || ""}`,
  },
});
