import axios from "./axiosInstance";

export const getGigs = (search = "") => axios.get(`/gigs?search=${search}`);
export const getMyGigs = () => axios.get("/gigs/my");
export const createGig = (data) => axios.post("/gigs", data);
export const getGigById = (id) => axios.get(`/gigs/${id}`);
