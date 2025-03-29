import axios from "axios";

const BASE_URL = "https://savings-spell-md-trick.trycloudflare.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ewalled_token") || ""}`,
  },
});
