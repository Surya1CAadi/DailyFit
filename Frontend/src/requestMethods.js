import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "https://server.ducklingfit.com";
axios.defaults.withCredentials = true;

export const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  credentials: "include",
});
