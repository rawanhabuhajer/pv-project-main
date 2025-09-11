import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import toast from "react-hot-toast";

const server = ({ cookies = {}, ctx = {} }) => {
  const headers = {};
  let token;
  let lang = "ar";

  if (typeof window !== "undefined" && cookies.token !== undefined) {
    token = cookies.token;
    lang = cookies.lang || ctx.locale || "ar";
  } else {
    const cookies = parseCookies(ctx);
    token = cookies.token;
    lang = cookies.lang || ctx.locale || "ar";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  headers["Content-Language"] = lang;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          if (typeof window !== "undefined") {
            // Remove token from cookies
            destroyCookie(null, "token");
            // Redirect to login page
            Router.push("/login");
          } else {
            // Server-side logic to handle token removal from cookies
            destroyCookie(ctx, "token");
            // Optionally redirect on server-side
            ctx.res.writeHead(302, { Location: "/login" });
            ctx.res.end();
          }
        } else if (status === 500) {
          // Redirect to error page with status code
          // Router.push(`/error?status=${status}`);
          toast.error("something wrong happend")
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default server;
