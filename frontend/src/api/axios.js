import axios from "axios";

const API = axios.create({
  baseURL: "https://flipkart-backend-xkcb.onrender.com/api/v1",
  withCredentials: true,
});

export default API;