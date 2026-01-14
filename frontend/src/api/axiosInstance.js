import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gig-flow-server-zeta.vercel.app/api",
  withCredentials: true,
});

export default axiosInstance;
