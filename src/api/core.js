import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ewalled_token") || ""}`,
  },
});
