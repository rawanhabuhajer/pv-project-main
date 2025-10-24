import axios from "axios";

const server = () => {
  const headers = {};
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers,
  });
};

export default server;
