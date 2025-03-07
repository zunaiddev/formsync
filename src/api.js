import axios from "axios";

const API = axios.create({
    baseURL: "https://frantic-karee-api-v9-e95c5f4b.koyeb.app/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

export default API;