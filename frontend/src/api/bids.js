import axios from "./axiosInstance";

export const placeBid = (data) => axios.post("/bids", data);
export const getBidsForGig = (gigId) => axios.get(`/bids/${gigId}`);
export const hireBid = (bidId) => axios.patch(`/bids/${bidId}/hire`);
