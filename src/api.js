import axios from "axios";

const API = axios.create({
    baseURL: `${location.hostname === "localhost" ? import.meta.env.VITE_API_LOCAL_URL : import.meta.env.VITE_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default API;