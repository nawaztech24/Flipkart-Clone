import axios from "axios";

const API = axios.create({
  baseURL: "https://flipkart-backend-xkcb.onrender.com",
  withCredentials: true,
});

export default API;