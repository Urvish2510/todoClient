import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL});

export const fetchActivities = () => API.get("/activities");
export const addActivity = (newActivity) => API.post("/activity", newActivity);
export const deleteActivity = (id) => API.delete(`/delete/${id}`);
